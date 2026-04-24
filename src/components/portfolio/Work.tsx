import Reveal from '@/components/ethereal/Reveal'
import Section from './Section'
import { work } from '@/content/portfolio'


const gradients = [
  'linear-gradient(135deg, #7B5CFF, #FF7BC8)',
  'linear-gradient(135deg, #6FE6FF, #7B5CFF)',
  'linear-gradient(135deg, #FF7BC8, #F2D16B)',
  'linear-gradient(135deg, #7B5CFF, #6FE6FF)',
  'linear-gradient(135deg, #F2D16B, #FF7BC8)',
  'linear-gradient(135deg, #6FE6FF, #FF7BC8)',
]

const Work = () => (
  <Section
    id="work"
    eyebrow="Work"
    title="Selected constellations."
    lede="A glimpse at systems I've helped bring into orbit. Each one quiet, reliable, and a little bit magical."
  >
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {work.map((w, i) => (
        <Reveal key={w.title} delay={i * 0.06}>
          <article className="frost aurora-border group relative h-full overflow-hidden rounded-3xl p-0 transition-transform duration-500 hover:-translate-y-1">
            <div
              aria-hidden
              className="relative h-48 w-full overflow-hidden"
              style={{ background: gradients[i % gradients.length] }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_60%)]" />
              <div className="absolute inset-0 mix-blend-overlay opacity-60 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence baseFrequency=%220.85%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.6%22/></svg>')]" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-void/60" />
            </div>
            <div className="p-7">
              <h3 className="font-serif text-2xl text-mist">{w.title}</h3>
              <p className="mt-3 leading-relaxed text-whisper">{w.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {w.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-mist/10 bg-mist/[0.03] px-3 py-1 text-xs text-fog"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </Section>
)

export default Work
