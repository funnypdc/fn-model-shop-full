import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategoryBySlug } from '@/lib/categories'
import { getProductsByCategory } from '@/lib/products'
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const metadata: Metadata = {
  title: 'เครื่องบินโดยสาร | FN Model',
  description: 'โมเดลเครื่องบินโดยสารสายการบินดัง ขนาดใหญ่ รายละเอียดสวยงาม สมจริง',
}

export default function PassengerPage() {
  const category = getCategoryBySlug('passenger')
  if (!category) notFound()
  const products = getProductsByCategory(category.categoryKey)
  return <CategoryPageLayout category={category} products={products} />
}
