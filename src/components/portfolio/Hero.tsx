'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import GlowText from '@/components/ethereal/GlowText'
import { site } from '@/content/portfolio'


const Hero = () => {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 2
      const y = (e.clientY / innerHeight - 0.5) * 2
      el.style.setProperty('--px', x.toFixed(3))
      el.style.setProperty('--py', y.toFixed(3))
    }
    window.addEventListener('mousemove', onMove)

    return () => window.removeEventListener('mousemove', onMove)
  }, [ reduce ])

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] items-center justify-center px-6 pt-32 pb-24"
    >
      <div
        ref={ref}
        className="relative mx-auto max-w-5xl text-center"
        style={{
          transform: 'translate3d(calc(var(--px, 0) * 8px), calc(var(--py, 0) * 8px), 0)',
          transition: 'transform 200ms ease-out',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.9 }}
          className="inline-flex items-center gap-2 rounded-full border border-mist/10 bg-mist/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-fog backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-aurora-cyan shadow-glow-cyan" />
          {site.role}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
          transition={{ duration: 1.4, delay: 2.0, ease: [ 0.22, 1, 0.36, 1 ] }}
          className="mt-8 font-serif text-5xl leading-[1.05] tracking-tight sm:text-7xl md:text-[5.5rem]"
        >
          <GlowText>{site.tagline}</GlowText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.3 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-whisper sm:text-lg"
        >
          {site.heroLead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.55 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="rounded-full bg-aurora-grad px-6 py-3 text-sm font-medium text-void shadow-glow transition-transform hover:scale-[1.03]"
          >
            See the work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-mist/15 px-6 py-3 text-sm text-mist transition-colors hover:bg-mist/5"
          >
            Start a conversation
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3 }}
          className="mt-24 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.4em] text-fog/60"
          aria-hidden
        >
          <span>scroll</span>
          <span className="block h-10 w-px bg-gradient-to-b from-mist/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
