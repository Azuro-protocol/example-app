'use client'

import { useState } from 'react'
import Reveal from '@/components/ethereal/Reveal'
import Section from './Section'
import { site } from '@/content/portfolio'


const Contact = () => {
  const [ sent, setSent ] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's dream something into being."
      lede="Tell me what you’re trying to automate, what’s in your way, and how much you wish it would just… work. I’ll reply within a day."
    >
      <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <Reveal>
          <div className="space-y-8">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-fog/80">Email</div>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block font-serif text-2xl text-mist hover:text-aurora-cyan transition-colors"
              >
                {site.email}
              </a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-fog/80">Working from</div>
              <div className="mt-2 text-mist">{site.location}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-fog/80">Elsewhere</div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-mist/10 bg-mist/[0.03] px-4 py-2 text-sm text-mist hover:bg-mist/[0.07] transition-colors"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={onSubmit}
            className="frost aurora-border space-y-5 rounded-3xl p-8"
          >
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-fog/80">Name</span>
              <input
                required
                type="text"
                name="name"
                className="w-full rounded-xl border border-mist/10 bg-void/40 px-4 py-3 text-mist placeholder-fog/50 outline-none focus:border-aurora-violet/60 focus:shadow-glow"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-fog/80">Email</span>
              <input
                required
                type="email"
                name="email"
                className="w-full rounded-xl border border-mist/10 bg-void/40 px-4 py-3 text-mist placeholder-fog/50 outline-none focus:border-aurora-violet/60 focus:shadow-glow"
                placeholder="you@domain.com"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-fog/80">What's on your mind?</span>
              <textarea
                required
                name="message"
                rows={5}
                className="w-full resize-none rounded-xl border border-mist/10 bg-void/40 px-4 py-3 text-mist placeholder-fog/50 outline-none focus:border-aurora-violet/60 focus:shadow-glow"
                placeholder="The process you'd like to make disappear..."
              />
            </label>
            <button
              type="submit"
              disabled={sent}
              className="w-full rounded-full bg-aurora-grad px-6 py-3 text-sm font-medium text-void shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {sent ? 'Sent into the ether ✷' : 'Send message'}
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}

export default Contact
