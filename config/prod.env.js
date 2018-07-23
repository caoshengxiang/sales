'use strict'
console.log( '服务器地址：', process.env.server_url, '外部地址：', process.env.external_url)
module.exports = {
  NODE_ENV: '"production"',
  API_ROOT: '"'+ process.env.server_url + '"',
  API_EXTERNAL: '"'+ process.env.external_url + '"'
}
