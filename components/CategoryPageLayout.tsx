import type { CategoryConfig } from '@/lib/categories'
import type { Product } from '@/lib/products'
import Link from 'next/link'
import { formatPrice } from '@/lib/products'
import { bp } from '@/lib/bp'
import { asset } from '@/lib/asset'

interface Props {
  category: CategoryConfig
  products: Product[]
  hideGrid?: boolean
}

export default function CategoryPageLayout({ category, products, hideGrid = false }: Props) {
  return (
    <div className="cpg-wrap">
      {/* Hero */}
      <div className="cpg-hero">
        <img src={bp(category.headerImage)} alt="" className="cpg-hero-img" />
        <div className="cpg-hero-overlay" />
        {/* <div className="cpg-hero-text">
          <h1 className="cpg-hero-title">{category.nameTh}</h1>
          <p className="cpg-hero-sub">{category.nameEn}</p>
        </div> */}
        <div className="cpg-hero-bar" />
      </div>

      {/* Description */}
      <div className="cpg-desc-row">
        <p className="cpg-desc">{category.description}</p>
      </div>

      {/* Product grid */}
      {!hideGrid && (
        <div className="container cpg-container">
          {products.length === 0 ? (
            <div className="cpg-empty">
              <p>ยังไม่มีสินค้าในหมวดนี้ในขณะนี้</p>
            </div>
          ) : (
            <div className="cpg-grid">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="hp-card">
                  <div className="hp-card-img">
                    <img src={asset(product.image)} alt={product.name} />
                  </div>
                  <div className="hp-card-body">
                    <p className="hp-card-name">{product.name}</p>
                    <div className="card-price-wrap">
                      {product.originalPrice && (
                        <span className="card-price-original">{product.originalPrice.toLocaleString('th-TH')}.-</span>
                      )}
                      <p className="hp-card-price">{formatPrice(product.price)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
