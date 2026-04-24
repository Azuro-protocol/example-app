type Props = {
  size?: number
  className?: string
}

const AuroraMark = ({ size = 28, className }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden
  >
    <defs>
      <linearGradient id="aurora-mark" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7B5CFF" />
        <stop offset="0.5" stopColor="#FF7BC8" />
        <stop offset="1" stopColor="#6FE6FF" />
      </linearGradient>
      <radialGradient id="aurora-core" cx="20" cy="20" r="8" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="20" cy="20" r="17.5" stroke="url(#aurora-mark)" strokeWidth="1" opacity="0.9" />
    <circle cx="20" cy="20" r="11" stroke="url(#aurora-mark)" strokeWidth="0.6" opacity="0.7" />
    <circle cx="20" cy="20" r="6" fill="url(#aurora-core)" />
  </svg>
)

export default AuroraMark
