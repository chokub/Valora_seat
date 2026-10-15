import React from 'react';
import FloorPlanOne from './FloorPlanOne';
import FloorPlanTwo from './FloorPlanTwo';
import FloorPlanThree from './FloorPlanThree';
import TableButton from './TableButton';

export default function FloorPlan({
  activeFloor,
  tables,
  floor1Seats,
  floor2Seats,
  floor3Seats,
  onSelectTable,
  onSelectSeat,
  onSelectTableGroup,
  onSwitchFloor,
}) {
  // Floor 1: Full-screen architectural layout
  if (activeFloor === 1) {
    return (
      <main className="floor-plan-viewport floor-viewport-full floor-1-active">
        <FloorPlanOne
          seats={floor1Seats}
          onSelectSeat={onSelectSeat}
          onSelectTableGroup={onSelectTableGroup}
          onSwitchFloor={onSwitchFloor}
        />
      </main>
    );
  }

  // Floor 2: Full-screen architectural mezzanine layout
  if (activeFloor === 2) {
    return (
      <main className="floor-plan-viewport floor-viewport-full floor-2-active">
        <FloorPlanTwo
          seats={floor2Seats}
          onSelectSeat={onSelectSeat}
          onSelectTableGroup={onSelectTableGroup}
          onSwitchFloor={onSwitchFloor}
        />
      </main>
    );
  }

  // Floor 3: VIP Room & Executive Co-Working Space
  if (activeFloor === 3) {
    return (
      <main className="floor-plan-viewport floor-viewport-full floor-3-active">
        <FloorPlanThree
          seats={floor3Seats}
          onSelectSeat={onSelectSeat}
          onSelectTableGroup={onSelectTableGroup}
          onSwitchFloor={onSwitchFloor}
        />
      </main>
    );
  }

  // Fallback
  const currentTables = tables.filter((t) => t.floor === activeFloor);

  return (
    <main className="floor-plan-viewport floor-viewport-full">
      <div className="floor-canvas" key={activeFloor}>
        {currentTables.map((table) => (
          <TableButton key={table.id} table={table} onSelect={onSelectTable} />
        ))}
      </div>
    </main>
  );
}

