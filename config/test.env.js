'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')
console.log( 'test服务器地址：', process.env.server_url, '外部地址：', process.env.external_url, process.env.activityCodePre, process.env.agentRegister)
module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_ROOT: '"' + process.env.server_url + '"',
  API_EXTERNAL: '"'+ process.env.external_url + '"',
  ACTICITY_CODE_PRE: '"'+ process.env.activityCodePre + '"',
  AGENT_REGISTER: '"'+ process.env.agentRegister + '"'
})
