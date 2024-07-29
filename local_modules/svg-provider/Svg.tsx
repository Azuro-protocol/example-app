import { memo, forwardRef } from 'react'
import { getGlobalHtmlAttrs, type GlobalHTMLAttrs } from 'helpers/getters'

import useSvgData from './useSvgData'


type SvgProps = GlobalHTMLAttrs & {
  className?: string
  src: string
  source?: string
  width?: number
  height?: number
  aspect?: number
} & AtLeastOne<{
  symbolId?: string
  isInline?: boolean
}>

const Svg = forwardRef<SVGSVGElement, SvgProps>((props, ref) => {
  const { className, src, source, aspect, width, height, symbolId, isInline = false, ...rest } = props
  const htmlAttrs = getGlobalHtmlAttrs(rest)
  const svgData = useSvgData(src, source, isInline ? undefined : symbolId)

  const { body, attributes } = svgData || {}
  const viewBox = width && height ? `0 0 ${width} ${height}` : `0 0 ${aspect || 1} 1`

  const defaultAttributes = {
    ref,
    role: 'img',
    className,
    viewBox,
  }

  if (!isInline) {
    return (
      <svg
        {...defaultAttributes}
        {...attributes}
        {...htmlAttrs}
      >
        <use href={`#${symbolId}`} xlinkHref={`#${symbolId}`} />
      </svg>
    )
  }

  if (body && attributes) {
    return (
      <svg
        {...defaultAttributes}
        {...attributes}
        {...htmlAttrs}
        data-filename={src}
        dangerouslySetInnerHTML={{ __html: body }}
      />
    )
  }

  return (
    <svg {...defaultAttributes} />
  )
})

export default memo(Svg)
