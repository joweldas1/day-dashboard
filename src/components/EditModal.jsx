import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Download,
  Upload,
  RotateCcw,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { CATEGORIES } from '../data/categories.js';
import { validateSchedule } from '../lib/time.js';

export default function EditModal({
  isOpen,
  onClose,
  schedule,
  activeProfileKey,
  onSaveSchedule,
  onResetToDefault,
  onExportJson,
  onImportJson
}) {
  if (!isOpen) return null;

  const [items, setItems] = useState(() => JSON.parse(JSON.stringify(schedule)));
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [validation, setValidation] = useState(() => validateSchedule(schedule));

  const runValidation = (updated) => {
    const res = validateSchedule(updated);
    setValidation(res);
    return res;
  };

  const handleItemChange = (idx, field, value) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], [field]: value };
    setItems(updated);
    runValidation(updated);
  };

  const handleAddNew = () => {
    const newItem = {
      id: `custom-${Date.now()}`,
      start: '12:00',
      end: '13:00',
      title: 'New Activity',
      category: 'rest',
      note: ''
    };
    const updated = [...items, newItem];
    setItems(updated);
    setSelectedIdx(updated.length - 1);
    runValidation(updated);
  };

  const handleDelete = (idx) => {
    if (items.length <= 1) {
      alert('Schedule must have at least one block.');
      return;
    }
    const updated = items.filter((_, i) => i !== idx);
    setItems(updated);
    setSelectedIdx(Math.max(0, idx - 1));
    runValidation(updated);
  };

  const handleMove = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const updated = [...items];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    setItems(updated);
    setSelectedIdx(targetIdx);
    runValidation(updated);
  };

  const handleSave = () => {
    const res = runValidation(items);
    if (!res.valid) {
      alert(`Please fix the schedule errors before saving:\n\n${res.errors.join('\n')}`);
      return;
    }
    onSaveSchedule(items);
    onClose();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (onImportJson(parsed)) {
          alert('Schedule successfully imported!');
          onClose();
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const activeItem = items[selectedIdx] || items[0];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" style={{ maxWidth: '820px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h3 className="modal-title">Edit Schedule ({activeProfileKey})</h3>
            <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', background: 'var(--bg-surface-elevated)', borderRadius: '4px' }}>
              Press E to close
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Validation Error Banner */}
        {!validation.valid && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            borderBottom: '1px solid rgba(239, 68, 68, 0.3)',
            padding: '0.75rem 1.75rem',
            color: '#f87171',
            fontSize: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
              <AlertCircle size={16} />
              <span>Overlap or format errors detected:</span>
            </div>
            {validation.errors.map((err, i) => (
              <div key={i} style={{ paddingLeft: '1.4rem' }}>• {err}</div>
            ))}
          </div>
        )}

        <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr', gap: '1.5rem', maxHeight: '60vh' }}>
          {/* Left: Block list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto', paddingRight: '0.3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Blocks ({items.length})
              </span>
              <button
                className="btn-secondary"
                onClick={handleAddNew}
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                <Plus size={14} /> Add Block
              </button>
            </div>

            {items.map((b, idx) => (
              <div
                key={b.id || idx}
                onClick={() => setSelectedIdx(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0.8rem',
                  borderRadius: 'var(--radius-md)',
                  background: selectedIdx === idx ? 'var(--bg-surface-elevated)' : 'var(--bg-primary)',
                  border: selectedIdx === idx ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{b.title || 'Untitled'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {b.start} - {b.end} • {CATEGORIES[b.category]?.name || b.category}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.2rem' }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleMove(idx, -1); }}
                    disabled={idx === 0}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '2px' }}
                    title="Move up"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleMove(idx, 1); }}
                    disabled={idx === items.length - 1}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '2px' }}
                    title="Move down"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(idx); }}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}
                    title="Delete block"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Selected block editor form */}
          {activeItem ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Edit Block Details</h4>

              <div className="form-group">
                <label className="form-label">Task Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={activeItem.title}
                  onChange={(e) => handleItemChange(selectedIdx, 'title', e.target.value)}
                  placeholder="e.g. Deep Work"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Start Time (HH:MM)</label>
                  <input
                    type="time"
                    className="form-input tabular-nums"
                    value={activeItem.start}
                    onChange={(e) => handleItemChange(selectedIdx, 'start', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">End Time (HH:MM)</label>
                  <input
                    type="time"
                    className="form-input tabular-nums"
                    value={activeItem.end}
                    onChange={(e) => handleItemChange(selectedIdx, 'end', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={activeItem.category}
                  onChange={(e) => handleItemChange(selectedIdx, 'category', e.target.value)}
                >
                  {Object.values(CATEGORIES).map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Optional Note</label>
                <input
                  type="text"
                  className="form-input"
                  value={activeItem.note || ''}
                  onChange={(e) => handleItemChange(selectedIdx, 'note', e.target.value)}
                  placeholder="e.g. details, link, or subtasks"
                />
              </div>
            </div>
          ) : (
            <div>Select a block to edit</div>
          )}
        </div>

        {/* Modal Footer with Actions */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn-secondary"
              onClick={onResetToDefault}
              title="Reset this profile to initial schedule"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
            >
              <RotateCcw size={15} /> Reset
            </button>
            <button
              className="btn-secondary"
              onClick={onExportJson}
              title="Download JSON backup"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
            >
              <Download size={15} /> Export
            </button>
            <label
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', cursor: 'pointer' }}
              title="Upload JSON schedule"
            >
              <Upload size={15} /> Import
              <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn-primary" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
