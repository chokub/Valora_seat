# Varola Cafe – Table Management Dashboard ☕

ระบบจัดการโต๊ะอาหารสำหรับคาเฟ่และร้านอาหาร (Table Management System Dashboard) พัฒนาด้วย **React 18 + Vite** สไตล์ Dark Mode ทันสมัย ดีไซน์เฉพาะสำหรับ iPad / Tablet

## 🛠 เทคโนโลยีที่ใช้ (Tech Stack)
- **Framework**: [React 18](https://react.dev/) (Component-Driven Architecture, Hooks)
- **Build Tool**: [Vite 6](https://vitejs.dev/) (Fast HMR & Bundler)
- **Typography**: Google Fonts (Prompt, Plus Jakarta Sans, JetBrains Mono)
- **Styling**: Vanilla CSS Design System with CSS Custom Properties

## 🚀 วิธีการติดตั้งและรันโปรเจกต์ (Getting Started)

1. ติดตั้ง Dependencies:
```bash
npm install
```

2. รันโหมด Development (เปิดเซิร์ฟเวอร์ในเครื่อง):
```bash
npm run dev
```

3. บิลด์สำหรับ Production:
```bash
npm run build
```

## ✨ ฟีเจอร์หลัก
- **Top Header**: แสดงเวลานาฬิกาดิจิทัลเรียลไทม์ภาษาไทย พร้อมสถิติสรุปจำนวนโต๊ะว่าง, มีลูกค้า, และกำลังทำความสะอาด
- **Floor Navigation**: สลับชั้นระหว่าง ชั้น 1 (ห้องโถงหลัก), ชั้น 2 (ชั้นลอย & ระเบียง), และ ชั้น 3 (ห้อง VIP)
- **Interactive Top-Down Floor Plan**: ผังโต๊ะมุมมองด้านบน มีปุ่มโต๊ะทรงกลมและแคปซูล พร้อมสัญลักษณ์พื้นที่ร้าน
- **1-Tap Modal Control**: แตะที่โต๊ะเพื่อเปลี่ยนสถานะ (ว่าง / มีลูกค้า / ทำความสะอาด) ปรับจำนวนลูกค้า และบันทึกหมายเหตุ
