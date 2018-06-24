'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_ROOT: '"' + process.env.server_url + '"',
  API_EXTERNAL: '"'+ process.env.external_url + '"'
})
