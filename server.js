const Runner = require('metalsmith-start').Runner
const app = require('./index')


const r = new Runner(app)

r.start(function () {
  console.log('started on ' + r.port)
})
