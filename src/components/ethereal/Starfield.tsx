'use client'

import { useEffect, useRef } from 'react'


const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let raf = 0

    type Star = { x: number; y: number; z: number; r: number; tw: number; twSpeed: number; hue: number }
    let stars: Star[] = []

    const palette = [260, 320, 195, 45]

    const seed = () => {
      const count = Math.min(160, Math.floor((width * height) / 12000))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2,
        r: Math.random() * 1.2 + 0.3,
        tw: Math.random() * Math.PI * 2,
        twSpeed: Math.random() * 0.015 + 0.004,
        hue: palette[Math.floor(Math.random() * palette.length)],
      }))
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const s of stars) {
        s.tw += s.twSpeed
        const alpha = (Math.sin(s.tw) * 0.5 + 0.5) * s.z
        ctx.beginPath()
        ctx.fillStyle = `hsla(${s.hue}, 90%, 85%, ${alpha})`
        ctx.shadowBlur = 8 * s.z
        ctx.shadowColor = `hsla(${s.hue}, 90%, 80%, ${alpha})`
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
        s.y += 0.03 * s.z
        if (s.y > height + 2) {
          s.y = -2
          s.x = Math.random() * width
        }
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    if (!prefersReduce) {
      raf = requestAnimationFrame(draw)
    }
    else {
      // single static frame
      for (const s of stars) {
        ctx.beginPath()
        ctx.fillStyle = `hsla(${s.hue}, 90%, 85%, ${s.z * 0.6})`
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-30"
    />
  )
}

export default Starfield
