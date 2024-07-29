import randomizeString from './randomizeString'


const getAttributePattern = (attr) => `(?:(?:\\s|\\:)${attr})`

// eslint-disable-next-line max-len
const idPattern = new RegExp(`(?:(${(getAttributePattern('id'))})="([^"]+)")|(?:(${(getAttributePattern('href'))}|${(getAttributePattern('role'))}|${(getAttributePattern('arcrole'))})="\\#([^"]+)")|(?:="url\\(\\#([^\\)]+)\\)")|(?:url\\(\\#([^\\)]+)\\))`, 'g')

const replaceSvgIds = (svgText: string) => {
  const svgId = randomizeString()
  const getId = (id) => `${svgId}__${id}`

  return svgText.replace(idPattern, (match, p1, p2, p3, p4, p5, p6) => {
    if (p2) {
      return `${p1}="${(getId(p2))}"`
    }

    if (p4) {
      return `${p3}="#${(getId(p4))}"`
    }

    if (p5) {
      return `="url(#${(getId(p5))})"`
    }

    if (p6) {
      return `url(#${getId(p6)})`
    }

    return match
  })
}

export default replaceSvgIds
