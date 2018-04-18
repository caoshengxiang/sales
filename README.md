# sales

销售管理系统

> A Vue.js project

## 技术栈

* vue
* vue-router
* vuex
* axios
* jquery
* socket.io
* element-ui
* webpack

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 项目部署


# 注意
## 组件内不能覆盖element-ui样式
```
import 'element-ui/lib/theme-chalk/index.css'
import './element.css' // 自定义样式覆盖element-ui 默认并且不能修改的样式
```
>将要覆盖的样式，在import element样式之后引入，如上。css 写在element.css中
