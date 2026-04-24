import Reveal from '@/components/ethereal/Reveal'
import Section from './Section'
import { services } from '@/content/portfolio'


const iconPaths: Record<string, React.ReactNode> = {
  spark: (
    <>
      <path d="M20 4v10M20 26v10M4 20h10M26 20h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
  orbit: (
    <>
      <ellipse cx="20" cy="20" rx="14" ry="6" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="20" cy="20" rx="6" ry="14" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="20" cy="20" r="2.2" fill="currentColor" />
    </>
  ),
  prism: (
    <>
      <path d="M20 5l14 24H6L20 5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M20 5v24M6 29l14-24 14 24" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
    </>
  ),
  weave: (
    <>
      <path d="M6 14c7 0 7 12 14 12s7-12 14-12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6 26c7 0 7-12 14-12s7 12 14 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </>
  ),
}

const ServiceCard = ({ title, description, icon, index }: { title: string; description: string; icon: string; index: number }) => (
  <Reveal delay={index * 0.08}>
    <div className="frost aurora-border group relative h-full overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow">
      <div
        aria-hidden
        className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-aurora-grad opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-50"
      />
      <div className="relative">
        <div className="mb-6 inline-grid h-14 w-14 place-items-center rounded-2xl border border-mist/10 bg-mist/[0.03] text-aurora-cyan">
          <svg viewBox="0 0 40 40" width="28" height="28" fill="none">
            {iconPaths[icon]}
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-mist">{title}</h3>
        <p className="mt-4 leading-relaxed text-whisper">{description}</p>
      </div>
    </div>
  </Reveal>
)

const Services = () => (
  <Section
    id="services"
    eyebrow="Services"
    title="Everything AI automation."
    lede="Four doorways into the same philosophy: remove the friction, keep the judgment, let the system do the rest."
  >
    <div className="grid gap-6 sm:grid-cols-2">
      {services.map((s, i) => (
        <ServiceCard key={s.title} {...s} index={i} />
      ))}
    </div>
  </Section>
)

export default Services
