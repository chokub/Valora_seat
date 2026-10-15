import React, { useState, useEffect } from 'react';
import { RotateCcw, Clock, CheckCircle2, Users, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import logoValora from '../../picture/logo-valora.png';

export default function Header({ availableCount, occupiedCount, cleaningCount, summaryLabel = 'โต๊ะ', onReset }) {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('th-TH', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' น.'
      );
      setDateStr(
        now.toLocaleDateString('th-TH', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="top-header">
      <div className="header-left">
        {/* Logo: Valora Cafe Brand Logo */}
        <div className="logo-wrap">
          <div className="logo-icon logo-valora-badge" title="Valora Cafe">
            <img src={logoValora} alt="Valora Cafe" className="logo-valora-img" />
          </div>
          <div className="logo-text">
            <div className="logo-title">
              Valora <span className="accent">Cafe</span>
            </div>
            <div className="logo-subtitle">ระบบจัดการโต๊ะอาหาร</div>
          </div>
        </div>

        {/* Current Time Live Badge with Lucide Clock */}
        <div className="live-clock-badge">
          <Clock size={15} className="clock-icon" strokeWidth={2.2} />
          <div className="clock-display">
            <span className="time-digits">{timeStr}</span>
            <span className="date-digits">{dateStr}</span>
          </div>
        </div>
      </div>

      {/* Quick Dashboard Summary with Lucide Icons */}
      <div className="header-summary">
        {/* ว่าง */}
        <div className="stat-card primary-available" title={`จำนวน${summaryLabel}ที่พร้อมให้บริการ`}>
          <CheckCircle2 size={18} className="stat-icon-green" strokeWidth={2.2} />
          <div className="stat-info">
            <span className="stat-label">{summaryLabel === 'ที่นั่ง' ? 'ที่นั่งว่าง' : 'โต๊ะว่าง'}</span>
            <span className="stat-number">{availableCount}</span>
          </div>
        </div>

        {/* มีคน / มีลูกค้า */}
        <div className="stat-card" title={`จำนวน${summaryLabel}ที่มีผู้ใช้งาน`}>
          <Users size={18} className="stat-icon-red" strokeWidth={2.2} />
          <div className="stat-info">
            <span className="stat-label">{summaryLabel === 'ที่นั่ง' ? 'มีคนนั่ง' : 'มีลูกค้า'}</span>
            <span className="stat-number">{occupiedCount}</span>
          </div>
        </div>

        {/* ทำความสะอาด */}
        <div className="stat-card" title={`จำนวน${summaryLabel}ที่กำลังทำความสะอาด`}>
          <Sparkles size={18} className="stat-icon-yellow" strokeWidth={2.2} />
          <div className="stat-info">
            <span className="stat-label">ทำความสะอาด</span>
            <span className="stat-number">{cleaningCount}</span>
          </div>
        </div>

        {/* Fullscreen Button */}
        <button
          className={`btn-fullscreen ${isFullscreen ? 'active' : ''}`}
          onClick={toggleFullscreen}
          title={isFullscreen ? 'ออกจากโหมดเต็มหน้าจอ' : 'เปิดโหมดเต็มหน้าจอ'}
        >
          {isFullscreen ? <Minimize2 size={15} strokeWidth={2.2} /> : <Maximize2 size={15} strokeWidth={2.2} />}
          <span>{isFullscreen ? 'ย่อจอ' : 'เต็มจอ'}</span>
        </button>

        {/* Reset Action with Lucide RotateCcw */}
        <button className="btn-reset" onClick={onReset} title="รีเซ็ตสถานะโต๊ะทั้งหมด">
          <RotateCcw size={15} strokeWidth={2.2} />
          <span>รีเซ็ต</span>
        </button>
      </div>
    </header>
  );
}
