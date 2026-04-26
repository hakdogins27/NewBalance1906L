'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-[100] px-6 md:px-12 flex justify-between items-center transition-all duration-700 ${
        scrolled
          ? 'py-4 bg-black/80 backdrop-blur-md border-b border-white/5'
          : 'py-7 bg-transparent'
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-brand-primary opacity-70 group-hover:opacity-100 transition-opacity">
          New Balance
        </span>
        <span className="w-px h-4 bg-white/20" />
        <span className="font-display text-xl font-bold tracking-tighter text-white">
          1906L
        </span>
      </Link>

      {/* Nav */}
      <nav className="hidden md:flex items-center gap-12">
        {[
          { label: 'Story', href: '#story' },
          { label: 'Anatomy', href: '#anatomy' },
          { label: 'Specifications', href: '#specs' },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="relative font-mono text-[9px] tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors duration-300 group"
          >
            {label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-primary group-hover:w-full transition-all duration-300" />
          </Link>
        ))}
      </nav>

      {/* CTA */}
      <a
        href="#anatomy"
        className="hidden md:flex items-center gap-3 font-mono text-[9px] tracking-[0.3em] uppercase text-white/60 hover:text-brand-primary transition-colors duration-300 group"
      >
        <span>Explore Build</span>
        <span className="w-6 h-px bg-white/30 group-hover:w-10 group-hover:bg-brand-primary transition-all duration-300" />
      </a>
    </header>
  )
}
