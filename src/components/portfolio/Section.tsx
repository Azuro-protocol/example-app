import cx from 'classnames'


type Props = {
  id: string
  eyebrow?: string
  title: string
  lede?: string
  children: React.ReactNode
  className?: string
}

const Section = ({ id, eyebrow, title, lede, children, className }: Props) => (
  <section id={id} className={cx('relative px-6 py-28 md:py-36', className)}>
    <div className="mx-auto max-w-6xl">
      <div className="mb-14 max-w-3xl">
        {eyebrow && (
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-aurora-cyan/80">{eyebrow}</p>
        )}
        <h2 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl text-mist">
          {title}
        </h2>
        {lede && <p className="mt-6 text-lg text-whisper leading-relaxed">{lede}</p>}
      </div>
      {children}
    </div>
  </section>
)

export default Section
