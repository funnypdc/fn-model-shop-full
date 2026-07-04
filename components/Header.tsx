'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, FormEvent, useRef, useEffect } from 'react'
import { searchProducts, formatPrice } from '@/lib/products'
import { bp } from '@/lib/bp'
import { asset } from '@/lib/asset'

const NAV_LINKS = [
  { label: 'หน้าหลัก', href: '/' },
  { label: 'บริการของเรา', href: '/services' },
  { label: 'เครื่องบินสำหรับมือใหม่', href: '/products/beginner' },
  { label: 'เครื่องบินเจ็ทไฟฟ้า', href: '/products/electric-jet' },
  { label: 'เครื่องบินโดยสาร', href: '/products/passenger' },
  { label: 'เครื่องบินสงครามโลก', href: '/products/wwii' },
]

export default function Header() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const trimmed = query.trim()
  const results = trimmed.length > 0 ? searchProducts(trimmed).slice(0, 6) : []

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    if (trimmed) {
      router.push(`/products?q=${encodeURIComponent(trimmed)}`)
      setQuery('')
      setOpen(false)
    }
  }

  function closeDropdown() {
    setOpen(false)
    setQuery('')
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          {/* Logo */}
          <Link href="/" className="logo">
            <img src={bp('/logo/FN_LOGOTRUE-01-01-01-01-01.png')} alt="FN Model" className="logo-img" />
          </Link>

          {/* Nav (desktop) */}
          <nav className="nav">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="search-wrap" ref={wrapRef}>
            <form className="header-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="ค้นหาสินค้า..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
                onFocus={() => setOpen(true)}
                onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
                className="search-input"
                autoComplete="off"
              />
              <button type="submit" className="search-btn" aria-label="ค้นหา">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </form>

            {/* Dropdown */}
            {open && trimmed.length > 0 && (
              <div className="search-dropdown">
                {results.length > 0 ? (
                  <>
                    {results.map((p) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.id}`}
                        className="search-result-item"
                        onClick={closeDropdown}
                      >
                        <img src={asset(p.image)} alt={p.name} className="search-result-img" />
                        <div className="search-result-info">
                          <p className="search-result-name">{p.name}</p>
                          <p className="search-result-price">{formatPrice(p.price)}</p>
                        </div>
                      </Link>
                    ))}
                    <Link
                      href={`/products?q=${encodeURIComponent(trimmed)}`}
                      className="search-see-all"
                      onClick={closeDropdown}
                    >
                      ดูผลการค้นหาทั้งหมด ({results.length} รายการ) →
                    </Link>
                  </>
                ) : (
                  <div className="search-no-result">ไม่พบสินค้าที่ตรงกับ &ldquo;{trimmed}&rdquo;</div>
                )}
              </div>
            )}
          </div>

          {/* Hamburger (mobile only) */}
          <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="เปิดเมนู">
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div className={`sidebar-overlay${menuOpen ? ' sidebar-overlay-open' : ''}`} onClick={closeMenu} />

      {/* Sidebar (right) */}
      <div className={`sidebar${menuOpen ? ' sidebar-open' : ''}`}>
        <button className="sidebar-close" onClick={closeMenu} aria-label="ปิดเมนู">✕</button>
        <nav className="sidebar-nav">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="sidebar-nav-link" onClick={closeMenu}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
