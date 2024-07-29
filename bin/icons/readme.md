---
Icons bundle generator
---

Default NextJs import generates object for svg: `{ src: string, width: number, height: number }`

This generator generates icons.ts file in `output` folder from a `input` folder with icons:
```ts
import _hubs_about from '../relative/path/to/input/hubs/about.svg'
import _hubs_aboutSource from '!!raw-loader!../relative/path/to/input/hubs/about.svg'
import _interface_attention from '../relative/path/to/input/interface/attention.svg'
import _interface_attentionSource from '!!raw-loader!../relative/path/to/input/interface/attention.svg'
import _sport_football from '../relative/path/to/input/sport/football.svg'
import _sport_footballSource from '!!raw-loader!../relative/path/to/input/sport/football.svg'

const isServer = typeof window === 'undefined'

const icons = {
  'hubs/about': {
    src: _hubs_about.src,
    source: isServer && _hubs_aboutSource,
    width: _hubs_about.width,
    height: _hubs_about.height,
    aspect: _hubs_about.width / _hubs_about.height,
  },
  'interface/attention': {
    src: _interface_attention.src,
    source: isServer && _interface_attentionSource,
    width: _interface_attention.width,
    height: _interface_attention.height,
    aspect: _interface_attention.width / _interface_attention.height,
  },
  'sport/football': {
    src: _sport_football.src,
    source: isServer && _sport_footballSource,
    width: _sport_football.width,
    height: _sport_football.height,
    aspect: _sport_football.width / _sport_football.height,
  },
} as const

export type IconName = keyof typeof icons
export default icons
```
