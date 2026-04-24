const orbs = [
  { size: 520, top: '-6%', left: '-10%', color: 'rgba(123,92,255,0.55)', delay: '0s', anim: 'animate-float-slow' },
  { size: 420, top: '30%', left: '75%', color: 'rgba(255,123,200,0.45)', delay: '-3s', anim: 'animate-float' },
  { size: 360, top: '65%', left: '-8%', color: 'rgba(111,230,255,0.4)', delay: '-6s', anim: 'animate-float-slow' },
  { size: 280, top: '85%', left: '60%', color: 'rgba(242,209,107,0.35)', delay: '-2s', anim: 'animate-float' },
  { size: 320, top: '110%', left: '30%', color: 'rgba(123,92,255,0.35)', delay: '-5s', anim: 'animate-float-slow' },
]

const Orbs = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-40 overflow-hidden">
    {orbs.map((o, i) => (
      <div
        key={i}
        className={`absolute rounded-full animate-pulse-glow ${o.anim}`}
        style={{
          width: o.size,
          height: o.size,
          top: o.top,
          left: o.left,
          background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
          animationDelay: o.delay,
          filter: 'blur(70px)',
        }}
      />
    ))}
  </div>
)

export default Orbs
