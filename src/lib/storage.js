import { DEFAULT_WEEKDAY_SCHEDULE, DEFAULT_WEEKEND_SCHEDULE } from '../data/schedule.js';

const STORAGE_KEYS = {
  WEEKDAY_SCHEDULE: 'day_dashboard_weekday_schedule',
  WEEKEND_SCHEDULE: 'day_dashboard_weekend_schedule',
  SETTINGS: 'day_dashboard_settings'
};

export const DEFAULT_SETTINGS = {
  theme: 'black-green', // 'black-green' (default) | 'black-cyan' | 'black-purple' | 'black-amber' | 'black-rose' | 'black-mono' | 'dynamic' | 'light'
  is24Hour: true,
  soundEnabled: false,
  notificationsEnabled: false,
  wakeLockEnabled: true,
  profileOverride: 'auto' // 'auto' | 'weekday' | 'weekend'
};

export function loadSchedules() {
  let weekday = DEFAULT_WEEKDAY_SCHEDULE;
  let weekend = DEFAULT_WEEKEND_SCHEDULE;

  try {
    const savedWeekday = localStorage.getItem(STORAGE_KEYS.WEEKDAY_SCHEDULE);
    if (savedWeekday) {
      const parsed = JSON.parse(savedWeekday);
      if (Array.isArray(parsed) && parsed.length > 0) weekday = parsed;
    }
  } catch (e) {
    console.error('Failed to load weekday schedule', e);
  }

  try {
    const savedWeekend = localStorage.getItem(STORAGE_KEYS.WEEKEND_SCHEDULE);
    if (savedWeekend) {
      const parsed = JSON.parse(savedWeekend);
      if (Array.isArray(parsed) && parsed.length > 0) weekend = parsed;
    }
  } catch (e) {
    console.error('Failed to load weekend schedule', e);
  }

  return { weekday, weekend };
}

export function saveSchedules(weekday, weekend) {
  try {
    if (weekday) localStorage.setItem(STORAGE_KEYS.WEEKDAY_SCHEDULE, JSON.stringify(weekday));
    if (weekend) localStorage.setItem(STORAGE_KEYS.WEEKEND_SCHEDULE, JSON.stringify(weekend));
  } catch (e) {
    console.error('Failed to save schedules', e);
  }
}

export function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.theme === 'dark') parsed.theme = 'black-green';
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load settings', e);
  }
  return { ...DEFAULT_SETTINGS };
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}

export function exportScheduleAsJson(weekday, weekend, settings) {
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    schedules: {
      weekday,
      weekend
    },
    settings
  };
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `day_dashboard_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function resetAllToDefaults() {
  try {
    localStorage.removeItem(STORAGE_KEYS.WEEKDAY_SCHEDULE);
    localStorage.removeItem(STORAGE_KEYS.WEEKEND_SCHEDULE);
  } catch (e) {}
  return {
    weekday: DEFAULT_WEEKDAY_SCHEDULE,
    weekend: DEFAULT_WEEKEND_SCHEDULE
  };
}
