const fs = require('fs-extra')
const fg = require('fast-glob')
const async = require('async')
const Mode = require('stat-mode')


const loadFiles = globs => (files, metalsmith, done) => {
  /*
   * Load extra files that are not in the content directory
   */
  const readFile = async function (file, callback) {
    const stats = await fs.stat(file)
    const buffer = await fs.readFile(file)

    return {
      [file]: {
        contents: buffer,
        stats: stats,
        mode: Mode(stats).toOctal(),
      }
    }
  }

  fg(globs).then((filenames) => {
    async.map(filenames, readFile, (err, results) => {
      const newFiles = results.reduce((acc, file) => ({ ...acc, ...file }))
      Object.assign(files, newFiles)
      done()
    })
  })
}

module.exports = loadFiles
