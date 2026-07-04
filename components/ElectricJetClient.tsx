'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/products'
import { formatPrice } from '@/lib/products'
import { asset } from '@/lib/asset'
import availableSizes from '@/data/category-cutjet.json'

interface Props {
  products: Product[]
}

export default function ElectricJetClient({ products }: Props) {
  const [activeSize, setActiveSize] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const sizes = availableSizes

  const filtered = useMemo(() => {
    if (!activeSize) return products
    return products.filter((p) => p.size === activeSize)
  }, [products, activeSize])

  function selectSize(size: string | null) {
    setActiveSize(size)
    setDropdownOpen(false)
  }

  const label = activeSize ? `ขนาด ${activeSize}.` : 'ทุกขนาด'

  return (
    <div className="ej-main">
      {/* Mobile dropdown */}
      {sizes.length > 0 && (
        <div className="ej-dropdown">
          <button
            className="ej-dropdown-trigger"
            onClick={() => setDropdownOpen((o) => !o)}
            aria-expanded={dropdownOpen}
          >
            <span>{label}</span>
            <svg
              className={`ej-chevron${dropdownOpen ? ' ej-chevron--open' : ''}`}
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="ej-dropdown-menu">
              <button
                className={`ej-dropdown-item${!activeSize ? ' ej-dropdown-item--active' : ''}`}
                onClick={() => selectSize(null)}
              >
                ทุกขนาด
              </button>
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`ej-dropdown-item${activeSize === size ? ' ej-dropdown-item--active' : ''}`}
                  onClick={() => selectSize(size)}
                >
                  ขนาด {size}.
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="ej-layout">
        {/* Desktop sidebar */}
        {sizes.length > 0 && (
          <aside className="ej-sidebar">
            <button
              className={`ej-size-item${!activeSize ? ' ej-size-item--active' : ''}`}
              onClick={() => setActiveSize(null)}
            >
              ทุกขนาด
            </button>
            {sizes.map((size) => (
              <button
                key={size}
                className={`ej-size-item${activeSize === size ? ' ej-size-item--active' : ''}`}
                onClick={() => setActiveSize(size)}
              >
                ขนาด {size}.
              </button>
            ))}
          </aside>
        )}

        <div className="ej-content">
          {filtered.length === 0 ? (
            <div className="cpg-empty">
              <p>ขออภัย! ไม่พบสินค้าสำหรับขนาดที่เลือก</p>
            </div>
          ) : (
            <div className="cpg-grid">
              {filtered.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="hp-card">
                  <div className="hp-card-img">
                    <img src={asset(product.image)} alt={product.name} />
                  </div>
                  <div className="hp-card-body">
                    <p className="hp-card-name">{product.name}</p>
                    <div className="card-price-wrap">
                      {product.originalPrice && (
                        <span className="card-price-original">
                          {product.originalPrice.toLocaleString('th-TH')}.-
                        </span>
                      )}
                      <p className="hp-card-price">{formatPrice(product.price)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
