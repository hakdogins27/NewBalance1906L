'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FrameSequence {
  name: string
  folder: string
  startFrame: number   // 1-indexed, inclusive
  count: number        // number of frames to load from startFrame
  appearAt: number     // 0 to 1, scroll progress to appear at
  chapter: string
  label: string
  headline: string
  subheadline: string
  description: string
  pill: string
}

const SEQUENCES_CONFIG: FrameSequence[] = [
  {
    name: 'Upper',
    folder: 'upper',
    startFrame: 1,
    count: 258,
    appearAt: 0,
    chapter: '01',
    label: 'Architecture',
    headline: 'Metallic',
    subheadline: 'Overlays',
    description:
      'A study in support. Metallic synthetic overlays wrap the vamp, providing lateral stability with a heritage aesthetic that bridges sport and style.',
    pill: '✦ Raw-edge suede construction',
  },
  {
    name: 'Midsole',
    folder: 'midsole',
    startFrame: 1,
    count: 208,
    appearAt: 0.4,
    chapter: '02',
    label: 'Engineering',
    headline: 'N-Ergy',
    subheadline: 'Response',
    description:
      'The foundation of comfort. Integrated N-ergy cushioning absorbs impact at the point of contact, returning energy with every stride — all day, every surface.',
    pill: '✦ ACTEVA LITE midsole foam',
  },
  {
    name: 'Outersole',
    folder: 'outersole',
    startFrame: 4,
    count: 351,
    appearAt: 0.75,
    chapter: '03',
    label: 'Traction',
    headline: 'Ndurance',
    subheadline: 'Technology',
    description:
      'Built for longevity. Geometric traction pods composed of dual-density N-durance rubber — engineered for modern urban terrain without sacrificing form.',
    pill: '✦ Dual-density rubber compound',
  },
]

