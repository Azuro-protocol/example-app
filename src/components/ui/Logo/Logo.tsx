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
      height="30"
      viewBox="64.32291198730469 105.02180267333985 211.35419128417968 39.95639846801758"
      preserveAspectRatio="xMidYMid meet"
      colorInterpolationFilters="sRGB"
    >
      <defs>
        <linearGradient id="92" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fa71cd" />
          <stop offset="100%" stopColor="#9b59b6" />
        </linearGradient>
        <linearGradient id="93" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f9d423" />
          <stop offset="100%" stopColor="#f83600" />
        </linearGradient>
        <linearGradient id="94" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0064d2" />
          <stop offset="100%" stopColor="#1cb0f6" />
        </linearGradient>
        <linearGradient id="95" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f00978" />
          <stop offset="100%" stopColor="#3f51b1" />
        </linearGradient>
        <linearGradient id="96" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7873f5" />
          <stop offset="100%" stopColor="#ec77ab" />
        </linearGradient>
        <linearGradient id="97" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f9d423" />
          <stop offset="100%" stopColor="#e14fad" />
        </linearGradient>
        <linearGradient id="98" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#009efd" />
          <stop offset="100%" stopColor="#2af598" />
        </linearGradient>
        <linearGradient id="99" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffcc00" />
          <stop offset="100%" stopColor="#00b140" />
        </linearGradient>
        <linearGradient id="100" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d51007" />
          <stop offset="100%" stopColor="#ff8177" />
        </linearGradient>
        <linearGradient id="102" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a2b6df" />
          <stop offset="100%" stopColor="#0c3483" />
        </linearGradient>
        <linearGradient id="103" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7ac5d8" />
          <stop offset="100%" stopColor="#eea2a2" />
        </linearGradient>
        <linearGradient id="104" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00ecbc" />
          <stop offset="100%" stopColor="#007adf" />
        </linearGradient>
        <linearGradient id="105" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b88746" />
          <stop offset="100%" stopColor="#fdf5a6" />
        </linearGradient>
        {/* Add your filters here if needed */}
      </defs>
      <g className="iconlinesvg-g iconlinesvg" transform="translate(66.39500427246094,107.09667106624693)">
        <g className="tp-name">
          <g transform="translate(0, 0)">
            <g transform="scale(1.02)">
              {/* Example: fill with #14f195 */}
              <path
                d="M4.26-35.11L4.26-35.11L4.55-35.11Q7.22-35.11 8.59-32.14L8.59-32.14Q8.81-31.39 8.81-30.70L8.81-30.70L8.81-24.14Q28.15-34.20 29.92-34.96L29.92-34.96Q30.43-35.11 30.90-35.11L30.90-35.11L31.39-35.11Q34.20-35.11 35.43-31.88L35.43-31.88Q35.50-31.48 35.50-31.24L35.50-31.24L35.50-30.28Q35.50-27.98 32.37-26.49L32.37-26.49Q15.23-17.58 15.11-17.58L15.11-17.58L15.11-17.53Q33.03-8.35 33.96-7.74L33.96-7.74Q35.50-6.19 35.50-4.82L35.50-4.82L35.50-3.87Q35.50-1.64 32.78-0.27L32.78-0.27Q32.07 0 31.51 0L31.51 0L30.75 0Q29.67 0 24.95-2.62L24.95-2.62L8.81-10.97L8.81-4.41Q8.81-1.30 5.53-0.15L5.53-0.15Q4.99 0 4.55 0L4.55 0L4.41 0Q1.15 0 0.07-3.45L0.07-3.45Q0-3.72 0-3.99L0-3.99L0-31.12Q0-33.20 2.37-34.62L2.37-34.62Q3.33-35.11 4.26-35.11Z"
                transform="translate(0, 35.10728586350976)"
                fill="#14f195"
              />
            </g>
          </g>
          {/* Repeat for other groups/paths, using fill="#14f195", fill="#fff", or fill="url(#92)" as needed */}
          {/* ... */}
        </g>
      </g>
    </svg>
  </Href>
);

export default Logo;
