'use client'

import { useState } from 'react'
import { asset } from '@/lib/asset'

export default function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a - 1 + images.length) % images.length)
  const next = () => setActive((a) => (a + 1) % images.length)

  return (
    <div className="gallery">
      <div className="gallery-main">
        <img src={asset(images[active])} alt={name} />
        {images.length > 1 && (
          <>
            <button className="gallery-arrow gallery-arrow-prev" onClick={prev} aria-label="ก่อนหน้า">&#8249;</button>
            <button className="gallery-arrow gallery-arrow-next" onClick={next} aria-label="ถัดไป">&#8250;</button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="gallery-thumbs">
          {images.map((src, i) => (
            <button
              key={i}
              className={`gallery-thumb${i === active ? ' gallery-thumb-active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`รูปที่ ${i + 1}`}
            >
              <img src={asset(src)} alt={`${name} ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
