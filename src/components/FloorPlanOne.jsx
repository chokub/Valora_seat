import React from 'react';
import { Coffee, Scissors, Sun, Moon, Sparkles } from 'lucide-react';

export default function FloorPlanOne({ seats, onSelectSeat, onSelectTableGroup, onSwitchFloor }) {
  // Helper to get a seat object by its number
  const getSeat = (num) => {
    return seats.find((s) => s.num === String(num)) || { num, status: 'available' };
  };

  return (
    <div className="floor1-layout-container">
      {/* ================= ARCHITECTURAL TOP WALL ================= */}
      {/* Restrooms: Top Left (Left: Men, Right: Women - matching blueprint sketch) */}
      <div className="arch-restroom-section">
        {/* Left: Men's Restroom */}
        <div className="restroom-plaque plaque-left" title="ห้องน้ำชาย">
          <svg viewBox="0 0 14 26" width="14" height="26" className="restroom-figure">
            <circle cx="7" cy="4" r="2.5" fill="#2563EB" />
            <path d="M4.5 9h5a1 1 0 0 1 1 1v6h-1.5v8h-2v-8h-1v8h-2v-8H3v-6a1 1 0 0 1 1-1h.5z" fill="#2563EB" />
          </svg>
        </div>
        {/* Right: Women's Restroom */}
        <div className="restroom-plaque plaque-right" title="ห้องน้ำหญิง">
          <svg viewBox="0 0 14 26" width="14" height="26" className="restroom-figure">
            <circle cx="7" cy="4" r="2.5" fill="#E11D48" />
            <path d="M4.5 9h5a1 1 0 0 1 1 1l1.5 7H10v7H8v-7H6v7H4v-7H2l1.5-7a1 1 0 0 1 1-1z" fill="#E11D48" />
          </svg>
        </div>
      </div>

      {/* Barber Shop & Salon Window: Top Right (Clean UI with Lucide Scissors) */}
      <div className="arch-salon-window">
        {/* Animated Barber Pole */}
        <div className="barber-pole">
          <div className="barber-cap"></div>
          <div className="barber-glass">
            <div className="barber-stripes"></div>
          </div>
          <div className="barber-cap"></div>
        </div>

        {/* Salon Interior Graphic with no overlapping text */}
        <div className="salon-scenery">
          <div className="salon-title-tag">
            <Scissors size={10} strokeWidth={2.4} />
            <span>BARBER SALON</span>
          </div>
          <div className="salon-stations-row">
            <div className="salon-station">
              <div className="station-mirror">
                <div className="mirror-glass"></div>
              </div>
              <div className="station-chair"></div>
            </div>
            <div className="salon-station station-active">
              <div className="station-mirror">
                <div className="mirror-glass"></div>
              </div>
              <div className="station-chair"></div>
            </div>
            <div className="salon-station">
              <div className="station-mirror">
                <div className="mirror-glass"></div>
              </div>
              <div className="station-chair"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Celestial Sun/Moon Golden Art Frame with Lucide icons */}
      <div className="arch-celestial-frame">
        <div className="frame-border">
          <div className="frame-art">
            <Sun size={22} color="#FDE68A" strokeWidth={2.2} className="art-sun-lucide" />
            <Moon size={18} color="#FDE68A" strokeWidth={2.2} className="art-moon-lucide" />
            <Sparkles size={14} color="#FDE68A" strokeWidth={2.2} className="art-stars-lucide" />
          </div>
        </div>
      </div>

      {/* ================= COFFEE BARISTA STATION (EXTENDED LONG BAR) ================= */}
      <div className="arch-coffee-station shifted-up">
        {/* Back Shelves with Coffee Bean Bags and Chalkboard Menu */}
        <div className="coffee-backbar">
          <div className="coffee-bags-row">
            <div className="coffee-bag bag-dark" title="Dark Roast"></div>
            <div className="coffee-bag bag-medium" title="Medium Roast"></div>
            <div className="coffee-bag bag-light" title="Light Roast"></div>
            <div className="coffee-bag bag-special" title="Single Origin"></div>
          </div>
          {/* Chalkboard without the word 'Menu' */}
          <div className="chalkboard-menu no-menu-text">
            <Coffee size={14} color="#FBBF24" strokeWidth={2.4} />
            <div className="menu-lines">
              <span>Espresso</span>
              <span>Latte</span>
              <span>Filter</span>
            </div>
          </div>
        </div>

        {/* Counter Top Equipment (Extended Equipment Row) */}
        <div className="counter-machines-row">
          {/* Coffee Grinder 1 */}
          <div className="coffee-grinder grinder-1" title="Coffee Grinder">
            <div className="grinder-hopper"></div>
            <div className="grinder-body"></div>
          </div>

          {/* Espresso Machine */}
          <div className="espresso-machine" title="Commercial Espresso Machine">
            <div className="espresso-top"></div>
            <div className="espresso-groups">
              <span className="portafilter"></span>
              <span className="portafilter"></span>
            </div>
            <div className="espresso-base"></div>
          </div>

          {/* Barista Character */}
          <div className="barista-figure" title="Barista">
            <div className="barista-hair"></div>
            <div className="barista-head"></div>
            <div className="barista-apron"></div>
          </div>

          {/* Coffee Grinder 2 */}
          <div className="coffee-grinder grinder-2">
            <div className="grinder-hopper"></div>
            <div className="grinder-body"></div>
          </div>

          {/* Colorful Syrup Bottles */}
          <div className="syrup-bottles" title="Flavored Syrups">
            <span className="bottle bottle-blue"></span>
            <span className="bottle bottle-yellow"></span>
            <span className="bottle bottle-purple"></span>
          </div>

          {/* Fresh Pastry Display Glass Dome */}
          <div className="counter-pastry-dome" title="Fresh Pastries">
            <div className="pastry-glass">
              <span className="croissant-item"></span>
            </div>
            <div className="pastry-stand"></div>
          </div>

          {/* Cashier / POS Order Terminal */}
          <div className="counter-pos-terminal" title="POS Cashier Terminal">
            <div className="pos-screen"></div>
            <div className="pos-stand"></div>
          </div>
        </div>

        {/* Counter Wooden Front Wall with Barista Badge */}
        <div className="counter-wooden-front">
          <div className="counter-wood-panel">
            <span className="barista-brand-badge">Barista</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ================= CHAIR & WHOLE TABLE RESERVATION ======================= */}
      {/* ========================================================================= */}

      {/* 1. TABLE 19-22: Top Left Capsule (Seats: 21, 22 on top | 19, 20 on bottom) */}
      <div className="table-set-wrapper set-t19-22">
        {/* Top Stools */}
        <div className="chair-row chair-row-top">
          <button
            type="button"
            className={`stool-vertical stool-top status-${getSeat('21').status}`}
            onClick={() => onSelectSeat(getSeat('21'))}
            title="จองเก้าอี้ 21"
          >
            <span className="chair-num">21</span>
          </button>
          <button
            type="button"
            className={`stool-vertical stool-top status-${getSeat('22').status}`}
            onClick={() => onSelectSeat(getSeat('22'))}
            title="จองเก้าอี้ 22"
          >
            <span className="chair-num">22</span>
          </button>
        </div>

        {/* Capsule Wooden Table - Tap to reserve/manage whole table */}
        <div
          className="table-surface surface-capsule"
          onClick={() => onSelectTableGroup('T19-22', 'โต๊ะ 19-22', ['19', '20', '21', '22'])}
          title="แตะเพื่อจองทั้งโต๊ะ 19-22"
        />

        {/* Bottom Stools */}
        <div className="chair-row chair-row-bottom">
          <button
            type="button"
            className={`stool-vertical stool-bottom status-${getSeat('19').status}`}
            onClick={() => onSelectSeat(getSeat('19'))}
            title="จองเก้าอี้ 19"
          >
            <span className="chair-num">19</span>
          </button>
          <button
            type="button"
            className={`stool-vertical stool-bottom status-${getSeat('20').status}`}
            onClick={() => onSelectSeat(getSeat('20'))}
            title="จองเก้าอี้ 20"
          >
            <span className="chair-num">20</span>
          </button>
        </div>
      </div>

      {/* 2. TABLE 17-18: Middle Left Round Table (Seats: 17 on left | 18 on right) */}
      <div className="table-set-wrapper set-t17-18">
        <button
          type="button"
          className={`stool-lateral stool-left status-${getSeat('17').status}`}
          onClick={() => onSelectSeat(getSeat('17'))}
          title="จองเก้าอี้ 17"
        >
          <span className="chair-num">17</span>
        </button>

        <div
          className="table-surface surface-round"
          onClick={() => onSelectTableGroup('T17-18', 'โต๊ะ 17-18', ['17', '18'])}
          title="แตะเพื่อจองทั้งโต๊ะ 17-18"
        />

        <button
          type="button"
          className={`stool-lateral stool-right status-${getSeat('18').status}`}
          onClick={() => onSelectSeat(getSeat('18'))}
          title="จองเก้าอี้ 18"
        >
          <span className="chair-num">18</span>
        </button>
      </div>

      {/* 3. TABLE 13-16: Center Vertical Oval Table (Seats: 13, 15 on left | 14, 16 on right) */}
      <div className="table-set-wrapper set-t13-16">
        <div className="chair-col chair-col-left">
          <button
            type="button"
            className={`stool-lateral stool-left status-${getSeat('13').status}`}
            onClick={() => onSelectSeat(getSeat('13'))}
            title="จองเก้าอี้ 13"
          >
            <span className="chair-num">13</span>
          </button>
          <button
            type="button"
            className={`stool-lateral stool-left status-${getSeat('15').status}`}
            onClick={() => onSelectSeat(getSeat('15'))}
            title="จองเก้าอี้ 15"
          >
            <span className="chair-num">15</span>
          </button>
        </div>

        <div
          className="table-surface surface-oval-vertical"
          onClick={() => onSelectTableGroup('T13-16', 'โต๊ะ 13-16', ['13', '14', '15', '16'])}
          title="แตะเพื่อจองทั้งโต๊ะ 13-16"
        />

        <div className="chair-col chair-col-right">
          <button
            type="button"
            className={`stool-lateral stool-right status-${getSeat('14').status}`}
            onClick={() => onSelectSeat(getSeat('14'))}
            title="จองเก้าอี้ 14"
          >
            <span className="chair-num">14</span>
          </button>
          <button
            type="button"
            className={`stool-lateral stool-right status-${getSeat('16').status}`}
            onClick={() => onSelectSeat(getSeat('16'))}
            title="จองเก้าอี้ 16"
          >
            <span className="chair-num">16</span>
          </button>
        </div>
      </div>

      {/* 4. TABLE 9-12: Upper Right Capsule Table (Seats: 11, 12 on top | 9, 10 on bottom) */}
      <div className="table-set-wrapper set-t9-12">
        <div className="chair-row chair-row-top">
          <button
            type="button"
            className={`stool-vertical stool-top status-${getSeat('11').status}`}
            onClick={() => onSelectSeat(getSeat('11'))}
            title="จองเก้าอี้ 11"
          >
            <span className="chair-num">11</span>
          </button>
          <button
            type="button"
            className={`stool-vertical stool-top status-${getSeat('12').status}`}
            onClick={() => onSelectSeat(getSeat('12'))}
            title="จองเก้าอี้ 12"
          >
            <span className="chair-num">12</span>
          </button>
        </div>

        <div
          className="table-surface surface-capsule"
          onClick={() => onSelectTableGroup('T9-12', 'โต๊ะ 9-12', ['9', '10', '11', '12'])}
          title="แตะเพื่อจองทั้งโต๊ะ 9-12"
        />

        <div className="chair-row chair-row-bottom">
          <button
            type="button"
            className={`stool-vertical stool-bottom status-${getSeat('9').status}`}
            onClick={() => onSelectSeat(getSeat('9'))}
            title="จองเก้าอี้ 9"
          >
            <span className="chair-num">9</span>
          </button>
          <button
            type="button"
            className={`stool-vertical stool-bottom status-${getSeat('10').status}`}
            onClick={() => onSelectSeat(getSeat('10'))}
            title="จองเก้าอี้ 10"
          >
            <span className="chair-num">10</span>
          </button>
        </div>
      </div>

      {/* 5. TABLE 5-8: Middle Right Capsule Table (Seats: 7, 8 on top | 5, 6 on bottom) */}
      <div className="table-set-wrapper set-t5-8">
        <div className="chair-row chair-row-top">
          <button
            type="button"
            className={`stool-vertical stool-top status-${getSeat('7').status}`}
            onClick={() => onSelectSeat(getSeat('7'))}
            title="จองเก้าอี้ 7"
          >
            <span className="chair-num">7</span>
          </button>
          <button
            type="button"
            className={`stool-vertical stool-top status-${getSeat('8').status}`}
            onClick={() => onSelectSeat(getSeat('8'))}
            title="จองเก้าอี้ 8"
          >
            <span className="chair-num">8</span>
          </button>
        </div>

        <div
          className="table-surface surface-capsule"
          onClick={() => onSelectTableGroup('T5-8', 'โต๊ะ 5-8', ['5', '6', '7', '8'])}
          title="แตะเพื่อจองทั้งโต๊ะ 5-8"
        />

        <div className="chair-row chair-row-bottom">
          <button
            type="button"
            className={`stool-vertical stool-bottom status-${getSeat('5').status}`}
            onClick={() => onSelectSeat(getSeat('5'))}
            title="จองเก้าอี้ 5"
          >
            <span className="chair-num">5</span>
          </button>
          <button
            type="button"
            className={`stool-vertical stool-bottom status-${getSeat('6').status}`}
            onClick={() => onSelectSeat(getSeat('6'))}
            title="จองเก้าอี้ 6"
          >
            <span className="chair-num">6</span>
          </button>
        </div>
      </div>

      {/* 6. TABLE 1-2: Lower Left Round Table (Seats: 2 on top | 1 on bottom) */}
      <div className="table-set-wrapper set-t1-2">
        <button
          type="button"
          className={`stool-vertical stool-top status-${getSeat('2').status}`}
          onClick={() => onSelectSeat(getSeat('2'))}
          title="จองเก้าอี้ 2"
        >
          <span className="chair-num">2</span>
        </button>

        <div
          className="table-surface surface-round-small"
          onClick={() => onSelectTableGroup('T1-2', 'โต๊ะ 1-2', ['1', '2'])}
          title="แตะเพื่อจองทั้งโต๊ะ 1-2"
        />

        <button
          type="button"
          className={`stool-vertical stool-bottom status-${getSeat('1').status}`}
          onClick={() => onSelectSeat(getSeat('1'))}
          title="จองเก้าอี้ 1"
        >
          <span className="chair-num">1</span>
        </button>
      </div>

      {/* 7. TABLE 3-4: Lower Middle Round Table (Seats: 4 on top | 3 on bottom) */}
      <div className="table-set-wrapper set-t3-4">
        <button
          type="button"
          className={`stool-vertical stool-top status-${getSeat('4').status}`}
          onClick={() => onSelectSeat(getSeat('4'))}
          title="จองเก้าอี้ 4"
        >
          <span className="chair-num">4</span>
        </button>

        <div
          className="table-surface surface-round-small"
          onClick={() => onSelectTableGroup('T3-4', 'โต๊ะ 3-4', ['3', '4'])}
          title="แตะเพื่อจองทั้งโต๊ะ 3-4"
        />

        <button
          type="button"
          className={`stool-vertical stool-bottom status-${getSeat('3').status}`}
          onClick={() => onSelectSeat(getSeat('3'))}
          title="จองเก้าอี้ 3"
        >
          <span className="chair-num">3</span>
        </button>
      </div>

      {/* ================= BOTTOM RIGHT: ทางขึ้น (STAIRWAY TO FLOOR 2) ================= */}
      <div
        className="arch-staircase-entrance"
        onClick={() => onSwitchFloor && onSwitchFloor(2)}
        title="ทางขึ้นชั้น 2 (ชั้นลอย & ระเบียง) - แตะเพื่อขึ้นชั้น 2"
      >
        <div className="staircase-steps-pattern">
          <div className="stair-step step-1"></div>
          <div className="stair-step step-2"></div>
          <div className="stair-step step-3"></div>
          <div className="stair-step step-4"></div>
          <div className="stair-step step-5"></div>
        </div>
        <div className="staircase-label-badge">
          <span className="stair-arrow-icon">↑</span>
          <span className="stair-text-primary">ทางขึ้น</span>
          <span className="stair-text-sub">ชั้น 2</span>
        </div>
        <div className="staircase-brass-rail"></div>
      </div>
    </div>
  );
}
