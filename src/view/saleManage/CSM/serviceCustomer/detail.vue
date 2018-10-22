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
          <h3>{{detail.name}}</h3>
          <p>
            <span class="com-d-item">存续状态: <span>{{detail.remainderState}}</span></span>
            <span class="com-d-item">注册日期: <span>{{detail.registryTime && $moment(detail.registryTime).format('YYYY-MM-DD')}}</span></span>
            <span class="com-d-item">注册地区: <span>{{detail.areaName}}</span></span>
            <span class="com-d-item">所属行业: <span>{{detail.industry}}</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <!--<ul class="com-info-op-group">-->
        <!--<li @click="operateOptions('delete')"></li>-->
        <!--</ul>-->
      </div>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="com-box-padding">
        <el-tabs v-model="activeViewName" type="card" @tab-click="handleTabsClick">
          <el-tab-pane label="企业基本信息" name="base">
            <p class="table-title">工商信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">企业名称</td>
                <td>{{detail.customerName}}</td>
                <td class="td-title">英文名称</td>
                <td>{{detail.englishName}}</td>
                <td class="td-title">社会信用代码</td>
                <td>{{detail.creditCode}}</td>
              </tr>
              <tr>
                <td class="td-title">法人代表</td>
                <td>{{detail.legalPerson}}</td>
                <td class="td-title">注册资本</td>
                <td>{{detail.registeredCapital}}</td>
                <td class="td-title">注册时间</td>
                <td>{{detail.registryTime && $moment(detail.registryTime).format('YYYY-MM-DD')}}</td>
              </tr>
              <tr>
                <td class="td-title">公司状态</td>
                <td>todo</td>
                <td class="td-title">企业类型</td>
                <td>todo</td>
                <td class="td-title">核准时间</td>
                <td>{{detail.checkTime && $moment(detail.checkTime).format('YYYY-MM-DD')}}</td>
              </tr>
              <tr>
                <td class="td-title">营业期限</td>
                <td>{{detail.businessTerm}}</td>
                <td class="td-title">所属行业</td>
                <td>{{detail.industry}}</td>
                <td class="td-title">登记机关</td>
                <td></td>
              </tr>
              <tr>
                <td class="td-title">注册地址</td>
                <td colspan="5">{{detail.registryDepartment}}</td>
              </tr>
              <tr>
                <td class="td-title">办公地址</td>
                <td colspan="5">{{detail.workAddress}}</td>
              </tr>
              <tr>
                <td class="td-title">生产地址</td>
                <td colspan="5">{{detail.produceAddress}}</td>
              </tr>
              <tr>
                <td class="td-title">经营范围</td>
                <td colspan="5">{{detail.businessScope}}</td>
              </tr>
            </table>

            <p class="table-title">税务信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">国税主管机关</td>
                <td>{{detail.nationalTaxBureau}}</td>
                <td class="td-title">联系地址</td>
                <td>{{detail.nationalTaxBureauAddr}}</td>
                <td class="td-title">联系电话</td>
                <td>{{detail.nationalTaxBureauTel}}</td>
              </tr>
              <tr>
                <td class="td-title">地税主管机关</td>
                <td>{{detail.localTaxBureau}}</td>
                <td class="td-title">联系电话</td>
                <td>{{detail.localTaxBureauTel}}</td>
                <td class="td-title">联系地址</td>
                <td>{{detail.localTaxBureauAddr}}</td>
              </tr>
            </table>

            <p class="table-title">主要人员信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">姓名</td>
                <td class="td-title">职务</td>
                <td class="td-title">身份证号</td>
                <td class="td-title">移动电话</td>
                <td class="td-title">固定电话</td>
                <td class="td-title">邮箱</td>
              </tr>
              <tr v-for="(item, index) in detail.serviceCustomerPersons" :key="index">
                <td>{{item.name}}</td>
                <td>{{item.job}}</td>
                <td>{{item.idCard}}</td>
                <td>{{item.cell}}</td>
                <td>{{item.tel}}</td>
                <td>{{item.mail}}</td>
              </tr>
            </table>

            <p class="table-title">分支机构信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">名称</td>
                <td class="td-title">法人</td>
                <td class="td-title">注册资金</td>
                <td class="td-title">工商注册号</td>
                <td class="td-title">成立日期</td>
                <td class="td-title">地址</td>
              </tr>
              <tr v-for="(item, index) in detail.serviceCustomerBranchModels" :key="index">
                <td>{{item.name}}</td>
                <td>{{item.legalPerson}}</td>
                <td>{{item.registeredCapital}}</td>
                <td>{{item.businessNumber}}</td>
                <td>{{item.establishDate && $moment(detail.establishDate).format('YYYY-MM-DD')}}</td>
                <td>{{item.address}}</td>
              </tr>
            </table>
            <p class="table-title">工商变更信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">变更项目</td>
                <td class="td-title">变更时间</td>
                <td class="td-title">变更前信息</td>
                <td class="td-title">变更后信息</td>
              </tr>
              <tr v-for="(item, index) in detail.serviceCustomerIcUpdateModels" :key="index">
                <td>{{item.updateProject}}</td>
                <td>{{item.updateDate && $moment(detail.updateDate).format('YYYY-MM-DD')}}</td>
                <td>{{item.beforeMessage}}</td>
                <td>{{item.afterMessage}}</td>
              </tr>
            </table>
            <p class="table-title">固定资产信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">固定资产名称</td>
                <td class="td-title">购买时间</td>
                <td class="td-title">原值</td>
                <td class="td-title">折旧年限</td>
                <td class="td-title">已折旧年数</td>
                <td class="td-title">残值</td>
              </tr>
              <tr v-for="(item, index) in detail.serviceCustomerFixedAssetsModels" :key="index">
                <td>{{item.name}}</td>
                <td>{{item.buyingDate && $moment(detail.buyingDate).format('YYYY-MM-DD')}}</td>
                <td>{{item.originalValue}}</td>
                <td>{{item.year}}</td>
                <td>{{item.passYear}}</td>
                <td>{{item.remainValue}}</td>
              </tr>
            </table>
            <p class="table-title">银行信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">开户银行</td>
                <td class="td-title">开户许可证核准好</td>
                <td class="td-title">银行地址</td>
                <td class="td-title">账户属性</td>
                <td class="td-title">账号</td>
              </tr>
              <tr v-for="(item, index) in detail.serviceCustomerBankModels" :key="index">
                <td>{{item.name}}</td>
                <td>{{item.accountCheckId}}</td>
                <td>{{item.address}}</td>
                <td>{{item.property}}</td>
                <td>{{item.accountId}}</td>
              </tr>
            </table>
            <p class="table-title">产品信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">产品名称</td>
                <td class="td-title">产品简称</td>
                <td class="td-title">产品类别</td>
                <td class="td-title">领域</td>
                <td class="td-title">产品描述</td>
                <td class="td-title">售价范围</td>
              </tr>
              <tr v-for="(item, index) in detail.serviceCustomerProductModels" :key="index">
                <td>todo todo</td>
                <td>{{item.abbreviations}}</td>
                <td>{{item.type}}</td>
                <td>{{item.field}}</td>
                <td>{{item.describe}}</td>
                <td>{{item.priceRange}}</td>
              </tr>
            </table>
            <p class="table-title">进出口信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">注册日期</td>
                <td>{{detail.ioRegistryDate && $moment(detail.ioRegistryDate).format('YYYY-MM-DD')}}</td>
                <td class="td-title">海关注册号</td>
                <td>{{detail.ioRegistryAcount}}</td>
                <td class="td-title">注册海关</td>
                <td>{{detail.ioRegistryCustoms}}</td>
              </tr>
              <tr>
                <td class="td-title">行政区划</td>
                <td>{{detail.ioCanton}}</td>
                <td class="td-title">经济区划</td>
                <td>{{detail.ioEconomy}}</td>
                <td class="td-title">经营类别</td>
                <td>{{detail.ioBusiness}}</td>
              </tr>
              <tr>
                <td class="td-title">特殊贸易区域</td>
                <td>{{detail.ioTrade}}</td>
                <td class="td-title">行业种类</td>
                <td>{{detail.ioCategory}}</td>
                <td class="td-title">报关有限期</td>
                <td>{{detail.ioExpiry}}</td>
              </tr>
              <tr>
                <td class="td-title">海关注册标识</td>
                <td>{{detail.ioCancelMark}}</td>
                <td class="td-title">年报情况</td>
                <td>{{detail.ioYearSituation}}</td>
                <td class="td-title">跨境贸易电子商务类型</td>
                <td>{{detail.ioEcommerceType}}</td>
              </tr>
            </table>
            <p class="table-title">微信公众号</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">公众号名称</td>
                <td class="td-title">微信号</td>
                <td class="td-title">账号主体</td>
                <td class="td-title">认证时间</td>
                <td class="td-title">功能介绍</td>
              </tr>
              <tr v-for="(item, index) in detail.serviceCustomerWechatModels" :key="index">
                <td>{{item.wechatName}}</td>
                <td>{{item.wechatAccount}}</td>
                <td>{{item.accoutBody}}</td>
                <td>{{item.created && $moment(item.created).format('YYYY-MM-DD')}}</td>
                <td>{{item.functionMsg}}</td>
              </tr>
            </table>
            <p class="table-title">公司网站</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">网站名称</td>
                <td class="td-title">域名</td>
                <td class="td-title">备案号</td>
                <td class="td-title">备案时间</td>
                <td class="td-title">网站介绍</td>
              </tr>
              <tr v-for="(item, index) in detail.serviceCustomerWebsiteModels" :key="index">
                <td>{{item.websiteName}}</td>
                <td>{{item.domainName}}</td>
                <td>{{item.recordNo}}</td>
                <td>{{item.recordDate && $moment(item.recordDate).format('YYYY-MM-DD')}}</td>
                <td>{{item.introduce}}</td>
              </tr>
            </table>
            <p class="table-title">员工信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">年份</td>
                <td class="td-title">总人数</td>
                <td class="td-title">大学以下</td>
                <td class="td-title">大学</td>
                <td class="td-title">本科</td>
                <td class="td-title">研究生</td>
                <td class="td-title">博士</td>
                <td class="td-title">伤残人</td>
                <td class="td-title">专业军人</td>
                <td class="td-title">平均年龄</td>
              </tr>
              <tr v-for="(item, index) in detail.serviceCustomerStaffModels" :key="index">
                <td>{{item.year}}</td>
                <td>{{item.totalNum}}</td>
                <td>{{item.underCollegeNum}} | {{item.underCollegeNumRate}}</td>
                <td>{{item.collegeNum}} | {{item.collegeNumRate}}</td>
                <td>{{item.universityDiplomaNum}} | {{item.universityDiplomaNumRate}}</td>
                <td>{{item.postgraduateNum}} | {{item.postgraduateNumRate}}</td>
                <td>{{item.doctorNum}} | {{item.doctorNumRate}}</td>
                <td>{{item.handicappedNum}} | {{item.handicappedNumRate}}</td>
                <td>{{item.soldierNum}} | {{item.soldierNum}}</td>
                <td>{{item.averageAge}}</td>
              </tr>
            </table>
            <p class="table-title">建党信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">党支书名称</td>
                <td>{{detail.partyName}}</td>
                <td class="td-title">成立时间</td>
                <td>{{detail.partyEstablishDate && $moment(detail.partyEstablishDate).format('YYYY-MM-DD')}}</td>
                <td class="td-title">党员人数</td>
                <td>{{detail.partyPersonNum}}</td>
              </tr>
              <tr>
                <td class="td-title">党委书记姓名</td>
                <td>{{detail.partyCommittee}}</td>
                <td class="td-title"></td>
                <td></td>
                <td class="td-title"></td>
                <td></td>
              </tr>
              <tr>
                <td class="td-title">组织介绍</td>
                <td colspan="5">{{detail.partyBrief}}</td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="企业发展信息" name="dev"></el-tab-pane>
          <el-tab-pane label="企业经营信息" name="man"></el-tab-pane>
          <el-tab-pane label="企业风险信息" name="risk"></el-tab-pane>
          <el-tab-pane label="知识产权信息" name="intellectualProperty"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../../utils/api'

  export default {
    name: 'detail',
    data () {
      return {
        dataLoading: false,
        activeViewName: 'base',
        detail: {},
      }
    },
    watch: {
      '$route.query.view' (view) {
        this.activeViewName = view
      },
    },
    methods: {
      operateOptions () {
      },
      stepClickHandle () {},
      handleTabsClick (tab, event) {
        // console.log(tab.name)
        this.$router.push({
          name: 'serviceCustomerDetail',
          params: {end: this.themeIndex === 0 ? 'FE' : 'ME'},
          query: {view: tab.name, id: this.$route.query.id},
        })
      },
      getDetail () {
        this.dataLoading = true
        API.serviceCustomer.detail(this.$route.query.id, (da) => {
          this.detail = da.data
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        })
      },
    },
    created () {
      this.getDetail()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
