'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')
console.log( 'test', process.env.server_url, process.env.external_url, process.env.activityCodePre, process.env.agentRegister)
module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_ROOT: '"' + process.env.server_url + '"',
  API_EXTERNAL: '"'+ process.env.external_url + '"',
  ACTICITY_CODE_PRE: '"'+ process.env.activityCodePre + '"',
  AGENT_REGISTER: '"'+ process.env.agentRegister + '"'
})
