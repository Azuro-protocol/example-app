import { getSvgData } from './util'


class ServerRuntime implements SvgProvider.Runtime {
  private cache: Map<string, SvgProvider.SvgData>

  constructor() {
    this.cache = new Map()
  }

  loadSvgDataFromSource(filename: string, source: string, symbolId?: string): SvgProvider.SvgData | undefined {
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

  async loadSvgData(): Promise<SvgProvider.SvgData> {
    throw new Error('You shouldn\'t load svg data on server side')
  }

  getSymbolsHtml() {
    const symbols: string[] = []

    this.cache.forEach(({ body, attributes, symbolId }, fileName) => {
      if (!symbolId) {
        return
      }

      const attributesString = Object.keys(attributes)
        .map((key) => `${key}="${attributes[key]}"`)
        .join(' ')

      symbols.push(`<symbol id="${symbolId}" ${attributesString} data-filename="${fileName}">${body}</symbol>`)
    })

    return symbols.join('')
  }
}

export default ServerRuntime
