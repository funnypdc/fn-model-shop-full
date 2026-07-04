export function SkeletonHpCard() {
  return (
    <div className="hp-card sk-card">
      <div className="hp-card-img sk-box" />
      <div className="hp-card-body">
        <div className="sk-box sk-line" style={{ width: '85%', marginBottom: 8 }} />
        <div className="sk-box sk-line" style={{ width: '45%' }} />
      </div>
    </div>
  )
}

export function SkeletonGridCard() {
  return (
    <div className="card sk-card">
      <div className="card-image sk-box" />
      <div className="card-body">
        <div className="sk-box sk-line" style={{ width: '40%', marginBottom: 8 }} />
        <div className="sk-box sk-line" style={{ width: '90%', marginBottom: 8 }} />
        <div className="sk-box sk-line" style={{ width: '50%' }} />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <section className="product-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonGridCard key={i} />
      ))}
    </section>
  )
}
