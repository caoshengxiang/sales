<template>
  <div class="com-container com-detail-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in $route.meta.pos" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-info-left">
        <img class="com-info-img" src="../../../../assets/icon/company.png" alt="">
        <div class="com-info-text">
          <h3>{{managerDetail.name}}
            <span class="com-d-tap-2"><span v-for="(item, index) in managerDetail.serviceManagerTypeModels"
                                            :key="index">
                <span v-if="index > 0">/</span>{{item.managerType}}
              </span>
          </span>
          </h3>
          <p>
            <span class="com-d-item">服务地区:
              <span v-for="(item, index) in managerDetail.serviceManagerAreaModels" :key="index">
                 <span v-if="index < 2">
                <span v-if="index > 0">、</span>{{item.provinceName + item.cityName + item.areaName}}
                 </span>
              </span>
            <span v-if="managerDetail.serviceManagerAreaModel && managerDetail.serviceManagerAreaModel.length > 2">...</span>
            </span>
            <span class="com-d-item">联系电话: <span>{{managerDetail.mobilePhone}}</span></span>
            <span class="com-d-item">服务类目:
            <span v-for="(item, index) in managerDetail.serviceManagerGoodsModels" :key="index">
                <span v-if="index < 2">
                <span v-if="index > 0">、</span>{{item.goodsName}}
                </span>
              </span>
              <span v-if="managerDetail.serviceManagerGoodsModels && managerDetail.serviceManagerGoodsModels.length > 2">...</span>
            </span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <ul class="com-info-op-group">
          <li @click="operateOptions('delete')">删除认证</li>
          <li @click="stepClickHandle(5)">缴纳保证金</li>
          <li @click="stepClickHandle(3)">管家面签</li>
          <li @click="stepClickHandle(2)">认证审核</li>
        </ul>
      </div>
      <div class="step-box">
        <div class="step">
          <el-steps :active="managerDetail.auditStatus" align-center>
            <el-step @click.native="stepClickHandle(item)" v-for="(item, index) in auditStatus" :key="index"
                     :title="item.value"></el-step>
          </el-steps>
        </div>
      </div>

    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="com-box-padding">
        <p class="table-title">管家基本信息</p>
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
            <td>{{ $moment(managerDetail.birthday).format('YYYY-MM-DD') }}</td>
          </tr>
          <tr>
            <td class="td-title">居民身份证</td>
            <td colspan="5">
              <span>{{managerDetail.idCard}}</span>
              <photo-view v-if="managerDetail.identityCardPhoto" :photo-data="{
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
            <td class="td-title"></td>
            <td></td>
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
              <photo-view v-if="managerDetail.jobTitleCertificate" :photo-data="{
                text: '查看大图',
                images: [
                  {url: managerDetail.jobTitleCertificate, previewText: ''},
                ]
              }">
              </photo-view>
            </td>
            <td class="td-title">学历证明</td>
            <td>
              <photo-view v-if="managerDetail.educationCertificate" :photo-data="{
                text: '查看大图',
                images: [
                  {url: managerDetail.educationCertificate, previewText: ''},
                ]
              }">
              </photo-view>
            </td>
            <td class="td-title">资质证明</td>
            <td>
              <photo-view v-if="managerDetail.qualificationCertificate" :photo-data="{
                text: '查看大图',
                images: [
                  {url: managerDetail.qualificationCertificate, previewText: ''},
                ]
              }">
              </photo-view>
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
        <div class="bar-tips-box">
          <p class="review"> 资料审核：
            {{modifyCheckStatus(managerDetail.checkStatus)}}
            &nbsp;&nbsp;&nbsp;&nbsp;{{managerDetail.checkResult}}
            &nbsp;&nbsp;&nbsp;&nbsp;
            {{managerDetail.checkTime &&
            $moment(managerDetail.checkTime).format('YYYY-MM-DD HH:mm:mm')}}
          </p>
        </div>

        <p class="table-title">管家面签信息</p>
        <table class="detail-table">
          <tr>
            <td class="td-title">面签形象照</td>
            <td colspan="5">
              <photo-view v-if="managerDetail.signPhoto" :photo-data="{
                text: '点击查看大图',
                images: [
                  {url: managerDetail.signPhoto, previewText: ''},
                ]}"></photo-view>
            </td>
          </tr>
          <tr>
            <td class="td-title">面签评价</td>
            <td colspan="5">{{managerDetail.signEvaluate}}</td>
          </tr>
        </table>
        <div class="bar-tips-box">
          <p class="review">面签:
            <span v-if="managerDetail.signAuditStatus === 1">提交</span>
            <span v-if="managerDetail.signAuditStatus === 2">不通过</span>
            <span v-if="managerDetail.signAuditStatus === 3">通过</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {{managerDetail.signAuditTime && $moment(managerDetail.signAuditTime).format('YYYY-MM-DD HH:mm:mm')}}
          </p>
        </div>

        <p class="table-title">保证金缴纳信息</p>
        <table class="detail-table">
          <tr>
            <td class="td-title">保证金定缴额</td>
            <td>{{managerDetail.bailAmount}}</td>
            <td class="td-title">纳税状态</td>
            <td>{{managerDetail.bailStatus === 1 ? '未缴纳' : '已缴纳'}}</td>
            <td class="td-title">审核状态</td>
            <td>
              <span v-if="managerDetail.bailAuditStatus === 1">待审核</span>
              <span v-if="managerDetail.bailAuditStatus === 2">未通过</span>
              <span v-if="managerDetail.bailAuditStatus === 3">通过</span>
            </td>
          </tr>
          <tr>
            <td class="td-title">缴纳凭证</td>
            <td colspan="5">
              <div>
                <photo-view v-if="managerDetail.bailPhoto" :photo-data="{
                text: '点击查看大图',
                images: [
                  {url: managerDetail.bailPhoto, previewText: '描述文字1'},
                ]}"></photo-view>
              </div>
            </td>
          </tr>
        </table>
        <div class="bar-tips-box">
          <p class="review"> 保证金缴纳审核:
            <span v-if="managerDetail.bailAuditStatus === 1">待审核</span>
            <span v-if="managerDetail.bailAuditStatus === 2">未通过</span>
            <span v-if="managerDetail.bailAuditStatus === 3">通过</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {{managerDetail.bailAuditTime && $moment(managerDetail.bailAuditTime).format('YYYY-MM-DD HH:mm:mm')}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import photoView from '../../../../components/photo/photoView'
  import API from '../../../../utils/api'
  import { mapState } from 'vuex'
  import handleDialog from './handleDialog'

  export default {
    name: 'detail',
    data () {
      return {
        dataLoading: false,
        // enterState: [
        //   {value: '申请认证'},
        //   {value: '认证审核'},
        //   {value: '管家面签'},
        //   {value: '缴纳保证金'},
        //   {value: '保证金审核'},
        //   {value: '入驻成功'},
        // ],
        managerDetail: {},
      }
    },
    computed: {
      ...mapState('constData', [
        'auditStatus',
      ]),
    },
    components: {
      photoView,
    },
    methods: {
      operateOptions (type) {
        switch (type) {
          case 'delete':
            this.$confirm('确定删除认证, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              let param = [this.managerDetail.id]
              console.log(param)
              API.serviceManager.deleteBatch(param, (da) => {
                if (da.status) {
                  this.$message({
                    type: 'success',
                    message: '删除成功!',
                  })
                  this.getList()
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              })
            })
            break
          case 'dataCheck':
            //
            break
          default:
            break
        }
      },
      stepClickHandle (type) {
        // console.log(type)
        let typeName = ['认证审核', '管家面签', '保证金审核']
        this.$vDialog.modal(handleDialog, {
          title: typeName[type - 2],
          width: 1000,
          height: 400,
          params: {
            type: type, // 2-6 认证审核，投诉处理，投诉回访，升级调查，升级处理
            id: this.managerDetail.id,
          },
          callback: (data) => {
            if (data.type === 'save') {
              this.getDetail()
            }
          },
        })
      },
      getDetail () {
        this.dataLoading = true
        API.serviceManager.detail(this.$route.query.id, (da) => {
          this.managerDetail = da.data
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        })
      },
      modifyCheckStatus (va) {
        let statusVal = ''
        switch (va) {
          case 1:
            statusVal = '已提交'
            break
          case 2:
            statusVal = '未通过'
            break
          case 3:
            statusVal = '未通过且不能修改'
            break
          case 4:
            statusVal = '已通过'
            break
          default:
            break
        }
        return statusVal
      },
    },
    created () {
      this.getDetail()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .bar-tips-box {
    margin-top: 20px;
    margin-bottom: 20px;
    .modify {
      color: #333E48;
      background-color: #FCFCFC;
      border: 1px solid #DDDDDD;
      padding: 5px;
      font-size: 12px;
    }
    .review {
      color: #FF7700;
      background-color: #FFFCF6;
      border: 1px solid #F0D3B9;
      margin-top: 10px;
      padding: 5px;
      font-size: 12px;
    }
  }
  .com-dialog-container {
    padding: 0 20px;
  }
</style>
