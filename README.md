# Valora Cafe Seat Map — Deploy instructions

สรุป: เว็บนี้เป็น static site (ไฟล์: `index.html`, `script.js`, `styles.css`) — เหมาะสำหรับโฮสต์บน GitHub Pages, Netlify หรือ Vercel. ต่อไปนี้วิธีการที่แนะนำสำหรับ POS ที่มีอินเทอร์เน็ต.

ตัวเลือก A — GitHub Pages (แนะนำ)
- สร้าง repository ใหม่บน GitHub และ push โค้ดนี้ขึ้น `main` (หรือ `master`).
- Workflow ที่เพิ่มไว้จะ deploy อัตโนมัติเมื่อคุณ push ขึ้น `main`/`master`.

ตัวอย่างคำสั่ง (จากโฟลเดอร์โปรเจค):
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

หลัง push แล้ว: ไปที่ GitHub repo → Settings → Pages (หรือ Pages ใน sidebar) เพื่อยืนยันว่า Pages เปิดอยู่ (โดยปกติ workflow จะจัดการให้). รอไม่กี่นาทีแล้วเข้าที่ `https://<your-username>.github.io/<repo-name>/` เพื่อทดสอบ.

ตัวเลือก B — Netlify (ง่ายสำหรับ drag-and-drop)
- เข้า https://app.netlify.com/sites
- ลากโฟลเดอร์โปรเจคทั้งโฟลเดอร์ (มี `index.html`) ไปวางใน Netlify (Drag & Drop deploy)
- หรือเชื่อม Git repo กับ Netlify เพื่อ deploy อัตโนมัติเมื่อ push

ตัวเลือก C — Vercel (คล้าย Netlify)

Kiosk / POS notes:
- ถ้า POS จะเปิดในโหมด Kiosk: ตั้งเบราว์เซอร์ให้เปิด URL ของ site แบบเต็มหน้าจอ.
- ถ้าต้องการทำงานแบบ offline: แจ้งผม ผมจะเพิ่ม PWA service worker เพื่อ cache ไฟล์.

ถ้าคุณต้องการ ผมจะ:
- ช่วยสร้าง GitHub repo และ push ให้ (ต้องให้ผมสิทธิหรือตั้งค่า token) — หรือ
- ให้คำสั่งที่ต้องรันบนเครื่องของคุณทีละขั้นตอน และยืนยันเมื่อ deploy เสร็จ.

แจ้งผมว่าต้องการแบบไหน (GitHub Pages / Netlify / Vercel / แค่ ZIP) ผมจะดำเนินการต่อ.
