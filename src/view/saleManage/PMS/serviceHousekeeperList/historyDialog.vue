<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog com-container">
      <el-form :model="addForm" ref="addForm" label-width="0px">
        <table class="detail-table">
          <tr>
            <td class="td-title">平台用户</td>
            <td>todo</td>
            <td class="td-title">联系姓名</td>
            <td>todo</td>
            <td class="td-title">联系电话</td>
            <td>todo</td>
          </tr>
          <tr>
            <td class="td-title">名族</td>
            <td>todo</td>
            <td class="td-title">性别</td>
            <td>todo</td>
            <td class="td-title">出生日期</td>
            <td>todo</td>
          </tr>
          <tr>
            <td class="td-title">居民身份证</td>
            <td colspan="5">
              <span>13645641564545</span>
              <photo-view :photo-data="photoData">
              </photo-view>
            </td>
          </tr>
          <tr>
            <td class="td-title">工作单位</td>
            <td>todo</td>
            <td class="td-title">工作部门</td>
            <td>todo</td>
            <td class="td-title">工作职责</td>
            <td>todo</td>
          </tr>
          <tr>
            <td class="td-title">职称</td>
            <td>todo</td>
            <td class="td-title">从年年限</td>
            <td>todo</td>
            <td class="td-title"></td>
            <td></td>
          </tr>
          <tr>
            <td class="td-title">名族</td>
            <td>todo</td>
            <td class="td-title">性别</td>
            <td>todo</td>
            <td class="td-title">出生日期</td>
            <td>todo</td>
          </tr>
          <tr>
            <td class="td-title">最高学历</td>
            <td>todo</td>
            <td class="td-title">毕业院校</td>
            <td>todo</td>
            <td class="td-title">专业</td>
            <td>todo</td>
          </tr>
          <tr>
            <td class="td-title">专业资质证书</td>
            <td colspan="5">todo</td>
          </tr>
          <tr>
            <td class="td-title">职称证明</td>
            <td>
              <photo-view :photo-data="photoData">
              </photo-view>
            </td>
            <td class="td-title">学历证明</td>
            <td>
              <photo-view :photo-data="photoData">
              </photo-view>
            </td>
            <td class="td-title">资质证明</td>
            <td>
              <photo-view :photo-data="photoData">
              </photo-view>
            </td>
          </tr>
          <tr>
            <td class="td-title">现从事专业及研究方向</td>
            <td colspan="5">todo</td>
          </tr>
          <tr>
            <td class="td-title">社会重要职务</td>
            <td colspan="5">todo</td>
          </tr>
          <tr>
            <td class="td-title">个人简介</td>
            <td colspan="5">todo</td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  // import API from '../../../../utils/api'
  import photoView from '../../../../components/photo/photoView'

  export default {
    name: 'addDialog',
    data () {
      return {
        dataLoading: false,
        addForm: {},
        dialogType: 'edit',
        photoData: {},
      }
    },
    props: ['params'],
    components: {
      photoView,
    },
    methods: {},
    created () {
      setTimeout(() => {
        this.photoData = {
          text: '身份证.jpg 查看大图',
          images: [
            {url: '../../../../../static/images/wave-bot.png', previewText: '描述文字1'},
            {url: '../../../../../static/images/wave-bot-2.png', previewText: '描述文字2'},
          ]
        }
      }, 1000)
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
</style>
