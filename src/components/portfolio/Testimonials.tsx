import Reveal from '@/components/ethereal/Reveal'
import Section from './Section'
import { testimonials } from '@/content/portfolio'


const Testimonials = () => (
  <Section
    id="testimonials"
    eyebrow="Voices"
    title="What it feels like, in their words."
  >
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((t, i) => (
        <Reveal key={t.author} delay={i * 0.08}>
          <figure className="frost aurora-border flex h-full flex-col justify-between rounded-3xl p-8">
            <svg
              aria-hidden
              viewBox="0 0 32 32"
              className="h-8 w-8 text-aurora-cyan/70"
              fill="currentColor"
            >
              <path d="M10 8C5 8 2 12 2 17c0 4 3 7 7 7v-3c-2 0-4-2-4-4 0-3 2-5 5-5V8zm16 0c-5 0-8 4-8 9 0 4 3 7 7 7v-3c-2 0-4-2-4-4 0-3 2-5 5-5V8z" />
            </svg>
            <blockquote className="mt-6 font-serif text-xl leading-snug text-mist">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-8 border-t border-mist/10 pt-4">
              <div className="text-sm text-mist">{t.author}</div>
              <div className="text-xs text-fog/80">{t.role}</div>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  </Section>
)

export default Testimonials
