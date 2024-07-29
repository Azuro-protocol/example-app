import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'

import IconBundle from './IconBundle'


const bundlePaths = [
  {
    input: 'public/images/icons',
    output: 'src/components/ui/Icon',
  }
]

// use --watch to enable watch mode
const options = yargs(hideBin(process.argv)).argv

const bundles = bundlePaths.map((path) => new IconBundle(path))

bundles.forEach((bundle) => {
  // @ts-ignore
  if (options.watch) {
    bundle.watch()
  }
  else {
    bundle.build()
  }
})

export {}
