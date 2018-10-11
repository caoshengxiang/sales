<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog com-container">
      <el-form :model="addForm" ref="addForm" label-width="0px">
        <table class="detail-table">
          <tr>
            <td class="td-title">平台用户</td>
            <td>{{managerDetail.accountNumber}}</td>
            <td class="td-title">联系姓名</td>
            <td>{{managerDetail.name}}</td>
            <td class="td-title">联系电话</td>
            <td>{{managerDetail.mobilePhone}}</td>
          </tr>
          <tr>
            <td class="td-title">民族</td>
            <td>{{managerDetail.nation}}</td>
            <td class="td-title">性别</td>
            <td>{{managerDetail.sex}}</td>
            <td class="td-title">出生日期</td>
            <td>{{ managerDetail.birthday && $moment(managerDetail.birthday).format('YYYY-MM-DD') }}</td>
          </tr>
          <tr>
            <td class="td-title">居民身份证</td>
            <td colspan="5">
              <span>{{managerDetail.idCard}}</span>
              <photo-view :photo-data="{
                text: '身份证查看大图',
                images: [
                  {url: managerDetail.identityCardPhoto, previewText: ''},
                ]
              }">
              </photo-view>
            </td>
          </tr>
          <tr>
            <td class="td-title">工作单位</td>
            <td>{{managerDetail.organizationName}}</td>
            <td class="td-title">工作部门</td>
            <td>{{managerDetail.departmentName}}</td>
            <td class="td-title">工作职责</td>
            <td>todo</td>
          </tr>
          <tr>
            <td class="td-title">职称</td>
            <td>{{managerDetail.jobTitle}}</td>
            <td class="td-title">从业年限</td>
            <td>{{managerDetail.workExperience}}</td>
            <td class="td-title"></td>
            <td></td>
          </tr>
          <tr>
            <td class="td-title">最高学历</td>
            <td>{{managerDetail.education}}</td>
            <td class="td-title">毕业院校</td>
            <td>{{managerDetail.graduateInstitutions}}</td>
            <td class="td-title">专业</td>
            <td>{{managerDetail.major}}</td>
          </tr>
          <tr>
            <td class="td-title">专业资质证书</td>
            <td colspan="5">{{managerDetail.certificate}}</td>
          </tr>
          <tr>
            <td class="td-title">职称证明</td>
            <td>
              <photo-view :photo-data="{
                text: '查看大图',
                images: [
                  {url: managerDetail.jobTitleCertificate, previewText: ''},
                ]
              }">
              </photo-view>
            </td>
            <td class="td-title">学历证明</td>
            <td>
              <photo-view :photo-data="{
                text: '查看大图',
                images: [
                  {url: managerDetail.educationCertificate, previewText: ''},
                ]
              }">
              </photo-view>
            </td>
            <td class="td-title">资质证明</td>
            <td>
              <photo-view :photo-data="{
                text: '查看大图',
                images: [
                  {url: managerDetail.qualificationCertificate, previewText: ''},
                ]
              }">
              </photo-view>
            </td>
          </tr>
          <tr>
            <td class="td-title">认证服务地区</td>
            <td colspan="5">
              <span v-for="(item, index) in managerDetail.serviceManagerAreaModels" :key="index">
                <span v-if="index > 0">、</span>{{item.provinceName + item.cityName + item.areaName}}
              </span>
            </td>
          </tr>
          <tr>
            <td class="td-title">认证商品</td>
            <td colspan="5">
              <span v-for="(item, index) in managerDetail.serviceManagerGoodsModels" :key="index">
                <span v-if="index > 0">、</span>{{item.goodsName}}
              </span>
            </td>
          </tr>
          <tr>
            <td class="td-title">现从事专业及研究方向</td>
            <td colspan="5">{{managerDetail.workReasearch}}</td>
          </tr>
          <tr>
            <td class="td-title">社会重要职务</td>
            <td colspan="5">{{managerDetail.socialFunctions}}</td>
          </tr>
          <tr>
            <td class="td-title">个人简介</td>
            <td colspan="5">{{managerDetail.resume}}</td>
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
  import API2 from '../../../../utils/api2'
  import photoView from '../../../../components/photo/photoView'

  export default {
    name: 'addDialog',
    data () {
      return {
        dataLoading: false,
        addForm: {},
        dialogType: 'edit',
        photoData: {},
        managerDetail: {},
      }
    },
    props: ['params'],
    components: {
      photoView,
    },
    methods: {
      getDetail () {
        API2.serviceManager.updateDetail(this.params.id, (da) => {
          this.managerList = da.data
        })
      },
    },
    created () {
      this.getDetail()

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
