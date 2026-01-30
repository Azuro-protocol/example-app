import cx from 'classnames'

import { Href } from 'components/navigation'


type LogoProps = {
  className?: string
}

const Logo: React.FC<LogoProps> = (props) => {
  const { className } = props

  return (
    <Href to="/" className={cx('flex items-center', className)}>
<svg
  className="h-full"
  width="71"
  height="16"
  viewBox="0 0 71 16"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient id="darkBlockNew" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#4F46E5"/>
      <stop offset="100%" stopColor="#312E81"/>
    </linearGradient>
    <linearGradient id="brightBlock1New" x1="1" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#F472B6"/>
      <stop offset="100%" stopColor="#A855F7"/>
    </linearGradient>
    <linearGradient id="brightBlock2New" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#22D3EE"/>
      <stop offset="100%" stopColor="#3B82F6"/>
    </linearGradient>
  </defs>

  {/* 为了适应 71x16 的扁平比例，我重新计算了所有坐标。
     整体保持了左侧竖条+右侧两个梯形箭头的结构，但形态被压扁拉长了。
  */}

  {/* 左侧竖条基础块 (D的竖轴) */}
  {/* x=0, y=1, 宽度7, 高度14, 圆角2 */}
  <rect x="0" y="1" width="7" height="14" rx="2" fill="url(#darkBlockNew)"/>

  {/* 右上：方向指示梯形块 */}
  {/* 从x=9开始，利用整个宽度拉长，形成向右的动势 */}
  <path d="M9 1 L 68 1 L 60 7 L 9 7 Z" fill="url(#brightBlock1New)"/>

  {/* 右下：方向指示梯形块 */}
  {/* 中间留有1px的间距 (y从8开始)，与上方形成箭头感 */}
  <path d="M9 8 L 60 8 L 68 14 L 9 14 Z" fill="url(#brightBlock2New)"/>

</svg>
    </Href>
  )
}

export default Logo
