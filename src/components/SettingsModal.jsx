import React from 'react';
import { X, Volume2, Bell, Sun, Moon, Clock, Monitor, Sliders } from 'lucide-react';
import { requestNotificationPermission } from '../lib/notifications.js';

export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) {
  if (!isOpen) return null;

  const handleToggleNotification = async () => {
    if (!settings.notificationsEnabled) {
      const granted = await requestNotificationPermission();
      if (granted) {
        onUpdateSettings({ ...settings, notificationsEnabled: true });
      } else {
        alert('Notification permission was not granted by your browser.');
      }
    } else {
      onUpdateSettings({ ...settings, notificationsEnabled: false });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sliders size={20} />
            <h3 className="modal-title">Dashboard Settings</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Theme */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Theme Mode</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Dark theme recommended for always-on display
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                className={`header-btn ${settings.theme === 'dark' ? 'active' : ''}`}
                onClick={() => onUpdateSettings({ ...settings, theme: 'dark' })}
              >
                <Moon size={15} /> Dark
              </button>
              <button
                className={`header-btn ${settings.theme === 'light' ? 'active' : ''}`}
                onClick={() => onUpdateSettings({ ...settings, theme: 'light' })}
              >
                <Sun size={15} /> Light
              </button>
            </div>
          </div>

          {/* Clock format */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Clock Display Format</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Choose between 24-hour (14:30) or 12-hour (2:30 PM)
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                className={`header-btn ${settings.is24Hour ? 'active' : ''}`}
                onClick={() => onUpdateSettings({ ...settings, is24Hour: true })}
              >
                24-Hour
              </button>
              <button
                className={`header-btn ${!settings.is24Hour ? 'active' : ''}`}
                onClick={() => onUpdateSettings({ ...settings, is24Hour: false })}
              >
                12-Hour
              </button>
            </div>
          </div>

          {/* Profile Override */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Active Schedule Profile</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Auto detects Friday & Saturday as Weekend in Bangladesh
              </div>
            </div>
            <select
              className="form-select"
              style={{ width: 'auto', minWidth: '150px' }}
              value={settings.profileOverride}
              onChange={(e) => onUpdateSettings({ ...settings, profileOverride: e.target.value })}
            >
              <option value="auto">Auto (by Day)</option>
              <option value="weekday">Force Weekday</option>
              <option value="weekend">Force Weekend</option>
            </select>
          </div>

          {/* Audio Chime */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Volume2 size={16} /> Sound Chime at Block Change
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Soft harmonic chime played when a new block starts
              </div>
            </div>
            <input
              type="checkbox"
              style={{ width: '20px', height: '20px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
              checked={settings.soundEnabled}
              onChange={(e) => onUpdateSettings({ ...settings, soundEnabled: e.target.checked })}
            />
          </div>

          {/* Desktop Notifications */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Bell size={16} /> Desktop Notification at Block Change
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Sends a system notification with upcoming task info
              </div>
            </div>
            <input
              type="checkbox"
              style={{ width: '20px', height: '20px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
              checked={settings.notificationsEnabled}
              onChange={handleToggleNotification}
            />
          </div>

          {/* Keep Screen Awake */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Monitor size={16} /> Keep Screen Awake (Wake Lock)
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Prevents display sleep on your always-on monitor
              </div>
            </div>
            <input
              type="checkbox"
              style={{ width: '20px', height: '20px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
              checked={settings.wakeLockEnabled}
              onChange={(e) => onUpdateSettings({ ...settings, wakeLockEnabled: e.target.checked })}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
