type Options = {
  digits?: number
  replaceSymbol?: string
  floorRounding?: boolean
  cutFractionalZero?: boolean
  significantFractionInSmallValue?: boolean
}

const toLocaleString = (value: number | string, opts?: Options) => {
  const { digits = 2, replaceSymbol = ' ', floorRounding = true, cutFractionalZero = false, significantFractionInSmallValue = true } = opts || {}

  value = typeof value === 'string' ? parseFloat(value) : value

  if (!isFinite(value)) {
    return ''
  }

  const [ int, fraction ] = String(value).split('.')

  let preFormattedValue = value

  const isSmallValueFormatting = Math.abs(value) < 1 && significantFractionInSmallValue

  if (fraction?.length > digits && floorRounding) {
    const significantAddition = isSmallValueFormatting
      ? fraction.match(/[1-9]/)?.index || 0
      : 0

    preFormattedValue = parseFloat(`${int}.${fraction.substring(0, digits + significantAddition)}`)
  }

  const formatOptions: Intl.NumberFormatOptions = isSmallValueFormatting ? {
    minimumSignificantDigits: digits,
    maximumSignificantDigits: digits,
  } : {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }

  const result = preFormattedValue
    .toLocaleString('en', formatOptions)
    // narrow non-breaking space, equals to "thin space", which is recommended international thousand delimiter
    .replace(/,/g, replaceSymbol)

  if (cutFractionalZero && result.includes('.')) {
    return result.replace(/\.?0+$/, '')
  }

  return result
}

export default toLocaleString
