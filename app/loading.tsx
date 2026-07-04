import { SkeletonHpCard } from '@/components/SkeletonCard'

export default function Loading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="sk-box" style={{ height: 420, borderRadius: 0 }} />

      {/* Carousel skeleton */}
      <section className="home-section">
        <div className="sk-box sk-line" style={{ width: 280, height: 24, margin: '0 auto 24px' }} />
        <div style={{ display: 'flex', gap: 0 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ flex: '0 0 25%', padding: '0 8px' }}>
              <SkeletonHpCard />
            </div>
          ))}
        </div>
      </section>

      {/* Aircraft type grid skeleton */}
      <section className="home-section">
        <div className="sk-box sk-line" style={{ width: 240, height: 24, margin: '0 auto 24px' }} />
        <div className="aircraft-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="sk-box" style={{ aspectRatio: '16/9', borderRadius: 12 }} />
          ))}
        </div>
      </section>
    </>
  )
}
