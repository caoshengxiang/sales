<template>
  <div class="hello">
    <h1><span>你好像迷路了！<a style="color: blue;cursor: pointer" @click="$router.go(-1)">原路返回</a></span></h1>

    <el-upload
      class="upload-demo"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>


    <h3 style="color: #f06b78">二维码：</h3>
    <vue-qr
      :logoSrc="config.logo"
      :text="config.value+'?test=123'"
      :size="200"
      :margin="0"
      :callback="test"
      qid="testid"></vue-qr>

    <h3>在img标签添加preview属性 preview值相同即表示为同一组</h3>
    <div style="position: relative;display: inline-block">
      <span>查看大图 查看大图</span>
      <div style="position: absolute; top: 0;width: 100%;height: 100%;opacity: 0;overflow: hidden;">
        <img src="../../static/images/wave-bot.png" style="width: 150px;" preview="0" preview-text="描述文字">
        <img src="../../static/images/wave-bot-2.png" style="width: 150px;" preview="0" preview-text="描述文字">
      </div>
    </div>

    <h3>排序</h3>
    <div class="color-list">
      <div
        class="color-item"
        v-for="color in colors" v-dragging="{ item: color, list: colors, group: 'color' }"
        :key="color.text"
      >{{color.text}}
      </div>
    </div>
  </div>
</template>

<script>
  import VueQr from 'vue-qr'
  import bgSrc from '../assets/icon/company.png'
  import html2canvas from 'html2canvas'


  export default {
    name: 'HelloWorld',
    data () {
      return {
        fileList: [],
        config: {
          value: 'http://www.baidu.com', // 显示的值、跳转的地址(要加http)
          logo: 'static/favicon.ico', // 中间logo的地址
          bgSrc: bgSrc,
        },
        dataUrl: '',
        colors: [
          {
            text: 'Aquamarine',
          }, {
            text: 'Hotpink',
          }, {
            text: 'Gold',
          }, {
            text: 'Crimson',
          }, {
            text: 'Blueviolet',
          }, {
            text: 'Lightblue',
          }, {
            text: 'Cornflowerblue',
          }, {
            text: 'Skyblue',
          }, {
            text: 'Burlywood',
          }],
      }
    },
    components: {VueQr},
    methods: {
      submitUpload () {
        this.$refs.upload.submit()
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      test (dataUrl, id) {
        console.log(dataUrl, id)
        this.dataUrl = dataUrl
      },
      },
      downDiv () {
        html2canvas(document.querySelector('#downDiv')).then(canvas => {
          // document.body.appendChild(canvas)
          var a = document.createElement('a')
          a.href = canvas.toDataURL('image/png') // 将画布内的信息导出为png图片数据
          a.download = '哈哈' // 设定下载名称
          a.click() // 点击触发下载
        })
      },
    },
    mounted () {
      this.$dragging.$on('dragged', ({ value }) => {
        // console.log(value.item)
        // console.log(value.list)
        // console.log(value.otherData)
        console.log(value)
      })
      this.$dragging.$on('dragend', (value) => {
        console.log(value)
      })
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../styles/sprites.css";
  @import '../element_ui/element-variables';
  @import '../element_ui/element';
  @import "../styles/common";
</style>
