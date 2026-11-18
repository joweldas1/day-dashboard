export const CATEGORIES = {
  morning: {
    id: 'morning',
    name: 'Morning routine',
    color: '#0d9488', // teal-600
    colorAccent: '#14b8a6', // teal-500
    gradientDark: 'radial-gradient(circle at 20% 20%, rgba(20, 184, 166, 0.25) 0%, rgba(13, 148, 136, 0.08) 50%, rgba(15, 23, 42, 0.95) 100%)',
    gradientLight: 'radial-gradient(circle at 20% 20%, rgba(20, 184, 166, 0.18) 0%, rgba(204, 251, 241, 0.6) 60%, rgba(255, 255, 255, 0.95) 100%)',
    border: '#14b8a6',
    badgeBg: 'rgba(20, 184, 166, 0.15)',
    badgeText: '#2dd4bf',
    badgeTextLight: '#0f766e',
    iconName: 'Sun'
  },
  job_search: {
    id: 'job_search',
    name: 'Job search',
    color: '#ea580c', // orange-600
    colorAccent: '#f97316', // orange-500
    gradientDark: 'radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.25) 0%, rgba(234, 88, 12, 0.08) 50%, rgba(15, 23, 42, 0.95) 100%)',
    gradientLight: 'radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.18) 0%, rgba(255, 237, 213, 0.6) 60%, rgba(255, 255, 255, 0.95) 100%)',
    border: '#f97316',
    badgeBg: 'rgba(249, 115, 22, 0.15)',
    badgeText: '#fb923c',
    badgeTextLight: '#c2410c',
    iconName: 'Briefcase'
  },
  excel: {
    id: 'excel',
    name: 'Excel',
    color: '#16a34a', // green-600
    colorAccent: '#22c55e', // green-500
    gradientDark: 'radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.25) 0%, rgba(22, 163, 74, 0.08) 50%, rgba(15, 23, 42, 0.95) 100%)',
    gradientLight: 'radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.18) 0%, rgba(220, 252, 231, 0.6) 60%, rgba(255, 255, 255, 0.95) 100%)',
    border: '#22c55e',
    badgeBg: 'rgba(34, 197, 94, 0.15)',
    badgeText: '#4ade80',
    badgeTextLight: '#15803d',
    iconName: 'FileSpreadsheet'
  },
  english: {
    id: 'english',
    name: 'English',
    color: '#2563eb', // blue-600
    colorAccent: '#3b82f6', // blue-500
    gradientDark: 'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.08) 50%, rgba(15, 23, 42, 0.95) 100%)',
    gradientLight: 'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.18) 0%, rgba(219, 234, 254, 0.6) 60%, rgba(255, 255, 255, 0.95) 100%)',
    border: '#3b82f6',
    badgeBg: 'rgba(59, 130, 246, 0.15)',
    badgeText: '#60a5fa',
    badgeTextLight: '#1d4ed8',
    iconName: 'Languages'
  },
  shop: {
    id: 'shop',
    name: 'Shop work',
    color: '#9333ea', // purple-600
    colorAccent: '#a855f7', // purple-500
    gradientDark: 'radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.25) 0%, rgba(147, 51, 234, 0.08) 50%, rgba(15, 23, 42, 0.95) 100%)',
    gradientLight: 'radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.18) 0%, rgba(243, 232, 255, 0.6) 60%, rgba(255, 255, 255, 0.95) 100%)',
    border: '#a855f7',
    badgeBg: 'rgba(168, 85, 247, 0.15)',
    badgeText: '#c084fc',
    badgeTextLight: '#7e22ce',
    iconName: 'Store'
  },
  rest: {
    id: 'rest',
    name: 'Rest/Meal/Prayer',
    color: '#d97706', // amber-600
    colorAccent: '#f59e0b', // amber-500
    gradientDark: 'radial-gradient(circle at 20% 20%, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.08) 50%, rgba(15, 23, 42, 0.95) 100%)',
    gradientLight: 'radial-gradient(circle at 20% 20%, rgba(245, 158, 11, 0.18) 0%, rgba(254, 243, 199, 0.6) 60%, rgba(255, 255, 255, 0.95) 100%)',
    border: '#f59e0b',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    badgeText: '#fbbf24',
    badgeTextLight: '#b45309',
    iconName: 'Coffee'
  },
  adda: {
    id: 'adda',
    name: 'Adda/Outside',
    color: '#db2777', // pink-600
    colorAccent: '#ec4899', // pink-500
    gradientDark: 'radial-gradient(circle at 20% 20%, rgba(236, 72, 153, 0.25) 0%, rgba(219, 39, 119, 0.08) 50%, rgba(15, 23, 42, 0.95) 100%)',
    gradientLight: 'radial-gradient(circle at 20% 20%, rgba(236, 72, 153, 0.18) 0%, rgba(252, 231, 243, 0.6) 60%, rgba(255, 255, 255, 0.95) 100%)',
    border: '#ec4899',
    badgeBg: 'rgba(236, 72, 153, 0.15)',
    badgeText: '#f472b6',
    badgeTextLight: '#be185d',
    iconName: 'Users'
  },
  break: {
    id: 'break',
    name: 'Break/Buffer',
    color: '#64748b', // slate-500
    colorAccent: '#94a3b8', // slate-400
    gradientDark: 'radial-gradient(circle at 20% 20%, rgba(148, 163, 184, 0.20) 0%, rgba(100, 116, 139, 0.06) 50%, rgba(15, 23, 42, 0.95) 100%)',
    gradientLight: 'radial-gradient(circle at 20% 20%, rgba(148, 163, 184, 0.15) 0%, rgba(241, 245, 249, 0.7) 60%, rgba(255, 255, 255, 0.95) 100%)',
    border: '#94a3b8',
    badgeBg: 'rgba(148, 163, 184, 0.15)',
    badgeText: '#cbd5e1',
    badgeTextLight: '#475569',
    iconName: 'Hourglass'
  },
  sleep: {
    id: 'sleep',
    name: 'Sleep',
    color: '#4f46e5', // indigo-600
    colorAccent: '#6366f1', // indigo-500
    gradientDark: 'radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.25) 0%, rgba(79, 70, 229, 0.08) 50%, rgba(15, 23, 42, 0.95) 100%)',
    gradientLight: 'radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.18) 0%, rgba(224, 231, 255, 0.6) 60%, rgba(255, 255, 255, 0.95) 100%)',
    border: '#6366f1',
    badgeBg: 'rgba(99, 102, 241, 0.15)',
    badgeText: '#818cf8',
    badgeTextLight: '#4338ca',
    iconName: 'Moon'
  }
};

export function getCategory(catKey) {
  if (!catKey) return CATEGORIES.break;
  const key = String(catKey).toLowerCase().trim();
  if (CATEGORIES[key]) return CATEGORIES[key];

  // Fuzzy matching against names/keys
  if (key.includes('morn')) return CATEGORIES.morning;
  if (key.includes('job')) return CATEGORIES.job_search;
  if (key.includes('excel')) return CATEGORIES.excel;
  if (key.includes('eng')) return CATEGORIES.english;
  if (key.includes('shop')) return CATEGORIES.shop;
  if (key.includes('rest') || key.includes('meal') || key.includes('pray') || key.includes('lunch') || key.includes('dinner')) return CATEGORIES.rest;
  if (key.includes('adda') || key.includes('outside')) return CATEGORIES.adda;
  if (key.includes('sleep')) return CATEGORIES.sleep;
  if (key.includes('break') || key.includes('buffer')) return CATEGORIES.break;

  return CATEGORIES.break;
}
