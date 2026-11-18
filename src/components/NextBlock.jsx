import React from 'react';
import CategoryIcon from './CategoryIcon.jsx';
import { formatMinutesToTime } from '../lib/time.js';

export default function NextBlock({ block, category, is24Hour }) {
  if (!block) return null;

  const startTimeStr = formatMinutesToTime(block.startMinutes, is24Hour);

  return (
    <div className="next-block-bar" aria-label="Upcoming Next Activity">
      <div className="next-block-left">
        <span className="next-tag">NEXT</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CategoryIcon name={category.iconName} size={16} />
          <span className="next-task-title">{block.title}</span>
        </div>
      </div>

      <div className="next-block-right">
        <span className="tabular-nums font-mono" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          {startTimeStr}
        </span>
        <span className="next-countdown-badge tabular-nums">
          in {block.startsInFormatted || `${block.startsInMinutes} min`}
        </span>
      </div>
    </div>
  );
}
