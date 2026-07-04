import Link from 'next/link'
import { Product, formatPrice } from '@/lib/products'
import { asset } from '@/lib/asset'

// การ์ดสินค้า 1 ใบ — รับ product เข้ามาแล้วแสดงผล
// ใช้ซ้ำได้ทั้งหน้าแรก หน้าหมวดหมู่ หน้าค้นหา
export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="card">
      <div className={`card-image${!product.inStock ? ' card-image-soldout' : ''}`}>
        <img src={asset(product.image)} alt={product.name} />
        {!product.inStock && <span className="badge">สินค้าหมด</span>}
      </div>
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h3 className="card-title">{product.name}</h3>
        <div className="card-price-wrap">
          {product.originalPrice && (
            <span className="card-price-original">{product.originalPrice.toLocaleString('th-TH')}.-</span>
          )}
          <p className="card-price">{formatPrice(product.price)}</p>
        </div>
      </div>
    </Link>
  )
}
