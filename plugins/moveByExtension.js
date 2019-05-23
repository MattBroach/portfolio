const path = require('path')


const moveByExtension = (extensions, destination) => (files, metalsmith, done) => {
  /*
   * Moves a set of files, as specified by a list of extensions, to the given folder.
   * Used here rather than somethink like `metalsmith-move-remove` because it allows image/video
   * assets to be kept with their project, which seems to me a WAY cleaner workflow
   */
  Object.keys(files).filter(name => extensions.includes(path.parse(name).ext)).forEach(name => {
    const newPath = path.join(destination, path.basename(name))
    files[newPath] = {
      ...files[name],
      path: newPath,
    }
    delete files[name]
  })
  done()
}

module.exports = moveByExtension
