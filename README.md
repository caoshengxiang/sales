# 销售管理系统


> A Vue.js project


## 运行环境

* node@8
* window、linux

## 兼容要求

* chrome
* IE10+
* 360、QQ等
// todo 暂定

## 技术栈

* [vue](https://cn.vuejs.org/v2/guide/)
* [vue-router](https://router.vuejs.org/zh-cn/)
* [vuex](https://vuex.vuejs.org/zh-cn/api.html)
* [axios](https://www.npmjs.com/package/axios)
* jquery
* [socket.io](https://socket.io/)
* [element-ui](http://element.eleme.io/#/zh-CN/component/installation)
* [webpack](https://webpack.js.org/)
* [sass](https://www.sass.hk/)
* eslint (standard风格)

## 项目运行

``` bash
### 安装依赖
npm install

### 运行开发环境
npm run dev

### 生产环境
npm run build

### 运行生产环境，并生成报告
npm run build --report

### run unit tests
npm run unit

### run e2e tests
npm run e2e

### run all tests
npm test
```

## 项目部署

// todo

## 目录说明
```
* sales
  - bash // 脚本文件目录，
  - build //
  - config
  - dist
  - src
    - assets // 会打包到项目
    - components // 通用组件目录，或全局组件
    - element_ui // element-ui的配置
      - element-variables.scss // 自定义element主题
      - index.js // 配置按需引入elementUI
      - element.css // 定义一些用于覆盖element样式
    - pages // 页面目录，按页面逻辑划分
    - router // 路由配置
    - store // store, 按后台功能进行划分模块
    - styles // 样式目录
      - basic.scss // 全局初始化的样式
      - common.scss // 通用样式
      - mixin.scss // 定义一些混合的样式
      - fun.scss // 函数
      - sprites.css // 雪碧图, 使用<i class="sprites sprites-btn-1"></i>
      - var.scss // 定义变量
    - utils // 工具目录
      - api.js // 定义所有的接口
      - axiosConfig.js // axios配置，$axios webpack插件配置全局变量
      - utils.js // 工具函数
      - const.js // 项目中常量，如：url 【这个文件暂时就放在这里】
  - static // 静态目录
  - test // 测试 【这个项目目前应该不会用到，先保留在这里】
  - eslintrc.js // 可添加自己的语法规则，建议统一使用标准
  - 其他配置文件
```


## 可能遇到的问题

### 组件内不能覆盖element-ui样式
```
import 'element-ui/lib/theme-chalk/index.css'
import './element.css' // 自定义样式覆盖element-ui 默认并且不能修改的样式
```
>将要覆盖的样式，在import element样式之后引入，如上。css 写在element.css中

### 自动打开浏览器

```js
// 各种设备设置信息
host: 'localhost', //主机名
port: 8080, // 端口号（默认8080）
autoOpenBrowser: false,//是否自动打开浏览器
//想让浏览器自动打开，只需将false改为true即可，为防止端口号冲突，这里也可以随意更改端口号
```

### 配置目录

```js
// config/index.js
// Paths
    assetsSubDirectory: 'static', // 设置静态目录，assets 目录打包到项目; static 目录直接复制到dist/static,使用绝对路径
    assetsPublicPath: '/', // 打包后的路径，dev 一般都是/，build 根据情况配置
```

### 代理
```js
dev: {
    // config/index.js
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: { // 配置代理
      '/precision': {
        target: 'http://test.dcstar-inc.com:9567/precision',
        changeOrigin: true,
        pathRewrite: {
          '^/precision': ''
        }
      }
    },
```

### 直接打开index.html 无法打开

[链接](https://blog.csdn.net/theoneemperor/article/details/78155644)

### 配置全局变量
```js
module: {
    rules: [
    ]
},
plugins: [
    new webpack.ProvidePlugin({ // 配置全局变量
      $:"jquery",
      jQuery:"jquery",
      $axios: 'axios'
    })
  ],
```

### node-sass安装失败的问题

#### 1. 使用cnpm

```
cnpm install
```
<font color="red">如果sass-node无法安装，尝试使用cnpm 安装，</font>

#### 2. 设置淘宝源

    此方案将把下载源指定为cnpm仓库：
    全部的下载源指向cnpm的指令:
    　　npm :
    npm config set registry http://registry.npm.taobao.org
    　　yarn :
    yarn config set registry http://registry.npm.taobao.org
    　只指定node-sass的下载源：
    　　npm：
    npm config set sass-binary-site http://npm.taobao.org/mirrors/node-sass
    　　yarn：
    yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass

#### 3. 暴力一点直接从其他项目copy

> (网上方法很多扯淡,包括用第二步也是不行,第二步安装玩后node-sass编译会报错,删除node_modules下的node-sass,再使用cnpm install安装)

### sass报错

组件中要使用sass,要
```
<style scoped lang="sass" rel="stylesheet/scss">
```
报错,类似：
```
Failed to compile.

./node_modules/css-loader?{"sourceMap":true}!./node_modules/vue-loader/lib/style-compiler?{"vue":true,"id":"data-v-656039f0","scoped":true,"hasInlineConfig":false}!./node_modules/_sass-loader@7.0.1@sass-loader/lib/loader.js?{"indentedSyntax":true,"sourceMap":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/components/HelloWorld.vue
Module build failed:
undefined
       ^
      Invalid CSS after "h1, h2 {": expected "}", was "{"
      in D:\works\sales\src\components\HelloWorld.vue (line 99, column 9)
 @ ./node_modules/vue-style-loader!./node_modules/css-loader?{"sourceMap":true}!./node_modules/vue-loader/lib/style-compiler?{"vue":true,"id":"data-v-656039f0","scoped":true,"hasInlineConfig":false}!./node_modules/_sass-loader@7.0.1@sass-loader/lib/loader.js?{"indentedSyntax":true,"sourceMap":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/components/HelloWorld.vue 4:14-420 13:3-17:5 14:22-428
 @ ./src/components/HelloWorld.vue
 @ ./src/router/index.js
 @ ./src/main.js
 @ multi (webpack)-dev-server/client?http://localhost:8080 webpack/hot/dev-server ./src/main.js
```
改成：
```
<style scoped lang="scss" rel="stylesheet/scss">
```

### IE下报错：[vuex] vuex requires a Promise polyfill in this browser.
```
  entry: { // 入口
            // index: path.join(__dirname + '/../src/index.js')
            index: ["babel-polyfill", path.join(__dirname + '/../src/index.js')] // 解决IE不兼容【IE报vuex requires a Promise polyfill in this browser问题解决】
    },
```

### 组件内不能覆盖element-ui样式
```
import 'element-ui/lib/theme-chalk/index.css'
import './element.css' // 自定义样式覆盖element-ui 默认并且不能修改的样式
```
>将要覆盖的样式，在import element样式之后引入，如上。css 写在element.css中

### 使用webstorm【crl+shift+l】eslint报错

可在websorm中设置：
File -> Settings -> Code Style -> JavaScript 个性化进行设置
> 更好的方式，在这个窗口右上角点击 `Set From...`  -> `Predefined Style` -> `JavaScript Standard Style` 可配置标准风格

<font color="red">也会有少数语法会报错，遇到也只能手动对这些错误语法配置，如果实在找不到对应配置格式，只能暂时在 `.eslintrc.js` 中禁用</font>

如未解决的一个问题：
【ctl+shift+l】后，这样
```
<script>
  var a = null
  function f () {
    var a = 1
  }
</script>
```
但eslint标准风格要求，script下是不空格,这样
```
<script>
var a = null
function f () {
  var = 1
}
</script>
```

## vue{{}}数据未渲染不显示的问题

[文档](https://vuejs.org/v2/api/#v-cloak)

可在挂在的根元素添加，不必在所有`{{}}`标签中添加
```html
<div class="#app" v-cloak>
    <p>{{value.name}}</p>
</div>
```
```css
[v-cloak] {
    display: none;
}
```
<font color="red">v-cloak的display属性被层级更高的给覆盖掉了，所以要提高层级</font>
```
[v-cloak] {
    display: none !important;
}
```
<font color="red">v-cloak的这个样式放在@import 引入的css文件中不起作用</font>


# 项目有其他注意事项【记得此说明】

## axios 说明
axios 在webpack定义全局变量 `$axios`
```js
 plugins: [
    new webpack.ProvidePlugin({ // 配置全局变量
      $:"jquery",
      jQuery:"jquery",
      $axios: 'axios'
    })
  ],
```
`axiosConfig.js`是配置文件，在`main.js`中引入

## element 主题

[文档](http://element.eleme.io/#/zh-CN/component/custom-theme)


## 一些常量数据的定义规则

1. 定义在store中的constData模块
2. const.js中

## 前端和管理端风格

1. store中定义主题常量
2. 通过路由参数区分主题，`'/sales/:end'`,

 路由分别设置前端和管理端的参数 `this.$router.push({name: 'test', params: {end: 'FE'})`

 管理端 `this.$router.push({name: 'test', params: {end: 'ME'})`

 页面获取 this.$route.params.end

3. 主题需要修改的文件，和地方
* index.vue
  在created周期设置store 中theme 的索引themeIndex,(也可以通过themeIndex来判断使用那种主题)

* leftMenuBar.vue

* pageHeader.vue

4. 修改element主题【目前没想到什么更好的方法】
  目前是通过feElement.vue和meElement.vue两个组件分别在index.vue中引入element的主题



## 雪碧图
  class名为： spretes-文件名
 如：<i class="sprites sprites-btn-1"></i>
> 将雪碧图换成了base64
