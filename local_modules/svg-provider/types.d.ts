declare module SvgProvider {

  type SvgData = {
    body: string
    attributes: Record<string, string>
    symbolId?: string
  }

  interface Runtime {
    isLoaded: (filename: string) => boolean
    getSvgData: (filename: string) => SvgData | undefined
    loadSvgData: (filename: string, symbolId?: string) => Promise<SvgData | undefined>
    loadSvgDataFromSource: (filename: string, source: string, symbolId?: string) => SvgData | undefined
  }
}
