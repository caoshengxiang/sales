<template>
  <div class="com-container com-detail-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, index) in $route.meta.pos" :key="index" :to="{name: item.toName}">{{item.name}}
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
            <span v-if="detailInfo.approvalType === 7">erp订单退单</span>
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
            <span v-else-if="detailInfo.state === 2">已通过</span>
            <span v-else>已拒绝</span>
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

        <!--服务工单派单-->
        <div v-if="detailInfo.approvalType === 5 || detailInfo.approvalType === 4 || detailInfo.approvalType === 3">
          <p class="table-title">服务订单信息</p>
          <table class="detail-table">
            <tr>
              <td class="td-title">订单号</td>
              <td>{{orderDetail.orderId}}</td>
              <td class="td-title">下单时间</td>
              <td>{{orderDetail.orderTime && $moment(orderDetail.orderTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
              <td class="td-title">订单状态</td>
              <td>
                <span v-if="orderDetail.orderState === 1">待服务</span>
                <span v-if="orderDetail.orderState === 2">服务中</span>
                <span v-if="orderDetail.orderState === 3">已完成</span>
                <span v-if="orderDetail.orderState === 4">已退单</span>
              </td>
              <!--<td class="td-title">服务类型</td>-->
              <!--<td>{{orderDetail.serviceType}}</td>-->
            </tr>
            <tr>
              <td class="td-title">预约服务时间</td>
              <td>
                {{orderDetail.reservationTime && $moment(orderDetail.reservationTime).format('YYYY-MM-DD HH:mm:ss')}}
              </td>
              <td class="td-title">服务客户</td>
              <!--<td>{{orderDetail.serviceCustomerName}}</td>-->
              <td>******</td>
              <td class="td-title">联系人</td>
              <!--<td>{{orderDetail.contactName}}[{{orderDetail.contactPhone}}]</td>-->
              <td>******</td>
            </tr>
            <tr>
              <td class="td-title">购买商品</td>
              <td>{{orderDetail.goodsName}}</td>
              <td class="td-title">商品规格</td>
              <td>{{orderDetail.specificationName}}</td>
              <td class="td-title">购买数量</td>
              <td>{{orderDetail.goodsNum}}</td>
            </tr>
            <!--<tr>-->
              <!--<td class="td-title">订单金额</td>-->
              <!--<td>{{orderDetail.orderAmount}}</td>-->
              <!--<td class="td-title">订单优惠</td>-->
              <!--<td>{{orderDetail.orderReduction}}</td>-->
              <!--<td class="td-title">订单实付</td>-->
              <!--<td>{{orderDetail.orderPayment}}</td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td class="td-title">发票类型</td>-->
              <!--<td>-->
                <!--<span v-if="orderDetail.invoiceType == 'ALIPAY'">支付宝</span>-->
                <!--<span v-if="orderDetail.invoiceType == 'WECHAT'">微信</span>-->
                <!--<span v-if="orderDetail.invoiceType == 'LINE_DOWN'">线下支付</span>-->
                <!--<span v-if="orderDetail.invoiceType == 'ONEPAY'">一网通</span>-->
                <!--<span v-if="orderDetail.invoiceType == 'UNIONPAY'">银联</span>-->
                <!--<span v-if="orderDetail.invoiceType == 'COMMON'">普通发票</span>-->
                <!--<span v-if="orderDetail.invoiceType == 'VALUE_ADD_TAX'">专用发票</span>-->
              <!--</td>-->
              <!--<td class="td-title">开票单位</td>-->
              <!--<td>{{orderDetail.invoiceUnit}}</td>-->
              <!--<td class="td-title">纳税识别号</td>-->
              <!--<td>{{orderDetail.taxIdentificationNum}}</td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td class="td-title">开户行信息</td>-->
              <!--<td>{{orderDetail.bankAddress}}</td>-->
              <!--<td class="td-title">银行账号</td>-->
              <!--<td>{{orderDetail.bankAccount}}</td>-->
              <!--<td class="td-title"></td>-->
              <!--<td></td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td class="td-title">发票邮寄地址</td>-->
              <!--<td colspan="5">{{orderDetail.invoiceMailAddress}}</td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td class="td-title">订单备注</td>-->
              <!--<td colspan="5">{{orderDetail.remark}}</td>-->
            <!--</tr>-->
          </table>

          <p class="table-title">订单商务信息</p>
          <table class="detail-table">
            <tr>
              <td class="td-title">签约主体</td>
              <td>{{orderDetail.contractSubject}}</td>
              <td class="td-title">签约时间</td>
              <td>
                {{orderDetail.contractTime && $moment(orderDetail.contractTime).format('YYYY-MM-DD HH:mm:ss')}}
              </td>
              <td class="td-title">服务地</td>
              <td>{{orderDetail.provinceName}}{{orderDetail.cityName}}{{orderDetail.areaName}}</td>
              <td class="td-title">签约金额</td>
              <!--<td>{{orderDetail.contractAccount}}</td>-->
              <td>******</td>
            </tr>
            <tr>
              <td class="td-title">购买方式</td>
              <td>
                <span v-if="orderDetail.paymentMethod === 'ALIPAY'">支付宝</span>
                <span v-if="orderDetail.paymentMethod === 'WECHAT'">微信</span>
                <span v-if="orderDetail.paymentMethod === 'LINE_DOWN'">线下支付</span>
                <span v-if="orderDetail.paymentMethod === 'ONEPAY'">一网通</span>
                <span v-if="orderDetail.paymentMethod === 'UNIONPAY'">银联</span>
              </td>
              <td class="td-title">签约类型</td>
              <td>
                <span v-if="orderDetail.contractProperty === 1">客户首购</span>
                <span v-if="orderDetail.contractProperty === 2">客户复购</span>
              </td>
              <td class="td-title">商务管家</td>
              <!--<td>{{orderDetail.businessManagerName}}</td>-->
              <td>******</td>
              <td class="td-title">商务电话</td>
              <!--<td>{{orderDetail.businessManagerPhone}}</td>-->
              <td>******</td>
            </tr>
            <!--//  v-if="detailInfo.approvalType === 4 || detailInfo.approvalType === 3"-->
            <tr v-if="detailInfo.approvalType === 4 || detailInfo.approvalType === 3" v-for="(item, index) in asignList"
                :key="index">
              <td class="td-title">派单单号</td>
              <td>{{item.orderNum}}</td>
              <td class="td-title">派单时间</td>
              <td>{{item.assignDate && $moment(item.assignDate).format('YYYY-MM-DD HH:mm:ss')}}</td>
              <td class="td-title">派单客服</td>
              <td>{{item.assignUserName}}</td>
              <td class="td-title"></td>
              <td></td>
            </tr>
            <tr v-if="detailInfo.approvalType === 4 || detailInfo.approvalType === 3" v-for="(item, index) in asignList"
                :key="index+1">
              <td class="td-title">服务管家</td>
              <td>{{item.managerName}}</td>
              <td class="td-title">管家号</td>
              <td>{{item.managerNo}}</td>
              <td class="td-title">管家类型</td>
              <td>{{item.managerTypeName}}</td>
              <td class="td-title">服务主体</td>
              <td>{{item.serviceName}}</td>
            </tr>
          </table>
          <!---->
          <div v-if="detailInfo.approvalType === 4 || detailInfo.approvalType === 3">
            <!--审批类型 1:申请咨询师协同 2:申请移除咨询师 3:app订单退单 4:服务工单退单 5:服务工单派单 6:管家信息修改-->
            <p class="table-title">服务退单信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">退单号</td>
                <td>{{wordOrderDetail.backNum}}</td>
                <td class="td-title">申请日期</td>
                <td>{{wordOrderDetail.backTime && $moment(wordOrderDetail.backTime).format('YYYY-MM-DD')}}</td>
                <td class="td-title">退单申请人</td>
                <td>{{wordOrderDetail.managerName}}</td>
                <td class="td-title">联系电话</td>
                <td>{{wordOrderDetail.mobilePhone}}</td>
              </tr>
              <tr>
                <td class="td-title">退单原因</td>
                <td colspan="7">{{wordOrderDetail.backReason}}</td>
              </tr>
              <tr v-if="detailInfo.approvalType === 3">
                <!--审批类型 1:申请咨询师协同 2:申请移除咨询师 3:app订单退单 4:服务工单退单 5:服务工单派单 6:管家信息修改-->
                <td class="td-title">退款金额</td>
                <td></td>
                <td class="td-title">退款账号</td>
                <td></td>
                <td class="td-title">开户行</td>
                <td></td>
                <td class="td-title">户名</td>
                <td></td>
              </tr>
            </table>
          </div>
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
				
				<!-- erp订单退单 -->
				<div v-if="detailInfo.approvalType === 7">
				<!-- <div> -->
					<p class="table-title">订单基本信息</p>
					<table class="detail-table">
						<tr>
							<td class="td-title">订单号</td>
							<td>{{orderDetail.salerOrderModel.orderId}}</td>
							<td class="td-title">服务客户</td>
							<!-- <td>{{orderDetail.serviceCustomerName}}</td> -->
							<td>******</td>
							<td class="td-title">订单状态</td>
							<td>
								<span v-for="item in orderState" :key="item.type"
								                                    v-if="orderDetail.salerOrderModel.orderState === item.type">{{item.value}}</span></span>
							</td>
						</tr>
						<tr>
							<td class="td-title">购买商品</td>
							<td>{{orderDetail.salerOrderModel.productName}}</td>
							<td class="td-title">商品规格</td>
							<td>{{orderDetail.salerOrderModel.specificationName}}</td>
							<td class="td-title">客户联系人</td>
							<!-- <td>{{orderDetail.contactName}}[{{orderDetail.contactPhone}}]</td> -->
							<td>******</td>
						</tr>
						<tr>
							<td class="td-title">签约时间</td>
							<td>{{orderDetail.salerOrderModel.orderDate && $moment(orderDetail.salerOrderModel.orderDate).format('YYYY-MM-DD HH:mm:ss')}}</td>
							<td class="td-title">订单应付合计</td>
							<td>{{orderDetail.salerOrderModel.billAmount}}</td>
							<td class="td-title">订单实付合计</td>
							<td>{{orderDetail.salerOrderModel.totalAmount}}</td>
						</tr>
					</table>
					<p class="table-title">订单回款信息</p>
					<table class="detail-table">
						<tr v-for="item in orderDetail.salerOrderModel.refundRecordList">
							<td class="td-title">回款金额</td>
							<td>{{item.receivable}}</td>
							<td class="td-title">付款方式</td>
							<td>{{item.paymentMethod}}</td>
							<td class="td-title">回款到账时间</td>
							<td>{{$moment(item.date).format('YYYY-MM-DD')}}</td>
						</tr>
					</table>
					<p class="table-title">商务服务信息</p>
					<table class="detail-table">
						<tr>
							<td class="td-title">商务管家</td>
							<td>{{orderDetail.salerOrderModel.team.salerName + '[' + orderDetail.salerOrderModel.team.salerMobilePhone + ']'}}</td>
							<td class="td-title">咨询师</td>
							<td>{{orderDetail.salerOrderModel.team.counselorName + '[' + orderDetail.salerOrderModel.team.counselorMobilePhone + ']'}}</td>
							<td class="td-title">销售主体</td>
							<td>{{orderDetail.salerOrderModel.contractSubjectName}}</td>
						</tr>
						<tr v-for="item in businessServiceInformation">
							<td class="td-title">{{item.managerTypeName}}</td>
							<td>{{item.managerName + '[' + item.mobilePhone + ']'}}</td>
							<td class="td-title">派工单号</td>
							<td>{{item.orderNum}}</td>
							<td class="td-title">服务主体</td>
							<td>{{item.serviceName}}</td>
						</tr>
					</table>
					<p class="table-title">订单退单信息</p>
					<table class="detail-table">
						<tr>
							<td class="td-title">退单号</td>
							<td>{{orderDetail.id}}</td>
							<td class="td-title">退单金额</td>
							<td>{{orderDetail.refundAmount}}</td>
							<td class="td-title">退单申请日期</td>
							<td>{{$moment(orderDetail.created).format('YYYY-MM-DD')}}</td>
						</tr>
						<tr>
							<td class="td-title" style="height: 60px;">退单原因</td>
							<td colspan="5" style="height: 60px;">{{orderDetail.refundReason}}</td>
						</tr>
						<tr>
							<td class="td-title">退款户名</td>
							<td>{{orderDetail.accountName}}</td>
							<td class="td-title">退款账号</td>
							<td>{{orderDetail.refundAccount}}</td>
							<td class="td-title">开户行</td>
							<td>{{orderDetail.bankName}}</td>
						</tr>
						<tr>
							<td class="td-title" style="height: 60px;">退单备注</td>
							<td colspan="5" style="height: 60px;">{{orderDetail.refundRemark}}</td>
						</tr>
						<tr>
							<td class="td-title">退单附件</td>
							<td colspan="5">
								<a :href="orderDetail.attachment" style="color: black;">退单申请表</a>
							</td>
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
            <td>
              <span v-if="item.approved == true">通过</span>
              <span v-if="item.approved == false">拒绝</span>
            </td>
            <td>{{item.approvalTime && $moment(item.approvalTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
          </tr>
        </table>


      </div>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import moment from 'moment'
  import { mapState } from 'vuex'
  // import webStorage from 'webStorage'
  import photoView from '../../../../components/photo/photoView'

  export default {
    name: 'detailInfo',
    data () {
      return {
        detailInfo: {},
        salesOpportunitiesDetail: {},
        customerDetail: {},
        managerDetail: {},
				businessServiceInformation: [],  //商务服务信息
        orderDetail: {
					salerOrderModel: {
						team: {},
						refundRecordList: [],
					},
				},              // 订单详细
        asignList: [], // 派单
        wordOrderDetail: {}, // 工单详情
      }
    },
    computed: {
      ...mapState('constData', [
        'customerSourceType',
        'salesState',
				'orderState',
      ]),
    },
    components: {
      comButton,
      photoView,
    },
    methods: {
      getChanceDetail () {
      },
      // 审批类型 1:申请咨询师协同 2:申请移除咨询师 3:app订单退单 4:服务工单退单 5:服务工单派单 6:管家信息修改 7:erp订单退单
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
            } else if (that.detailInfo.approvalType === 5 || that.detailInfo.approvalType === 4 ||
              that.detailInfo.approvalType === 3) { // 服务工单派单
              API.serviceOrder.detailAudit(that.detailInfo.businessId, (da) => {
                if (da.status) {
                  this.orderDetail = da.data
                  API.workOrder.workOrderAsignListById({id: da.data.id}, (asignDa) => {
                    that.asignList = asignDa.data
                  })
                }
              })
              API.workOrder.detail(that.detailInfo.businessId, (da) => {
                if (da.status) {
                  this.wordOrderDetail = da.data
                }
              })
            } else if (that.detailInfo.approvalType === 6) { // 管家信息修改
              API.serviceManager.updateDetail(that.detailInfo.businessId, (da) => {
                this.managerDetail = da.data
              })
            } else if (that.detailInfo.approvalType === 7) { // erp订单退单详情
              API.serviceOrder.editZxDetail(that.detailInfo.businessId, (da) => {
								if(da.status) {
									this.orderDetail = da.data
									this.businessServiceInformation = da.data.orderServiceWorkCompositeList;
								}
              })
            }
          }
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
        if (state === 2) {
          this.$confirm('确定审核通过, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
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
              message: '已取消',
            })
          })
        } else {
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
        }
      },
    },
    created () {
      this.$options.methods.getTaskDetail.bind(this)()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .detail-table {
    width: 100%;
  }
</style>
