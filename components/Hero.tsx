'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(bgRef.current, { opacity: 0, scale: 1.08, duration: 2.2, ease: 'power2.out' })
        .from(eyebrowRef.current, { opacity: 0, y: 16, duration: 0.8 }, '-=1.4')
        .from(line1Ref.current, { opacity: 0, y: 40, duration: 1.0 }, '-=0.6')
        .from(line2Ref.current, { opacity: 0, y: 40, duration: 1.0 }, '-=0.8')
        .from(subRef.current, { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
        .from(ctaRef.current, { opacity: 0, y: 16, duration: 0.7 }, '-=0.4')
        .from(dotRef.current, { opacity: 0, duration: 0.6 }, '-=0.2')
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-start justify-end overflow-hidden bg-black pb-20 md:pb-28"
    >
      {/* Background image */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <Image
          src="/assets/bg.jpeg"
          alt="New Balance 1906L Silhouette"
          fill
          priority
          className="object-cover object-[70%_center] md:object-center opacity-60"
        />
        {/* Multi-stop gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 px-8 md:px-16 lg:px-24 max-w-4xl">
        {/* Eyebrow */}
        <span
          ref={eyebrowRef}
          className="block font-mono text-[10px] tracking-[0.4em] uppercase text-brand-primary mb-6"
        >
          New Balance — 2026 Collection
        </span>

        {/* Headline */}
        <h1 className="font-display text-[clamp(2.5rem,9vw,8rem)] leading-[0.92] tracking-tight text-white mb-6">
          <span ref={line1Ref} className="block">The Loafer,</span>
          <span ref={line2Ref} className="block italic text-brand-primary">Reengineered.</span>
        </h1>

        {/* Subline */}
        <p
          ref={subRef}
          className="font-body text-white/55 text-lg md:text-xl max-w-md leading-relaxed mb-10"
        >
          Where archival craft meets running-shoe technology. A silhouette that refuses to compromise.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex items-center gap-8">
          <a
            href="#anatomy"
            className="group flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] uppercase text-white hover:text-brand-primary transition-colors duration-300"
          >
            <span className="w-10 h-px bg-brand-primary group-hover:w-16 transition-all duration-500" />
            Discover the Build
          </a>
          <a
            href="#story"
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/35 hover:text-white/70 transition-colors duration-300"
          >
            Our Story
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={dotRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-white/30">Scroll</span>
        <div className="relative w-px h-12">
          <div className="absolute top-0 left-0 w-full h-full bg-white/15" />
          <div
            className="absolute top-0 left-0 w-full bg-brand-primary animate-scroll-line"
            style={{ height: '40%', animation: 'scrollLine 2s ease-in-out infinite' }}
          />
        </div>
      </div>

      {/* Corner label */}
      <div className="absolute top-1/2 right-8 md:right-12 -translate-y-1/2 z-20 hidden md:flex flex-col items-end gap-3">
        <div className="flex flex-col items-end">
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/20">Model</span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">1906L</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/20">Colorway</span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">Rich Oak</span>
        </div>
      </div>
    </section>
  )
}
