import React from 'react';
import { Bell } from 'lucide-react';

export default function Toast({ message, visible }) {
  return (
    <div className={`toast-banner ${visible ? 'show' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Bell size={16} strokeWidth={2.4} color="var(--orange-primary)" />
      <span id="toastMessage">{message}</span>
    </div>
  );
}
