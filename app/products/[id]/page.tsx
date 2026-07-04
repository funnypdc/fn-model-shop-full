import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllProducts, getProductById } from '@/lib/products'
import ImageGallery from '@/components/ImageGallery'
import ProductCarousel from '@/components/ProductCarousel'

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id }))
}

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
    openGraph: { title: product.name, description: product.description, images: [product.image] },
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) notFound()

  const others = getAllProducts().filter((p) => p.id !== product.id)
  const sameCategory = others.filter((p) => p.category === product.category)
  const different = others.filter((p) => p.category !== product.category)
  const related = [...sameCategory, ...different].slice(0, 4)
  const images = product.images?.length ? product.images : [product.image]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'THB',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  }

  return (
    <div className="pd-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Title */}
      <h1 className="pd-title">{product.name} {product.description}</h1>
      <div className="pd-title-line" />

      {/* Main layout */}
      <div className="pd-body">
        {/* Left: Gallery */}
        <ImageGallery images={images} name={product.name} />

        {/* Right: Info */}
        <div className="pd-info">
          <p className="pd-short-desc">{product.description}</p>

          {/* Options table */}
          {product.options && product.options.length > 0 && (
            <div className="pd-options">
              <div className="pd-options-header">รายละเอียดออฟชั่น</div>
              <table className="pd-options-table">
                <tbody>
                  {product.options.map((opt, i) => (
                    <tr key={i}>
                      <td className="pd-opt-label">{opt.label}</td>
                      <td className={`pd-opt-val ${opt.have ? 'opt-have' : 'opt-none'}`}>
                        {opt.have ? 'มี' : 'ไม่มี'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Packages */}
          {product.packages && product.packages.length > 0 && (
            <div className="pd-packages">
              {product.packages.map((pkg, i) => (
                <div key={i} className={`pd-pkg ${i === 0 ? 'pd-pkg-primary' : 'pd-pkg-dark'}`}>
                  <div className="pd-pkg-label">
                    {pkg.label}
                    <span className="pd-pkg-price-wrap">
                      {pkg.originalPrice && (
                        <span className="pd-pkg-original">{pkg.originalPrice.toLocaleString('th-TH')}.-</span>
                      )}
                      <span>{pkg.price.toLocaleString('th-TH')}.-</span>
                    </span>
                  </div>
                  <div className="pd-pkg-desc">{pkg.description}</div>
                </div>
              ))}
            </div>
          )}

          {/* Full description */}
          <p className="pd-full-desc">{product.fullDescription || product.description}</p>

          {/* Stock status + Buy button */}
          {product.inStock ? (
            <a href="https://www.facebook.com/profile.php?id=61552498465017" className="pd-buy-btn" target="_blank" rel="noopener noreferrer">
              สั่งซื้อ
            </a>
          ) : (
            <div className="pd-soldout-wrap">
              <div className="pd-soldout-banner">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span>สินค้าหมดชั่วคราว</span>
              </div>
              <p className="pd-soldout-note">สินค้าขณะนี้หมด กรุณาติดต่อเราเพื่อสอบถามสต็อก</p>
              <a href="https://www.facebook.com/profile.php?id=61552498465017" className="pd-buy-btn pd-buy-btn-disabled" target="_blank" rel="noopener noreferrer">
                สอบถามสต็อก
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="pd-related">
          <h2 className="home-section-title">
            สินค้าที่เกี่ยวข้อง <span>(Related Products)</span>
          </h2>
          <ProductCarousel products={related} />
        </div>
      )}
    </div>
  )
}
