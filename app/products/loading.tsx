import { SkeletonGrid } from '@/components/SkeletonCard'

export default function Loading() {
  return (
    <div className="container" style={{ paddingTop: 40 }}>
      <div className="section-header" style={{ marginBottom: 24 }}>
        <div className="sk-box sk-line" style={{ width: 200, height: 28, marginBottom: 10 }} />
        <div className="sk-box sk-line" style={{ width: 100, height: 16 }} />
      </div>
      <SkeletonGrid count={8} />
    </div>
  )
}
