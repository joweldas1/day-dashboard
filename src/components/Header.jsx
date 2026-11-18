import React, { useState, useRef, useEffect } from 'react';
import {
  Palette,
  Maximize,
  Minimize,
  PictureInPicture,
  Calendar,
  Settings,
  Edit3,
  HelpCircle,
  Check
} from 'lucide-react';
import { THEME_LIST, THEMES } from '../data/themes.js';

export default function Header({
  currentTime,
  is24Hour,
  activeProfile,
  profileOverride,
  theme,
  isFullscreen,
  isMiniMode,
  onChangeTheme,
  onToggleFullscreen,
  onToggleMiniMode,
  onOpenEdit,
  onOpenSettings,
  onOpenHelp
}) {
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef(null);

  // Close theme menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target)) {
        setThemeMenuOpen(false);
      }
    };
    if (themeMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [themeMenuOpen]);

  // Format live clock HH:MM:SS or h:mm:ss AM/PM
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  let timeString = '';
  if (is24Hour) {
    timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  } else {
    const period = hours >= 12 ? 'PM' : 'AM';
    let h12 = hours % 12;
    if (h12 === 0) h12 = 12;
    timeString = `${h12}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${period}`;
  }

  // Format English Date
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Dhaka' };
  const englishDate = currentTime.toLocaleDateString('en-US', dateOptions);

  // Format Bengali Date representation (e.g. বুধবার, ১৮ নভেম্বর ২০২৬)
  let bengaliDate = '';
  try {
    bengaliDate = currentTime.toLocaleDateString('bn-BD', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Dhaka'
    });
  } catch (e) {
    bengaliDate = englishDate;
  }

  const currentThemeObj = THEMES[theme] || THEMES['black-green'];

  return (
    <header className="dashboard-header">
      <div className="clock-date-group">
        <h1 className="clock-display clock-large tabular-nums" aria-label="Current Time">
          {timeString}
        </h1>
        <div className="date-timezone-group">
          <div className="date-primary">{englishDate}</div>
          <div className="date-bengali font-bn">{bengaliDate} • ঢাকা (Asia/Dhaka)</div>
        </div>
      </div>

      <div className="header-actions">
        {/* Profile badge */}
        <div
          className="header-btn"
          title={`Profile: ${activeProfile.name} (${profileOverride === 'auto' ? 'Auto-detected' : 'Manual override'})`}
        >
          <Calendar size={15} />
          <span>{activeProfile.name}</span>
        </div>

        {/* Theme Selector Pill & Popover Menu */}
        <div style={{ position: 'relative' }} ref={themeMenuRef}>
          <button
            className="theme-select-btn"
            onClick={() => setThemeMenuOpen((prev) => !prev)}
            title="Switch Theme Combo (T)"
            aria-label="Theme Selector"
          >
            <span
              className="theme-color-dot"
              style={{ backgroundColor: currentThemeObj.accentColor, color: currentThemeObj.accentColor }}
            />
            <span>{currentThemeObj.name}</span>
            <Palette size={14} style={{ opacity: 0.7 }} />
          </button>

          {themeMenuOpen && (
            <div className="theme-menu-popup" role="menu">
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '0.2rem 0.5rem', letterSpacing: '0.05em' }}>
                Black Combo Themes
              </div>
              {THEME_LIST.map((th) => (
                <button
                  key={th.id}
                  className={`theme-menu-item ${theme === th.id ? 'active' : ''}`}
                  onClick={() => {
                    onChangeTheme(th.id);
                    setThemeMenuOpen(false);
                  }}
                  role="menuitem"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: th.accentColor,
                        boxShadow: `0 0 8px ${th.accentColor}`
                      }}
                    />
                    <span>{th.name}</span>
                  </div>
                  {theme === th.id && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mini Mode */}
        <button
          className={`header-btn ${isMiniMode ? 'active' : ''}`}
          onClick={onToggleMiniMode}
          title="Toggle Mini / Picture-in-Picture (M)"
          aria-label="Toggle Mini Mode"
        >
          <PictureInPicture size={16} />
          <span>Mini</span>
        </button>

        {/* Fullscreen */}
        <button
          className="header-btn"
          onClick={onToggleFullscreen}
          title="Toggle Fullscreen (F)"
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </button>

        {/* Edit Schedule */}
        <button
          className="header-btn"
          onClick={onOpenEdit}
          title="Edit Schedule (E)"
          aria-label="Edit Schedule"
        >
          <Edit3 size={15} />
          <span>Edit</span>
        </button>

        {/* Settings */}
        <button
          className="header-btn"
          onClick={onOpenSettings}
          title="Settings"
          aria-label="Settings"
        >
          <Settings size={16} />
        </button>

        {/* Help */}
        <button
          className="header-btn"
          onClick={onOpenHelp}
          title="Keyboard Shortcuts & Help (?)"
          aria-label="Help"
        >
          <HelpCircle size={16} />
        </button>
      </div>
    </header>
  );
}
