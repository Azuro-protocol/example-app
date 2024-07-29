---
svg-provider
---

This module helps to work with SVG icons. It supports inline icons and sprite-based icons.
Also, it provides sprite rendering on SSR to provide better UX.

It consists of several items:

1. Runtime. BrowserRuntime with XHR loading, and ServerRuntime with source support and sprite generation (soon =)). 
2. SvgProvider which provides the runtime to Svg component by context
3. Svg. The actual component which renders the icon. It requests icon from the runtime and render it in-place.
4. Icon bundle with source of each icon on server side.

When a server renders the response, it collects every used icon and generate a sprite from them. 
Each symbol in sprite has a `data-filename` attribute which helps BrowserRuntime load existing icons to its cache.
