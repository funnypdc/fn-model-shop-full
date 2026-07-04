import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ติดต่อเรา',
  description:
    'ติดต่อ FN Model ร้านเครื่องบิน RC ชั้นนำในไทย สอบถามสินค้า ราคา และบริการหลังการขาย โทร 081-234-5678',
  openGraph: {
    title: 'ติดต่อ FN Model — ร้านเครื่องบิน RC',
    description: 'สอบถามสินค้าเครื่องบิน RC บริการหลังการขาย และราคา ได้ทุกช่องทาง',
  },
}

export default function ContactPage() {
  return (
    <div className="container">
      <section className="section-header">
        <h2>ติดต่อเรา</h2>
      </section>

      <div className="contact-grid">
        <div className="contact-info">
          <h3>FN Model</h3>
          <p className="contact-tagline">ร้านเครื่องบิน RC อันดับ 1 ในไทย</p>

          <ul className="contact-list">
            <li>
              <span className="contact-icon">📍</span>
              <span>123 ถนนพหลโยธิน กรุงเทพมหานคร 10400</span>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <a href="tel:0812345678">081-234-5678</a>
            </li>
            <li>
              <span className="contact-icon">✉️</span>
              <a href="mailto:info@fnmodel.com">info@fnmodel.com</a>
            </li>
            <li>
              <span className="contact-icon">🕐</span>
              <span>จันทร์–เสาร์ 10:00–19:00 น.</span>
            </li>
          </ul>

          <div className="contact-social">
            <a href="#" className="social-btn">Facebook</a>
            <a href="#" className="social-btn">LINE</a>
          </div>
        </div>

        <div className="contact-map">
          <div className="map-placeholder">
            <span>แผนที่</span>
          </div>
        </div>
      </div>
    </div>
  )
}
