import React, { useState, useEffect } from 'react';
import {
  Armchair,
  UtensilsCrossed,
  X,
  CheckCircle2,
  UserCheck,
  Sparkles,
  Minus,
  Plus,
  FileText,
  Check,
} from 'lucide-react';

export default function TableModal({ target, onClose, onSaveSeat, onSaveTableGroup, onSaveTable }) {
  if (!target) return null;

  const isSeat = target.type === 'seat';
  const isTableGroup = target.type === 'tableGroup';
  const isTable = target.type === 'table';

  // Current entity data
  const entityData = target.data || target;

  const [selectedStatus, setSelectedStatus] = useState(entityData.status || 'available');
  const [guestCount, setGuestCount] = useState(entityData.guests || entityData.seats || 1);
  const [note, setNote] = useState(entityData.note || '');
  const [applyToWholeTable, setApplyToWholeTable] = useState(false);

  useEffect(() => {
    setSelectedStatus(entityData.status || 'available');
    setGuestCount(entityData.guests || entityData.seats || 1);
    setNote(entityData.note || '');
    setApplyToWholeTable(false);
  }, [target]);

  const getAvatarBg = () => {
    if (selectedStatus === 'available') return 'var(--status-green)';
    if (selectedStatus === 'occupied') return 'var(--status-red)';
    return 'var(--status-yellow)';
  };

  const handleSave = () => {
    if (isSeat) {
      onSaveSeat({
        ...entityData,
        status: selectedStatus,
        note: note.trim(),
        applyToWholeTable,
      });
    } else if (isTableGroup) {
      onSaveTableGroup({
        tableId: target.tableId,
        tableName: target.tableName,
        seatNums: target.seatNums,
        status: selectedStatus,
        note: note.trim(),
      });
    } else {
      onSaveTable({
        ...entityData,
        status: selectedStatus,
        guests: selectedStatus === 'available' ? 0 : guestCount,
        note: note.trim(),
      });
    }
  };

  // Titles
  let modalTitle = '';
  let modalSubtitle = '';

  const floorNum = entityData.floor || target.floor || (parseInt(entityData.num, 10) >= 23 ? 2 : 1);
  if (isSeat) {
    modalTitle = `ที่นั่ง ${entityData.num}`;
    modalSubtitle = `${entityData.tableName} • ชั้น ${floorNum}`;
  } else if (isTableGroup) {
    modalTitle = target.tableName;
    modalSubtitle = `ที่นั่ง: ${target.seatNums.join(', ')} • ชั้น ${target.floor || floorNum}`;
  } else {
    modalTitle = entityData.name || `โต๊ะ ${entityData.num}`;
    modalSubtitle = `ชั้น ${entityData.floor} • รองรับได้ ${entityData.seats} ที่นั่ง`;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="action-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top */}
        <div className="modal-top">
          <div className="modal-table-badge">
            <div className="modal-avatar-preview" style={{ background: getAvatarBg(), display: 'grid', placeItems: 'center' }}>
              {isSeat ? (
                <Armchair size={22} strokeWidth={2.4} color="#FFF" />
              ) : (
                <UtensilsCrossed size={20} strokeWidth={2.4} color="#FFF" />
              )}
            </div>
            <div>
              <div className="modal-table-title">{modalTitle}</div>
              <div className="modal-table-sub">{modalSubtitle}</div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="ปิดหน้าต่าง">
            <X size={18} strokeWidth={2.4} />
          </button>
        </div>

        {/* 1-Tap Status Switcher */}
        <label className="status-change-label">
          {isSeat ? 'เลือกสถานะที่นั่งนี้' : 'เลือกสถานะโต๊ะ'}
        </label>
        <div className="status-actions-grid">
          {/* ว่าง */}
          <button
            type="button"
            className={`status-action-btn btn-green ${selectedStatus === 'available' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('available')}
          >
            <CheckCircle2 size={20} strokeWidth={2.2} style={{ color: 'var(--status-green)' }} />
            <span className="status-action-text">{isSeat ? 'ที่นั่งว่าง' : 'โต๊ะว่าง'}</span>
            <span className="status-action-sub">พร้อมรับลูกค้า</span>
          </button>

          {/* มีลูกค้า */}
          <button
            type="button"
            className={`status-action-btn btn-red ${selectedStatus === 'occupied' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('occupied')}
          >
            <UserCheck size={20} strokeWidth={2.2} style={{ color: 'var(--status-red)' }} />
            <span className="status-action-text">มีลูกค้า</span>
            <span className="status-action-sub">{isSeat ? 'มีคนนั่ง' : 'ลูกค้านั่งทาน'}</span>
          </button>

          {/* ทำความสะอาด */}
          <button
            type="button"
            className={`status-action-btn btn-yellow ${selectedStatus === 'cleaning' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('cleaning')}
          >
            <Sparkles size={20} strokeWidth={2.2} style={{ color: 'var(--status-yellow)' }} />
            <span className="status-action-text">ทำความสะอาด</span>
            <span className="status-action-sub">กำลังเก็บ</span>
          </button>
        </div>

        {/* Option to apply to whole table if selecting a single seat */}
        {isSeat && (
          <div style={{ marginBottom: '14px', background: 'rgba(255,255,255,0.03)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12.5px', color: 'var(--text-main)' }}>
              <input
                type="checkbox"
                checked={applyToWholeTable}
                onChange={(e) => setApplyToWholeTable(e.target.checked)}
                style={{ accentColor: 'var(--orange-primary)', width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <span>นำสถานะนี้ไปใช้กับทุกที่นั่งใน <b>{entityData.tableName}</b></span>
            </label>
          </div>
        )}

        {/* Inputs */}
        <div className="modal-row" style={{ gridTemplateColumns: isTable ? '1fr 1fr' : '1fr' }}>
          {isTable && (
            <div className="input-block">
              <label className="input-label">จำนวนลูกค้า (ท่าน)</label>
              <div className="number-stepper">
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
                  title="ลดจำนวน"
                >
                  <Minus size={14} strokeWidth={2.5} />
                </button>
                <span className="stepper-val">{guestCount}</span>
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => setGuestCount((prev) => Math.min(20, prev + 1))}
                  title="เพิ่มจำนวน"
                >
                  <Plus size={14} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          )}

          <div className="input-block">
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <FileText size={13} strokeWidth={2} />
              <span>หมายเหตุการบริการ</span>
            </label>
            <input
              type="text"
              className="text-input-field"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="เช่น จองล่วงหน้า / ลูกค้าประจำ"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>
            ยกเลิก
          </button>
          <button type="button" className="btn-confirm-save" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Check size={16} strokeWidth={2.5} />
            <span>บันทึกข้อมูล</span>
          </button>
        </div>
      </div>
    </div>
  );
}
