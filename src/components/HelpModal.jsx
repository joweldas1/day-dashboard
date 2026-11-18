import React from 'react';
import { X, Keyboard, Sparkles } from 'lucide-react';

export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'F', desc: 'Toggle Fullscreen display' },
    { key: 'M', desc: 'Toggle Mini mode / Picture-in-Picture window' },
    { key: 'T', desc: 'Toggle Theme (Dark / Light)' },
    { key: 'E', desc: 'Open / Close Schedule Editor' },
    { key: '?', desc: 'Show / Hide Keyboard Shortcuts' },
    { key: 'Esc', desc: 'Close open dialog or modal' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Keyboard size={20} />
            <h3 className="modal-title">Keyboard Shortcuts & Guide</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {shortcuts.map((sc) => (
              <div
                key={sc.key}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.6rem 0.8rem',
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{sc.desc}</span>
                <kbd
                  style={{
                    padding: '0.2rem 0.6rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    fontFamily: 'monospace',
                    color: 'var(--accent-primary)',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                  }}
                >
                  {sc.key}
                </kbd>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: '0.9rem 1rem',
              background: 'var(--cat-badge-bg)',
              border: '1px solid var(--cat-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              lineHeight: 1.5,
              color: 'var(--text-primary)'
            }}
          >
            <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
              <Sparkles size={16} /> Always-On Display Tips
            </div>
            <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <li>Anti-burn-in jitter subtly shifts the display every 3 minutes.</li>
              <li>Simulate any time of day for testing using the URL parameter: <code>?time=14:20</code>.</li>
              <li>Install as a desktop PWA directly from Chrome's address bar.</li>
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
