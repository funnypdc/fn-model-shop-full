'use client'

import { useState, useEffect, useCallback } from 'react'
import { asset } from '@/lib/asset'
import slidesData from '@/data/slide.json'

const SLIDES = slidesData.filter((s) => s.active)

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 4500)
    return () => clearInterval(timer)
  }, [next])

  return (
    <div className="hero-slider">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`slide${i === current ? ' slide-active' : ''}`}
        >
          <img src={asset(slide.image)} alt="" className="slide-img" />
          {(slide.title || slide.subtitle) && (
            <div className="slide-content">
              {slide.title && <h1 className="slide-title">{slide.title}</h1>}
              {slide.subtitle && <p className="slide-subtitle">{slide.subtitle}</p>}
            </div>
          )}
        </div>
      ))}

      {/* Prev / Next */}
      <button className="slide-arrow slide-arrow-prev" onClick={prev} aria-label="ก่อนหน้า">&#8249;</button>
      <button className="slide-arrow slide-arrow-next" onClick={next} aria-label="ถัดไป">&#8250;</button>

      <div className="slide-accent-bar" />

      <div className="slide-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`dot${i === current ? ' dot-active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`สไลด์ ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
