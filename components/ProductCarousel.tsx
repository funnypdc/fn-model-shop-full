'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Product } from '@/lib/products'
import { SkeletonHpCard } from './SkeletonCard'
import { asset } from '@/lib/asset'

export default function ProductCarousel({ products }: { products: Product[] }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [perView, setPerView] = useState(4)
  const [itemWidth, setItemWidth] = useState(0)

  useEffect(() => {
    const update = () => {
      if (!viewportRef.current) return
      const pv = window.innerWidth < 640 ? 1 : 4
      setPerView(pv)
      setItemWidth(viewportRef.current.offsetWidth / pv)
      setIndex(0)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const ready = itemWidth > 0
  const maxIndex = Math.max(0, products.length - perView)

  return (
    <div className="carousel-wrap">
      {ready && index > 0 && (
        <button className="carousel-btn carousel-prev" onClick={() => setIndex((i) => i - 1)} aria-label="ก่อนหน้า">
          ‹
        </button>
      )}

      {/* ref ต้องอยู่ใน DOM เสมอ ไม่ว่าจะ skeleton หรือ ready */}
      <div className="carousel-viewport" ref={viewportRef}>
        <div
          className="carousel-track"
          style={{ transform: ready ? `translateX(${-index * itemWidth}px)` : 'none' }}
        >
          {!ready
            ? Array.from({ length: perView }).map((_, i) => (
                <div key={i} className="carousel-item" style={{ width: `calc(100% / ${perView})` }}>
                  <SkeletonHpCard />
                </div>
              ))
            : products.map((product) => (
                <div key={product.id} className="carousel-item" style={{ width: `${itemWidth}px` }}>
                  <Link href={`/products/${product.id}`} className="hp-card">
                    <div className="hp-card-img">
                      <img src={asset(product.image)} alt={product.name} />
                    </div>
                    <div className="hp-card-body">
                      <p className="hp-card-name">{product.name}</p>
                      <div className="card-price-wrap">
                        {product.originalPrice && (
                          <span className="card-price-original">{product.originalPrice.toLocaleString('th-TH')}.-</span>
                        )}
                        <p className="hp-card-price">{product.price.toLocaleString('th-TH')}.-</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      </div>

      {ready && index < maxIndex && (
        <button className="carousel-btn carousel-next" onClick={() => setIndex((i) => i + 1)} aria-label="ถัดไป">
          ›
        </button>
      )}
    </div>
  )
}
