'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { getAllProducts, searchProducts } from '@/lib/products'

export default function ProductsClient() {
  const searchParams = useSearchParams()
  const query = (searchParams.get('q') ?? '').trim()

  const products = query ? searchProducts(query) : getAllProducts()
  const total = query ? getAllProducts().length : products.length

  return (
    <div className="container">
      <section className="section-header">
        {query ? (
          <>
            <h2>ผลการค้นหา: &ldquo;{query}&rdquo;</h2>
            <p className="section-sub">
              พบ {products.length} รายการ
              {products.length < total && (
                <> &nbsp;·&nbsp; <Link href="/products" className="search-clear">ดูสินค้าทั้งหมด</Link></>
              )}
            </p>
          </>
        ) : (
          <>
            <h2>สินค้าทั้งหมด</h2>
            <p className="section-sub">{products.length} รายการ</p>
          </>
        )}
      </section>

      {products.length === 0 ? (
        <div className="search-empty">
          <p className="search-empty-title">ไม่พบสินค้าที่ตรงกับ &ldquo;{query}&rdquo;</p>
          <p className="search-empty-hint">ลองค้นหาด้วยคำอื่น หรือ</p>
          <Link href="/products" className="search-empty-link">ดูสินค้าทั้งหมด →</Link>
        </div>
      ) : (
        <section className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </div>
  )
}
