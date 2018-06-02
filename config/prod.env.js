'use strict'
console.log( '接口基本地址：', process.env.server_url)
module.exports = {
  NODE_ENV: '"production"',
  API_ROOT: '"'+ process.env.server_url + '"'
}
