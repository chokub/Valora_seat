import React, { useState, useEffect } from 'react';
import {
  Coffee,
  Layers,
  CheckCircle,
  RotateCcw,
  Info,
  MapPin,
  Sparkles,
  BookmarkCheck,
  Utensils
} from 'lucide-react';

export default function App() {
  const [activeFloor, setActiveFloor] = useState(1);

  // Structure: { [floorId]: { [seatId]: 'Available' | 'Booked' } }
  const [seatData, setSeatData] = useState({
    1: {},
    2: {},
    3: {}
  });

  // Track temporary selections
  const [selectedSeats, setSelectedSeats] = useState({
    1: new Set(),
    2: new Set(),
    3: new Set()
  });

  const [notification, setNotification] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('valora_seats_reservation');
      if (stored) {
        const parsed = JSON.parse(stored);
        const loadedData = { 1: {}, 2: {}, 3: {} };
        [1, 2, 3].forEach(floor => {
          if (parsed[floor]) {
            loadedData[floor] = parsed[floor];
          }
        });
        setSeatData(loadedData);
      }
    } catch (e) {
      console.error("Failed to load seat data", e);
    }
  }, []);

  const saveToLocalStorage = (newData) => {
    try {
      localStorage.setItem('valora_seats_reservation', JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to save seat data", e);
    }
  };

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleSeatClick = (seatId) => {
    const currentFloorSeats = seatData[activeFloor];
    const isBooked = currentFloorSeats[seatId] === 'Booked';

    if (isBooked) return;

    setSelectedSeats(prev => {
      const updatedFloorSelected = new Set(prev[activeFloor]);
      if (updatedFloorSelected.has(seatId)) {
        updatedFloorSelected.delete(seatId);
      } else {
        updatedFloorSelected.add(seatId);
      }
      return {
        ...prev,
        [activeFloor]: updatedFloorSelected
      };
    });
  };

  const handleConfirmBooking = () => {
    const floorSelected = selectedSeats[activeFloor];
    if (floorSelected.size === 0) {
      showToast('กรุณาเลือกที่นั่งอย่างน้อย 1 ที่นั่งก่อนยืนยัน', 'warning');
      return;
    }

    setSeatData(prev => {
      const updatedFloorSeats = { ...prev[activeFloor] };
      floorSelected.forEach(seatId => {
        updatedFloorSeats[seatId] = 'Booked';
      });

      const newData = {
        ...prev,
        [activeFloor]: updatedFloorSeats
      };

      saveToLocalStorage(newData);
      return newData;
    });

    setSelectedSeats(prev => ({
      ...prev,
      [activeFloor]: new Set()
    }));

    showToast(`จองที่นั่งจำนวน ${floorSelected.size} ที่นั่งบนชั้น ${activeFloor} สำเร็จแล้ว!`, 'success');
  };

  const handleResetFloor = () => {
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ตข้อมูลที่นั่งทั้งหมดบน ชั้น ${activeFloor}?`)) {
      setSeatData(prev => {
        const newData = {
          ...prev,
          [activeFloor]: {}
        };
        saveToLocalStorage(newData);
        return newData;
      });
      setSelectedSeats(prev => ({
        ...prev,
        [activeFloor]: new Set()
      }));
      showToast(`รีเซ็ตข้อมูลที่นั่งบนชั้น ${activeFloor} เรียบร้อยแล้ว`, 'info');
    }
  };

  const handleResetAll = () => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการล้างข้อมูลการจองทั้งหมดทุกชั้น?')) {
      const resetData = { 1: {}, 2: {}, 3: {} };
      setSeatData(resetData);
      setSelectedSeats({ 1: new Set(), 2: new Set(), 3: new Set() });
      saveToLocalStorage(resetData);
      showToast('รีเซ็ตข้อมูลการจองของทุกชั้นเรียบร้อยแล้ว', 'info');
    }
  };

  // Define total seats per floor to calculate stats
  const getFloorSeatsList = (floorNum) => {
    if (floorNum === 1) {
      return Array.from({ length: 22 }, (_, i) => i + 1); // 1-22
    } else if (floorNum === 2) {
      return Array.from({ length: 12 }, (_, i) => i + 23); // 23-34
    } else {
      return Array.from({ length: 68 }, (_, i) => i + 35); // 35-102
    }
  };

  const getStats = (floorNum) => {
    const list = getFloorSeatsList(floorNum);
    const floorSeats = seatData[floorNum] || {};
    const bookedCount = list.filter(id => floorSeats[id] === 'Booked').length;
    const selectedCount = selectedSeats[floorNum]?.size || 0;
    const totalSeats = list.length;
    const availableCount = totalSeats - bookedCount - selectedCount;

    return {
      total: totalSeats,
      booked: bookedCount,
      selected: selectedCount,
      available: availableCount
    };
  };

  const activeStats = getStats(activeFloor);

  // Helper to render seat button with light theme orange styling
  const renderSeat = (seatId) => {
    const isBooked = seatData[activeFloor][seatId] === 'Booked';
    const isSelected = selectedSeats[activeFloor].has(seatId);

    let seatStyles = "";
    if (isBooked) {
      // Reserved: light gray background, light border, faded gray text, line-through
      seatStyles = "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through";
    } else if (isSelected) {
      // Selected: bright orange, orange border, white text, glowing shadow
      seatStyles = "bg-orange-500 border-orange-400 text-white font-extrabold shadow-md shadow-orange-500/30 scale-110";
    } else {
      // Available: white background, light orange border, orange text on hover
      seatStyles = "bg-white border-orange-200 hover:border-orange-500 hover:bg-orange-50/50 text-slate-700 hover:text-orange-600 hover:scale-110 cursor-pointer";
    }

    return (
      <button
        key={seatId}
        disabled={isBooked}
        onClick={() => handleSeatClick(seatId)}
        title={isBooked ? `ที่นั่ง ${seatId} ถูกจองแล้ว` : `เลือกที่นั่ง ${seatId}`}
        className={`w-8 h-8 rounded-full border text-[10px] font-bold font-mono flex items-center justify-center transition-all duration-150 select-none shadow-sm ${seatStyles}`}
      >
        {seatId}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      {/* Top Banner */}
      <header className="border-b border-orange-100 bg-white/95 backdrop-blur-md sticky top-0 z-10 px-4 py-4 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2.5 rounded-xl shadow-md shadow-orange-500/20 text-white font-bold">
              <Coffee className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-150">
                  Valora Cafe
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-150">
                  Vercel Ready
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Valora Cafe Seat Map
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={handleResetAll}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Floors</span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 animate-bounce">
          <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl border text-sm font-medium ${notification.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
              notification.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                'bg-orange-50 border-orange-200 text-orange-800'
            }`}>
            <CheckCircle className="w-5 h-5 flex-shrink-0 text-orange-500" />
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 md:px-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Left Column: Controls & Information */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Floor Selector Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <Layers className="w-5 h-5 text-orange-550" />
              <h2 className="text-lg font-semibold text-slate-800">เลือกชั้น / Floor Plan</h2>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[1, 2, 3].map((floorNum) => {
                const isActive = activeFloor === floorNum;
                const stats = getStats(floorNum);
                return (
                  <button
                    key={floorNum}
                    onClick={() => setActiveFloor(floorNum)}
                    className={`relative p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-200 overflow-hidden ${isActive
                        ? 'bg-orange-500 border-orange-500 shadow-md shadow-orange-500/20 text-white font-bold'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                      }`}
                  >
                    <span className={`text-[10px] uppercase tracking-wider ${isActive ? 'text-orange-100' : 'text-slate-400'}`}>Floor</span>
                    <span className="text-2xl tracking-tighter font-extrabold">{floorNum}F</span>
                    <div className={`text-[9px] mt-1 font-mono ${isActive ? 'text-orange-100/90' : 'text-slate-500'}`}>
                      {stats.booked}/{stats.total} Booked
                    </div>
                    {isActive && (
                      <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats Summary Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-550" />
                <h2 className="text-base font-semibold text-slate-800">โต๊ะในร้านชั้น {activeFloor}</h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">{activeStats.total} Seats Total</span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-150">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full border border-orange-300 bg-white flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                  </span>
                  <span className="text-xs text-slate-600 font-medium">ว่าง (Available)</span>
                </div>
                <span className="text-sm font-bold font-mono text-slate-700">{activeStats.available}</span>
              </div>

              <div className="flex justify-between items-center bg-orange-50/50 p-3 rounded-xl border border-orange-100">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-orange-500 border border-orange-400 shadow shadow-orange-500/10" />
                  <span className="text-xs text-orange-850 font-medium">กำลังเลือก (Selected)</span>
                </div>
                <span className="text-sm font-bold font-mono text-orange-600">{activeStats.selected}</span>
              </div>

              <div className="flex justify-between items-center bg-slate-100 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-[8px] text-slate-500 line-through">X</span>
                  <span className="text-xs text-slate-500 font-medium">จองแล้ว (Booked)</span>
                </div>
                <span className="text-sm font-bold font-mono text-slate-550">{activeStats.booked}</span>
              </div>
            </div>
          </div>

          {/* Quick Legend & Info */}
          <div className="bg-orange-50/30 border border-orange-100/60 rounded-2xl p-5 text-xs text-slate-500 space-y-2.5">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <p>กรุณาคลิกเลือกที่นั่งที่แสดงเป็นวงกลมตัวเลขสีครีม/ขาวขอบส้มเพื่อทำการเลือกที่นั่ง</p>
            </div>
          </div>
        </div>

        {/* Right Column: Floor Map Layout & Checkout */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Seat Layout Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm flex flex-col items-center min-h-[600px] justify-center relative overflow-hidden">

            {/* FLOOR 1 LAYOUT */}
            {activeFloor === 1 && (
              <div className="relative w-full max-w-[550px] aspect-[3/4] border border-orange-100/80 rounded-2xl p-6 bg-slate-50/60 shadow-inner flex flex-col justify-between">

                {/* Top Section: Bathrooms & Art Frame */}
                <div className="flex justify-between items-start w-full border-b border-slate-200 pb-4">
                  <div className="flex gap-2">
                    <div className="px-2 py-1 rounded bg-white border border-slate-200 text-[10px] text-slate-500 font-bold flex items-center gap-1 shadow-sm">
                      Restrooms 🚻
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded bg-orange-50 border border-orange-200 text-[9px] text-orange-700 font-serif italic shadow-sm">
                    🌌 Mystic Gallery Frame
                  </div>
                </div>

                {/* Middle Seating Area */}
                <div className="relative flex-grow my-4 grid grid-cols-12 gap-2">

                  {/* Top-Left Table (4 seats: 19, 20, 21, 22) */}
                  <div className="absolute top-[5%] left-[5%] flex flex-col items-center gap-1.5">
                    <div className="flex gap-4">
                      {renderSeat(21)}
                      {renderSeat(22)}
                    </div>
                    <div className="w-24 h-12 bg-orange-100/40 border border-orange-200 rounded-2xl flex items-center justify-center text-orange-850 font-bold text-xs shadow-sm">
                      Table A (4P)
                    </div>
                    <div className="flex gap-4">
                      {renderSeat(19)}
                      {renderSeat(20)}
                    </div>
                  </div>

                  {/* Top-Right Table (4 seats: 9, 10, 11, 12) */}
                  <div className="absolute top-[15%] right-[5%] flex flex-col items-center gap-1.5">
                    <div className="flex gap-4">
                      {renderSeat(11)}
                      {renderSeat(12)}
                    </div>
                    <div className="w-24 h-12 bg-orange-100/40 border border-orange-200 rounded-2xl flex items-center justify-center text-orange-850 font-bold text-xs shadow-sm">
                      Table B (4P)
                    </div>
                    <div className="flex gap-4">
                      {renderSeat(9)}
                      {renderSeat(10)}
                    </div>
                  </div>

                  {/* Mid-Left Round Table (2 seats: 17, 18) */}
                  <div className="absolute top-[48%] left-[5%] flex items-center gap-2">
                    {renderSeat(17)}
                    <div className="w-14 h-14 bg-orange-100/40 border border-orange-200 rounded-full flex items-center justify-center text-orange-850 font-bold text-xs shadow-sm">
                      Round
                    </div>
                    {renderSeat(18)}
                  </div>

                  {/* Center Oval Table (4 seats: 13, 14, 15, 16) */}
                  <div className="absolute top-[42%] left-[40%] flex flex-col items-center gap-1.5">
                    <div className="flex gap-4">
                      {renderSeat(13)}
                      {renderSeat(14)}
                    </div>
                    <div className="w-24 h-16 bg-orange-100/50 border border-orange-200 rounded-3xl flex items-center justify-center text-orange-900 font-bold text-xs shadow-sm">
                      Center
                    </div>
                    <div className="flex gap-4">
                      {renderSeat(15)}
                      {renderSeat(16)}
                    </div>
                  </div>

                  {/* Mid-Right Table (4 seats: 5, 6, 7, 8) */}
                  <div className="absolute top-[52%] right-[5%] flex flex-col items-center gap-1.5">
                    <div className="flex gap-4">
                      {renderSeat(7)}
                      {renderSeat(8)}
                    </div>
                    <div className="w-24 h-12 bg-orange-100/40 border border-orange-200 rounded-2xl flex items-center justify-center text-orange-850 font-bold text-xs shadow-sm">
                      Table C (4P)
                    </div>
                    <div className="flex gap-4">
                      {renderSeat(5)}
                      {renderSeat(6)}
                    </div>
                  </div>

                </div>

                {/* Bottom Section: Bar Counter & Cashier + Small bottom tables */}
                <div className="border-t border-slate-200 pt-4 flex flex-col gap-4">
                  {/* Coffee Station Bar Counter */}
                  <div className="w-full bg-white border border-orange-100 rounded-xl p-3.5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-orange-50 text-orange-500 rounded-lg">
                        <Utensils className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Bar Station</span>
                        <span className="text-xs font-bold text-slate-800">Coffee Bar & Barista ☕</span>
                      </div>
                    </div>
                    <div className="px-2 py-0.5 rounded bg-orange-50 text-[9px] text-orange-600 border border-orange-150 font-mono shadow-sm">
                      Espresso Machine
                    </div>
                  </div>

                  {/* Bottom two round tables (1-2 and 3-4) */}
                  <div className="flex justify-between items-center px-4">
                    {/* Table Left: 1, 2 */}
                    <div className="flex flex-col items-center gap-1">
                      {renderSeat(2)}
                      <div className="w-10 h-10 bg-orange-100/30 border border-orange-200 rounded-full flex items-center justify-center text-[10px] text-orange-800 shadow-sm" />
                      {renderSeat(1)}
                    </div>

                    <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                      Entrance / ทางเข้า 🚪
                    </div>

                    {/* Table Right: 3, 4 */}
                    <div className="flex flex-col items-center gap-1">
                      {renderSeat(4)}
                      <div className="w-10 h-10 bg-orange-100/30 border border-orange-200 rounded-full flex items-center justify-center text-[10px] text-orange-800 shadow-sm" />
                      {renderSeat(3)}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* FLOOR 2 LAYOUT */}
            {activeFloor === 2 && (
              <div className="relative w-full max-w-[550px] aspect-[3/4] border border-orange-100/80 rounded-2xl p-6 bg-slate-50/60 shadow-inner flex flex-col justify-between">

                {/* Top Section: Balcony Stairs down */}
                <div className="flex justify-between items-start w-full border-b border-slate-200 pb-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700">Stairs / บันไดเลื่อน ⬇️</span>
                    <span className="text-[9px] text-slate-450">Goes down to Floor 1</span>
                  </div>
                  <div className="text-xs font-serif italic text-orange-600">
                    Floor 2 Balcony Overlook
                  </div>
                </div>

                {/* Middle Seating Area */}
                <div className="relative flex-grow my-4 grid grid-cols-12 gap-2">

                  {/* Top-Right Column Tables (stacked vertically) */}
                  {/* Table 31-34 */}
                  <div className="absolute top-[5%] right-[5%] flex flex-col items-center gap-1.5">
                    <div className="flex gap-4">
                      {renderSeat(31)}
                      {renderSeat(32)}
                    </div>
                    <div className="w-24 h-12 bg-orange-100/40 border border-orange-200 rounded-2xl flex items-center justify-center text-orange-850 font-bold text-xs shadow-sm">
                      Table F (4P)
                    </div>
                    <div className="flex gap-4">
                      {renderSeat(33)}
                      {renderSeat(34)}
                    </div>
                  </div>

                  {/* Table 27-30 */}
                  <div className="absolute top-[40%] right-[5%] flex flex-col items-center gap-1.5">
                    <div className="flex gap-4">
                      {renderSeat(27)}
                      {renderSeat(28)}
                    </div>
                    <div className="w-24 h-12 bg-orange-100/40 border border-orange-200 rounded-2xl flex items-center justify-center text-orange-850 font-bold text-xs shadow-sm">
                      Table E (4P)
                    </div>
                    <div className="flex gap-4">
                      {renderSeat(29)}
                      {renderSeat(30)}
                    </div>
                  </div>

                  {/* Bottom-Left Round Tables (25-26 and 23-24) */}
                  <div className="absolute bottom-[5%] left-[5%] flex gap-8">
                    {/* Table 25-26 */}
                    <div className="flex flex-col items-center gap-1">
                      {renderSeat(26)}
                      <div className="w-11 h-11 bg-orange-100/30 border border-orange-200 rounded-full flex items-center justify-center text-[10px] text-orange-800 shadow-sm" />
                      {renderSeat(25)}
                    </div>

                    {/* Table 23-24 */}
                    <div className="flex flex-col items-center gap-1">
                      {renderSeat(24)}
                      <div className="w-11 h-11 bg-orange-100/30 border border-orange-200 rounded-full flex items-center justify-center text-[10px] text-orange-800 shadow-sm" />
                      {renderSeat(23)}
                    </div>
                  </div>

                </div>

                {/* Bottom Section: Balcony railing */}
                <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                  <div className="text-[10px] text-orange-600/85 uppercase font-mono font-bold tracking-widest">
                    Railing Overlook Area
                  </div>
                  <span className="text-[9px] text-slate-450">Plant boxes 🌿</span>
                </div>

              </div>
            )}

            {/* FLOOR 3 LAYOUT */}
            {activeFloor === 3 && (
              <div className="relative w-full max-w-[650px] aspect-[4/5] border border-orange-100/80 rounded-2xl p-4 bg-slate-50/60 shadow-inner flex flex-col justify-between overflow-y-auto">

                {/* Top VIP Room Card & Restrooms */}
                <div className="flex justify-between items-start w-full border-b border-slate-200 pb-3">
                  <div className="px-2 py-1 rounded bg-white border border-slate-200 text-[10px] text-slate-500 font-bold shadow-sm">
                    Restrooms 🚻
                  </div>

                  {/* VIP ROOM design box */}
                  <div className="bg-gradient-to-r from-orange-400 to-amber-500 border border-orange-300 rounded-xl p-3 text-white font-bold text-xs shadow-md shadow-orange-550/15 flex flex-col items-center w-[160px]">
                    <span className="text-[9px] uppercase tracking-wider opacity-90">Reserved Area</span>
                    <span className="text-sm font-extrabold tracking-tight">VIP ROOM ⭐</span>
                  </div>
                </div>

                {/* Seating Layout grid */}
                <div className="relative flex-grow my-4 grid grid-cols-12 gap-1.5 min-h-[460px]">

                  {/* Left Column: Long meeting tables */}
                  {/* Top-Left Long Table (12 seats: 91-102) */}
                  <div className="absolute top-[2%] left-[2%] flex items-center gap-1.5 bg-white/80 p-1.5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex flex-col gap-1.5">
                      {[101, 99, 97, 95, 93, 91].map(seatId => renderSeat(seatId))}
                    </div>
                    <div className="w-10 h-[190px] bg-orange-100/40 border border-orange-200 rounded-xl flex items-center justify-center text-orange-850 font-bold text-[10px] [writing-mode:vertical-lr] select-none">
                      Boardroom A
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {[102, 100, 98, 96, 94, 92].map(seatId => renderSeat(seatId))}
                    </div>
                  </div>

                  {/* Bottom-Left Long Table (12 seats: 79-90) */}
                  <div className="absolute top-[48%] left-[2%] flex items-center gap-1.5 bg-white/80 p-1.5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex flex-col gap-1.5">
                      {[89, 87, 85, 83, 81, 79].map(seatId => renderSeat(seatId))}
                    </div>
                    <div className="w-10 h-[190px] bg-orange-100/40 border border-orange-200 rounded-xl flex items-center justify-center text-orange-850 font-bold text-[10px] [writing-mode:vertical-lr] select-none">
                      Boardroom B
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {[90, 88, 86, 84, 82, 80].map(seatId => renderSeat(seatId))}
                    </div>
                  </div>

                  {/* Center Column: Long narrow desk (16 seats: 59-74) */}
                  <div className="absolute top-[22%] left-[34%] flex items-center gap-1.5 bg-white/85 p-1.5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex flex-col gap-1.5">
                      {[73, 71, 69, 67, 65, 63, 61, 59].map(seatId => renderSeat(seatId))}
                    </div>
                    <div className="w-8 h-[255px] bg-orange-100/40 border border-orange-200 rounded-xl flex items-center justify-center text-orange-850 font-bold text-[9px] [writing-mode:vertical-lr] select-none">
                      Co-Working Bar
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {[74, 72, 70, 68, 66, 64, 62, 60].map(seatId => renderSeat(seatId))}
                    </div>
                  </div>

                  {/* Right Column: Sofa Booth Tables (stacked vertically) */}
                  {/* Four 6-seater sofas: 35-58 */}
                  <div className="absolute top-[18%] right-[2%] flex flex-col gap-3">

                    {/* Sofa 4 (top): 53-58 */}
                    <div className="flex items-center gap-1 bg-white/80 p-1 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex flex-col gap-1">{[56, 57, 58].map(s => renderSeat(s))}</div>
                      <div className="w-7 h-24 bg-orange-100/30 border border-orange-200/60 rounded flex items-center justify-center text-orange-800/70 font-semibold text-[9px] [writing-mode:vertical-lr]">Booth 4</div>
                      <div className="flex flex-col gap-1">{[53, 54, 55].map(s => renderSeat(s))}</div>
                    </div>

                    {/* Sofa 3: 47-52 */}
                    <div className="flex items-center gap-1 bg-white/80 p-1 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex flex-col gap-1">{[50, 51, 52].map(s => renderSeat(s))}</div>
                      <div className="w-7 h-24 bg-orange-100/30 border border-orange-200/60 rounded flex items-center justify-center text-orange-800/70 font-semibold text-[9px] [writing-mode:vertical-lr]">Booth 3</div>
                      <div className="flex flex-col gap-1">{[47, 48, 49].map(s => renderSeat(s))}</div>
                    </div>

                    {/* Sofa 2: 41-46 */}
                    <div className="flex items-center gap-1 bg-white/80 p-1 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex flex-col gap-1">{[44, 45, 46].map(s => renderSeat(s))}</div>
                      <div className="w-7 h-24 bg-orange-100/30 border border-orange-200/60 rounded flex items-center justify-center text-orange-800/70 font-semibold text-[9px] [writing-mode:vertical-lr]">Booth 2</div>
                      <div className="flex flex-col gap-1">{[41, 42, 43].map(s => renderSeat(s))}</div>
                    </div>

                    {/* Sofa 1 (bottom): 35-40 */}
                    <div className="flex items-center gap-1 bg-white/80 p-1 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex flex-col gap-1">{[38, 39, 40].map(s => renderSeat(s))}</div>
                      <div className="w-7 h-24 bg-orange-100/30 border border-orange-200/60 rounded flex items-center justify-center text-orange-800/70 font-semibold text-[9px] [writing-mode:vertical-lr]">Booth 1</div>
                      <div className="flex flex-col gap-1">{[35, 36, 37].map(s => renderSeat(s))}</div>
                    </div>

                  </div>

                </div>

                {/* Bottom Section: Additional seats & bench */}
                <div className="border-t border-slate-200 pt-3 flex flex-col gap-2.5">
                  <div className="flex justify-between items-center px-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Lounge Area</span>
                    <span className="text-[9px] text-orange-600/80 font-semibold">Cozy Coffee Bench</span>
                  </div>

                  <div className="flex justify-between items-end">
                    {/* Bottom long bench: 75-78 */}
                    <div className="flex items-center gap-1.5 bg-white/85 p-1.5 rounded-lg border border-slate-200 shadow-sm">
                      <span className="text-[9px] text-slate-500 font-bold font-mono mr-1">Bench:</span>
                      {[75, 76, 77, 78].map(seatId => renderSeat(seatId))}
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Confirm booking Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-1 w-full md:w-auto">
              <span className="text-xs text-slate-400 uppercase tracking-wider">กำลังทำรายการสำหรับชั้น {activeFloor}</span>
              <div className="flex items-center gap-2">
                <BookmarkCheck className="w-5 h-5 text-orange-500" />
                <span className="text-base font-semibold text-slate-800">
                  {selectedSeats[activeFloor].size > 0
                    ? `โต๊ะที่เลือก: ${Array.from(selectedSeats[activeFloor]).join(', ')}`
                    : 'กรุณาคลิกเลือกโต๊ะบนแผนผังด้านบน'
                  }
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleResetFloor}
                disabled={activeStats.booked === 0 && activeStats.selected === 0}
                className="w-full md:w-auto px-5 py-3 text-sm font-medium text-slate-600 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Reset Floor {activeFloor}
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={selectedSeats[activeFloor].size === 0}
                className="w-full md:w-auto px-6 py-3 text-sm font-bold text-white bg-orange-500 hover:bg-orange-650 disabled:bg-orange-200 disabled:text-orange-400 rounded-xl transition duration-200 shadow-md shadow-orange-500/20 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>Confirm Booking</span>
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400 bg-white shadow-inner mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 Valora Cafe. Designed for cozy seat planning and Vercel hosting.</p>
        </div>
      </footer>
    </div>
  );
}
