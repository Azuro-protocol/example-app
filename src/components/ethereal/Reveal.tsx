'use client'

import { motion, useReducedMotion } from 'framer-motion'


type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}

const Reveal = ({ children, className, delay = 0, y = 24 }: Props) => {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [ 0.22, 1, 0.36, 1 ], delay }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