export default function AnatomyScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])

  // Direct DOM refs for zero-latency updates
  const chapterRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLSpanElement>(null)
  const subheadlineRef = useRef<HTMLSpanElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)

  const [loaded, setLoaded] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [isPortrait, setIsPortrait] = useState(false)

  // 1. Parallel loader (fast) with completion check
  useEffect(() => {
    let isMounted = true
    const total = SEQUENCES_CONFIG.reduce((acc, s) => acc + s.count, 0)
    const tempFrames = new Array<HTMLImageElement>(total)
    let count = 0

    let globalIdx = 0
    for (const seq of SEQUENCES_CONFIG) {
      for (let i = seq.startFrame; i < seq.startFrame + seq.count; i++) {
        const currentIdx = globalIdx
        const img = new Image()
        img.src = `/assets/frames/${seq.folder}/${i.toString().padStart(4, '0')}.webp`
        img.onload = () => {
          tempFrames[currentIdx] = img
          count++
          if (isMounted) setLoaded(count)
        }
        img.onerror = () => {
          tempFrames[currentIdx] = new Image()
          count++
          if (isMounted) setLoaded(count)
        }
        globalIdx++
      }
    }

    const check = setInterval(() => {
      if (count >= total) {
        clearInterval(check)
        if (isMounted) {
          framesRef.current = tempFrames
          setIsReady(true)
        }
      }
    }, 100)

    return () => {
      isMounted = false
      clearInterval(check)
    }
  }, [])

  // 2. Scroll engine
  useEffect(() => {
    if (!isReady || !canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const allFrames = framesRef.current
    const maxFrames = allFrames.length - 1
    const obj = { frame: 0 }

    // Track current state
    let currentSectionIdx = -1
    let textState = -1 // -1 means hidden, 0..2 means showing text for that section
    let lastFrameIndex = -1

    const renderFrame = (idx: number) => {
      const frameIndex = Math.min(maxFrames, Math.max(0, Math.round(idx)))
      const isScrollingDown = frameIndex > lastFrameIndex
      lastFrameIndex = frameIndex

      const img = allFrames[frameIndex]

      // Fallback to nearest valid frame
      let validImg = img
      let checkIdx = frameIndex
      while ((!validImg || !validImg.complete || validImg.naturalWidth === 0) && checkIdx > 0) {
        checkIdx--
        validImg = allFrames[checkIdx]
      }
      if (!validImg || !validImg.complete || validImg.naturalWidth === 0) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Cover-fit with object-position: center
      // Responsive fit logic: "contain" on mobile to see the whole shoe, "cover" on desktop for cinematic feel
      const hRatio = canvas.width / validImg.width
      const vRatio = canvas.height / validImg.height
      const isPortraitMode = canvas.width < canvas.height
      const ratio = isPortraitMode 
        ? (canvas.width / validImg.width) * 1.1 
        : Math.max(hRatio, vRatio)
      
      const cx = (canvas.width - validImg.width * ratio) / 2
      const cy = isPortraitMode 
        ? (canvas.height * 0.30 - (validImg.height * ratio) / 2) 
        : (canvas.height - validImg.height * ratio) / 2
      ctx.drawImage(validImg, 0, 0, validImg.width, validImg.height, cx, cy, validImg.width * ratio, validImg.height * ratio)

      // Section detection
      let accumulated = 0
      for (let i = 0; i < SEQUENCES_CONFIG.length; i++) {
        accumulated += SEQUENCES_CONFIG[i].count
        if (frameIndex < accumulated) {
          if (i !== currentSectionIdx) {
            currentSectionIdx = i
          }
          break
        }
      }

      // Text animation logic based on overall scroll progress
      const overallProgress = frameIndex / maxFrames
      let targetTextState = 0
      if (overallProgress >= 0.75) {
        targetTextState = 2
      } else if (overallProgress >= 0.40) {
        targetTextState = 1
      }

      if (textState !== targetTextState) {
        textState = targetTextState

        const elements = [pillRef.current, labelRef.current, headlineRef.current, subheadlineRef.current, descRef.current]
        const yOut = isScrollingDown ? -30 : 30
        const yIn = isScrollingDown ? 30 : -30

        gsap.killTweensOf([...elements, chapterRef.current])

        const c = SEQUENCES_CONFIG[targetTextState]
        const doAnimateIn = () => {
          if (chapterRef.current) chapterRef.current.textContent = `${c.chapter} / 0${SEQUENCES_CONFIG.length}`
          if (labelRef.current) labelRef.current.textContent = c.label
          if (headlineRef.current) headlineRef.current.textContent = c.headline
          if (subheadlineRef.current) subheadlineRef.current.textContent = c.subheadline
          if (descRef.current) descRef.current.textContent = c.description
          if (pillRef.current) pillRef.current.textContent = c.pill

          gsap.fromTo(elements,
            { opacity: 0, y: yIn },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out', overwrite: 'auto' }
          )
          gsap.fromTo(chapterRef.current,
            { opacity: 0, y: yIn },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' }
          )
        }

        // Animate out previous text, then animate in new text
        gsap.to(chapterRef.current, { opacity: 0, y: yOut, duration: 0.2, ease: 'power2.in' })
        gsap.to(elements, { opacity: 0, y: yOut, duration: 0.2, stagger: 0.02, ease: 'power2.in', onComplete: doAnimateIn })
      }

    }

    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setIsPortrait(window.innerWidth < window.innerHeight)
      renderFrame(obj.frame)
    }
    window.addEventListener('resize', updateSize)
    updateSize()

    const tl = gsap.to(obj, {
      frame: maxFrames,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: () => renderFrame(obj.frame),
      },
    })

    return () => {
      window.removeEventListener('resize', updateSize)
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [isReady])

  if (!isReady) {
    const totalCount = SEQUENCES_CONFIG.reduce((acc, s) => acc + s.count, 0)
    const progress = totalCount === 0 ? 0 : Math.round((loaded / totalCount) * 100)
    return (
      <section className="w-full h-screen bg-black flex flex-col items-center justify-center">
        <div className="text-center space-y-8">
          <div className="space-y-2">
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-brand-primary/60">
              Loading Sequence
            </p>
            <p className="font-display italic text-white/80 text-2xl">
              Preparing the breakdown...
            </p>
          </div>
          <div className="w-56 h-px bg-white/10 mx-auto overflow-hidden relative">
            <div
              className="absolute inset-y-0 left-0 bg-brand-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-mono text-brand-primary text-[10px] tracking-[0.4em]">{progress}%</p>
        </div>
      </section>
    )
  }

  const initial = SEQUENCES_CONFIG[0]

  return (
    <section
      id="anatomy"
      ref={containerRef}
      className="relative w-full bg-black"
      style={{ height: '1000vh' }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Left gradient vignette for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-transparent pointer-events-none z-10" />
        {/* Bottom gradient - Taller and darker on mobile for text legibility */}
        <div className="absolute bottom-0 left-0 right-0 h-80 md:h-32 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-10" />

        {/* ── Left panel ── */}
        <div className={`absolute inset-0 flex flex-col px-6 md:px-16 lg:px-24 pointer-events-none z-20 ${
          isPortrait ? 'justify-end pb-12' : 'justify-center'
        }`}>
          <div className="max-w-lg space-y-4 md:space-y-6">
            {/* Feature pill */}
            <div className="inline-flex items-center gap-2">
              <span
                ref={pillRef}
                className="font-mono text-[9px] tracking-[0.25em] uppercase text-brand-primary bg-brand-primary/10 border border-brand-primary/30 px-3 py-1.5 rounded-full"
              >
                {initial.pill}
              </span>
            </div>

            {/* Label */}
            <span
              ref={labelRef}
              className="block font-mono text-[9px] tracking-[0.4em] uppercase text-white/40"
            >
              {initial.label}
            </span>

            {/* Headline */}
            <div className="space-y-0">
              <h2 className="font-display leading-none tracking-tight text-white">
                <span
                  ref={headlineRef}
                  className="block text-[clamp(2.2rem,7vw,6.5rem)]"
                >
                  {initial.headline}
                </span>
                <span
                  ref={subheadlineRef}
                  className="block text-[clamp(2.2rem,7vw,6.5rem)] italic text-brand-primary"
                >
                  {initial.subheadline}
                </span>
              </h2>
            </div>

            {/* Thin divider */}
            <div className="w-10 h-px bg-brand-primary/50" />

            {/* Description */}
            <p
              ref={descRef}
              className="font-body text-white/55 text-base md:text-lg max-w-xs leading-relaxed"
            >
              {initial.description}
            </p>
          </div>
        </div>

        {/* ── Chapter indicator top-right ── */}
        <div className="absolute top-8 right-8 md:right-12 z-20 flex items-center gap-3">
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/25">
            Chapter
          </span>
          <span
            ref={chapterRef}
            className="font-mono text-[11px] tracking-[0.2em] text-white/50"
          >
            {initial.chapter} / 0{SEQUENCES_CONFIG.length}
          </span>
        </div>
      </div>
    </section>
  )
}
