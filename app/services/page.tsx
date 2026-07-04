import type { Metadata } from 'next'
import Link from 'next/link'
import { bp } from '@/lib/bp'

export const metadata: Metadata = {
  title: 'บริการของเรา',
  description: 'FN Model ให้บริการครบวงจร ซ่อมแซม อัพเกรด สอนบิน และให้คำปรึกษาเครื่องบิน RC โดยทีมงานมืออาชีพ',
  openGraph: {
    title: 'บริการของเรา | FN Model',
    description: 'บริการเครื่องบิน RC ครบวงจร ซ่อมแซม อัพเกรด สอนบิน ให้คำปรึกษา',
  },
}

const SERVICES = [
  {
    icon: '/icon/icon1.png',
    title: 'สร้าง',
    desc: 'FN MODEL บริการสร้าง RC ตามงบ ตามบรีฟลูกค้า ไม่ว่าจะเป็นรถบังคับ เครื่องบินบังคับ หรืองาน hobby อื่นๆ',
  },
  {
    icon: '/icon/icon1.png',
    title: 'ซ่อม',
    desc: 'FN MODEL บริการซ่อมงาน RC ครบวงจร และรับอัพเกรด ให้ RC ของคุณมีประสิทธิภาพในการเล่นให้ดีกว่าเดิม',
  },
  {
    icon: '/icon/icon1.png',
    title: 'ขาย',
    desc: 'FN MODEL บริการขาย เครื่องบินบังคับ รถบังคับสเกล เรือบังคับ และงาน rc hobby อื่นๆ นำเข้าแบรนด์ดังจากต่างประเทศ',
  },
  {
    icon: '/icon/icon1.png',
    title: 'สอน',
    desc: 'FN MODEL รับสอน RC และอื่นๆ หากคุณซื้อเครื่องบินกับเรา เราสอนบินฟรี จนกว่าคุณจะบินเป็น และให้คำปรึกษาตลอดการบริการ',
  },
]

const STEPS = [
  { num: '01', title: 'เลือกสินค้า', desc: 'เลือกเครื่องบิน RC ที่ตรงกับความต้องการจากสินค้าหลากหลายในร้าน หรือปรึกษาทีมงานเพื่อรับคำแนะนำ' },
  { num: '02', title: 'สั่งซื้อ', desc: 'ติดต่อสั่งซื้อผ่าน LINE หรือโทรศัพท์ ทีมงานจะยืนยันคำสั่งซื้อและแจ้งราคาสุดท้ายพร้อมค่าจัดส่ง' },
  { num: '03', title: 'ชำระเงิน', desc: 'ชำระเงินผ่านโอนบัญชีธนาคาร พร้อมเพย์ หรือชำระหน้าร้าน รับใบเสร็จทันที' },
  { num: '04', title: 'รับสินค้า', desc: 'จัดส่งทั่วไทยภายใน 1–3 วันทำการ หรือรับสินค้าด้วยตัวเองที่หน้าร้านได้ทุกวัน' },
]

export default function ServicesPage() {
  return (
    <div className="container">

      {/* ── Section 1: บริการของเรา ── */}
      <section className="svc-hero">
        <h1 className="svc-hero-title">บริการของเรา</h1>
        <p className="svc-hero-sub">FN MODEL RC&amp;HOBBY</p>
      </section>

      <div className="svc-card-grid">
        {SERVICES.map((s) => (
          <div key={s.title} className="svc-card">
            <div className="svc-card-body">
              <p className="svc-card-title">{s.title}</p>
              <p className="svc-card-desc">{s.desc}</p>
            </div>
            <div className="svc-card-icon">
              <img src={bp(s.icon)} alt={s.title} />
            </div>
          </div>
        ))}
      </div>

      <section className="svc-steps-section2">
        <h2 className="svc-about-title">FN MODEL</h2>
        <p className="svc-about-desc">
          ยินดีต้อนรับสู่ FN MODEL ศูนย์รวมความสนุกและความมันส์สำหรับคนรักงานอดิเรก รถ/เครื่องบินบังคับ
          (RC) ทุกชนิดในภาคใต้ เราคือผู้เชี่ยวชาญที่พร้อมจำหน่ายอุปกรณ์ RC คุณภาพสูงโดยเน้นหนักไปที่เครื่องบินบังคับ
          ที่หลากหลายรูปแบบ นอกเหนือจากการจำหน่ายแล้ว เรายังเปิดให้บริการรับสร้าง ประกอบ และซ่อมแซม งาน HOBBY&RC
          ทุกประเภทอย่างครบวงจร ไม่ว่าคุณจะเป็นมือใหม่หรือนักบินผู้ช่ำชองก็ตาม
        </p>
      </section>

      {/* ── Section 2: ขั้นตอนการสั่งซื้อ ── */}
      {/* <section className="svc-steps-section">
        <div className="section-header">
          <h2>ขั้นตอนการสั่งซื้อ</h2>
          <p className="section-sub">ง่าย รวดเร็ว ส่งทั่วไทย</p>
        </div>

        <div className="svc-steps">
          {STEPS.map((s) => (
            <div key={s.num} className="svc-step">
              <div className="svc-step-num">{s.num}</div>
              <div>
                <p className="svc-step-title">{s.title}</p>
                <p className="svc-step-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}

    </div>
  )
}
