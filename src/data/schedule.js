export const DEFAULT_WEEKDAY_SCHEDULE = [
  {
    id: 'w-1',
    start: '06:30',
    end: '08:00',
    title: 'Morning routine',
    category: 'morning',
    note: 'fresh up, bath, prayer, breakfast'
  },
  {
    id: 'w-2',
    start: '08:00',
    end: '09:30',
    title: 'Job search',
    category: 'job_search',
    note: 'filter jobs, apply to 2-3, update tracker'
  },
  {
    id: 'w-3',
    start: '09:30',
    end: '10:15',
    title: 'Excel learning',
    category: 'excel',
    note: 'formulas, pivot tables, practice exercises'
  },
  {
    id: 'w-4',
    start: '10:15',
    end: '10:30',
    title: 'Break',
    category: 'break',
    note: 'hydration, stretch, rest eyes'
  },
  {
    id: 'w-5',
    start: '10:30',
    end: '11:10',
    title: 'English part 1',
    category: 'english',
    note: 'Vocabulary, Grammar, Listening'
  },
  {
    id: 'w-6',
    start: '11:10',
    end: '12:10',
    title: 'Shop work, block 1',
    category: 'shop',
    note: 'inventory, customer service, billing'
  },
  {
    id: 'w-7',
    start: '12:10',
    end: '14:00',
    title: 'Lunch, prayer, rest',
    category: 'rest',
    note: 'prayer, balanced lunch, afternoon rest'
  },
  {
    id: 'w-8',
    start: '14:00',
    end: '15:00',
    title: 'Shop work, block 2',
    category: 'shop',
    note: 'orders, stock updates, communications'
  },
  {
    id: 'w-9',
    start: '15:00',
    end: '15:45',
    title: 'Job search',
    category: 'job_search',
    note: 'follow-ups, LinkedIn connection & reach out'
  },
  {
    id: 'w-10',
    start: '16:00',
    end: '18:30',
    title: 'Adda / outside',
    category: 'adda',
    note: 'meet friends, evening walk, outdoors'
  },
  {
    id: 'w-11',
    start: '18:30',
    end: '19:30',
    title: 'Family, prayer, rest',
    category: 'rest',
    note: 'evening prayer, family time, tea'
  },
  {
    id: 'w-12',
    start: '19:30',
    end: '20:10',
    title: 'English part 2',
    category: 'english',
    note: 'Shadowing, Speaking, Writing'
  },
  {
    id: 'w-13',
    start: '20:10',
    end: '21:00',
    title: 'Dinner',
    category: 'rest',
    note: 'dinner with family, prayer'
  },
  {
    id: 'w-14',
    start: '21:00',
    end: '21:45',
    title: 'Excel practice',
    category: 'excel',
    note: 'later Yellow Belt study, real datasets'
  },
  {
    id: 'w-15',
    start: '21:45',
    end: '22:30',
    title: 'Relax',
    category: 'rest',
    note: 'wind down, reading, prepare for sleep'
  },
  {
    id: 'w-16',
    start: '23:00',
    end: '06:30',
    title: 'Sleep',
    category: 'sleep',
    note: 'restful sleep, recovery'
  }
];

// Initially a copy of weekday profile with weekend-specific IDs
export const DEFAULT_WEEKEND_SCHEDULE = DEFAULT_WEEKDAY_SCHEDULE.map((item, idx) => ({
  ...item,
  id: `wknd-${idx + 1}`
}));

export const PROFILES = {
  weekday: {
    id: 'weekday',
    name: 'Weekday',
    schedule: DEFAULT_WEEKDAY_SCHEDULE
  },
  weekend: {
    id: 'weekend',
    name: 'Weekend (Fri & Sat)',
    schedule: DEFAULT_WEEKEND_SCHEDULE
  }
};
