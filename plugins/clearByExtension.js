const path = require('path')


const clearByExtension = (extensions) => (files, metalsmith, done) => {
  /*
   * Removes certain hidden file extensions.  Necessary because metalsmith-ignore 
   * skips globs of hidden files
   */
  Object.keys(files).filter(name => extensions.includes(path.parse(name).ext)).forEach(name => {
    delete files[name]
  })
  done()
}

module.exports = clearByExtension
