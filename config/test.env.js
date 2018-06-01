'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')
const serverUrl = require('./serverUrl')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_ROOT: serverUrl.test_url
})
