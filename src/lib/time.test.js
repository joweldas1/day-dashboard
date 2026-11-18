import { describe, it, expect } from 'vitest';
import {
  parseTimeToMinutes,
  formatMinutesToTime,
  formatSecondsToCountdown,
  crossesMidnight,
  getBlockDurationMinutes,
  validateSchedule,
  buildScheduleWithBuffers,
  resolveScheduleState,
  getSimulatedTime
} from './time.js';
import { DEFAULT_WEEKDAY_SCHEDULE } from '../data/schedule.js';

describe('Time conversion utilities', () => {
  it('parses "HH:MM" into minutes from midnight', () => {
    expect(parseTimeToMinutes('00:00')).toBe(0);
    expect(parseTimeToMinutes('06:30')).toBe(390);
    expect(parseTimeToMinutes('12:10')).toBe(730);
    expect(parseTimeToMinutes('23:59')).toBe(1439);
    expect(parseTimeToMinutes('')).toBe(0);
  });

  it('formats minutes into 24h and 12h time strings', () => {
    expect(formatMinutesToTime(390, true)).toBe('06:30');
    expect(formatMinutesToTime(390, false)).toBe('6:30 AM');
    expect(formatMinutesToTime(730, true)).toBe('12:10');
    expect(formatMinutesToTime(730, false)).toBe('12:10 PM');
    expect(formatMinutesToTime(0, false)).toBe('12:00 AM');
    expect(formatMinutesToTime(1380, false)).toBe('11:00 PM');
  });

  it('formats seconds into MM:SS and H:MM:SS countdowns', () => {
    expect(formatSecondsToCountdown(45)).toBe('00:45');
    expect(formatSecondsToCountdown(600)).toBe('10:00');
    expect(formatSecondsToCountdown(3665)).toBe('1:01:05');
    expect(formatSecondsToCountdown(0)).toBe('00:00');
    expect(formatSecondsToCountdown(-10)).toBe('00:00');
  });
});

describe('Midnight crossing logic', () => {
  it('detects midnight crossing', () => {
    expect(crossesMidnight(390, 480)).toBe(false); // 06:30 - 08:00
    expect(crossesMidnight(1380, 390)).toBe(true);  // 23:00 - 06:30
  });

  it('calculates duration correctly across midnight', () => {
    // 06:30 - 08:00 = 90 min
    expect(getBlockDurationMinutes(390, 480)).toBe(90);
    // 23:00 (1380) - 06:30 (390) = 60 min before midnight + 390 after = 450 min
    expect(getBlockDurationMinutes(1380, 390)).toBe(450);
  });
});

describe('Buffer filling and gap detection', () => {
  it('auto-fills 15:45-16:00 and 22:30-23:00 gaps in default weekday schedule', () => {
    const full = buildScheduleWithBuffers(DEFAULT_WEEKDAY_SCHEDULE);
    
    // Find buffer blocks
    const buffers = full.filter(b => b.isBuffer);
    expect(buffers.length).toBe(2);

    const b1 = buffers.find(b => b.start === '15:45' && b.end === '16:00');
    expect(b1).toBeDefined();
    expect(b1.title).toBe('Buffer');

    const b2 = buffers.find(b => b.start === '22:30' && b.end === '23:00');
    expect(b2).toBeDefined();
    expect(b2.title).toBe('Buffer');
  });

  it('handles midnight-wrapping gaps when schedule does not cover midnight', () => {
    const partialSchedule = [
      { id: '1', start: '08:00', end: '12:00', title: 'Work', category: 'shop' },
      { id: '2', start: '13:00', end: '20:00', title: 'Work 2', category: 'shop' }
    ];
    const full = buildScheduleWithBuffers(partialSchedule);
    
    // Should have:
    // 08:00-12:00 (Work)
    // 12:00-13:00 (Buffer)
    // 13:00-20:00 (Work 2)
    // 20:00-08:00 (Buffer wrapping midnight)
    const midnightBuffer = full.find(b => b.isBuffer && b.start === '20:00' && b.end === '08:00');
    expect(midnightBuffer).toBeDefined();
  });
});

