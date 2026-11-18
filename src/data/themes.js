/**
 * Day Dashboard Theme Combinations (Focus on Pure OLED Black + Colors)
 */

export const THEMES = {
  'black-green': {
    id: 'black-green',
    name: 'Black & Green',
    tag: 'Matrix Green',
    accentColor: '#10b981', // Emerald green
    accentHover: '#34d399',
    accentGlow: 'rgba(16, 185, 129, 0.35)',
    bgPrimary: '#000000',
    bgSurface: '#080808',
    bgElevated: '#111111',
    borderSubtle: 'rgba(16, 185, 129, 0.16)',
    borderStrong: 'rgba(16, 185, 129, 0.4)',
    badgeBg: 'rgba(16, 185, 129, 0.12)',
    badgeText: '#34d399',
    badgeBorder: 'rgba(16, 185, 129, 0.35)',
    heroGradient: 'radial-gradient(circle at 15% 15%, rgba(16, 185, 129, 0.22) 0%, rgba(0, 0, 0, 0.98) 75%)',
    iconColor: '#10b981'
  },
  'black-cyan': {
    id: 'black-cyan',
    name: 'Black & Cyan',
    tag: 'Cyber Cyan',
    accentColor: '#06b6d4', // Electric cyan
    accentHover: '#22d3ee',
    accentGlow: 'rgba(6, 182, 212, 0.35)',
    bgPrimary: '#000000',
    bgSurface: '#080808',
    bgElevated: '#111111',
    borderSubtle: 'rgba(6, 182, 212, 0.16)',
    borderStrong: 'rgba(6, 182, 212, 0.4)',
    badgeBg: 'rgba(6, 182, 212, 0.12)',
    badgeText: '#38bdf8',
    badgeBorder: 'rgba(6, 182, 212, 0.35)',
    heroGradient: 'radial-gradient(circle at 15% 15%, rgba(6, 182, 212, 0.22) 0%, rgba(0, 0, 0, 0.98) 75%)',
    iconColor: '#06b6d4'
  },
  'black-purple': {
    id: 'black-purple',
    name: 'Black & Purple',
    tag: 'Electric Violet',
    accentColor: '#a855f7', // Neon purple
    accentHover: '#c084fc',
    accentGlow: 'rgba(168, 85, 247, 0.35)',
    bgPrimary: '#000000',
    bgSurface: '#080808',
    bgElevated: '#111111',
    borderSubtle: 'rgba(168, 85, 247, 0.16)',
    borderStrong: 'rgba(168, 85, 247, 0.4)',
    badgeBg: 'rgba(168, 85, 247, 0.12)',
    badgeText: '#c084fc',
    badgeBorder: 'rgba(168, 85, 247, 0.35)',
    heroGradient: 'radial-gradient(circle at 15% 15%, rgba(168, 85, 247, 0.22) 0%, rgba(0, 0, 0, 0.98) 75%)',
    iconColor: '#a855f7'
  },
  'black-amber': {
    id: 'black-amber',
    name: 'Black & Amber',
    tag: 'Warm Amber',
    accentColor: '#f59e0b', // Amber
    accentHover: '#fbbf24',
    accentGlow: 'rgba(245, 158, 11, 0.35)',
    bgPrimary: '#000000',
    bgSurface: '#080808',
    bgElevated: '#111111',
    borderSubtle: 'rgba(245, 158, 11, 0.16)',
    borderStrong: 'rgba(245, 158, 11, 0.4)',
    badgeBg: 'rgba(245, 158, 11, 0.12)',
    badgeText: '#fbbf24',
    badgeBorder: 'rgba(245, 158, 11, 0.35)',
    heroGradient: 'radial-gradient(circle at 15% 15%, rgba(245, 158, 11, 0.22) 0%, rgba(0, 0, 0, 0.98) 75%)',
    iconColor: '#f59e0b'
  },
  'black-rose': {
    id: 'black-rose',
    name: 'Black & Rose',
    tag: 'Neon Crimson',
    accentColor: '#f43f5e', // Rose / Red
    accentHover: '#fb7185',
    accentGlow: 'rgba(244, 63, 94, 0.35)',
    bgPrimary: '#000000',
    bgSurface: '#080808',
    bgElevated: '#111111',
    borderSubtle: 'rgba(244, 63, 94, 0.16)',
    borderStrong: 'rgba(244, 63, 94, 0.4)',
    badgeBg: 'rgba(244, 63, 94, 0.12)',
    badgeText: '#fda4af',
    badgeBorder: 'rgba(244, 63, 94, 0.35)',
    heroGradient: 'radial-gradient(circle at 15% 15%, rgba(244, 63, 94, 0.22) 0%, rgba(0, 0, 0, 0.98) 75%)',
    iconColor: '#f43f5e'
  },
  'black-mono': {
    id: 'black-mono',
    name: 'Black & White',
    tag: 'OLED Monochrome',
    accentColor: '#ffffff',
    accentHover: '#e4e4e7',
    accentGlow: 'rgba(255, 255, 255, 0.25)',
    bgPrimary: '#000000',
    bgSurface: '#080808',
    bgElevated: '#111111',
    borderSubtle: 'rgba(255, 255, 255, 0.12)',
    borderStrong: 'rgba(255, 255, 255, 0.35)',
    badgeBg: 'rgba(255, 255, 255, 0.1)',
    badgeText: '#ffffff',
    badgeBorder: 'rgba(255, 255, 255, 0.3)',
    heroGradient: 'radial-gradient(circle at 15% 15%, rgba(255, 255, 255, 0.12) 0%, rgba(0, 0, 0, 0.98) 75%)',
    iconColor: '#ffffff'
  },
  'dynamic': {
    id: 'dynamic',
    name: 'Dynamic Categories',
    tag: 'Multi-Color',
    accentColor: '#3b82f6',
    accentHover: '#60a5fa',
    accentGlow: 'rgba(59, 130, 246, 0.35)',
    bgPrimary: '#05070c',
    bgSurface: '#0b101b',
    bgElevated: '#131b2e',
    borderSubtle: 'rgba(255, 255, 255, 0.08)',
    borderStrong: 'rgba(255, 255, 255, 0.2)',
    badgeBg: 'rgba(59, 130, 246, 0.12)',
    badgeText: '#93c5fd',
    badgeBorder: 'rgba(59, 130, 246, 0.35)',
    heroGradient: 'radial-gradient(circle at 15% 15%, rgba(59, 130, 246, 0.22) 0%, rgba(5, 7, 12, 0.98) 75%)',
    iconColor: '#3b82f6'
  },
  'light': {
    id: 'light',
    name: 'Clean Light',
    tag: 'Light Mode',
    accentColor: '#059669',
    accentHover: '#10b981',
    accentGlow: 'rgba(5, 150, 105, 0.2)',
    bgPrimary: '#f8fafc',
    bgSurface: '#ffffff',
    bgElevated: '#f1f5f9',
    borderSubtle: 'rgba(0, 0, 0, 0.08)',
    borderStrong: 'rgba(0, 0, 0, 0.18)',
    badgeBg: 'rgba(5, 150, 105, 0.1)',
    badgeText: '#047857',
    badgeBorder: 'rgba(5, 150, 105, 0.3)',
    heroGradient: 'radial-gradient(circle at 15% 15%, rgba(16, 185, 129, 0.16) 0%, rgba(255, 255, 255, 0.98) 75%)',
    iconColor: '#059669'
  }
};

export const THEME_LIST = Object.values(THEMES);
