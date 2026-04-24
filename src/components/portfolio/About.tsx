import Reveal from '@/components/ethereal/Reveal'
import Section from './Section'
import { about, site } from '@/content/portfolio'


const About = () => (
  <Section id="about" eyebrow="About" title="Quiet systems, loud results.">
    <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20 items-start">
      <Reveal>
        <div className="relative mx-auto aspect-square w-full max-w-[320px]">
          <div className="absolute inset-0 rounded-full bg-aurora-grad opacity-60 blur-2xl" />
          <div className="absolute inset-2 rounded-full bg-aurora-grad animate-spin-slow opacity-80" />
          <div className="absolute inset-[6px] rounded-full bg-void" />
          <div
            className="absolute inset-4 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, rgba(233,228,255,0.4), transparent 55%), radial-gradient(circle at 70% 70%, rgba(111,230,255,0.35), transparent 60%), linear-gradient(135deg, #1a1030, #0a0618)',
            }}
          />
          <div className="absolute inset-0 grid place-items-center font-serif text-5xl text-mist/80">
            {site.owner.charAt(0)}
          </div>
        </div>
      </Reveal>

      <div>
        {about.body.map((p, i) => (
          <Reveal key={i} delay={0.1 * i}>
            <p className="mb-6 text-lg leading-relaxed text-whisper">{p}</p>
          </Reveal>
        ))}

        <Reveal delay={0.3}>
          <ul className="mt-10 grid grid-cols-3 gap-4">
            {about.facts.map((f) => (
              <li
                key={f.label}
                className="frost aurora-border rounded-2xl p-4 text-center"
              >
                <div className="font-serif text-3xl text-mist">{f.value}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-fog/80">{f.label}</div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  </Section>
)

export default About
