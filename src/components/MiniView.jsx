import React from 'react';
import CategoryIcon from './CategoryIcon.jsx';
import { getCategory } from '../data/categories.js';
import { Maximize2, X } from 'lucide-react';

export default function MiniView({
  currentBlock,
  nextBlock,
  countdown,
  progress,
  isLastFiveMinutes,
  onClose
}) {
  if (!currentBlock) return null;

  const currentCat = getCategory(currentBlock.category);
  const nextCat = nextBlock ? getCategory(nextBlock.category) : null;

  return (
    <div
      className="mini-dashboard-container"
      style={{
        '--cat-color': currentCat.color,
        '--cat-accent': currentCat.colorAccent,
        '--cat-gradient': currentCat.gradientDark,
        '--cat-border': currentCat.border,
        '--cat-badge-bg': currentCat.badgeBg,
        '--cat-badge-text': currentCat.badgeText
      }}
    >
      <div className="mini-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <CategoryIcon name={currentCat.iconName} size={16} />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', color: currentCat.badgeText }}>
            {currentCat.name}
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              padding: '2px'
            }}
            title="Expand to Full View (M)"
          >
            <Maximize2 size={16} />
          </button>
        )}
      </div>

      <div style={{ margin: '0.5rem 0' }}>
        <div className="mini-task-title">{currentBlock.title}</div>
        <div className={`mini-countdown tabular-nums ${isLastFiveMinutes ? 'pulsing-warning' : ''}`}>
          {countdown}
        </div>
        <div className="progress-bar-track" style={{ height: '8px', margin: '0.4rem 0' }}>
          <div
            className="progress-bar-fill"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      </div>

      {nextBlock && (
        <div className="mini-next-line">
          <strong>Next:</strong> {nextBlock.title} ({nextBlock.startsInFormatted || `${nextBlock.startsInMinutes}m`})
        </div>
      )}
    </div>
  );
}
