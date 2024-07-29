import { getSvgData, request } from './util'


const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

class BrowserRuntime implements SvgProvider.Runtime {
  private cache: Map<string, SvgProvider.SvgData | undefined>
  private activeRequests: Map<string, Promise<SvgProvider.SvgData>>
  private spriteElement: SVGSVGElement

  constructor() {
    this.cache = new Map()
    this.activeRequests = new Map()
    this.fillCacheFromExistingSprite()
  }

  fillCacheFromExistingSprite() {
    const existingSpriteElement = document.getElementById('svg-sprite') as any as SVGSVGElement

    if (existingSpriteElement) {
      this.spriteElement = existingSpriteElement
      // fill cache with symbols we have in sprite
      document.querySelectorAll<SVGSymbolElement>('symbol[data-filename], svg[data-filename]').forEach((symbolElement) => {
        const symbolId = symbolElement.id
        const fileName = symbolElement.dataset.filename
        const raw = symbolElement.outerHTML

        this.loadSvgDataFromSource(fileName!, raw, symbolId)
      })
    }
    else {
      this.spriteElement = document.createElementNS(SVG_NAMESPACE, 'svg')
      this.spriteElement.setAttribute('id', 'svg-sprite')
      this.spriteElement.setAttribute('class', 'sr-only')
      document.body.prepend(this.spriteElement)
    }
  }

  loadSvgDataFromSource(filename: string, source: string, symbolId?: string): SvgProvider.SvgData | undefined {
    // because this function can be used only from existing sprite, we don't add the file to sprite
    const svgData = getSvgData(source)

    if (svgData) {
      svgData.symbolId = symbolId
      this.cache.set(filename, svgData)
    }

    return svgData
  }

  getSvgData(filename: string): SvgProvider.SvgData | undefined {
    return this.cache.get(filename)
  }

  isLoaded(filename: string): boolean {
    return this.cache.has(filename)
  }

  private async requestSvg(filename: string, symbolId?: string): Promise<SvgProvider.SvgData> {
    try {
      const svgData = await request(filename)

      this.cache.set(filename, svgData)

      if (symbolId) {
        const bodyWrapper = document.createElementNS(SVG_NAMESPACE, 'symbol')
        bodyWrapper.innerHTML = svgData.body.trim()

        Object.keys(svgData.attributes).forEach((key) => {
          bodyWrapper.setAttribute(key, svgData.attributes[key])
        })

        bodyWrapper.setAttribute('id', symbolId)

        this.spriteElement.appendChild(bodyWrapper)
      }

      this.activeRequests.delete(filename)

      return svgData
    }
    catch (error: any) {
      this.activeRequests.delete(filename)

      return Promise.reject(error)
    }
  }

  async loadSvgData(filename: string, symbolId?: string): Promise<SvgProvider.SvgData | undefined> {
    if (this.cache.has(filename)) {
      return this.cache.get(filename)
    }

    if (this.activeRequests.has(filename)) {
      return this.activeRequests.get(filename)
    }

    const requestPromise = this.requestSvg(filename, symbolId)
    this.activeRequests.set(filename, requestPromise)

    return requestPromise
  }
}

export default BrowserRuntime
