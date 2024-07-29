import 'react'
import { type StaticImageData } from 'next/Image'


declare global {
  declare module '*.svg'
  declare module '*.png'
  declare module '*.jpg'
  declare module '*.jpeg'
  declare module '*.gif'
  declare module '*.bmp'
  declare module '*.tiff'

  declare module '*.scss' {
    interface IClassNames {
      [className: string]: string
    }

    const scssClassNames: IClassNames
    export = scssClassNames
  }

  declare module '*?url' {
    const contents: StaticImageData
    export = contents
  }

  // -----------------------------------------------------------

  interface Window {
    __env__: any
    ethereum: any
    opera: any
    gtag: any
    mixpanel: any
    toggleMenu: () => void
    closeMenuOnClickOutside: (e: MouseEvent) => void
  }

  // -----------------------------------------------------------

  type AllOrNothing<T> = T | { [P in keyof T]?: never }

  // type OneOrBothFromList = AtLeastOne<ExampleProps, 'to' | 'onClick'>
  // type OneOrBothFromAll  = AtLeastOne<ExampleProps>
  type AtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
      [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]

  // type OneOrOtherFromList = OnlyOne<ExampleProps, 'to' | 'onClick'>
  // type OneOrOtherFromAll  = OnlyOne<ExampleProps>
  type OnlyOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
      [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]

  type ChangeFields<T, R> = Omit<T, keyof R> & R

  // type SomePartial = PartialBy<Props, 'title'>
  type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

  declare module React {
    type CFC<P = {}> = FC<{ children?: ReactNode } & P>
    type FCC<P = {}> = FC<{ className?: string } & P>

    interface CSSProperties {
      [key: `--${string}`]: string | number
    }
  }
}

export {}
