'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface FrameSequence {
  name: string
  folder: string
  count: number
}

const SEQUENCES: FrameSequence[] = [
  { name: 'Upper', folder: 'upper', count: 258 },
  { name: 'Midsole', folder: 'midsole', count: 208 },
  { name: 'Outersole', folder: 'outersole', count: 376 }
]

export default function DebugPage() {
  const [activeSeq, setActiveSeq] = useState<FrameSequence>(SEQUENCES[0])
  const [frameIndex, setFrameIndex] = useState(1)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [img, setImg] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    const image = new Image()
    const indexStr = frameIndex.toString().padStart(4, '0')
    image.src = `/assets/frames/${activeSeq.folder}/${indexStr}.jpg`
    image.onload = () => setImg(image)
  }, [frameIndex, activeSeq])

  useEffect(() => {
    if (!canvasRef.current || !img) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 800
    canvas.height = 450

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const hRatio = canvas.width / img.width
    const vRatio = canvas.height / img.height
    const ratio = Math.max(hRatio, vRatio)
    const centerShift_x = (canvas.width - img.width * ratio) / 2
    const centerShift_y = (canvas.height - img.height * ratio) / 2

    ctx.drawImage(img, 0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio)
  }, [img])

  return (
    <div className="min-h-screen bg-bg-base text-text-primary p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center border-b border-border pb-4">
          <h1 className="font-mono tracking-widest uppercase text-xl">Archive Debug Mode</h1>
          <Link href="/" className="text-brand-primary hover:text-brand-hover font-mono text-sm underline">
            Return to Experience
          </Link>
        </div>

        <div className="flex gap-4">
          {SEQUENCES.map(seq => (
            <button
              key={seq.name}
              onClick={() => { setActiveSeq(seq); setFrameIndex(1); }}
              className={`px-4 py-2 font-mono text-sm border transition-colors ${
                activeSeq.name === seq.name 
                  ? 'border-brand-primary text-brand-primary' 
                  : 'border-border text-text-secondary hover:border-text-primary'
              }`}
            >
              {seq.name} ({seq.count} frames)
            </button>
          ))}
        </div>

        <div className="border border-border rounded overflow-hidden bg-black/5">
          <canvas ref={canvasRef} className="w-full aspect-video" />
        </div>

        <div className="space-y-4 bg-bg-surface p-6 rounded border border-border">
          <div className="flex justify-between font-mono text-sm">
            <span>Frame: {frameIndex.toString().padStart(4, '0')}</span>
            <span>Path: /assets/frames/{activeSeq.folder}/{frameIndex.toString().padStart(4, '0')}.jpg</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max={activeSeq.count} 
            value={frameIndex}
            onChange={(e) => setFrameIndex(parseInt(e.target.value))}
            className="w-full cursor-pointer accent-brand-primary"
          />
        </div>
      </div>
    </div>
  )
}
