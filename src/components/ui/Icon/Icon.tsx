'use client'
import clsx from 'clsx'
import { forwardRef, type ForwardedRef } from 'react'
import { Svg } from 'svg-provider'
import icons, { type IconName } from './icons'


export { type IconName } from './icons'

export type IconProps = {
  className?: string
  fillClassName?: 'fill-current' | string
  name: IconName
  isInline?: boolean
  'aria-describedby'?: string
  'aria-label'?: string
}

const Icon = forwardRef<SVGSVGElement | HTMLImageElement, IconProps>((props, ref) => {
  const {
    className,
    fillClassName = 'fill-current',
    name,
    isInline = true, // ✅ Default to inline rendering
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
  } = props

  if (!icons[ name ]) {
    console.warn(`There is no icon with name "${name}"`)
    
    return null
  }

  const { src, source, aspect, width, height } = icons[name]

  const rootClassName = clsx(className, fillClassName, name === 'interface/spinner' ? 'animate-spin' : null)

  return (
    <Svg
      ref={ref as ForwardedRef<SVGSVGElement>}
      className={rootClassName}
      src={src}
      source={source}
      width={width}
      height={height}
      aspect={aspect}
      symbolId={name}
      isInline={isInline}
      aria-describedby={ariaDescribedby}
      aria-label={ariaLabel}
    />
  )
})

export default Icon


// 'use client'
// import clsx from 'clsx'
// import { forwardRef, type ForwardedRef } from 'react'
// import { Svg } from 'svg-provider'
// import icons, { type IconName } from './icons'


// export { type IconName } from './icons'

// export type IconProps = {
//   className?: string
//   fillClassName?: 'fill-current' | string
//   name: IconName
//   isInline?: boolean
//   'aria-describedby'?: string
//   'aria-label'?: string
// }

// const Icon = forwardRef<SVGSVGElement | HTMLImageElement, IconProps>((props, ref) => {
//   const { className, fillClassName = 'fill-current', name, isInline, 'aria-describedby': ariaDescribedby, 'aria-label': ariaLabel } = props

//   if (!icons[name]) {
//     console.warn(`There is no icon with name "${name}"`)

//     return null
//   }

//   const { src, source, aspect, width, height } = icons[name]

//   const rootClassName = clsx(className, fillClassName, name === 'interface/spinner' ? 'animate-spin' : null)

//   return (
//     <Svg
//       ref={ref as ForwardedRef<SVGSVGElement>}
//       className={rootClassName}
//       src={src}
//       source={source}
//       width={width}
//       height={height}
//       aspect={aspect}
//       symbolId={name}
//       isInline={isInline}
//       aria-describedby={ariaDescribedby}
//       aria-label={ariaLabel}
//     />
//   )
// })

// export default Icon

// const Icon = forwardRef<SVGSVGElement | HTMLImageElement, IconProps>((props, ref) => {
//   const { className, name, 'aria-label': ariaLabel } = props;

//   if (!icons[name]) {
//     console.warn(`No icon with name "${name}"`);
//     return null;
//   }

//   const { src } = icons[name];
//   return (
//     <img
//       ref={ref as ForwardedRef<HTMLImageElement>}
//       className={clsx('inline-block', className)}
//       src={src}
//       alt={ariaLabel || name}
//     />
//   );
// });
