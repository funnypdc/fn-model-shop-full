export default function Loading() {
  return (
    <div className="pd-wrap">
      <div className="sk-box sk-line" style={{ width: '60%', height: 32, marginBottom: 8 }} />
      <div className="pd-title-line" />

      <div className="pd-body">
        {/* image skeleton */}
        <div className="sk-box" style={{ aspectRatio: '4/3', borderRadius: 8, flex: '0 0 420px' }} />

        {/* info skeleton */}
        <div className="pd-info" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="sk-box sk-line" style={{ width: '80%', height: 18 }} />
          <div className="sk-box sk-line" style={{ width: '60%', height: 18 }} />
          <div className="sk-box" style={{ height: 120, borderRadius: 8, marginTop: 8 }} />
          <div className="sk-box" style={{ height: 80, borderRadius: 8 }} />
          <div className="sk-box" style={{ height: 80, borderRadius: 8 }} />
          <div className="sk-box" style={{ height: 48, borderRadius: 8, width: '50%' }} />
        </div>
      </div>
    </div>
  )
}
