# 040213103 การเขียนโปรแกรมคอมพิวเตอร์สำหรับคณิตศาสตร์ (2/2569)

เว็บรายวิชาสำหรับนักศึกษา: แผนการสอน และสไลด์รายบท (เปิดอ่านบนเว็บ/ดาวน์โหลด PDF)

## โครงสร้าง
```
index.html          หน้าเว็บ (แท็บ แผนการสอน / สไลด์)
assets/data.js      ข้อมูลรายวิชา + รายการสไลด์  ← แก้ไฟล์นี้เมื่อเปลี่ยนเนื้อหา
assets/style.css    รูปแบบ (โทน แดง-ดำ-เทา-ขาว)
assets/app.js       การทำงานของหน้าเว็บ
slides/chXX.pdf     ไฟล์ PDF ของแต่ละบท
slides/chXX/p-NN.jpg  ภาพแต่ละหน้า (ใช้แสดงบนเว็บ) และ thumb.jpg = ภาพปก
```

## เพิ่ม/แก้สไลด์บทใหม่
```bash
pdftoppm -jpeg -jpegopt quality=82 -scale-to-x 1440 -scale-to-y -1 บทที่11.pdf slides/ch11/p
pdftoppm -jpeg -scale-to-x 560 -scale-to-y -1 -f 1 -l 1 -singlefile บทที่11.pdf slides/ch11/thumb
cp บทที่11.pdf slides/ch11.pdf
```
แล้วเพิ่มบรรทัดใน `SLIDES` ของ `assets/data.js` (ระบุจำนวนหน้า `pages`)

## เผยแพร่ด้วย GitHub Pages
Settings → Pages → Source: *Deploy from a branch* → Branch `main` / `(root)`

## หน้าแรก (ฉาก 3 มิติ)
โค้ดต้นฉบับอยู่ที่ `src/hero3d.js` (ใช้ Three.js) และรวมเป็นไฟล์เดียวที่ `assets/hero3d.js`
ถ้าแก้ `src/hero3d.js` ให้ build ใหม่ด้วย:
```bash
npm i three esbuild
npx esbuild src/hero3d.js --bundle --minify --format=iife --outfile=assets/hero3d.js
```
