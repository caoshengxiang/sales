import { serverUrl } from './const'

$axios.defaults.baseURL = serverUrl
$axios.defaults.timeout = 300000
// $axios.defaults.headers = {'X-Custom-Header': 'foobar'}
// $axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded'
