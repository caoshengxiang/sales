'use strict'
console.log( 'prod', process.env.server_url, process.env.external_url, process.env.activityCodePre, process.env.agentRegister)
module.exports = {
  NODE_ENV: '"production"',
  API_ROOT: '"'+ process.env.server_url + '"',
  API_EXTERNAL: '"'+ process.env.external_url + '"',
  ACTICITY_CODE_PRE: '"'+ process.env.activityCodePre + '"',
  AGENT_REGISTER: '"'+ process.env.agentRegister + '"'
}
