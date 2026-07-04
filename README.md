# ร้านเฟอร์นิเจอร์ — Next.js Static Shop

เว็บแสดงสินค้าแบบ static อ่านข้อมูลจาก JSON ไม่ต้องมี backend
Deploy ฟรีได้บน Vercel / Cloudflare Pages / GitHub Pages

## เริ่มใช้งาน

```bash
npm install
npm run dev      # เปิด http://localhost:3000
```

## Build เป็น static

```bash
npm run build    # ได้โฟลเดอร์ out/ พร้อม deploy
```

## โครงสร้าง

| โฟลเดอร์ | หน้าที่ |
|---|---|
| `data/products.json` | ข้อมูลสินค้า — แก้ที่นี่ที่เดียว |
| `lib/products.ts` | ฟังก์ชันดึงข้อมูล + type — วันหลังย้ายไป DB แก้แค่ไฟล์นี้ |
| `components/` | ชิ้นส่วน UI ใช้ซ้ำ (ProductCard, Header, Footer) |
| `app/` | หน้าเว็บ (หน้าแรก + หน้ารายละเอียดสินค้า) |
| `public/img/` | รูปสินค้า |

## วิธีเพิ่มสินค้า

1. ใส่รูปใน `public/img/`
2. เพิ่ม object ใหม่ใน `data/products.json`
3. `npm run build` แล้ว deploy ใหม่

## ต่อยอดได้ง่ายๆ

- **หน้าหมวดหมู่**: ใช้ `getProductsByCategory()` ที่มีให้แล้วใน lib
- **ช่องค้นหา**: filter จาก `getAllProducts()`
- **รับฟอร์มติดต่อ**: ต่อ Formspree / Web3Forms (ไม่ต้องเขียน backend)
- **แก้สินค้าผ่านหน้า admin**: ย้ายข้อมูลไป headless CMS (Sanity) แล้วแก้แค่ `lib/products.ts`

## SEO ที่ทำไว้ให้แล้ว

- metadata + title ต่อหน้า
- Open Graph (แชร์แล้วขึ้นรูป)
- JSON-LD structured data (ราคาขึ้นใน Google ได้)
- sitemap.xml อัตโนมัติ — **อย่าลืมแก้ `BASE_URL` ใน `app/sitemap.ts` เป็น domain จริง**
