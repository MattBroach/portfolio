const path = require('path')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')

const plugin = (config) => (files, metalsmith, done) => {
  /*
   * Run webpack as part of the build process. Adds the output files directly into the 
   * metalsmith `files` object, and adds metadata mapping chunks <-> assets, so
   * that hashed filenames can be looked up in templates.
   *
   */
  const compiler = webpack(config)
  const fs = new MemoryFs()

  compiler.outputFileSystem = fs

  compiler.run((err, stats) => {
    if (err) throw err

    const data = stats.toJson()
    const outputPath = data.outputPath
    const chunkmap = {}

    const processAsset = (asset, chunk) => {
      // read the contents from the in-memory filesystem
      const fullpath = path.join(outputPath, asset)
      const filename = path.relative(metalsmith.destination(), fullpath)
      const contents = fs.readFileSync(fullpath)

      // ignore sourcemaps when adding file info to webpack metadata
      if (!filename.endsWith('.map')) chunkmap[chunk].push(filename)

      return {
        [filename]: { contents },
      }
    }

    Object.keys(data.assetsByChunkName).forEach((chunk) => {
      chunkmap[chunk] = []
      const chunkContents = data.assetsByChunkName[chunk]
  
      assets = Array.isArray(chunkContents) 
        ? chunkContents.map(asset => processAsset(asset, chunk)).reduce(
            (assetFiles, asset) => ({ ...assetFiles, ...asset }), {}
          )
        : processAsset(chunkContents, chunk)

      Object.assign(files, assets)
    })

    const meta = metalsmith.metadata()
    meta.webpack = chunkmap

    done()
  })
}

module.exports = plugin
