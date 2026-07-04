import type { Metadata } from 'next'
import { Suspense } from 'react'
import ProductsClient from './ProductsClient'
import { SkeletonGrid } from '@/components/SkeletonCard'

export const metadata: Metadata = {
  title: 'เครื่องบิน RC ทั้งหมด | FN Model',
  description: 'รวมเครื่องบิน RC ทุกประเภท มือใหม่ถึงมืออาชีพ สินค้าของแท้',
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container" style={{ paddingTop: 40 }}><SkeletonGrid /></div>}>
      <ProductsClient />
    </Suspense>
  )
}
