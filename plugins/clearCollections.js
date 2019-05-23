const clearCollections = () => (files, metalsmith, done) => {
  const metadata = metalsmith.metadata()
  const collections = metadata.collections

  if (collections) {
    Object.keys(collections).forEach((collection) => {
      collections[collection] = []
      metadata[collection] = []
    })
  }

  done()
}

module.exports = clearCollections
