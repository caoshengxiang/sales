'use strict'
const serverUrl = require('./serverUrl')
module.exports = {
  NODE_ENV: '"production"',
  API_ROOT: serverUrl.prod_url
}
