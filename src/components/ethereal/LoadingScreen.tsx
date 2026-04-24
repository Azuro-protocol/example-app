'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'


const SESSION_KEY = 'ethereal-entered'

const LoadingScreen = () => {
  const [ visible, setVisible ] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (sessionStorage.getItem(SESSION_KEY)) {
      setVisible(false)

      return
    }

    const t = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1')
      setVisible(false)
    }, 1800)

    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(16px)' }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-ethereal-mesh opacity-80"
          />
          <div className="relative flex flex-col items-center gap-10">
            <div className="relative h-40 w-40">
              <div className="absolute inset-0 rounded-full border border-aurora-violet/30 animate-spin-slow" />
              <div className="absolute inset-3 rounded-full border border-aurora-pink/25 animate-spin-reverse-slow" />
              <div className="absolute inset-7 rounded-full border border-aurora-cyan/30 animate-spin-slow" />
              <div
                className="absolute inset-0 rounded-full animate-pulse-glow"
                style={{
                  background:
                    'radial-gradient(circle, rgba(123,92,255,0.6) 0%, rgba(255,123,200,0.3) 40%, transparent 70%)',
                }}
              />
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src="/logo.png"
                  alt="Team Fusion"
                  width={96}
                  height={96}
                  priority
                  className="rounded-full shadow-glow"
                />
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.3 }}
              className="font-serif text-lg tracking-[0.35em] text-fog uppercase"
            >
              entering the ether
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
