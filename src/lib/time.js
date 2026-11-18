/**
 * Time manipulation and schedule resolution pure functions.
 */

export const MINUTES_IN_DAY = 1440;

/**
 * Converts "HH:MM" string to minutes from midnight (0 - 1439).
 */
export function parseTimeToMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') return 0;
  const parts = timeStr.trim().split(':');
  const hours = parseInt(parts[0], 10) || 0;
  const minutes = parseInt(parts[1], 10) || 0;
  return Math.min(Math.max(hours * 60 + minutes, 0), MINUTES_IN_DAY - 1);
}

/**
 * Formats minutes from midnight to "HH:MM" (24h) or "h:mm AM/PM" (12h).
 */
export function formatMinutesToTime(minutes, is24Hour = true) {
  const norm = ((Math.round(minutes) % MINUTES_IN_DAY) + MINUTES_IN_DAY) % MINUTES_IN_DAY;
  const h24 = Math.floor(norm / 60);
  const m = Math.floor(norm % 60);
  const mStr = String(m).padStart(2, '0');

  if (is24Hour) {
    return `${String(h24).padStart(2, '0')}:${mStr}`;
  }

  const period = h24 >= 12 ? 'PM' : 'AM';
  let h12 = h24 % 12;
  if (h12 === 0) h12 = 12;
  return `${h12}:${mStr} ${period}`;
}

/**
 * Formats seconds into MM:SS or H:MM:SS countdown format.
 */
