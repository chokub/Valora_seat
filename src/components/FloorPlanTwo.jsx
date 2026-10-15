import React from 'react';

export default function FloorPlanTwo({ seats = [], onSelectSeat, onSelectTableGroup, onSwitchFloor }) {
  // Helper to get a seat object by its number
  const getSeat = (num) => {
    return seats.find((s) => s.num === String(num)) || { num, status: 'available' };
  };

  return (
    <div className="floor2-layout-container">
      {/* ================= 1. TOP-LEFT: ทางขึ้น ชั้น 3 ================= */}
      <div
        className="arch-staircase-section"
        onClick={() => onSwitchFloor && onSwitchFloor(3)}
        title="ทางขึ้นชั้น 3 (ห้อง VIP & โซนทำงาน) - แตะเพื่อขึ้นชั้น 3"
      >
        {/* Full-width elegant wooden stair flight */}
        <div className="stair-flight-treads">
          <div className="stair-tread">
            <span className="stair-arrow">↑</span>
          </div>
          <div className="stair-tread"></div>
          <div className="stair-tread"></div>
          <div className="stair-tread"></div>
          <div className="stair-tread"></div>
          <div className="stair-tread"></div>
        </div>

        {/* Badge: ทางขึ้น ชั้น 3 */}
        <div className="staircase-f2-badge">
          <span className="stair-arrow-icon">↑</span>
          <span className="stair-text-primary">ทางขึ้น</span>
          <span className="stair-text-sub">ชั้น 3</span>
        </div>
      </div>

      {/* ================= 2. TOP-RIGHT: โต๊ะ 31-34 & โต๊ะ 27-30 ================= */}
      {/* TABLE 31-34: Upper Horizontal Capsule Table (Seats 31, 32 top | 33, 34 bottom) */}
      <div className="table-set-wrapper f2-set-t31-34">
        <div className="chair-row chair-row-top">
          <button
            type="button"
            className={`stool-vertical stool-top status-${getSeat('31').status}`}
            onClick={() => onSelectSeat(getSeat('31'))}
            title="จองเก้าอี้ 31"
          >
            <span className="chair-num">31</span>
          </button>
          <button
            type="button"
            className={`stool-vertical stool-top status-${getSeat('32').status}`}
            onClick={() => onSelectSeat(getSeat('32'))}
            title="จองเก้าอี้ 32"
          >
            <span className="chair-num">32</span>
          </button>
        </div>

        <div
          className="table-surface surface-capsule"
          onClick={() => onSelectTableGroup('T31-34', 'โต๊ะ 31-34', ['31', '32', '33', '34'])}
          title="แตะเพื่อจองทั้งโต๊ะ 31-34"
        />

        <div className="chair-row chair-row-bottom">
          <button
            type="button"
            className={`stool-vertical stool-bottom status-${getSeat('33').status}`}
            onClick={() => onSelectSeat(getSeat('33'))}
            title="จองเก้าอี้ 33"
          >
            <span className="chair-num">33</span>
          </button>
          <button
            type="button"
            className={`stool-vertical stool-bottom status-${getSeat('34').status}`}
            onClick={() => onSelectSeat(getSeat('34'))}
            title="จองเก้าอี้ 34"
          >
            <span className="chair-num">34</span>
          </button>
        </div>
      </div>

      {/* TABLE 27-30: Lower Horizontal Capsule Table (Seats 27, 28 top | 29, 30 bottom) */}
      <div className="table-set-wrapper f2-set-t27-30">
        <div className="chair-row chair-row-top">
          <button
            type="button"
            className={`stool-vertical stool-top status-${getSeat('27').status}`}
            onClick={() => onSelectSeat(getSeat('27'))}
            title="จองเก้าอี้ 27"
          >
            <span className="chair-num">27</span>
          </button>
          <button
            type="button"
            className={`stool-vertical stool-top status-${getSeat('28').status}`}
            onClick={() => onSelectSeat(getSeat('28'))}
            title="จองเก้าอี้ 28"
          >
            <span className="chair-num">28</span>
          </button>
        </div>

        <div
          className="table-surface surface-capsule"
          onClick={() => onSelectTableGroup('T27-30', 'โต๊ะ 27-30', ['27', '28', '29', '30'])}
          title="แตะเพื่อจองทั้งโต๊ะ 27-30"
        />

        <div className="chair-row chair-row-bottom">
          <button
            type="button"
            className={`stool-vertical stool-bottom status-${getSeat('29').status}`}
            onClick={() => onSelectSeat(getSeat('29'))}
            title="จองเก้าอี้ 29"
          >
            <span className="chair-num">29</span>
          </button>
          <button
            type="button"
            className={`stool-vertical stool-bottom status-${getSeat('30').status}`}
            onClick={() => onSelectSeat(getSeat('30'))}
            title="จองเก้าอี้ 30"
          >
            <span className="chair-num">30</span>
          </button>
        </div>
      </div>

      {/* ================= 3. MIDDLE-RIGHT TO LOWER-RIGHT: GRAND ATRIUM VOID ================= */}
      {/* Unified large rectangular void opening looking down to Floor 1, located below Table 27-30 */}
      <div className="f2-atrium-frame f2-atrium-grand">
        {/* Brass Handrail & Glass Balustrade Edge */}
        <div className="atrium-balustrade-rail">
          <span className="atrium-post post-tl"></span>
          <span className="atrium-post post-tr"></span>
          <span className="atrium-post post-bl"></span>
          <span className="atrium-post post-br"></span>
          <span className="atrium-post post-tm"></span>
          <span className="atrium-post post-bm"></span>
          <span className="atrium-post post-ml"></span>
          <span className="atrium-post post-mr"></span>
        </div>

        {/* Floor 1 Look-Down Interior Scene */}
        <div className="atrium-viewport-floor1">
          <div className="f1-below-grand-scene">
            <div className="f1-below-marble-floor">
              {/* Floor 1 Lounge View */}
              <div className="f1-below-lounge">
                <div className="f1-lounge-chair chair-left"></div>
                <div className="f1-lounge-table"></div>
                <div className="f1-lounge-chair chair-right"></div>
              </div>

              {/* Floor 1 Dining scene view */}
              <div className="f1-below-dining-table">
                <div className="f1-dining-chairs-top">
                  <span className="dining-mini-chair"></span>
                  <span className="dining-mini-chair"></span>
                  <span className="dining-mini-chair"></span>
                </div>
                <div className="f1-dining-table-surface"></div>
                <div className="f1-dining-chairs-bottom">
                  <span className="dining-mini-chair"></span>
                  <span className="dining-mini-chair"></span>
                  <span className="dining-mini-chair"></span>
                </div>
              </div>

              {/* Sunlight streaming from high window */}
              <div className="f1-below-window-glare"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 4. BOTTOM-LEFT: โต๊ะ 25-26 & โต๊ะ 23-24 (แนวตั้ง) ================= */}
      {/* TABLE 25-26: Vertical Capsule Table (Seat 26 top | Seat 25 bottom) */}
      <div className="table-set-wrapper f2-set-t25-26">
        <button
          type="button"
          className={`stool-vertical stool-top status-${getSeat('26').status}`}
          onClick={() => onSelectSeat(getSeat('26'))}
          title="จองเก้าอี้ 26"
        >
          <span className="chair-num">26</span>
        </button>

        <div
          className="table-surface surface-capsule-vertical-small"
          onClick={() => onSelectTableGroup('T25-26', 'โต๊ะ 25-26', ['25', '26'])}
          title="แตะเพื่อจองทั้งโต๊ะ 25-26"
        />

        <button
          type="button"
          className={`stool-vertical stool-bottom status-${getSeat('25').status}`}
          onClick={() => onSelectSeat(getSeat('25'))}
          title="จองเก้าอี้ 25"
        >
          <span className="chair-num">25</span>
        </button>
      </div>

      {/* TABLE 23-24: Vertical Capsule Table (Seat 24 top | Seat 23 bottom) */}
      <div className="table-set-wrapper f2-set-t23-24">
        <button
          type="button"
          className={`stool-vertical stool-top status-${getSeat('24').status}`}
          onClick={() => onSelectSeat(getSeat('24'))}
          title="จองเก้าอี้ 24"
        >
          <span className="chair-num">24</span>
        </button>

        <div
          className="table-surface surface-capsule-vertical-small"
          onClick={() => onSelectTableGroup('T23-24', 'โต๊ะ 23-24', ['23', '24'])}
          title="แตะเพื่อจองทั้งโต๊ะ 23-24"
        />

        <button
          type="button"
          className={`stool-vertical stool-bottom status-${getSeat('23').status}`}
          onClick={() => onSelectSeat(getSeat('23'))}
          title="จองเก้าอี้ 23"
        >
          <span className="chair-num">23</span>
        </button>
      </div>
    </div>
  );
}
