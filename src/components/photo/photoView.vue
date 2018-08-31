<template>
  <div style="position: relative;display: inline-block">
    <span class="com-a-link">{{photoData.text}}</span>
    <div style="position: absolute; top: 0;width: 100%;height: 100%;opacity: 0;overflow: hidden;">
      <img v-for="(item, index) in photoData.images" :key="index" :src="item.url" style="width: 150px;" :preview="previewVal" :preview-text="item.previewText">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'photoView',
    data () {
      return {}
    },
    computed: {
      previewVal () {
        /*
        * 随机的由字母数字组合的字符串
        * 解释:
        *  很有意思，研究了一下，基本上toString后的参数规定可以是2-36之间的任意整数，不写的话默认是10（也就是十进制），此时返回的值就是那个随机数。
        *  若是偶数，返回的数值字符串都是短的，若是奇数，则返回的将是一个很大长度的表示值。
        *  若<10 则都是数字组成，>10 才会包含字母。
        *  所以如果想得到一长串的随机字符，则需使用一个 > 10 且是奇数的参数，另外根据长度自行使用slice(2,n)截取！
        * */
        return Math.random().toString(36).substr(2)
      }
    },
    props: {
      photoData: {
        type: Object,
        default () {
          return {
            text: '查看大图',
            images: [
              {
                previewText: '',
                url: ''
              },
            ]
          }
        }
      }
    },
    watch: {
      photoData: {
        deep: true, // 深度监听
        handler () {
          this.$previewRefresh() // 异步获取图片需要调用该方法
        }
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '../../styles/common';
</style>
