const path = require('path')
const asyncLib = require('async')

const metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const layouts = require('metalsmith-layouts')
const nunjucks = require('nunjucks')
const permalinks = require('metalsmith-permalinks')
const collections = require('metalsmith-collections')
const debug = require('metalsmith-debug')
const sass = require('metalsmith-sass')
const inlineSVG = require('metalsmith-inline-svg')

const loadFiles = require('./plugins/loadFiles')
const clearCollections = require('./plugins/clearCollections')
const clearByExtension = require('./plugins/clearByExtension')
const moveByExtension = require('./plugins/moveByExtension')
const webpack = require('./plugins/webpack')

const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')


MOVIE_EXTENSIONS = ['.webm', '.mp4']
MOVIE_DIR = 'videos'
IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico']
IMAGE_DIR = 'images'

BANNED_EXTENSIONS = ['.swp', '.swo']

SOURCE_DIR = './src'

const environment = process.env.NODE_ENV || 'production'

const app = metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Portfolio | Matt Nishi-Broach',
      description: 'Online portfolio for artist/programmer Matt Nishi-Broach'
    }
  })
  .source(`${SOURCE_DIR}/content`)
  .destination('build')
  .ignore([
    '.DS_Store',
  ])
  .use(clearByExtension(BANNED_EXTENSIONS))
  .use(clearCollections())
  .use(loadFiles([
    './src/**/*.sass',
    './src/images/**/*',
  ]))
  .use(collections({
    projects: {
      pattern: 'projects/**/*.md',
      sortBy: 'order'
    },
    pages: {
      pattern: 'pages/**/*.md',
    },
  }))
  .use(markdown())
  .use(moveByExtension(MOVIE_EXTENSIONS, MOVIE_DIR))
  .use(moveByExtension(IMAGE_EXTENSIONS, IMAGE_DIR))
  .use(permalinks({
    relative: false,
    pattern: ':collection/:title',
  }))
  .use(webpack(environment === 'production' ? prodConfig : devConfig))
  .use(layouts({
    directory: './src/layouts',
    default: 'project.njk',
    pattern: '**/*.html',
  }))
  .use(inlineSVG())
  .use(sass({
    outputDir: 'css/' ,
    includePaths: ['./src/sass',],
  }))


if (module.parent) {
  module.exports = app
} else {
  app.build((err) => {
    if (err) {
      console.log(err)
    }
  })
}
