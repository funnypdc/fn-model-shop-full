export default function Loading() {
  return (
    <div className="container">
      <section className="section-header" style={{ marginBottom: 32 }}>
        <div className="sk-box sk-line" style={{ width: 160, height: 28 }} />
      </section>

      <div className="contact-grid">
        <div className="contact-info" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="sk-box sk-line" style={{ width: 120, height: 22 }} />
          <div className="sk-box sk-line" style={{ width: 200, height: 16 }} />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="sk-box sk-line" style={{ width: '80%', height: 16 }} />
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <div className="sk-box" style={{ width: 100, height: 36, borderRadius: 8 }} />
            <div className="sk-box" style={{ width: 100, height: 36, borderRadius: 8 }} />
          </div>
        </div>

        <div className="contact-map">
          <div className="sk-box" style={{ height: 280, borderRadius: 12 }} />
        </div>
      </div>
    </div>
  )
}
