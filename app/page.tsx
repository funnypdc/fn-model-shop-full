import Link from 'next/link'
import HeroSlider from '@/components/HeroSlider'
import ProductCarousel from '@/components/ProductCarousel'
import { getFeaturedProducts } from '@/lib/products'
import { bp } from '@/lib/bp'

const AIRCRAFT_TYPES = [
  {
    label: 'สำหรับมือใหม่',
    sub: 'beginner',
    href: '/products/beginner',
    img: '/img/type1.png',
  },
  {
    label: 'เจ็ทดักแฟน (WEDF)',
    sub: 'CutJet',
    href: '/products/electric-jet',
    img: '/img/type2.png',

  },
  {
    label: 'เครื่องบินโดยสาร',
    sub: 'Aircraft',
    href: '/products/passenger',
    img: '/img/type3.png',

  },
  {
    label: 'สงครามโลก',
    sub: 'Warbirds',
    href: '/products/wwii',
    img: '/img/type4.png',

  },
]

export default function HomePage() {
  const featured = getFeaturedProducts()

  return (
    <>
      {/* ── Section 1: Slider ── */}
      <HeroSlider />

      {/* ── Section 2: สินค้าแนะนำ ── */}
      <section className="home-section">
        <h2 className="home-section-title">
          สินค้าแนะนำ <span>( Recommended Products )</span>
        </h2>
        <ProductCarousel products={featured} />
      </section>

      {/* ── Section 3: ประเภทเครื่องบิน ── */}
      <section className="home-section">
        <h2 className="home-section-title">
          ประเภทเครื่องบิน <span>( Aircraft Type )</span>
        </h2>
        <div className="aircraft-grid">
          {AIRCRAFT_TYPES.map((type) => (
            <Link key={type.href} href={type.href} className="aircraft-card">
              <div
                className="aircraft-card-bg"
                style={{ backgroundImage: `url(${bp(type.img)})` }}
              />
              <div className="aircraft-card" />
              <div className="aircraft-card-text">
                {/* <p className="aircraft-label">{type.label}</p>
                <p className="aircraft-sub">{type.sub}</p> */}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
