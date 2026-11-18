import React, { useEffect } from 'react';
import CategoryIcon from './CategoryIcon.jsx';
import { formatMinutesToTime } from '../lib/time.js';

export default function HeroBlock({
  block,
  category,
  countdown,
  progress,
  isLastFiveMinutes,
  is24Hour
}) {
  if (!block) {
    return (
      <div className="hero-card">
        <div className="hero-title">No active block</div>
      </div>
    );
  }

  // Format time range using user 12/24h preference
  const startTimeStr = formatMinutesToTime(block.startMinutes, is24Hour);
  const endTimeStr = formatMinutesToTime(block.endMinutes, is24Hour);

  return (
    <section className="hero-card" aria-label="Current Activity">
      <div className="hero-card-header">
        <div className="hero-badge-group">
          <div className="category-badge">
            <CategoryIcon name={category.iconName} size={16} />
            <span>{category.name}</span>
          </div>
          <div className="now-pulsing-badge">
            <span className="pulse-dot"></span>
            <span>CURRENT</span>
          </div>
        </div>

        <div className="hero-time-range tabular-nums">
          {startTimeStr} — {endTimeStr}
        </div>
      </div>

      <div className="hero-main-content">
        <h2 className="hero-title">{block.title}</h2>
        {block.note && <p className="hero-note">{block.note}</p>}
      </div>

      <div className="hero-countdown-area">
        <div className="countdown-label-group">
          <span className="countdown-label">Time Remaining</span>
          <span className="tabular-nums font-mono" style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            {Math.round(progress)}% complete
          </span>
        </div>

        <div
          className={`countdown-hero tabular-nums ${isLastFiveMinutes ? 'pulsing-warning' : ''}`}
          aria-live="polite"
        >
          {countdown}
        </div>

        <div className="progress-bar-track" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          <div
            className="progress-bar-fill"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      </div>
    </section>
  );
}
