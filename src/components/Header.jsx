import React from 'react';
import {
  Sun,
  Moon,
  Maximize,
  Minimize,
  PictureInPicture,
  Calendar,
  Settings,
  Edit3,
  HelpCircle
} from 'lucide-react';

export default function Header({
  currentTime,
  is24Hour,
  activeProfile,
  profileOverride,
  theme,
  isFullscreen,
  isMiniMode,
  onToggleTheme,
  onToggleFullscreen,
  onToggleMiniMode,
  onOpenEdit,
  onOpenSettings,
  onOpenHelp
}) {
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
          <Calendar size={16} />
          <span>{activeProfile.name}</span>
        </div>

        {/* Theme toggle */}
        <button
          className="header-btn"
          onClick={onToggleTheme}
          title="Toggle Theme (T)"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Mini Mode */}
        <button
          className={`header-btn ${isMiniMode ? 'active' : ''}`}
          onClick={onToggleMiniMode}
          title="Toggle Mini / Picture-in-Picture (M)"
          aria-label="Toggle Mini Mode"
        >
          <PictureInPicture size={17} />
          <span>Mini</span>
        </button>

        {/* Fullscreen */}
        <button
          className="header-btn"
          onClick={onToggleFullscreen}
          title="Toggle Fullscreen (F)"
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
        </button>

        {/* Edit Schedule */}
        <button
          className="header-btn"
          onClick={onOpenEdit}
          title="Edit Schedule (E)"
          aria-label="Edit Schedule"
        >
          <Edit3 size={17} />
          <span>Edit</span>
        </button>

        {/* Settings */}
        <button
          className="header-btn"
          onClick={onOpenSettings}
          title="Settings"
          aria-label="Settings"
        >
          <Settings size={17} />
        </button>

        {/* Help */}
        <button
          className="header-btn"
          onClick={onOpenHelp}
          title="Keyboard Shortcuts & Help (?)"
          aria-label="Help"
        >
          <HelpCircle size={17} />
        </button>
      </div>
    </header>
  );
}
