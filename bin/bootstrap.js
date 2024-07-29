const path = require('path')
const modPath = require('app-module-path')

const modules = [
  '',
  'local_modules',
]

modules.forEach((modulePath) => {
  modPath.addPath(path.join(process.cwd(), modulePath))
})

require('@babel/register')({
  extensions: [ '.js', '.ts', '.tsx' ],
})
