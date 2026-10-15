import React from 'react';
import { Layers } from 'lucide-react';

export default function FloorTabs({ activeFloor, onSelectFloor, floorAvailableCounts }) {
  return (
    <div className="nav-subbar">
      {/* Floor 1, Floor 2, Floor 3 Tabs */}
      <div className="floor-tabs">
        <button
          className={`floor-tab-btn ${activeFloor === 1 ? 'active' : ''}`}
          onClick={() => onSelectFloor(1)}
        >
          <Layers size={15} strokeWidth={2.2} />
          <span className="tab-main-name">ชั้น 1</span>
          <span className="tab-badge">ว่าง {floorAvailableCounts[1] || 0} ที่นั่ง</span>
        </button>

        <button
          className={`floor-tab-btn ${activeFloor === 2 ? 'active' : ''}`}
          onClick={() => onSelectFloor(2)}
        >
          <Layers size={15} strokeWidth={2.2} />
          <span className="tab-main-name">ชั้น 2</span>
          <span className="tab-badge">ว่าง {floorAvailableCounts[2] || 0} ที่นั่ง</span>
        </button>

        <button
          className={`floor-tab-btn ${activeFloor === 3 ? 'active' : ''}`}
          onClick={() => onSelectFloor(3)}
        >
          <Layers size={15} strokeWidth={2.2} />
          <span className="tab-main-name">ชั้น 3</span>
          <span className="tab-badge">ว่าง {floorAvailableCounts[3] || 0} ที่นั่ง</span>
        </button>
      </div>
    </div>
  );
}
