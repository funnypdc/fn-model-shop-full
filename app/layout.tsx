import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// Ignore missing type declarations for CSS side-effect import
// @ts-ignore: Unable to find type declarations for CSS import
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://funnypdc.github.io/fnmodel-shop'),
  title: {
    default: 'FN Model — ร้านเครื่องบิน RC อันดับ 1 ในไทย',
    template: '%s | FN Model เครื่องบิน RC',
  },
  description:
    'FN Model จำหน่ายเครื่องบิน RC ครบวงจร เครื่องบินบังคับวิทยุสำหรับมือใหม่ เจ็ทไฟฟ้า เครื่องบินโดยสาร เครื่องบินสงครามโลก สินค้าของแท้ บริการหลังการขาย ส่งทั่วไทย',
  keywords: [
    'เครื่องบิน RC',
    'เครื่องบินบังคับวิทยุ',
    'เครื่องบิน RC มือใหม่',
    'เครื่องบินเจ็ทไฟฟ้า RC',
    'โมเดลเครื่องบิน',
    'FN Model',
    'RC airplane Thailand',
    'เครื่องบินโฟม RC',
    'เครื่องบินสงครามโลก RC',
    'ร้านเครื่องบิน RC',
  ],
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    siteName: 'FN Model',
    title: 'FN Model — ร้านเครื่องบิน RC อันดับ 1 ในไทย',
    description:
      'จำหน่ายเครื่องบิน RC ครบวงจร มือใหม่ถึงมืออาชีพ สินค้าของแท้ บริการดี ส่งทั่วไทย',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FN Model — เครื่องบิน RC ครบวงจร',
    description: 'จำหน่ายเครื่องบิน RC ทุกประเภท มือใหม่ถึงมืออาชีพ สินค้าของแท้ ส่งทั่วไทย',
  },
  icons: {
    icon: '/fn-model-shop/logo/FN_LOGOTRUE-01-01-01-01-01.png',
    apple: '/fn-model-shop/logo/FN_LOGOTRUE-01-01-01-01-01.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body>
        <Header />
        <main  className="container-fluid main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
