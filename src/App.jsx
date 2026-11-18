import React, { useState, useEffect, useRef, useMemo } from 'react';
import Header from './components/Header.jsx';
import HeroBlock from './components/HeroBlock.jsx';
import NextBlock from './components/NextBlock.jsx';
import Timeline from './components/Timeline.jsx';
import MiniView from './components/MiniView.jsx';
import EditModal from './components/EditModal.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import HelpModal from './components/HelpModal.jsx';

import {
  buildScheduleWithBuffers,
  resolveScheduleState,
  getSimulatedTime
} from './lib/time.js';
import { getCategory } from './data/categories.js';
import { THEMES, THEME_LIST } from './data/themes.js';
import {
  loadSchedules,
  saveSchedules,
  loadSettings,
  saveSettings,
  exportScheduleAsJson,
  resetAllToDefaults
} from './lib/storage.js';
import { playTransitionChime } from './lib/audio.js';
import { sendBlockChangeNotification } from './lib/notifications.js';
import { requestWakeLock, releaseWakeLock } from './lib/wakeLock.js';
import {
  isDocumentPipSupported,
  openDocumentPip,
  closeDocumentPip
} from './lib/pip.js';

export default function App() {
  // Schedules & Settings state
  const [schedules, setSchedules] = useState(loadSchedules);
  const [settings, setSettings] = useState(loadSettings);

  // Time state derived strictly from Date.now()
  const [simulatedOffset, setSimulatedOffset] = useState(() => {
    const simDate = getSimulatedTime();
    if (simDate) {
      return simDate.getTime() - Date.now();
    }
    return 0;
  });

  const [currentTime, setCurrentTime] = useState(() => new Date(Date.now() + simulatedOffset));

  // Modal dialog states
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMiniMode, setIsMiniMode] = useState(false);

  // References for block change detection
  const prevBlockIdRef = useRef(null);

  // Periodic time update strictly from Date.now()
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date(Date.now() + simulatedOffset));
    };

    updateTime();
    const interval = setInterval(updateTime, 500); // twice a second for accurate seconds change

    // Visibility change handler: immediately recalculate when tab comes into focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateTime();
        if (settings.wakeLockEnabled) {
          requestWakeLock();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [simulatedOffset, settings.wakeLockEnabled]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Wake Lock management
  useEffect(() => {
    if (settings.wakeLockEnabled) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }
    return () => releaseWakeLock();
  }, [settings.wakeLockEnabled]);

  // Active Profile Resolution (Bangladesh weekend is Friday and Saturday)
  const activeProfileKey = useMemo(() => {
    if (settings.profileOverride === 'weekday') return 'weekday';
    if (settings.profileOverride === 'weekend') return 'weekend';
    // Auto: 5 = Friday, 6 = Saturday
    const day = currentTime.getDay();
    return day === 5 || day === 6 ? 'weekend' : 'weekday';
  }, [settings.profileOverride, currentTime]);

  const activeProfile = useMemo(() => {
    return {
      key: activeProfileKey,
      name: activeProfileKey === 'weekend' ? 'Weekend' : 'Weekday',
      schedule: schedules[activeProfileKey]
    };
  }, [activeProfileKey, schedules]);

  // Prepared schedule with all gaps auto-filled as "Buffer"
  const fullScheduleWithBuffers = useMemo(() => {
    return buildScheduleWithBuffers(activeProfile.schedule);
  }, [activeProfile]);

  // Resolved instant state (currentBlock, nextBlock, countdown, progress, timeline)
  const resolvedState = useMemo(() => {
    return resolveScheduleState(fullScheduleWithBuffers, currentTime);
  }, [fullScheduleWithBuffers, currentTime]);

  const {
    currentBlock,
    nextBlock,
    formattedCountdown,
    progress,
    isLastFiveMinutes,
    timeline
  } = resolvedState;

  // Active Category details
  const activeCategory = useMemo(() => {
    return getCategory(currentBlock?.category);
  }, [currentBlock]);

  // Synchronize Active Theme Combinations & CSS Variables
  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = THEMES[settings.theme] || THEMES['black-green'];

    if (settings.theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }

    root.style.setProperty('--bg-primary', currentTheme.bgPrimary);
    root.style.setProperty('--bg-surface', currentTheme.bgSurface);
    root.style.setProperty('--bg-surface-elevated', currentTheme.bgElevated);
    root.style.setProperty('--accent-primary', currentTheme.accentColor);
    root.style.setProperty('--accent-hover', currentTheme.accentHover);
    root.style.setProperty('--accent-glow', currentTheme.accentGlow);
    root.style.setProperty('--border-subtle', currentTheme.borderSubtle);
    root.style.setProperty('--border-strong', currentTheme.borderStrong);

    if (settings.theme === 'dynamic') {
      if (activeCategory) {
        root.style.setProperty('--cat-color', activeCategory.color);
        root.style.setProperty('--cat-accent', activeCategory.colorAccent);
        root.style.setProperty('--cat-gradient', activeCategory.gradientDark);
        root.style.setProperty('--cat-border', activeCategory.border);
        root.style.setProperty('--cat-badge-bg', activeCategory.badgeBg);
        root.style.setProperty('--cat-badge-text', activeCategory.badgeText);
      }
    } else {
      root.style.setProperty('--cat-color', currentTheme.accentColor);
      root.style.setProperty('--cat-accent', currentTheme.accentHover);
      root.style.setProperty('--cat-gradient', currentTheme.heroGradient);
      root.style.setProperty('--cat-border', currentTheme.borderStrong);
      root.style.setProperty('--cat-badge-bg', currentTheme.badgeBg);
      root.style.setProperty('--cat-badge-text', currentTheme.badgeText);
    }

    saveSettings(settings);
  }, [settings, activeCategory]);

  // Block Transition Effect: Audio chime and desktop notification
  useEffect(() => {
    if (!currentBlock) return;

    if (prevBlockIdRef.current && prevBlockIdRef.current !== currentBlock.id) {
      if (settings.soundEnabled) {
        playTransitionChime();
      }
      if (settings.notificationsEnabled) {
        sendBlockChangeNotification(currentBlock);
      }
    }
    prevBlockIdRef.current = currentBlock.id;
  }, [currentBlock?.id, settings.soundEnabled, settings.notificationsEnabled]);

  // Tab Title live info update (e.g. "English · 18:42 left")
  useEffect(() => {
    if (currentBlock) {
      document.title = `${currentBlock.title} · ${formattedCountdown} left`;
    } else {
      document.title = 'Day Dashboard';
    }
  }, [currentBlock?.title, formattedCountdown]);

  // Handlers for toggles
  const handleCycleTheme = () => {
    const idx = THEME_LIST.findIndex((t) => t.id === settings.theme);
    const nextIdx = (idx + 1) % THEME_LIST.length;
    setSettings((prev) => ({
      ...prev,
      theme: THEME_LIST[nextIdx].id
    }));
  };

  const handleChangeTheme = (newThemeId) => {
    setSettings((prev) => ({
      ...prev,
      theme: newThemeId
    }));
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleToggleMiniMode = async () => {
    if (isMiniMode) {
      closeDocumentPip();
      setIsMiniMode(false);
      return;
    }

    if (isDocumentPipSupported()) {
      const pip = await openDocumentPip(null, () => {
        setIsMiniMode(false);
      });
      if (pip) {
        setIsMiniMode(true);
        return;
      }
    }
    // Fallback: in-window mini overlay
    setIsMiniMode(true);
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in form inputs
      const tag = e.target.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      const key = e.key.toUpperCase();

      if (e.key === 'Escape') {
        setIsEditOpen(false);
        setIsSettingsOpen(false);
        setIsHelpOpen(false);
        if (isMiniMode) setIsMiniMode(false);
        return;
      }

      if (key === 'F') {
        e.preventDefault();
        handleToggleFullscreen();
      } else if (key === 'M') {
        e.preventDefault();
        handleToggleMiniMode();
      } else if (key === 'T') {
        e.preventDefault();
        handleCycleTheme();
      } else if (key === 'E') {
        e.preventDefault();
        setIsEditOpen((prev) => !prev);
      } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsHelpOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMiniMode, settings.theme]);

  // Schedule Save / Reset / Export / Import
  const handleSaveSchedule = (newItems) => {
    const updated = {
      ...schedules,
      [activeProfileKey]: newItems
    };
    setSchedules(updated);
    saveSchedules(updated.weekday, updated.weekend);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset this schedule profile to default? Any custom blocks will be replaced.')) {
      const defaults = resetAllToDefaults();
      setSchedules(defaults);
      saveSchedules(defaults.weekday, defaults.weekend);
    }
  };

  const handleExportJson = () => {
    exportScheduleAsJson(schedules.weekday, schedules.weekend, settings);
  };

  const handleImportJson = (data) => {
    if (data?.schedules?.weekday && data?.schedules?.weekend) {
      setSchedules(data.schedules);
      if (data.settings) setSettings(data.settings);
      saveSchedules(data.schedules.weekday, data.schedules.weekend);
      return true;
    }
    return false;
  };

  return (
    <div className="dashboard-root burn-in-shield">
      <Header
        currentTime={currentTime}
        is24Hour={settings.is24Hour}
        activeProfile={activeProfile}
        profileOverride={settings.profileOverride}
        theme={settings.theme}
        isFullscreen={isFullscreen}
        isMiniMode={isMiniMode}
        onChangeTheme={handleChangeTheme}
        onToggleFullscreen={handleToggleFullscreen}
        onToggleMiniMode={handleToggleMiniMode}
        onOpenEdit={() => setIsEditOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      <main className="dashboard-main-grid">
        <div className="hero-column">
          <HeroBlock
            block={currentBlock}
            category={activeCategory}
            countdown={formattedCountdown}
            progress={progress}
            isLastFiveMinutes={isLastFiveMinutes}
            is24Hour={settings.is24Hour}
          />
          <NextBlock
            block={nextBlock}
            category={getCategory(nextBlock?.category)}
            is24Hour={settings.is24Hour}
          />
        </div>

        <Timeline timeline={timeline} is24Hour={settings.is24Hour} />
      </main>

      {/* Mini Mode In-Window Overlay (Active when Mini Mode is enabled without external PiP) */}
      {isMiniMode && (
        <div className="mini-mode-overlay">
          <MiniView
            currentBlock={currentBlock}
            nextBlock={nextBlock}
            countdown={formattedCountdown}
            progress={progress}
            isLastFiveMinutes={isLastFiveMinutes}
            onClose={() => setIsMiniMode(false)}
          />
        </div>
      )}

      {/* Modals */}
      <EditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        schedule={activeProfile.schedule}
        activeProfileKey={activeProfile.name}
        onSaveSchedule={handleSaveSchedule}
        onResetToDefault={handleResetToDefault}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={setSettings}
      />

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}
