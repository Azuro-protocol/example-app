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
        {/* other gradients */}
      </defs>
      <g className="iconlinesvg-g iconlinesvg" transform="translate(66.39500427246094,107.09667106624693)">
        <g className="tp-name">
          <g transform="translate(0, 0)">
            <g transform="scale(1.02)">
              {/* First path: white */}
              <path
                d="M4.26-35.11L4.26-35.11L4.55-35.11Q7.22-35.11 8.59-32.14L8.59-32.14Q8.81-31.39 8.81-30.70L8.81-30.70L8.81-24.14Q28.15-34.20 29.92-34.96L29.92-34.96Q30.43-35.11 30.90-35.11L30.90-35.11L31.39-35.11Q34.20-35.11 35.43-31.88L35.43-31.88Q35.50-31.48 35.50-31.24L35.50-31.24L35.50-30.28Q35.50-27.98 32.37-26.49L32.37-26.49Q15.23-17.58 15.11-17.58L15.11-17.58L15.11-17.53Q33.03-8.35 33.96-7.74L33.96-7.74Q35.50-6.19 35.50-4.82L35.50-4.82L35.50-3.87Q35.50-1.64 32.78-0.27L32.78-0.27Q32.07 0 31.51 0L31.51 0L30.75 0Q29.67 0 24.95-2.62L24.95-2.62L8.81-10.97L8.81-4.41Q8.81-1.30 5.53-0.15L5.53-0.15Q4.99 0 4.55 0L4.55 0L4.41 0Q1.15 0 0.07-3.45L0.07-3.45Q0-3.72 0-3.99L0-3.99L0-31.12Q0-33.20 2.37-34.62L2.37-34.62Q3.33-35.11 4.26-35.11Z"
                transform="translate(0, 35.10728586350976)"
                fill="#14f195"
              />
            </g>
          </g>

          {/* Second path: keep gradient fill */}
          <g transform="translate(40, 0.4156109431873922)">
            <g>
              <g className="imagesvg">
                <g>
                  <rect
                    fill="#fff"
                    fillOpacity="0"
                    strokeWidth="2"
                    x="0"
                    y="0"
                    width="34.37763383395224"
                    height="34.97820969440517"
                    className="image-rect"
                  />
                  {/* The inner SVG content simplified and cleaned */}
                  <g filter="url(#colors8200565747)">
                    <path
                      d="M9272317 5308152c-405594,-2531713 -58701,-3902865 258191,-4917795l0 0c0,0 0,0 0,0l0 0c-1006071,342287 -2368601,723786 -4909763,382208 -4332554,-582642 -4509130,4329247 -1031465,4921929 -1003236,758037 -2098245,955991 -2839983,777762l-279923 287128 2923015 2850377 279923 -287129c-197127,-737249 -26575,-1836628 705596,-2858880 680203,3461247 5586186,3161009 4894291,-1155482l118 -118z"
                      fill="url(#14f195)" // keep gradient fill here
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>

          {/* Other paths: all white */}
          <g transform="translate(78, 0)">
            <g transform="scale(1.02)">
              <path
                d="M12.19-35.11L12.19-35.11L31.46-35.11Q34.15-35.11 35.43-32.19L35.43-32.19Q35.50-31.83 35.50-31.58L35.50-31.58L35.50-30.26Q35.50-28.20 32.90-26.73L32.90-26.73Q31.88-26.39 31.24-26.39L31.24-26.39L8.86-26.39L8.86-21.98L22.18-21.98Q30.28-21.98 34.25-16.87L34.25-16.87Q35.50-14.93 35.50-13.61L35.50-13.61L35.50-8.37Q35.50-5.31 31.39-2.35L31.39-2.35Q27.44 0 23.65 0L23.65 0L3.84 0Q1.84 0 0.34-2.28L0.34-2.28Q0-3.01 0-3.60L0-3.60L0-4.55Q0-7.22 3.13-8.50L3.13-8.50Q3.84-8.72 4.75-8.72L4.75-8.72L26.71-8.72L26.71-13.12L12.63-13.12Q6.76-13.12 2.52-16.79L2.52-16.79Q0-19.32 0-21.91L0-21.91L0-26.34Q0-30.65 5.92-33.74L5.92-33.74Q9.38-35.11 12.19-35.11Z"
                transform="translate(0, 35.10728586350976)"
                fill="#ffffff"
              />
            </g>
          </g>

          {/* Repeat for all other paths/groups, setting fill="#fff" */}
          {/* ... */}
        </g>
      </g>
    </svg>
  </Href>
)

export default Logo

