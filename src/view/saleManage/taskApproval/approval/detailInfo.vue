<template>
  <div class="com-container com-detail-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in $route.meta.pos" :key="item.name" :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <table class="detail-table">
        <tr>
          <td class="td-title">审批单号</td>
          <td>{{detailInfo.id}}</td>
          <td class="td-title">审批类型</td>
          <td>
            <span v-if="detailInfo.approvalType === 1">申请咨询师协同</span>
            <span v-if="detailInfo.approvalType === 2">申请移除咨询师</span>
            <span v-if="detailInfo.approvalType === 3">app订单退</span>
            <span v-if="detailInfo.approvalType === 4">服务工单退单</span>
            <span v-if="detailInfo.approvalType === 5">服务工单派单</span>
            <span v-if="detailInfo.approvalType === 6">管家信息修改</span>
          </td>
          <td class="td-title">发布人</td>
          <td>{{detailInfo.publisherName}}</td>
          <!--<td class="td-title">发布时间</td>-->
          <!--<td>{{detailInfo.publishTime && $moment(detailInfo.publishTime).format('YYYY-MM-DD HH:mm:ss')}}</td>-->
        </tr>
        <tr>
          <td class="td-title">审批状态</td>
          <td>
            <span v-if="detailInfo.state === 1">审批中</span>
            <span v-if="detailInfo.state === 2">已通过</span>
            <span v-if="detailInfo.state === 3">已拒绝</span>
          </td>
          <td class="td-title"></td>
          <td>
          </td>
          <td class="td-title">发布时间</td>
          <td>{{detailInfo.publishTime}}</td>
        </tr>
        <tr>
          <td class="td-title">操作</td>
          <td colspan="7">
            <!--<com-button buttonType="backHighSeas" @click="auditTaskYes"-->
            <!--v-if="detailInfo.state === 1 && detailInfo.principalId === userInfo.id">审核通过-->
            <!--</com-button>-->
            <!--<com-button buttonType="grey" @click="auditTaskNo"-->
            <!--v-if="detailInfo.state === 1 && detailInfo.principalId === userInfo.id">审核拒绝-->
            <!--</com-button>-->
            <com-button buttonType="backHighSeas" @click="auditTaskYes"
                        v-if="detailInfo.state === 1">审核通过
            </com-button>
            <com-button buttonType="grey" @click="auditTaskNo"
                        v-if="detailInfo.state === 1">审核拒绝
            </com-button>
          </td>
        </tr>
      </table>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="detail-left com-box-padding">
        <!-- 1:申请咨询师协同 2:申请移除咨询师-->
        <div v-if="detailInfo.approvalType === 1 || detailInfo.approvalType === 2">
          <p class="table-title">客户资料信息</p>
          <table class="detail-table">
            <tr>
              <td class="td-title">公司名称</td>
              <td>{{customerDetail.name}}</td>
              <td class="td-title">营业执照</td>
              <td>{{customerDetail.businessLicense}}</td>
              <td class="td-title">客户级别</td>
              <td>{{customerDetail.level}}</td>
            </tr>
            <tr>
              <td class="td-title">客户联系人</td>
              <td>{{customerDetail.contactName}}</td>
              <td class="td-title">客户行业</td>
              <td>{{customerDetail.industry}}</td>
              <td class="td-title">联系电话</td>
              <td>{{customerDetail.phone}}</td>
            </tr>
            <tr>
              <td class="td-title">所在地区</td>
              <td>{{ customerDetail.provinceName }}
                {{ customerDetail.cityName }}
                {{ customerDetail.areaName }}
              </td>
              <td class="td-title">公司网站</td>
              <td>{{customerDetail.website}}</td>
              <td class="td-title"></td>
              <td></td>
            </tr>
            <tr>
              <td class="td-title">客户来源</td>
              <td colspan="5">{{customerDetail.customerSourceName}}</td>
            </tr>
            <tr>
              <td class="td-title">联系地址</td>
              <td colspan="5">{{customerDetail.address}}</td>
            </tr>
            <tr>
              <td class="td-title">主营业务</td>
              <!--<td colspan="5">暂未填写主营业务{{customerDetail.business}}</td>-->
              <td colspan="5">{{customerDetail.business || '暂未填写主营业务'}}</td>
            </tr>
          </table>

          <p class="table-title">销售机会基本信息</p>
          <table class="detail-table">
            <tr>
              <td class="td-title">客户名称</td>
              <td>{{salesOpportunitiesDetail.customerName}}</td>
              <td class="td-title">需求进度</td>
              <td>
                  <span v-for="item in salesState"
                        :key="item.type"
                        v-if="item.type === salesOpportunitiesDetail.stage">{{item.value}}&nbsp;{{item.percent}}</span>
              </td>
              <td class="td-title">预计签单金额</td>
              <td>{{salesOpportunitiesDetail.intentBillAmount}}</td>
            </tr>
            <tr>
              <td class="td-title">预计签单时间</td>
              <td>{{salesOpportunitiesDetail.billDate &&
                $moment(salesOpportunitiesDetail.billDate).format('YYYY-MM-DD')}}
              </td>
              <td class="td-title">意向商品</td>
              <td>{{salesOpportunitiesDetail.intentProductName}}</td>
              <td class="td-title">实际签单金额</td>
              <td>{{salesOpportunitiesDetail.billAmount}}</td>
            </tr>
            <!--<tr>-->
            <!--<td class="td-title">签单订单号</td>-->
            <!--<td>{{salesOpportunitiesDetail.orderId}}</td>-->
            <!--<td class="td-title">签单商品</td>-->
            <!--<td>{{salesOpportunitiesDetail.productName}}</td>-->
            <!--<td class="td-title"></td>-->
            <!--<td></td>-->
            <!--</tr>-->
            <tr>
              <td class="td-title">销售机会备注</td>
              <td colspan="5">{{salesOpportunitiesDetail.chanceRemark || '暂无备注信息'}}</td>
            </tr>
            <tr>
              <td class="td-title">销售合同网址</td>
              <td colspan="5">
                <router-link v-if="salesOpportunitiesDetail.oncePay === true"
                             :to="{name: 'onetimeContract', query: {name: salesOpportunitiesDetail.intentProductName}}"
                             target="_blank">查看一次合同
                </router-link>
                <router-link v-if="salesOpportunitiesDetail.oncePay === false"
                             :to="{name: 'multipleContracts', query: {name: salesOpportunitiesDetail.intentProductName}}"
                             target="_blank">查看分次合同
                </router-link>
              </td>
            </tr>
            <tr>
              <td class="td-title">机会输单备注</td>
              <td colspan="5">{{salesOpportunitiesDetail.discardRemark || '暂无备注信息'}}</td>
            </tr>
          </table>
        </div>

        <!--管家信息修改-->
        <div v-if="detailInfo.approvalType === 6">
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
                <photo-view v-if="managerDetail.identityCardPhoto"
                            :photo-data="{
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
                <photo-view v-if="managerDetail.jobTitleCertificate"
                            :photo-data="{
                text: '查看大图',
                images: [
                  {url: managerDetail.jobTitleCertificate, previewText: ''},
                ]
              }">
                </photo-view>
              </td>
              <td class="td-title">学历证明</td>
              <td>
                <photo-view v-if="managerDetail.educationCertificate"
                            :photo-data="{
                text: '查看大图',
                images: [
                  {url: managerDetail.educationCertificate, previewText: ''},
                ]
              }">
                </photo-view>
              </td>
              <td class="td-title">资质证明</td>
              <td>
                <photo-view v-if="managerDetail.qualificationCertificate"
                            :photo-data="{
                text: '查看大图',
                images: [
                  {url: managerDetail.qualificationCertificate, previewText: ''},
                ]
              }">
                </photo-view>
              </td>
            </tr>
            <tr>
              <td class="td-title">管家类型</td>
              <td colspan="5">
              <span v-for="(item, index) in managerDetail.serviceManagerTypeModels" :key="index">
                <span v-if="index > 0">、</span>{{item.managerType}}
              </span>
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
        </div>

        <table class="detail-table" style="text-align: center">
          <tr>
            <td class="td-title">执行序号</td>
            <td class="td-title">步骤名称</td>
            <td class="td-title">审批人</td>
            <td class="td-title">审批意见</td>
            <td class="td-title">审批时间</td>
          </tr>
          <tr v-for="(item, index) in detailInfo.processTaskList" :key="index">
            <td>{{item.taskId}}</td>
            <td>{{item.taskName}}</td>
            <td>{{item.approvalUserName}}</td>
            <td>{{item.opinion}}</td>
            <td>{{item.approvalTime && $moment(item.approvalTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
          </tr>
        </table>
      </div>
      <!--团队成员-->
      <!--<div class="detail-right com-box-padding">-->
      <!--&lt;!&ndash;<team-member :detail="salesOpportunitiesDetail"></team-member>&ndash;&gt;-->

      <!--<div class="team-title">-->
      <!--<span class="title-text">团队成员</span>-->
      <!--</div>-->
      <!--<ul class="team-member">-->
      <!--<li class="team-member-item">-->
      <!--<div class="head">-->
      <!--<img src="../../../../assets/icon/headDefault.png" alt="">-->
      <!--</div>-->
      <!--<div class="text">-->
      <!--<h4>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.creatorName}}</h4>-->
      <!--&lt;!&ndash;<p>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.creatorMobilePhone}}</p>&ndash;&gt;-->
      <!--<p>******</p>-->
      <!--</div>-->
      <!--<div class="post">-->
      <!--<span class="post-tag-1">创建人</span>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="team-member-item">-->
      <!--<div class="head">-->
      <!--<img src="../../../../assets/icon/headDefault.png" alt="">-->
      <!--</div>-->
      <!--<div class="text">-->
      <!--<h4>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.salerName}}</h4>-->
      <!--<p>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.salerMobilePhone}}</p>-->
      <!--</div>-->
      <!--<div class="post">-->
      <!--<span class="post-tag-2">销售员</span>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="team-member-item">-->
      <!--<div class="head">-->
      <!--<img src="../../../../assets/icon/headDefault.png" alt="">-->
      <!--</div>-->
      <!--<div class="text">-->
      <!--<h4>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.counselorName}}</h4>-->
      <!--<p>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.counselorMobilePhone}}</p>-->
      <!--</div>-->
      <!--<div class="post">-->
      <!--<span class="post-tag-2">咨询师</span>-->
      <!--</div>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import moment from 'moment'
  import { mapState } from 'vuex'
  import webStorage from 'webStorage'
  import photoView from '../../../../components/photo/photoView'

  export default {
    name: 'detailInfo',
    data () {
      return {
        detailInfo: {},
        salesOpportunitiesDetail: {},
        customerDetail: {},
        userInfo: {},
        managerDetail: {},
      }
    },
    computed: {
      ...mapState('constData', [
        'customerSourceType',
        'salesState',
      ]),
    },
    watch: {
      '$route.query.view' (view) {
        this.activeViewName = view
      },
    },
    components: {
      comButton,
      photoView,
    },
    methods: {
      getChanceDetail () {
      },
      getTaskDetail () {
        var that = this
        this.loading = true
        let param = {
          id: that.$route.query.id,
        }
        API.task.getTaskDetail(param, (res) => {
          that.loading = false
          if (res.status) {
            that.detailInfo = res.data
            that.detailInfo.publishTime = moment(that.detailInfo.publishTime).format('YYYY-MM-DD HH:mm:ss')
            that.detailInfo.deadline = moment(that.detailInfo.deadline).format('YYYY-MM-DD HH:mm:ss')

            if (that.detailInfo.approvalType === 1 || that.detailInfo.approvalType === 2) { // 1:申请咨询师协同 2:申请移除咨询师 【businessId 机会id】
              API.task.chanceDetail({chanceId: that.detailInfo.businessId}, (data) => {
                that.salesOpportunitiesDetail = data.data
                if (that.salesOpportunitiesDetail.customerId) { // 机会有客户id
                  API.task.customerDetail({customerId: that.salesOpportunitiesDetail.customerId}, (data) => {
                    that.customerDetail = data.data
                    setTimeout(() => {
                      this.dataLoading = false
                    }, 500)
                  })
                }
                setTimeout(() => {
                  this.dataLoading = false
                }, 500)
              })
            } else if (that.detailInfo.approvalType === 6) {
              API.serviceManager.updateDetail(that.detailInfo.businessId, (da) => {
                this.managerDetail = da.data
              })
            }
          } else {
            Message({
              message: res.error.message,
              type: 'error',
            })
          }
        }, (mock) => {
          that.loading = false
          Message({
            message: '系统繁忙，请稍后再试！',
            type: 'error',
          })
        })
      },
      handleTabsClick (tab, event) {
        // console.log(tab.name)
        this.$router.push({name: 'customersDetail', params: {end: 'FE'}, query: {view: tab.name}})
      },
      auditTaskYes () {
        this.auditTask(2)
      },
      auditTaskNo () {
        this.auditTask(3)
      },
      auditTask (state) {
        let param = {
          // state: state,
          processId: this.$route.query.id,
          approved: state === 2,
          opinion: '',
        }
        this.$prompt('请输入审核意见', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          param.opinion = value
          API.task.auditTask(param, (res) => {
            this.loading = false
            if (res.status) {
              this.getTaskDetail()
              this.$message.success('审核成功')
            } else {
              this.$message.success(res.error.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入',
          })
        })
      },
    },
    created () {
      this.$options.methods.getTaskDetail.bind(this)()
      this.activeViewName = this.$route.query.view
      this.userInfo = webStorage.getItem('userInfo')
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .detail-table {
    width: 100%;
  }
</style>
