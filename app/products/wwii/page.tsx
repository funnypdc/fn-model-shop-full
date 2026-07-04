import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategoryBySlug } from '@/lib/categories'
import { getProductsByCategory } from '@/lib/products'
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const metadata: Metadata = {
  title: 'เครื่องบินสงครามโลก (Warbirds) | FN Model',
  description: 'เครื่องบินรบในสงครามโลกครั้งที่ 2 ทรงคลาสสิก หายาก น่าสะสม',
}

export default function WwiiPage() {
  const category = getCategoryBySlug('wwii')
  if (!category) notFound()
  const products = getProductsByCategory(category.categoryKey)
  return <CategoryPageLayout category={category} products={products} />
}
