'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import BrandMark from '@/components/ethereal/BrandMark'
import { site } from '@/content/portfolio'


const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#testimonials', label: 'Voices' },
  { href: '#contact', label: 'Contact' },
]

const Nav = () => {
  const [ open, setOpen ] = useState(false)
  const [ scrolled, setScrolled ] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 1.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6"
    >
      <nav
        className={`frost flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-500 ${
          scrolled ? 'shadow-frost' : 'shadow-none'
        }`}
      >
        <a href="#home" className="flex items-center gap-2 pl-1 pr-3 group">
          <BrandMark size={28} className="transition-transform group-hover:scale-110 duration-500" />
          <span className="font-serif text-base tracking-wide text-mist hidden sm:inline">
            {site.name}
          </span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-fog hover:text-mist transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="ml-2 rounded-full bg-aurora-grad px-4 py-1.5 text-sm font-medium text-void shadow-glow transition-transform hover:scale-105"
        >
          Let's talk
        </a>
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-mist/10 text-mist md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span className={`absolute left-0 right-0 top-0 h-px bg-mist transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
            <span className={`absolute left-0 right-0 top-1.5 h-px bg-mist transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 right-0 bottom-0 h-px bg-mist transition-transform ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
          </span>
        </button>
      </nav>
      {open && (
        <div className="fixed inset-x-4 top-24 z-40 md:hidden">
          <div className="frost rounded-3xl p-6 shadow-frost">
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2 text-mist/90 hover:bg-mist/5"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </motion.header>
  )
}

export default Nav
