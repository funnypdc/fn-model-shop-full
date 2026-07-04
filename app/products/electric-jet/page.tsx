import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategoryBySlug } from '@/lib/categories'
import { getProductsByCategory } from '@/lib/products'
import CategoryPageLayout from '@/components/CategoryPageLayout'
import ElectricJetClient from '@/components/ElectricJetClient'

export const metadata: Metadata = {
  title: 'เครื่องบินเจ็ทดักแฟน (WEDF) | FN Model',
  description: 'เครื่องบินเจ็ทดักแฟน (WEDF) ความเร็วสูง สมจริง ทรงพลัง เสียงเหมือนจริง',
}

export default function ElectricJetPage() {
  const category = getCategoryBySlug('electric-jet')
  if (!category) notFound()
  const products = getProductsByCategory(category.categoryKey)
  return (
    <>
      <CategoryPageLayout category={category} products={[]} hideGrid />
      <ElectricJetClient products={products} />
    </>
  )
}
