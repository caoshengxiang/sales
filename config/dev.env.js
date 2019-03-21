'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
console.log( 'dev：', process.env.server_url, process.env.external_url, process.env.activityCodePre, process.env.agentRegister)
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"' + process.env.server_url + '"',
  API_EXTERNAL: '"'+ process.env.external_url + '"',
  ACTICITY_CODE_PRE: '"'+ process.env.activityCodePre + '"',
  ACTICITY_CODE_PRES: '"'+ process.env.activityCodePres + '"',
  AGENT_REGISTER: '"'+ process.env.agentRegister + '"'
})
