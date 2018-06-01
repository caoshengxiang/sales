'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const serverUrl = require('./serverUrl')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: serverUrl.dev_url
})
