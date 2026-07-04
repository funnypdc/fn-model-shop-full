import { SkeletonGrid } from '@/components/SkeletonCard'

export default function Loading() {
  return (
    <>
      <div className="sk-box" style={{ height: 320, borderRadius: 0 }} />
      <div className="container" style={{ paddingTop: 32 }}>
        <SkeletonGrid count={6} />
      </div>
    </>
  )
}
