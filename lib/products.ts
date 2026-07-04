import productsData from '@/data/products.json'

export type ProductOption = {
  label: string
  have: boolean
}

export type ProductPackage = {
  label: string
  price: number
  originalPrice?: number
  description: string
}

export type Product = {
  id: string
  name: string
  price: number
  category: string
  size?: string
  image: string
  images?: string[]
  description: string
  fullDescription?: string
  originalPrice?: number
  inStock: boolean
  featured: boolean
  active?: boolean
  options?: ProductOption[]
  packages?: ProductPackage[]
}

const products = productsData as Product[]
const activeProducts = products.filter((p) => p.active !== false)

export function getAllProducts(): Product[] {
  return activeProducts
}

export function getProductById(id: string): Product | undefined {
  return activeProducts.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return activeProducts.filter((p) => p.category === category)
}

export function getAllCategories(): string[] {
  return [...new Set(activeProducts.map((p) => p.category))]
}

export function getFeaturedProducts(): Product[] {
  return activeProducts.filter((p) => p.featured)
}

function normalizeText(s: string): string {
  return s.toLowerCase().replace(/[-_.\s/]/g, '')
}

// คำพ้องความหมาย ไทย ↔ อังกฤษ สำหรับศัพท์เครื่องบิน RC ที่พบบ่อย
// พิมพ์คำใดคำหนึ่งในกลุ่มเดียวกัน จะค้นเจออีกฝั่งด้วย
const SYNONYM_GROUPS: string[][] = [
  ['แฟลบ', 'flap', 'flaps'],
  ['เก็บล้อ', 'gear', 'retract', 'retracts', 'landing gear'],
  ['ไฟ', 'light', 'lights', 'led'],
  ['ทรงตัว', 'stab', 'stabilizer', 'safe', 'gyro'],
  ['เจ็ท', 'ดักแฟน', 'jet', 'edf'],
  ['มือใหม่', 'beginner', 'trainer', 'ฝึกบิน'],
  ['สงครามโลก', 'สงคราม', 'warbird', 'warbirds', 'wwii'],
  ['โดยสาร', 'passenger', 'airliner'],
  ['ความเร็วสูง', 'speed', 'fast', 'เร็ว'],
]

function getSynonyms(keyword: string): string[] {
  const k = keyword.toLowerCase()
  const group = SYNONYM_GROUPS.find((g) => g.some((w) => w.toLowerCase() === k))
  return group ? group.filter((w) => w.toLowerCase() !== k) : []
}

export function searchProducts(query: string): Product[] {
  const raw = query.trim()
  if (!raw) return []

  const keywords = raw.toLowerCase().split(/\s+/).filter(Boolean)

  const scored = activeProducts.map((p) => {
    const fields = [
      p.name,
      p.description,
      p.fullDescription ?? '',
      p.category,
      ...(p.options?.filter((o) => o.have).map((o) => o.label) ?? []),
      ...(p.packages?.map((pkg) => `${pkg.label} ${pkg.description}`) ?? []),
    ]
    const text = fields.join(' ').toLowerCase()
    const textNorm = normalizeText(text)

    let score = 0
    let matched = 0

    for (const kw of keywords) {
      const variants = [kw, ...getSynonyms(kw)]
      let kwScore = 0

      for (const v of variants) {
        const vNorm = normalizeText(v)
        if (text.includes(v)) {
          kwScore = Math.max(kwScore, v === kw ? 3 : 2)
        } else if (textNorm.includes(vNorm)) {
          kwScore = Math.max(kwScore, 1)
        }
      }

      if (kwScore > 0) {
        score += kwScore
        matched++
      }
    }

    // ต้องตรงอย่างน้อย 1 keyword
    return matched > 0 ? { product: p, score } : null
  })

  return scored
    .filter((x): x is { product: Product; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.product)
}

export function formatPrice(price: number): string {
  return price.toLocaleString('th-TH') + ' บาท'
}
