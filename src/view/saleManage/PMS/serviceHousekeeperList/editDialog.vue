<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules">
        <table class="detail-table com-container">
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
        <el-button class="save-button" @click="saveSubmitForm('addForm')">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  // import API from '../../../../utils/api'
  import { chartLengthRule } from '../../../../utils/const'
  import photoView from '../../../../components/photo/photoView'

  export default {
    name: 'addDialog',
    data () {
      return {
        dataLoading: false,
        photoData: {},
        addForm: { //
        },
        rules: {
          name: [
            {required: true, message: '请输入公司名称', trigger: 'blur'},
            {min: 1, max: 50, message: '长度为 50 个字符以内', trigger: 'blur'},
          ],
          businessLicense: [
            // {required: true, message: '请输入营业执照', trigger: 'blur'},
            {max: 30, message: '长度为 30 个字符以内', trigger: 'blur'},
          ],
          level: [
            // {required: true, message: '请选择客户等级', trigger: 'change'},
          ],
          contactName: [
            // {required: true, message: '请输入客户简称', trigger: 'blur'},
            {max: 30, message: '长度为 30 个字符以内', trigger: 'blur'},
          ],
          industry: [
            {required: true, message: '请选择客户行业', trigger: 'change'},
            {max: 30, message: '长度为 30 个字符以内', trigger: 'blur'},
          ],
          provinceId: [
            {required: true, message: '请选择客户地区', trigger: 'change'},
          ],
          cityId: [],
          areaId: [],
          website: [
            // {required: true, message: '请输入公司网站', trigger: 'blur'},
            {max: 100, message: '长度为 100 个字符以内', trigger: 'blur'},
          ],
          phone: [
            // {required: true, message: '请输入联系电话', trigger: 'blur'},
            chartLengthRule.validatePhone,
          ],
          // seaName: '',
          seaId: [
            {required: true, message: '请选择客户公海', trigger: 'change'},
          ],
          address: [
            {required: true, message: '请输入联系地址', trigger: 'blur'},
          ],
          business: [
            {required: true, message: '请输入主营业务', trigger: 'blur'},
            {max: 100, message: '长度为 100 个字符以内', trigger: 'blur'},
          ],
          // customerSource: [
          //   {required: true, message: '请选择客户来源', trigger: 'change'},
          // ],
        },
        dialogType: 'edit',
        targetObj: null,
      }
    },
    props: ['params'],
    components: {
      photoView,
    },
    methods: {
      saveSubmitForm (formName) {
        // console.log(this.$refs.areaSe.getSelectedValue(), '区域')
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataLoading = true
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
    },
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
      if (this.params.detail) { // 编辑
        this.addForm = JSON.parse(JSON.stringify(this.params.detail))
        this.dialogType = 'edit'
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
</style>
