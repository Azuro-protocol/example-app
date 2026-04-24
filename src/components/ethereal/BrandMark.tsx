import Image from 'next/image'
import cx from 'classnames'


type Props = {
  size?: number
  className?: string
  withHalo?: boolean
}

const BrandMark = ({ size = 36, className, withHalo = true }: Props) => (
  <span
    className={cx('relative inline-block shrink-0', className)}
    style={{ width: size, height: size }}
  >
    {withHalo && (
      <span
        aria-hidden
        className="absolute -inset-2 rounded-full opacity-70 blur-xl"
        style={{
          background:
            'radial-gradient(circle, rgba(123,92,255,0.55), rgba(111,230,255,0.25) 55%, transparent 75%)',
        }}
      />
    )}
    <Image
      src="/logo.png"
      alt="Team Fusion"
      width={size}
      height={size}
      priority
      className="relative rounded-full"
    />
  </span>
)

export default BrandMark
