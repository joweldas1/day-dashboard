/**
 * Day Dashboard Theme Combinations (Focus on Pure OLED Black + Solid Accent Strips, No Fuzzy Glow)
 */

export const THEMES = {
  'black-green': {
    id: 'black-green',
    name: 'Black & Green',
    tag: 'Matrix Green',
    accentColor: '#10b981', // Emerald green
    accentHover: '#34d399',
    accentGlow: 'transparent',
    bgPrimary: '#000000',
    bgSurface: '#0a0a0a',
    bgElevated: '#141414',
    borderSubtle: '#222222',
    borderStrong: '#333333',
    badgeBg: 'rgba(16, 185, 129, 0.08)',
    badgeText: '#34d399',
    badgeBorder: '#10b981',
    heroGradient: '#0a0a0a',
    iconColor: '#10b981'
  },
  'black-cyan': {
    id: 'black-cyan',
    name: 'Black & Cyan',
    tag: 'Cyber Cyan',
    accentColor: '#06b6d4', // Electric cyan
    accentHover: '#22d3ee',
    accentGlow: 'transparent',
    bgPrimary: '#000000',
    bgSurface: '#0a0a0a',
    bgElevated: '#141414',
    borderSubtle: '#222222',
    borderStrong: '#333333',
    badgeBg: 'rgba(6, 182, 212, 0.08)',
    badgeText: '#38bdf8',
    badgeBorder: '#06b6d4',
    heroGradient: '#0a0a0a',
    iconColor: '#06b6d4'
  },
  'black-purple': {
    id: 'black-purple',
    name: 'Black & Purple',
    tag: 'Electric Violet',
    accentColor: '#a855f7', // Neon purple
    accentHover: '#c084fc',
    accentGlow: 'transparent',
    bgPrimary: '#000000',
    bgSurface: '#0a0a0a',
    bgElevated: '#141414',
    borderSubtle: '#222222',
    borderStrong: '#333333',
    badgeBg: 'rgba(168, 85, 247, 0.08)',
    badgeText: '#c084fc',
    badgeBorder: '#a855f7',
    heroGradient: '#0a0a0a',
    iconColor: '#a855f7'
  },
  'black-amber': {
    id: 'black-amber',
    name: 'Black & Amber',
    tag: 'Warm Amber',
    accentColor: '#f59e0b', // Amber
    accentHover: '#fbbf24',
    accentGlow: 'transparent',
    bgPrimary: '#000000',
    bgSurface: '#0a0a0a',
    bgElevated: '#141414',
    borderSubtle: '#222222',
    borderStrong: '#333333',
    badgeBg: 'rgba(245, 158, 11, 0.08)',
    badgeText: '#fbbf24',
    badgeBorder: '#f59e0b',
    heroGradient: '#0a0a0a',
    iconColor: '#f59e0b'
  },
  'black-rose': {
    id: 'black-rose',
    name: 'Black & Rose',
    tag: 'Neon Crimson',
    accentColor: '#f43f5e', // Rose / Red
    accentHover: '#fb7185',
    accentGlow: 'transparent',
    bgPrimary: '#000000',
    bgSurface: '#0a0a0a',
    bgElevated: '#141414',
    borderSubtle: '#222222',
    borderStrong: '#333333',
    badgeBg: 'rgba(244, 63, 94, 0.08)',
    badgeText: '#fda4af',
    badgeBorder: '#f43f5e',
    heroGradient: '#0a0a0a',
    iconColor: '#f43f5e'
  },
  'black-mono': {
    id: 'black-mono',
    name: 'Black & White',
    tag: 'OLED Monochrome',
    accentColor: '#ffffff',
    accentHover: '#e4e4e7',
    accentGlow: 'transparent',
    bgPrimary: '#000000',
    bgSurface: '#0a0a0a',
    bgElevated: '#141414',
    borderSubtle: '#222222',
    borderStrong: '#333333',
    badgeBg: 'rgba(255, 255, 255, 0.08)',
    badgeText: '#ffffff',
    badgeBorder: '#ffffff',
    heroGradient: '#0a0a0a',
    iconColor: '#ffffff'
  },
  'dynamic': {
    id: 'dynamic',
    name: 'Dynamic Categories',
    tag: 'Multi-Color',
    accentColor: '#3b82f6',
    accentHover: '#60a5fa',
    accentGlow: 'transparent',
    bgPrimary: '#000000',
    bgSurface: '#0a0a0a',
    bgElevated: '#141414',
    borderSubtle: '#222222',
    borderStrong: '#333333',
    badgeBg: 'rgba(59, 130, 246, 0.08)',
    badgeText: '#93c5fd',
    badgeBorder: '#3b82f6',
    heroGradient: '#0a0a0a',
    iconColor: '#3b82f6'
  },
  'light': {
    id: 'light',
    name: 'Clean Light',
    tag: 'Light Mode',
    accentColor: '#059669',
    accentHover: '#10b981',
    accentGlow: 'transparent',
    bgPrimary: '#f8fafc',
    bgSurface: '#ffffff',
    bgElevated: '#f1f5f9',
    borderSubtle: '#e2e8f0',
    borderStrong: '#cbd5e1',
    badgeBg: 'rgba(5, 150, 105, 0.08)',
    badgeText: '#047857',
    badgeBorder: '#059669',
    heroGradient: '#ffffff',
    iconColor: '#059669'
  }
};

export const THEME_LIST = Object.values(THEMES);
