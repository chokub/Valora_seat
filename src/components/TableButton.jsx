import React from 'react';

export default function TableButton({ table, onSelect }) {
  const shapeClass = table.shape === 'round' ? 'shape-round' : 'shape-capsule';
  const sizeClass = table.size ? table.size : '';
  const variantClass = table.variant ? table.variant : '';
  const statusClass = `status-${table.status}`;

  const style = {
    top: table.pos.top !== undefined ? `${table.pos.top}px` : undefined,
    left: table.pos.left !== undefined ? `${table.pos.left}px` : undefined,
    right: table.pos.right !== undefined ? `${table.pos.right}px` : undefined,
    bottom: table.pos.bottom !== undefined ? `${table.pos.bottom}px` : undefined,
    width: table.pos.width !== undefined ? `${table.pos.width}px` : undefined,
    height: table.pos.height !== undefined ? `${table.pos.height}px` : undefined,
  };

  return (
    <button
      className={`table-btn ${shapeClass} ${sizeClass} ${variantClass} ${statusClass}`}
      style={style}
      onClick={() => onSelect(table)}
      title={`${table.name} (${table.capLabel})`}
    >
      <span className="table-num">{table.num}</span>
      <span className="table-cap">{table.capLabel}</span>
      <span className="table-status-indicator"></span>
    </button>
  );
}
