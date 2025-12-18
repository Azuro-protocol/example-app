import cx from 'classnames'
import { Href } from 'components/navigation'

type LogoProps = {
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className }) => (
  <Href to="/" className={cx('flex items-center justify-center', className)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100"
      height="40"
      viewBox="64.323 105.022 211.354 39.956"
      colorInterpolationFilters="sRGB"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fa71cd" />
          <stop offset="100%" stopColor="#9b59b6" />
        </linearGradient>
      </defs>
      <g className="iconlinesvg-g iconlinesvg">
        <g className="tp-name">
          {/* Example: use gradient fill */}
          <path
            d="M70.74 107.094h.296q2.723 0 4.12 3.03..."
            fill="url(#myGradient)"
          />
          {/* Add other paths and shapes here, using fill="url(#myGradient)" or fill="#FFF" as needed */}
        </g>
      </g>
    </svg>
  </Href>
);

export default Logo;