export function formatSecondsToCountdown(totalSeconds) {
  if (totalSeconds == null || isNaN(totalSeconds) || totalSeconds < 0) {
    return '00:00';
  }
  const sec = Math.floor(totalSeconds);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;

  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * Checks if a block crosses midnight (e.g. 23:00 to 06:30).
 */
export function crossesMidnight(startMinutes, endMinutes) {
  return endMinutes < startMinutes;
}

/**
 * Computes block duration in minutes, handling midnight crossing.
 */
export function getBlockDurationMinutes(startMinutes, endMinutes) {
  if (endMinutes < startMinutes) {
    return (MINUTES_IN_DAY - startMinutes) + endMinutes;
  }
  return endMinutes - startMinutes;
}

/**
 * Validates a list of schedule items for overlaps and validity.
 * Returns { valid: boolean, errors: string[] }
 */
export function validateSchedule(schedule) {
  const errors = [];
  if (!Array.isArray(schedule) || schedule.length === 0) {
    return { valid: false, errors: ['Schedule must have at least one block.'] };
  }

  const minuteMap = new Array(MINUTES_IN_DAY).fill(null);

  schedule.forEach((item, index) => {
    if (!item.title?.trim()) {
      errors.push(`Block #${index + 1}: Title is required.`);
    }
    const start = parseTimeToMinutes(item.start);
    const end = parseTimeToMinutes(item.end);

    if (start === end) {
      errors.push(`Block #${index + 1} (${item.title || 'Untitled'}): Start and end times cannot be identical.`);
      return;
    }

    const checkAndFill = (m) => {
      if (minuteMap[m] !== null) {
        errors.push(
          `Overlap detected: "${item.title || 'Block ' + (index + 1)}" overlaps with "${minuteMap[m]}" at ${formatMinutesToTime(m)}.`
        );
      } else {
        minuteMap[m] = item.title || `Block ${index + 1}`;
      }
    };

    if (start < end) {
      for (let m = start; m < end; m++) checkAndFill(m);
    } else {
      for (let m = start; m < MINUTES_IN_DAY; m++) checkAndFill(m);
      for (let m = 0; m < end; m++) checkAndFill(m);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Takes user schedule and automatically fills all uncovered gaps as "Buffer" blocks.
 * Returns sorted list of complete 24-hour blocks with buffers.
 */
export function buildScheduleWithBuffers(rawSchedule) {
  if (!Array.isArray(rawSchedule) || rawSchedule.length === 0) return [];

  // Map each minute to block or null
  const minuteSlots = new Array(MINUTES_IN_DAY).fill(null);

  // Normalize user items
  const items = rawSchedule.map((item, idx) => ({
    ...item,
    id: item.id || `custom-${idx}`,
    startMinutes: parseTimeToMinutes(item.start),
    endMinutes: parseTimeToMinutes(item.end),
    isBuffer: false
  }));

  // Fill minute slots with user items
  items.forEach(item => {
    const s = item.startMinutes;
    const e = item.endMinutes;
    if (s < e) {
      for (let m = s; m < e; m++) minuteSlots[m] = item;
    } else {
      for (let m = s; m < MINUTES_IN_DAY; m++) minuteSlots[m] = item;
      for (let m = 0; m < e; m++) minuteSlots[m] = item;
    }
  });

  // Find all contiguous gap intervals
  const rawGaps = [];
  let inGap = false;
  let gapStart = 0;

  for (let m = 0; m < MINUTES_IN_DAY; m++) {
    if (minuteSlots[m] === null) {
      if (!inGap) {
        inGap = true;
        gapStart = m;
      }
    } else {
      if (inGap) {
        rawGaps.push({ start: gapStart, end: m });
        inGap = false;
      }
    }
  }

  if (inGap) {
    rawGaps.push({ start: gapStart, end: MINUTES_IN_DAY });
  }

  // Merge gaps that wrap around midnight (if minute 1439 and minute 0 are both gap)
  const finalBufferBlocks = [];
  if (rawGaps.length >= 2 && rawGaps[0].start === 0 && rawGaps[rawGaps.length - 1].end === MINUTES_IN_DAY) {
    const lastGap = rawGaps.pop();
    const firstGap = rawGaps.shift();
    finalBufferBlocks.push({
      id: `buffer-midnight`,
      start: formatMinutesToTime(lastGap.start),
      end: formatMinutesToTime(firstGap.end),
      startMinutes: lastGap.start,
      endMinutes: firstGap.end,
      title: 'Buffer',
      category: 'break',
      note: 'Free time / transition buffer',
      isBuffer: true
    });
  }

  rawGaps.forEach((g, idx) => {
    finalBufferBlocks.push({
      id: `buffer-${idx}-${g.start}`,
      start: formatMinutesToTime(g.start),
      end: formatMinutesToTime(g.end),
      startMinutes: g.start,
      endMinutes: g.end,
      title: 'Buffer',
      category: 'break',
      note: 'Free time / transition buffer',
      isBuffer: true
    });
  });

  // Combine user items and buffers
  const allBlocks = [...items, ...finalBufferBlocks];

  // Sort blocks chronologically by start time
  // Blocks that start in morning (e.g. 05:00 - 07:00) usually feel natural,
  // but standard sorting by startMinutes works best
  allBlocks.sort((a, b) => a.startMinutes - b.startMinutes);

  return allBlocks;
}

/**
 * Checks if a given minute falls inside a block.
 */
export function isMinuteInBlock(minute, startMinutes, endMinutes) {
  if (startMinutes < endMinutes) {
    return minute >= startMinutes && minute < endMinutes;
  }
  // Midnight crossing
  return minute >= startMinutes || minute < endMinutes;
}

/**
 * Main resolution function for the current instant.
 * Given a full schedule (with buffers) and a Date object, returns:
 * - currentBlock
 * - nextBlock
 * - secondsLeft
 * - formattedCountdown
 * - progress (0 to 100)
 * - isLastFiveMinutes (boolean)
 * - timeline (annotated with 'past' | 'current' | 'upcoming')
 */
export function resolveScheduleState(scheduleWithBuffers, now = new Date()) {
  if (!scheduleWithBuffers || scheduleWithBuffers.length === 0) {
    return {
      currentBlock: null,
      nextBlock: null,
      secondsLeft: 0,
      formattedCountdown: '00:00',
      progress: 0,
      isLastFiveMinutes: false,
      timeline: []
    };
  }

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const currentTotalSeconds = hours * 3600 + minutes * 60 + seconds;
  const currentMinute = hours * 60 + minutes;

  // Find current block
  let currentIndex = scheduleWithBuffers.findIndex(b =>
    isMinuteInBlock(currentMinute, b.startMinutes, b.endMinutes)
  );

  // Fallback if boundary edge or tiny gap
  if (currentIndex === -1) {
    currentIndex = 0;
  }

  const currentBlock = scheduleWithBuffers[currentIndex];

  // Calculate elapsed seconds and remaining seconds
  const startSec = currentBlock.startMinutes * 60;
  const isCrossing = crossesMidnight(currentBlock.startMinutes, currentBlock.endMinutes);
  let durationSec = 0;
  let elapsedSec = 0;

  if (!isCrossing) {
    const endSec = currentBlock.endMinutes * 60;
    durationSec = endSec - startSec;
    elapsedSec = Math.max(0, currentTotalSeconds - startSec);
  } else {
    // Crosses midnight
    const endSec = currentBlock.endMinutes * 60;
    durationSec = (86400 - startSec) + endSec;
    if (currentTotalSeconds >= startSec) {
      elapsedSec = currentTotalSeconds - startSec;
    } else {
      elapsedSec = (86400 - startSec) + currentTotalSeconds;
    }
  }

  const secondsLeft = Math.max(0, durationSec - elapsedSec);
  const progress = durationSec > 0 ? Math.min(100, Math.max(0, (elapsedSec / durationSec) * 100)) : 0;
  const isLastFiveMinutes = secondsLeft > 0 && secondsLeft <= 300;
  const formattedCountdown = formatSecondsToCountdown(secondsLeft);

  // Next block is the next in circular order
  const nextIndex = (currentIndex + 1) % scheduleWithBuffers.length;
  const rawNext = scheduleWithBuffers[nextIndex];
  const minutesUntilNext = Math.ceil(secondsLeft / 60);

  const nextBlock = rawNext ? {
    ...rawNext,
    startsInMinutes: minutesUntilNext,
    startsInFormatted: minutesUntilNext >= 60 
      ? `${Math.floor(minutesUntilNext / 60)}h ${minutesUntilNext % 60}m` 
      : `${minutesUntilNext} min`
  } : null;

  // Annotate timeline items with 'past', 'current', 'upcoming'
  const timeline = scheduleWithBuffers.map((b, idx) => {
    let status = 'upcoming';
    if (idx === currentIndex) {
      status = 'current';
    } else if (idx < currentIndex) {
      status = 'past';
    } else {
      status = 'upcoming';
    }
    return {
      ...b,
      status
    };
  });

  return {
    currentBlock,
    nextBlock,
    secondsLeft,
    formattedCountdown,
    progress,
    isLastFiveMinutes,
    timeline
  };
}

/**
 * Parses simulated time query parameter e.g. "?time=14:20" or "?time=14:20:30".
 * Returns simulated Date or null.
 */
export function getSimulatedTime(searchString = window.location.search) {
  try {
    const params = new URLSearchParams(searchString);
    const timeParam = params.get('time');
    if (!timeParam) return null;

    const parts = timeParam.trim().split(':');
    const h = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) || 0;
    const s = parseInt(parts[2], 10) || 0;

    if (isNaN(h) || h < 0 || h > 23 || isNaN(m) || m < 0 || m > 59) {
      return null;
    }

    const simDate = new Date();
    simDate.setHours(h, m, s, 0);
    return simDate;
  } catch (e) {
    return null;
  }
}
