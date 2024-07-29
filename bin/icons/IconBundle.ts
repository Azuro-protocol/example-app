import path from 'node:path'
import fs from 'fs'
import { globSync } from 'glob'
import chokidar from 'chokidar'


type Icon = {
  name: string
  importName: string
  importPath: string
  exportString: string
}

class IconBundle {
  root: string
  outputRoot: string
  indexPath: string
  icons: Map<string, Icon>
  watcher: chokidar.FSWatcher

  constructor({ input, output }: { input: string,  output: string}) {
    // fix for windows builds
    this.root = path.resolve(input).replaceAll('\\', '/')
    this.outputRoot = path.resolve(output).replaceAll('\\', '/')
    this.indexPath = path.join(output, 'icons.ts').replaceAll('\\', '/')
    this.icons = new Map()
  }

  async destroy() {
    if (this.watcher) {
      await this.watcher.close()
    }
  }

  build() {
    const result = globSync(`${this.root}/**/*.svg`)

    result.forEach((filePath) => {
      this.addFile(filePath)
    })

    this.generate()
  }

  watch() {
    this.watcher = chokidar.watch(`${this.root}/**/*.svg`)

    this.watcher.on('add', (filePath) => {
      this.addFile(filePath)
    })

    this.watcher.on('change', (filePath) => {
      this.addFile(filePath)
    })

    this.watcher.on('unlink', (filePath) => {
      this.removeFile(filePath)
    })
  }

  addFile(filePath: string) {
    try {
      const relativePath = path.relative(this.root, filePath).replaceAll('\\', '/')
      const name = `${path.dirname(relativePath)}/${path.basename(relativePath, path.extname(relativePath))}`
      const importName = `_${name.replace(/[^a-z\d]/ig, '_')}`
      const importPath = path.relative(this.outputRoot, filePath).replaceAll('\\', '/')

      const exportString = `{ src: ${importName}.src, source: isServer && ${importName}Source, width: ${importName}.width, height: ${importName}.height, aspect: ${importName}.width/${importName}.height }`

      this.icons.set(filePath, {
        name,
        importPath,
        importName,
        exportString,
      })

      this.debouncedGenerate()
    }
    catch (error: any) {
      console.error(`[Icons] ${error?.message}`)
    }
  }

  removeFile(filePath: string) {
    this.icons.delete(filePath)
    this.debouncedGenerate()
  }

  debouncedGenerateTimeout: any

  debouncedGenerate() {
    if (this.debouncedGenerateTimeout) {
      clearTimeout(this.debouncedGenerateTimeout)
    }

    this.debouncedGenerateTimeout = setTimeout(() => {
      this.debouncedGenerateTimeout = null
      this.generate()
    }, 50)
  }

  generate() {
    const imports: string[] = []
    const exports: string[] = []

    this.icons.forEach((value) => {
      imports.push(`import ${value.importName} from '${value.importPath}?url'`)
      imports.push(`import ${value.importName}Source from '!!raw-loader!${value.importPath}'`)
      exports.push(`'${value.name}': ${value.exportString}`)
    })

    const content = [
      '/* eslint-disable */',
      imports.join('\n'),
      `\nconst isServer = typeof window === 'undefined'`,
      `\nconst icons = {\n  ${exports.join(', \n  ')}\n} as const`,
      `\nexport type IconName = keyof typeof icons`,
      `export default icons`,
    ].join('\n')

    fs.writeFileSync(this.indexPath, content)
  }
}

export default IconBundle
