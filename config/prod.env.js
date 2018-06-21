'use strict'
console.log( '接口基本地址：', process.env.server_url, process.env.external_url)
module.exports = {
  NODE_ENV: '"production"',
  API_ROOT: '"'+ process.env.server_url + '"',
  API_EXTERNAL: '"'+ process.env.external_url + '"'
}
