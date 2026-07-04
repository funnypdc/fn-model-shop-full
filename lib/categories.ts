export type CategoryConfig = {
  slug: string
  nameTh: string
  nameEn: string
  description: string
  heroImage: string
  headerImage: string
  categoryKey: string
}

export const CATEGORIES: CategoryConfig[] = [
  {
    slug: 'beginner',
    nameTh: 'สำหรับมือใหม่',
    nameEn: 'Beginner',
    description: 'เครื่องบินบังคับสำหรับผู้เริ่มต้น ( ควรหาความรู้ก่อนบินหรือมีผู้ฝึกสอน )',
    heroImage: '/img/type1.png',
    headerImage: '/img/big-type1.png',
    categoryKey: 'beginner',
  },
  {
    slug: 'electric-jet',
    nameTh: 'เจ็ทดักแฟน (WEDF)',
    nameEn: 'Cut Jet',
    description: 'เครื่องบินเจ็ทดักแฟนความเร็วสูง สมจริง ทรงพลัง เสียงสมจริง',
    heroImage: '/img/type2.png',
    headerImage: '/img/big-type2.png',
    categoryKey: 'CutJet',
  },
  {
    slug: 'passenger',
    nameTh: 'เครื่องบินโดยสาร',
    nameEn: 'Passenger Aircraft',
    description: 'โมเดลเครื่องบินโดยสารสายการบินดัง ขนาดใหญ่ รายละเอียดสวยงาม',
    heroImage: '/img/type3.png',
    headerImage: '/img/big-type3.png',
    categoryKey: 'Aircraft',
  },
  {
    slug: 'wwii',
    nameTh: 'สงครามโลก',
    nameEn: 'Warbirds',
    description: 'เครื่องบินรบในสงครามโลกครั้งที่ 2 ทรงคลาสสิก หายาก น่าสะสม',
    heroImage: '/img/type4.png',
    headerImage: '/img/big-type4.png',
    categoryKey: 'Warbirds',
  },
]

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}
