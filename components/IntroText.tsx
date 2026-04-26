'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 842, suffix: 'g', label: 'Total Weight' },
  { value: 3, suffix: ' Layer', label: 'Construction' },
  { value: 1906, suffix: '', label: 'Heritage Year' },
]

function useCountUp(target: number, triggered: boolean, duration = 1.8) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!triggered) return
    let start = 0
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [triggered, target, duration])
  return count
}

function StatItem({ stat, triggered }: { stat: typeof STATS[0]; triggered: boolean }) {
  const count = useCountUp(stat.value, triggered)
  return (
    <div className="flex flex-col items-center md:items-start gap-2 group">
      <div className="flex items-baseline gap-1">
        <span className="font-display text-5xl md:text-6xl font-bold text-white tabular-nums">
          {count}
        </span>
        <span className="font-mono text-brand-primary text-xl">{stat.suffix}</span>
      </div>
      <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/30">
        {stat.label}
      </span>
    </div>
  )
}

export default function IntroText() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsTriggered, setStatsTriggered] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word reveal
      const words = textRef.current?.querySelectorAll('.word')
      if (words) {
        gsap.from(words, {
          opacity: 0.08,
          stagger: 0.08,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'top 20%',
            scrub: true,
          },
        })
      }

      // Stat counter trigger
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => setStatsTriggered(true),
        once: true,
      })

      // Stats slide in
      gsap.from(statsRef.current?.children ?? [], {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const copy =
    'Not a sneaker. Not a dress shoe. The 1906L is built for those who refuse to choose — running-shoe cushioning inside a silhouette that commands every room it enters.'
  const words = copy.split(' ')

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black px-6 py-32 z-10"
    >
      {/* Thin top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center gap-24">
        {/* Eyebrow */}
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-brand-primary/60">
          The Philosophy
        </span>

        {/* Headline */}
        <h2
          ref={textRef}
          className="font-display text-[clamp(2.5rem,10vw,5.5rem)] leading-[1.1] text-white text-center tracking-tight"
        >
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h2>

        {/* Divider */}
        <div className="w-16 h-px bg-brand-primary/40" />

        {/* Stats */}
        <div
          ref={statsRef}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-white/10"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="flex justify-center md:px-16">
              <StatItem stat={stat} triggered={statsTriggered} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
