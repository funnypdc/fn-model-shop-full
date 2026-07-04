import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategoryBySlug } from '@/lib/categories'
import { getProductsByCategory } from '@/lib/products'
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const metadata: Metadata = {
  title: 'เครื่องบินสำหรับมือใหม่ | FN Model',
  description: 'เครื่องบินบังคับ RC สำหรับผู้เริ่มต้น บินง่าย เสถียร เหมาะกับผู้ที่เพิ่งเริ่มต้นเล่น RC',
}

export default function BeginnerPage() {
  const category = getCategoryBySlug('beginner')
  if (!category) notFound()
  const products = getProductsByCategory(category.categoryKey)
  return <CategoryPageLayout category={category} products={products} />
}
