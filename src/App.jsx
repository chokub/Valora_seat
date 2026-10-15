import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import FloorTabs from './components/FloorTabs';
import FloorPlan from './components/FloorPlan';
import TableModal from './components/TableModal';
import Toast from './components/Toast';
import { initialFloor1Seats, initialFloor2Seats, initialFloor3Seats, initialTables } from './data/initialTables';

export default function App() {
  const [floor1Seats, setFloor1Seats] = useState(initialFloor1Seats);
  const [floor2Seats, setFloor2Seats] = useState(initialFloor2Seats);
  const [floor3Seats, setFloor3Seats] = useState(initialFloor3Seats);
  const [tables, setTables] = useState(initialTables);
  const [activeFloor, setActiveFloor] = useState(1);
  const [modalTarget, setModalTarget] = useState(null);
  const [toast, setToast] = useState({ message: '', visible: false });

  // Calculate Summary Counts depending on current view/total
  const {
    availableCount,
    occupiedCount,
    cleaningCount,
    floorAvailableCounts,
    summaryLabel,
  } = useMemo(() => {
    // Floor 1 (Seat-based: 22 seats)
    const f1Avail = floor1Seats.filter((s) => s.status === 'available').length;
    const f1Occ = floor1Seats.filter((s) => s.status === 'occupied').length;
    const f1Clean = floor1Seats.filter((s) => s.status === 'cleaning').length;

    // Floor 2 (Seat-based: 12 seats)
    const f2Avail = floor2Seats.filter((s) => s.status === 'available').length;
    const f2Occ = floor2Seats.filter((s) => s.status === 'occupied').length;
    const f2Clean = floor2Seats.filter((s) => s.status === 'cleaning').length;

    // Floor 3 (Seat-based: 68 seats + VIP Room)
    const f3SeatsOnly = floor3Seats.filter((s) => !s.isRoom);
    const f3Avail = f3SeatsOnly.filter((s) => s.status === 'available').length;
    const f3Occ = f3SeatsOnly.filter((s) => s.status === 'occupied').length;
    const f3Clean = f3SeatsOnly.filter((s) => s.status === 'cleaning').length;

    const floorAvail = {
      1: f1Avail,
      2: f2Avail,
      3: f3Avail,
    };

    let avail = 0;
    let occ = 0;
    let clean = 0;
    let label = 'ที่นั่ง';

    if (activeFloor === 1) {
      avail = f1Avail;
      occ = f1Occ;
      clean = f1Clean;
      label = 'ที่นั่ง';
    } else if (activeFloor === 2) {
      avail = f2Avail;
      occ = f2Occ;
      clean = f2Clean;
      label = 'ที่นั่ง';
    } else {
      avail = f3Avail;
      occ = f3Occ;
      clean = f3Clean;
      label = 'ที่นั่ง';
    }

    return {
      availableCount: avail,
      occupiedCount: occ,
      cleaningCount: clean,
      floorAvailableCounts: floorAvail,
      summaryLabel: label,
    };
  }, [floor1Seats, floor2Seats, floor3Seats, activeFloor]);

  // Toast Helper
  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2200);
  };

  // Reset Everything to Available (ว่างทั้งหมด)
  const handleReset = () => {
    setFloor1Seats(initialFloor1Seats.map((s) => ({ ...s, status: 'available', note: '' })));
    setFloor2Seats(initialFloor2Seats.map((s) => ({ ...s, status: 'available', note: '' })));
    setFloor3Seats(initialFloor3Seats.map((s) => ({ ...s, status: 'available', note: '' })));
    setTables(initialTables.map((t) => ({ ...t, status: 'available', guests: 0, note: '' })));
    showToast('รีเซ็ตทุกที่นั่งและโต๊ะเป็น "ว่าง" เรียบร้อย');
  };

  // Open Seat Modal
  const handleSelectSeat = (seat) => {
    setModalTarget({ type: 'seat', data: seat });
  };

  // Open Table Group Modal (from table surface)
  const handleSelectTableGroup = (tableId, tableName, seatNums) => {
    setModalTarget({
      type: 'tableGroup',
      tableId,
      tableName,
      seatNums,
      floor: activeFloor,
      status: 'available',
    });
  };

  // Open Standard Table Modal (Legacy fallback)
  const handleSelectTable = (table) => {
    setModalTarget({ type: 'table', data: table });
  };

  // Save Seat from Modal
  const handleSaveSeat = (updatedSeat) => {
    const statusNames = {
      available: 'ว่าง',
      occupied: 'มีคนนั่ง',
      cleaning: 'กำลังทำความสะอาด',
    };

    const isFloor3 = updatedSeat.floor === 3 || parseInt(updatedSeat.num, 10) >= 35 || updatedSeat.id === 'vip-room';
    const isFloor2 = updatedSeat.floor === 2 || (parseInt(updatedSeat.num, 10) >= 23 && parseInt(updatedSeat.num, 10) <= 34);
    const setSeats = isFloor3 ? setFloor3Seats : isFloor2 ? setFloor2Seats : setFloor1Seats;

    if (updatedSeat.applyToWholeTable) {
      // Apply to all seats belonging to this table
      setSeats((prev) =>
        prev.map((s) =>
          s.tableId === updatedSeat.tableId
            ? { ...s, status: updatedSeat.status, note: updatedSeat.note }
            : s
        )
      );
      showToast(
        `อัปเดตทุกที่นั่งใน ${updatedSeat.tableName} เป็นสถานะ "${statusNames[updatedSeat.status]}" เรียบร้อย`
      );
    } else {
      // Apply to just this single seat
      setSeats((prev) =>
        prev.map((s) => (s.id === updatedSeat.id ? updatedSeat : s))
      );
      showToast(
        `อัปเดตที่นั่ง ${updatedSeat.num} เป็นสถานะ "${statusNames[updatedSeat.status]}" เรียบร้อย`
      );
    }
    setModalTarget(null);
  };

  // Save Table Group (All seats in a table on floor 1, 2, or 3)
  const handleSaveTableGroup = ({ tableId, tableName, status, note, floor }) => {
    const isFloor3 = floor === 3 || ['B-35-40', 'B-41-46', 'B-47-52', 'B-53-58', 'T-59-74', 'SOLO-75-78', 'CONF-79-90', 'CONF-91-102', 'VIP-ROOM'].includes(tableId);
    const isFloor2 = floor === 2 || ['T23-24', 'T25-26', 'T27-30', 'T31-34'].includes(tableId);
    const setSeats = isFloor3 ? setFloor3Seats : isFloor2 ? setFloor2Seats : setFloor1Seats;

    setSeats((prev) =>
      prev.map((s) =>
        s.tableId === tableId ? { ...s, status, note } : s
      )
    );
    const statusNames = {
      available: 'ว่าง',
      occupied: 'มีคนนั่ง',
      cleaning: 'กำลังทำความสะอาด',
    };
    showToast(`อัปเดต ${tableName} เป็นสถานะ "${statusNames[status]}" เรียบร้อย`);
    setModalTarget(null);
  };

  // Save Standard Table (Floor 3)
  const handleSaveTable = (updatedTable) => {
    setTables((prev) =>
      prev.map((t) => (t.id === updatedTable.id ? updatedTable : t))
    );
    setModalTarget(null);

    const statusNames = {
      available: 'ว่าง',
      occupied: 'มีลูกค้า',
      cleaning: 'กำลังทำความสะอาด',
    };
    showToast(
      `อัปเดตโต๊ะ ${updatedTable.num} เป็นสถานะ "${statusNames[updatedTable.status] || updatedTable.status}" เรียบร้อย`
    );
  };

  return (
    <div className="tablet-shell" id="appShell">
      {/* Top Header */}
      <Header
        availableCount={availableCount}
        occupiedCount={occupiedCount}
        cleaningCount={cleaningCount}
        summaryLabel={summaryLabel}
        onReset={handleReset}
      />

      {/* Floor Navigation Tabs */}
      <FloorTabs
        activeFloor={activeFloor}
        onSelectFloor={setActiveFloor}
        floorAvailableCounts={floorAvailableCounts}
      />

      {/* Interactive Floor Plan */}
      <FloorPlan
        activeFloor={activeFloor}
        tables={tables}
        floor1Seats={floor1Seats}
        floor2Seats={floor2Seats}
        floor3Seats={floor3Seats}
        onSelectTable={handleSelectTable}
        onSelectSeat={handleSelectSeat}
        onSelectTableGroup={handleSelectTableGroup}
        onSwitchFloor={setActiveFloor}
      />

      {/* Edit Modal (Seat or Table) */}
      {modalTarget && (
        <TableModal
          target={modalTarget}
          onClose={() => setModalTarget(null)}
          onSaveSeat={handleSaveSeat}
          onSaveTableGroup={handleSaveTableGroup}
          onSaveTable={handleSaveTable}
        />
      )}

      {/* Toast Notification */}
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
