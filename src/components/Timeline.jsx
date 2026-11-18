import React, { useEffect, useRef } from 'react';
import CategoryIcon from './CategoryIcon.jsx';
import { getCategory } from '../data/categories.js';
import { formatMinutesToTime } from '../lib/time.js';

export default function Timeline({ timeline, is24Hour }) {
  const currentItemRef = useRef(null);

  // Auto-scroll current item into view when it changes
  useEffect(() => {
    if (currentItemRef.current) {
      currentItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [timeline]);

  return (
    <aside className="timeline-column" aria-label="Daily Schedule Timeline">
      <div className="timeline-header">
        <h2 className="timeline-header-title">
          <span>Full Day Timeline</span>
          <span className="timeline-count-badge">{timeline.length} blocks</span>
        </h2>
      </div>

      <div className="timeline-list">
        {timeline.map((item) => {
          const cat = getCategory(item.category);
          const isCurrent = item.status === 'current';
          const startTimeStr = formatMinutesToTime(item.startMinutes, is24Hour);
          const endTimeStr = formatMinutesToTime(item.endMinutes, is24Hour);

          return (
            <div
              key={item.id}
              ref={isCurrent ? currentItemRef : null}
              className={`timeline-item status-${item.status} ${item.isBuffer ? 'is-buffer' : ''}`}
            >
              <div className="timeline-item-left">
                <span
                  className="timeline-category-indicator"
                  style={{ backgroundColor: cat.colorAccent || cat.color }}
                  title={cat.name}
                />
                <div className="timeline-item-info">
                  <div className="timeline-item-title">
                    {item.title}
                  </div>
                  {item.note && (
                    <div className="timeline-item-note">
                      {item.note}
                    </div>
                  )}
                </div>
              </div>

              <div className="timeline-item-right">
                <span className="timeline-item-time tabular-nums">
                  {startTimeStr} - {endTimeStr}
                </span>
                <CategoryIcon name={cat.iconName} size={15} className="text-secondary" />
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
