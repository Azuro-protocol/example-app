export function isSafari(userAgent: string): boolean {
  return /Version\/([0-9._]+).*Safari/.test(userAgent) // Source: https://github.com/DamonOehlman/detect-browser/blob/master/src/index.ts
}

// export function isArc(): boolean {
//   return (
//     typeof document !== 'undefined' &&
//     getComputedStyle(document.body).getPropertyValue('--arc-palette-focus') !==
//       ''
//   )
// }

export enum BrowserType {
  // Arc = 'Arc',
  // Brave = 'Brave',
  Browser = 'Browser',
  Chrome = 'Chrome',
  Edge = 'Edge',
  Firefox = 'Firefox',
  Opera = 'Opera',
  Safari = 'Safari',
}

export function getBrowser(userAgent: string): BrowserType {
  if (typeof navigator === 'undefined' && !userAgent) {
    return BrowserType.Browser
  }

  const ua = userAgent || navigator.userAgent.toLowerCase()

  // @ts-ignore - brave is not in the navigator type
  // if (navigator.brave?.isBrave) {
  //   return BrowserType.Brave
  // }

  if (ua.indexOf('edg/') > -1) {
    return BrowserType.Edge
  }

  if (ua.indexOf('op') > -1) {
    return BrowserType.Opera
  }

  // if (isArc()) {
  //   return BrowserType.Arc
  // }

  if (ua.indexOf('chrome') > -1) {
    return BrowserType.Chrome
  }

  if (ua.indexOf('firefox') > -1) {
    return BrowserType.Firefox
  }

  if (isSafari(ua)) {
    return BrowserType.Safari
  }

  return BrowserType.Browser
}
