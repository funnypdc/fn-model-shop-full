import type { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/products'

export const dynamic = 'force-static'

const BASE_URL = 'https://fnmodel.com'

const STATIC_PAGES = [
  { url: BASE_URL, priority: 1.0 },
  { url: `${BASE_URL}/products`, priority: 0.9 },
  { url: `${BASE_URL}/products/beginner`, priority: 0.8 },
  { url: `${BASE_URL}/products/electric-jet`, priority: 0.8 },
  { url: `${BASE_URL}/products/passenger`, priority: 0.8 },
  { url: `${BASE_URL}/products/wwii`, priority: 0.8 },
  { url: `${BASE_URL}/services`, priority: 0.7 },
  { url: `${BASE_URL}/contact`, priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const productPages = getAllProducts().map((p) => ({
    url: `${BASE_URL}/products/${p.id}`,
    lastModified: new Date(),
    priority: 0.7,
  }))

  const staticPages = STATIC_PAGES.map((p) => ({
    url: p.url,
    lastModified: new Date(),
    priority: p.priority,
  }))

  return [...staticPages, ...productPages]
}