describe('Validation of schedules', () => {
  it('validates a correct schedule', () => {
    const result = validateSchedule(DEFAULT_WEEKDAY_SCHEDULE);
    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('catches overlapping blocks', () => {
    const badSchedule = [
      { start: '10:00', end: '11:00', title: 'Task A' },
      { start: '10:30', end: '11:30', title: 'Task B' }
    ];
    const result = validateSchedule(badSchedule);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('Overlap detected'))).toBe(true);
  });
});

describe('Schedule state resolution at specific times', () => {
  const fullSchedule = buildScheduleWithBuffers(DEFAULT_WEEKDAY_SCHEDULE);

  it('resolves current block during daytime (e.g. 14:20 Shop work)', () => {
    const d = new Date();
    d.setHours(14, 20, 0, 0); // 14:00-15:00 Shop work block 2

    const state = resolveScheduleState(fullSchedule, d);
    expect(state.currentBlock.title).toBe('Shop work, block 2');
    expect(state.currentBlock.category).toBe('shop');
    expect(state.secondsLeft).toBe(40 * 60); // 40 minutes left until 15:00
    expect(state.formattedCountdown).toBe('40:00');
    expect(state.nextBlock.title).toBe('Job search');
    expect(state.nextBlock.startsInMinutes).toBe(40);
  });

  it('resolves auto-filled buffer at 15:50', () => {
    const d = new Date();
    d.setHours(15, 50, 0, 0); // In the 15:45-16:00 buffer gap

    const state = resolveScheduleState(fullSchedule, d);
    expect(state.currentBlock.isBuffer).toBe(true);
    expect(state.currentBlock.title).toBe('Buffer');
    expect(state.secondsLeft).toBe(10 * 60);
    expect(state.nextBlock.title).toBe('Adda / outside');
    expect(state.nextBlock.startsInMinutes).toBe(10);
  });

  it('resolves sleep block before midnight at 23:15', () => {
    const d = new Date();
    d.setHours(23, 15, 0, 0);

    const state = resolveScheduleState(fullSchedule, d);
    expect(state.currentBlock.title).toBe('Sleep');
    expect(state.currentBlock.start).toBe('23:00');
    expect(state.currentBlock.end).toBe('06:30');
    // Total duration: 450 min. Elapsed: 15 min. Remaining: 435 min.
    expect(state.secondsLeft).toBe(435 * 60);
    expect(state.nextBlock.title).toBe('Morning routine');
  });

  it('resolves sleep block after midnight at 02:00 AM', () => {
    const d = new Date();
    d.setHours(2, 0, 0, 0);

    const state = resolveScheduleState(fullSchedule, d);
    expect(state.currentBlock.title).toBe('Sleep');
    // 23:00 to 02:00 = 180 min elapsed. 450 - 180 = 270 min remaining (4h 30m).
    expect(state.secondsLeft).toBe(270 * 60);
    expect(state.formattedCountdown).toBe('4:30:00');
    expect(state.nextBlock.title).toBe('Morning routine');
  });

  it('detects last 5 minutes of a block (< 300 seconds)', () => {
    const d = new Date();
    d.setHours(14, 57, 0, 0); // 3 minutes left of 14:00-15:00 block

    const state = resolveScheduleState(fullSchedule, d);
    expect(state.secondsLeft).toBe(180);
    expect(state.isLastFiveMinutes).toBe(true);
  });
});

describe('Simulated time URL parsing', () => {
  it('parses ?time=14:20 correctly', () => {
    const d = getSimulatedTime('?time=14:20');
    expect(d).not.toBeNull();
    expect(d.getHours()).toBe(14);
    expect(d.getMinutes()).toBe(20);
    expect(d.getSeconds()).toBe(0);
  });

  it('returns null for invalid time query', () => {
    expect(getSimulatedTime('')).toBeNull();
    expect(getSimulatedTime('?time=99:99')).toBeNull();
  });
});
