import React from 'react';
import { Crown, Sparkles, User, Users } from 'lucide-react';

export default function FloorPlanThree({
  seats = [],
  onSelectSeat,
  onSelectTableGroup,
  onSwitchFloor,
}) {
  // Helper to get a seat object by its number
  const getSeat = (num) => {
    return seats.find((s) => s.num === String(num)) || { num: String(num), status: 'available' };
  };

  const vipRoomSeat = seats.find((s) => s.id === 'vip-room') || {
    id: 'vip-room',
    num: 'VIP',
    tableName: 'ห้อง VIP ROOM',
    status: 'available',
  };

  // Helper for Swivel Chair (Normal Clean Chair Button)
  const renderSwivelChair = (num, orientation = 'left') => {
    const seat = getSeat(num);
    const isThreeDigit = String(num).length >= 3;
    return (
      <button
        type="button"
        key={num}
        className={`f3-seat-btn f3-facing-${orientation} status-${seat.status} ${isThreeDigit ? 'three-digit' : ''}`}
        onClick={() => onSelectSeat(seat)}
        title={`ที่นั่ง ${num} (${seat.status === 'available' ? 'ว่าง' : seat.status === 'occupied' ? 'มีคนนั่ง' : 'ทำความสะอาด'})`}
      >
        <span className="chair-num">{num}</span>
      </button>
    );
  };

  // Helper for Booth Seat Component (Normal Clean Seat Button)
  const renderBoothSeat = (num, position = 'top') => {
    const seat = getSeat(num);
    return (
      <button
        type="button"
        key={num}
        className={`f3-booth-seat booth-seat-${position} status-${seat.status}`}
        onClick={() => onSelectSeat(seat)}
        title={`ที่นั่ง ${num} (${seat.status === 'available' ? 'ว่าง' : seat.status === 'occupied' ? 'มีคนนั่ง' : 'ทำความสะอาด'})`}
      >
        <span className="chair-num">{num}</span>
      </button>
    );
  };

  // Helper for Solo Armchair (Bottom Wall)
  const renderSoloChair = (num) => {
    const seat = getSeat(num);
    return (
      <button
        type="button"
        key={num}
        className={`f3-seat-btn f3-solo-seat status-${seat.status}`}
        onClick={() => onSelectSeat(seat)}
        title={`ที่นั่งเดี่ยว ${num} (${seat.status === 'available' ? 'ว่าง' : seat.status === 'occupied' ? 'มีคนนั่ง' : 'ทำความสะอาด'})`}
      >
        <span className="chair-num">{num}</span>
      </button>
    );
  };

  return (
    <div className="floor3-layout-container" id="floor3Plan">
      {/* ================= 1. TOP-RIGHT: VIP ROOM ================= */}
      <div
        className={`f3-vip-room-card status-${vipRoomSeat.status}`}
        onClick={() =>
          onSelectTableGroup
            ? onSelectTableGroup('VIP-ROOM', 'ห้อง VIP ROOM', ['VIP'], 3)
            : onSelectSeat(vipRoomSeat)
        }
        title="ห้อง VIP ROOM - คลิกเพื่อจองหรือจัดการสถานะทั้งห้อง"
      >
        <div className="vip-room-inner">
          <div className="vip-crown-icon">
            <Crown size={16} strokeWidth={2.2} />
          </div>
          <div className="vip-room-title">VIP ROOM</div>
          <div className={`vip-status-pill status-pill-${vipRoomSeat.status}`}>
            {vipRoomSeat.status === 'available'
              ? '● ว่าง พร้อมบริการ'
              : vipRoomSeat.status === 'occupied'
              ? '● มีลูกค้าใช้งาน'
              : '● กำลังทำความสะอาด'}
          </div>
        </div>
      </div>

      {/* ================= 2. TOP-LEFT: โต๊ะประชุมผู้บริหาร M2 (91-102) ================= */}
      <div className="exec-conf-set conf-table-upper">
        {/* Left Column of Swivel Chairs: 101, 99, 97, 95, 93, 91 */}
        <div className="exec-chair-col col-left">
          {renderSwivelChair('101', 'left')}
          {renderSwivelChair('99', 'left')}
          {renderSwivelChair('97', 'left')}
          {renderSwivelChair('95', 'left')}
          {renderSwivelChair('93', 'left')}
          {renderSwivelChair('91', 'left')}
        </div>

        {/* Walnut Executive Table Surface */}
        <div
          className="exec-table-surface"
          onClick={() =>
            onSelectTableGroup(
              'CONF-91-102',
              'โต๊ะประชุมบน M2 (91-102)',
              ['91', '92', '93', '94', '95', '96', '97', '98', '99', '100', '101', '102'],
              3
            )
          }
          title="แตะที่โต๊ะเพื่อจัดการสถานะทั้งโต๊ะ M2"
        >
          <div className="exec-wood-inlay"></div>
        </div>

        {/* Right Column of Swivel Chairs: 102, 100, 98, 96, 94, 92 */}
        <div className="exec-chair-col col-right">
          {renderSwivelChair('102', 'right')}
          {renderSwivelChair('100', 'right')}
          {renderSwivelChair('98', 'right')}
          {renderSwivelChair('96', 'right')}
          {renderSwivelChair('94', 'right')}
          {renderSwivelChair('92', 'right')}
        </div>
      </div>

      {/* ================= 3. LOWER-LEFT: โต๊ะประชุมผู้บริหาร M1 (79-90) ================= */}
      <div className="exec-conf-set conf-table-lower">
        {/* Left Column of Swivel Chairs: 89, 87, 85, 83, 81, 79 */}
        <div className="exec-chair-col col-left">
          {renderSwivelChair('89', 'left')}
          {renderSwivelChair('87', 'left')}
          {renderSwivelChair('85', 'left')}
          {renderSwivelChair('83', 'left')}
          {renderSwivelChair('81', 'left')}
          {renderSwivelChair('79', 'left')}
        </div>

        {/* Walnut Executive Table Surface */}
        <div
          className="exec-table-surface"
          onClick={() =>
            onSelectTableGroup(
              'CONF-79-90',
              'โต๊ะประชุมล่าง M1 (79-90)',
              ['79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90'],
              3
            )
          }
          title="แตะที่โต๊ะเพื่อจัดการสถานะทั้งโต๊ะ M1"
        >
          <div className="exec-wood-inlay"></div>
        </div>

        {/* Right Column of Swivel Chairs: 90, 88, 86, 84, 82, 80 */}
        <div className="exec-chair-col col-right">
          {renderSwivelChair('90', 'right')}
          {renderSwivelChair('88', 'right')}
          {renderSwivelChair('86', 'right')}
          {renderSwivelChair('84', 'right')}
          {renderSwivelChair('82', 'right')}
          {renderSwivelChair('80', 'right')}
        </div>
      </div>

      {/* ================= 4. CENTER COLUMN: โต๊ะทำงานยาว Co-Working C1 (59-74) ================= */}
      <div className="coworking-center-set">
        {/* Left Column of Swivel Chairs: 73, 71, 69, 67, 65, 63, 61, 59 */}
        <div className="coworking-chair-col col-left">
          {renderSwivelChair('73', 'left')}
          {renderSwivelChair('71', 'left')}
          {renderSwivelChair('69', 'left')}
          {renderSwivelChair('67', 'left')}
          {renderSwivelChair('65', 'left')}
          {renderSwivelChair('63', 'left')}
          {renderSwivelChair('61', 'left')}
          {renderSwivelChair('59', 'left')}
        </div>

        {/* Long Walnut Table Surface */}
        <div
          className="coworking-table-surface"
          onClick={() =>
            onSelectTableGroup(
              'T-59-74',
              'โต๊ะทำงานยาว C1 (59-74)',
              ['59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74'],
              3
            )
          }
          title="แตะที่โต๊ะเพื่อจัดการสถานะทั้งโต๊ะ C1"
        >
          <div className="coworking-center-groove"></div>
        </div>

        {/* Right Column of Swivel Chairs: 74, 72, 70, 68, 66, 64, 62, 60 */}
        <div className="coworking-chair-col col-right">
          {renderSwivelChair('74', 'right')}
          {renderSwivelChair('72', 'right')}
          {renderSwivelChair('70', 'right')}
          {renderSwivelChair('68', 'right')}
          {renderSwivelChair('66', 'right')}
          {renderSwivelChair('64', 'right')}
          {renderSwivelChair('62', 'right')}
          {renderSwivelChair('60', 'right')}
        </div>
      </div>

      {/* ================= 5. RIGHT WALL: 4 โซฟาบูธหนังเขียว (35-58) ================= */}
      <div className="booth-zone-wrapper">
        {/* Booth 4 (Top): Seats 56, 57, 58 (top) | 53, 54, 55 (bottom) */}
        <div className="leather-booth-card booth-4">
          <div className="booth-sofa sofa-top">
            <div className="sofa-backrest-bar backrest-top"></div>
            <div className="sofa-seats-row">
              {renderBoothSeat('56', 'top')}
              {renderBoothSeat('57', 'top')}
              {renderBoothSeat('58', 'top')}
            </div>
          </div>

          <div
            className="booth-table-surface"
            onClick={() =>
              onSelectTableGroup('B-53-58', 'โซฟาบูธ B4 (53-58)', ['53', '54', '55', '56', '57', '58'], 3)
            }
            title="แตะเพื่อจัดการทั้งบูธ B4"
          >
            <div className="booth-center-caddy"></div>
          </div>

          <div className="booth-sofa sofa-bottom">
            <div className="sofa-seats-row">
              {renderBoothSeat('53', 'bottom')}
              {renderBoothSeat('54', 'bottom')}
              {renderBoothSeat('55', 'bottom')}
            </div>
            <div className="sofa-backrest-bar backrest-bottom"></div>
          </div>
        </div>

        {/* Booth 3: Seats 50, 51, 52 (top) | 47, 48, 49 (bottom) */}
        <div className="leather-booth-card booth-3">
          <div className="booth-sofa sofa-top">
            <div className="sofa-backrest-bar backrest-top"></div>
            <div className="sofa-seats-row">
              {renderBoothSeat('50', 'top')}
              {renderBoothSeat('51', 'top')}
              {renderBoothSeat('52', 'top')}
            </div>
          </div>

          <div
            className="booth-table-surface"
            onClick={() =>
              onSelectTableGroup('B-47-52', 'โซฟาบูธ B3 (47-52)', ['47', '48', '49', '50', '51', '52'], 3)
            }
            title="แตะเพื่อจัดการทั้งบูธ B3"
          >
            <div className="booth-center-caddy"></div>
          </div>

          <div className="booth-sofa sofa-bottom">
            <div className="sofa-seats-row">
              {renderBoothSeat('47', 'bottom')}
              {renderBoothSeat('48', 'bottom')}
              {renderBoothSeat('49', 'bottom')}
            </div>
            <div className="sofa-backrest-bar backrest-bottom"></div>
          </div>
        </div>

        {/* Booth 2: Seats 44, 45, 46 (top) | 41, 42, 43 (bottom) */}
        <div className="leather-booth-card booth-2">
          <div className="booth-sofa sofa-top">
            <div className="sofa-backrest-bar backrest-top"></div>
            <div className="sofa-seats-row">
              {renderBoothSeat('44', 'top')}
              {renderBoothSeat('45', 'top')}
              {renderBoothSeat('46', 'top')}
            </div>
          </div>

          <div
            className="booth-table-surface"
            onClick={() =>
              onSelectTableGroup('B-41-46', 'โซฟาบูธ B2 (41-46)', ['41', '42', '43', '44', '45', '46'], 3)
            }
            title="แตะเพื่อจัดการทั้งบูธ B2"
          >
            <div className="booth-center-caddy"></div>
          </div>

          <div className="booth-sofa sofa-bottom">
            <div className="sofa-seats-row">
              {renderBoothSeat('41', 'bottom')}
              {renderBoothSeat('42', 'bottom')}
              {renderBoothSeat('43', 'bottom')}
            </div>
            <div className="sofa-backrest-bar backrest-bottom"></div>
          </div>
        </div>

        {/* Booth 1 (Bottom): Seats 38, 39, 40 (top) | 35, 36, 37 (bottom) */}
        <div className="leather-booth-card booth-1">
          <div className="booth-sofa sofa-top">
            <div className="sofa-backrest-bar backrest-top"></div>
            <div className="sofa-seats-row">
              {renderBoothSeat('38', 'top')}
              {renderBoothSeat('39', 'top')}
              {renderBoothSeat('40', 'top')}
            </div>
          </div>

          <div
            className="booth-table-surface"
            onClick={() =>
              onSelectTableGroup('B-35-40', 'โซฟาบูธ B1 (35-40)', ['35', '36', '37', '38', '39', '40'], 3)
            }
            title="แตะเพื่อจัดการทั้งบูธ B1"
          >
            <div className="booth-center-caddy"></div>
          </div>

          <div className="booth-sofa sofa-bottom">
            <div className="sofa-seats-row">
              {renderBoothSeat('35', 'bottom')}
              {renderBoothSeat('36', 'bottom')}
              {renderBoothSeat('37', 'bottom')}
            </div>
            <div className="sofa-backrest-bar backrest-bottom"></div>
          </div>
        </div>
      </div>

      {/* ================= 6. LOWER-LEFT NOOK (2 Cozy Armchairs) ================= */}
      <div className="cozy-nook-set">
        <div className="nook-armchair">
          <div className="armchair-cushion-green"></div>
        </div>
        <div className="nook-wood-table"></div>
        <div className="nook-armchair">
          <div className="armchair-cushion-green"></div>
        </div>
      </div>

      {/* ================= 7. BOTTOM WALL COUNTER: Seats 75, 76, 77, 78 ================= */}
      <div className="bottom-counter-wrapper">
        <div
          className="bottom-counter-bar"
          onClick={() =>
            onSelectTableGroup('SOLO-75-78', 'เคาน์เตอร์เดี่ยว S1-S4', ['75', '76', '77', '78'], 3)
          }
          title="แตะเพื่อจัดการทั้งเคาน์เตอร์เดี่ยว"
        >
          <div className="solo-chairs-row">
            {renderSoloChair('75')}
            <div className="solo-table-divider"></div>
            {renderSoloChair('76')}
            <div className="solo-table-divider"></div>
            {renderSoloChair('77')}
            <div className="solo-table-divider"></div>
            {renderSoloChair('78')}
          </div>
          <div className="counter-wood-ledge"></div>
        </div>
      </div>

      {/* ================= 8. BOTTOM-CENTER: RESTROOMS (3 Panels: Male, Female, Female) ================= */}
      <div className="f3-restroom-section">
        {/* Left: Male */}
        <div className="f3-restroom-door door-male" title="ห้องน้ำชาย">
          <svg viewBox="0 0 16 32" width="16" height="32" className="f3-restroom-icon">
            <circle cx="8" cy="5" r="3" fill="#2563EB" />
            <path d="M5 11h6a1.5 1.5 0 0 1 1.5 1.5v8H10.5v9h-2v-9h-1v9h-2v-9H4v-8A1.5 1.5 0 0 1 5 11z" fill="#2563EB" />
          </svg>
        </div>

        {/* Center: Female */}
        <div className="f3-restroom-door door-female" title="ห้องน้ำหญิง 1">
          <svg viewBox="0 0 16 32" width="16" height="32" className="f3-restroom-icon">
            <circle cx="8" cy="5" r="3" fill="#E11D48" />
            <path d="M5 11h6a1.5 1.5 0 0 1 1.5 1.5l2 9H12v8h-2.5v-8h-3v8H4v-8H1.5l2-9A1.5 1.5 0 0 1 5 11z" fill="#E11D48" />
          </svg>
        </div>

        {/* Right: Female */}
        <div className="f3-restroom-door door-female" title="ห้องน้ำหญิง 2">
          <svg viewBox="0 0 16 32" width="16" height="32" className="f3-restroom-icon">
            <circle cx="8" cy="5" r="3" fill="#E11D48" />
            <path d="M5 11h6a1.5 1.5 0 0 1 1.5 1.5l2 9H12v8h-2.5v-8h-3v8H4v-8H1.5l2-9A1.5 1.5 0 0 1 5 11z" fill="#E11D48" />
          </svg>
        </div>
      </div>
    </div>
  );
}
