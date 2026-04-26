'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SPECS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: 'Upper Material',
    value: 'Premium Suede',
    desc: 'Raw-edged calfskin suede with mesh underlays and synthetic leather overlays for heritage structure.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18M3 6h18M3 18h18" />
      </svg>
    ),
    title: 'Cushioning',
    value: 'ACTEVA LITE',
    desc: 'ACTEVA LITE midsole foam with ABZORB SBS heel cushioning for all-day impact response.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Stability',
    value: 'Web + TPU',
    desc: 'Dual-layer stability system: Web arch support paired with a TPU heel cage for precision lockdown.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20M4 20V10l8-8 8 8v10" />
      </svg>
    ),
    title: 'Outsole',
    value: 'N-durance Rubber',
    desc: 'Geometric traction pods in dual-density N-durance rubber — maximum grip, minimal wear.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    title: 'Construction',
    value: '3-Layer Build',
    desc: 'Three distinct material layers — upper, midsole, outsole — each engineered independently for its role.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: 'Colourways',
    value: '4 Editions',
    desc: 'Four curated seasonal colourways — each crafted around a distinct archival reference from the NB archive.',
  },
]

export default function SpecsGrid({ id }: { id?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const headlineRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.from(headlineRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 80%',
        },
      })

      // Cards stagger
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
      })

      // CTA reveal
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 85%',
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id={id}
      ref={containerRef}
      className="w-full bg-black py-32 px-6 relative z-10"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div ref={headlineRef} className="mb-20 md:flex md:items-end md:justify-between">
          <div className="space-y-4">
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-brand-primary/60 block">
              Technical Breakdown
            </span>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight text-white">
              Built Different.<br />
              <span className="italic text-brand-primary">Built to Last.</span>
            </h2>
          </div>
          <p className="font-body text-white/40 text-base max-w-xs leading-relaxed mt-6 md:mt-0 md:mb-2">
            Every material chosen for a reason. Every layer engineered to perform beyond expectation.
          </p>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {SPECS.map((spec, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el }}
              className="group relative bg-black p-8 md:p-10 hover:bg-white/[0.03] transition-colors duration-500 cursor-default"
            >
              {/* Gold border on hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-brand-primary/30 transition-colors duration-500 pointer-events-none" />

              <div className="space-y-5">
                {/* Icon */}
                <div className="text-brand-primary/60 group-hover:text-brand-primary transition-colors duration-300">
                  {spec.icon}
                </div>

                {/* Value */}
                <div className="space-y-1">
                  <span className="font-mono text-[8px] tracking-[0.35em] uppercase text-white/25 block">
                    {spec.title}
                  </span>
                  <span className="font-display text-2xl md:text-3xl text-white tracking-tight">
                    {spec.value}
                  </span>
                </div>

                {/* Description */}
                <p className="font-body text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                  {spec.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Strip */}
        <div
          ref={ctaRef}
          className="mt-px bg-brand-primary/8 border border-brand-primary/20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left">
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-brand-primary/60 block">
              The 1906L
            </span>
            <p className="font-display text-2xl md:text-3xl text-white italic">
              Ready to own a piece of heritage?
            </p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <a
              href="#"
              className="group flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] uppercase text-white hover:text-brand-primary transition-colors duration-300"
            >
              <span className="w-8 h-px bg-brand-primary group-hover:w-12 transition-all duration-400" />
              Explore Collection
            </a>
            <a
              href="#"
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 hover:text-white/70 transition-colors duration-300"
            >
              Find a Store
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
