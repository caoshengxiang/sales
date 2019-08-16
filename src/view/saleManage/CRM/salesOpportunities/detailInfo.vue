<!-- 客户回复的：
按钮设置逻辑，跟进人可以操作销售需求所有按钮，创建人员，只能操作“添加联系人”，
公海池的销售需求详情页面，非团队成员无权限查看，所以，不存在，没有跟进这个销售需求的去操作这个销售需求，
也就不用控制那些按钮的显示了
-->
<template>
  <div class="com-container com-detail-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if="themeIndex === 0" v-for="item in $route.meta.pos" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="themeIndex === 1" v-for="item in $route.meta.pos2" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-info-left">
        <img class="com-info-img" src="../../../../assets/icon/company.png" alt="">
        <div class="com-info-text">
          <h3>{{salesOpportunitiesDetail.intentProductName || '无名'}}</h3>
          <p>
            <span class="com-d-item">客户名称: <span>{{salesOpportunitiesDetail.customerName}}</span></span>
            <span class="com-d-item">预计签单金额: <span>{{salesOpportunitiesDetail.intentBillAmount}}</span></span>
            <span class="com-d-item">预计签单日期: <span>{{salesOpportunitiesDetail.billDate && $moment(salesOpportunitiesDetail.billDate).format('YYYY-MM-DD')}}</span></span>
            <br>
            <span class="com-d-item">销售需求所有人: <span>{{salesOpportunitiesDetail.ownerName}}</span></span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <ul class="com-info-op-group">
          <!--输单后隐藏删除以外得按钮-->

          <!--<li class="op-active" v-if="salesOpportunitiesDetail.stage !== -1 && isChangeFollower && !salesOpportunitiesDetail.customerId"
              @click="operateOptions('bind')">绑定客户
          </li>
          <li class="op-active" v-if="salesOpportunitiesDetail.stage !== -1 && isChangeFollower"
              @click="operateOptions('return')">退回公海
          </li>
          &lt;!&ndash; 销售需求模块列表中“转移”按钮与销售需求详情里面“转移”按钮隐藏
           业务模式发生变化，同一客户（含该客户的销售需求）同一时间在同一分子公司只能存在一个销售跟进人员，为了避免同一客户多个销售需求被多个用户跟进，故需要隐藏销售需求“转移”功能
           [期望]
           销售需求模块列表中“转移”按钮与销售需求详情里面“转移”按钮隐藏&ndash;&gt;
          <li class="op-active" v-if="salesOpportunitiesDetail.stage !== -1 && isChangeFollower"
              @click="operateOptions('move')">转移
          </li>
          <li class="op-active" v-if="isChangeFollower" @click="operateOptions('delete')">删除</li>-->

          <li class="op-active" v-if="salesOpportunitiesDetail.stage !== -1 && !salesOpportunitiesDetail.customerId"
              @click="operateOptions('bind')">绑定客户
          </li>
          <li class="op-active" v-if="salesOpportunitiesDetail.stage !== -1"
              @click="operateOptions('return')">退回公海
          </li>
          <li class="op-active" v-if="salesOpportunitiesDetail.stage !== -1"
              @click="operateOptions('move')">转移
          </li>
          <li class="op-active" v-if="salesOpportunitiesDetail.stage !== -1 && isChangeFollower" @click="operateOptions('discard')">输单</li>
          <li class="op-active" @click="editIntentionLeve(0)" v-if='isChangeFollower'>客户意向</li>
          <li class="op-active" v-if='(salesOpportunitiesDetail.stage == 3 || salesOpportunitiesDetail.stage == 4) && salesOpportunitiesDetail.team && !salesOpportunitiesDetail.team.counselorId && isChangeFollower' @click="operateOptions('apply')">咨询师管理</li>
          <li class="op-active" @click="operateOptions('delete')">删除</li>
        </ul>
      </div>
      <div class="step-box">
        <div class="step">
          <div class='step-all-div'>
            <div class='step-all-line' :style='"width: " + stepLineWidth + "%"'></div>
            <ul class='step-all-process'>
              <!-- 创建 -->
              <li>
                <p class='step-all-process-personnel'>
                  <span>
                    <span class='step-all-process-personnel-type'>创建者</span>
                    <span class='step-all-process-personnel-detail'>{{salesOpportunitiesDetail.team.creatorName}}</span>
                    <span class='step-all-process-personnel-mobileimg'>
                      <el-tooltip class="item" effect="dark" :content="salesOpportunitiesDetail.team.creatorMobilePhone" placement="top">
                        <img src="../../../../assets/icon/detail-mobile.png" alt="">
                      </el-tooltip>
                    </span>
                  </span>
                </p>
                <p class='step-all-process-circular'>
                  <span>
                    <span class='step-all-process-circular-ciryNew' v-if='salesOpportunitiesDetail.stage > 1 || salesOpportunitiesDetail.stage == -1'></span>
                    <span class='step-all-process-circular-ciryIng' v-if='salesOpportunitiesDetail.stage == 1'></span>
                  </span>
                </p>
                <p style='color: #333E48;'>创建</p>
                <p class='step-all-process-time' style='color: #333E48;'>{{salesOpportunitiesDetail.created && $moment(salesOpportunitiesDetail.created).format('YYYY-MM-DD HH:mm:ss')}}</p>
              </li>
              <!-- 已联系 -->
              <li>
                <p class='step-all-process-personnel'>
                  <span v-if='salesOpportunitiesDetail.stage >= 2 || salesOpportunitiesDetail.stage == -1'>
                    <span class='step-all-process-personnel-type'>销售员</span>
                    <span class='step-all-process-personnel-detail'>{{salesOpportunitiesDetail.team.salerName}}</span>
                    <span class='step-all-process-personnel-mobileimg'>
                      <el-tooltip class="item" effect="dark" :content="salesOpportunitiesDetail.team.salerMobilePhone" placement="top">
                        <img src="../../../../assets/icon/detail-mobile.png" alt="">
                      </el-tooltip>
                    </span>
                  </span>
                </p>
                <p class='step-all-process-circular'>
                  <span>
                    <span class='step-all-process-circular-ciry' v-if='salesOpportunitiesDetail.stage == 1'></span>
                    <span class='step-all-process-circular-ciryNew' v-if='salesOpportunitiesDetail.stage > 2 || salesOpportunitiesDetail.stage == -1'></span>
                    <span class='step-all-process-circular-ciryIng' v-if='salesOpportunitiesDetail.stage == 2'></span>
                  </span>
                </p>
                <p :style='"color: " + ((salesOpportunitiesDetail.stage > 1 || salesOpportunitiesDetail.stage == -1) ? "#333E48;" : "#AAAAAA;")'>联系中</p>
                <p :style='"color: " + ((salesOpportunitiesDetail.stage > 1 || salesOpportunitiesDetail.stage == -1) ? "#333E48;" : "#AAAAAA;")' class='step-all-process-time' v-if='salesOpportunitiesDetail.obtainTime || salesOpportunitiesDetail.created'>{{salesOpportunitiesDetail.obtainTime && $moment(salesOpportunitiesDetail.obtainTime).format('YYYY-MM-DD HH:mm:ss') || salesOpportunitiesDetail.created && $moment(salesOpportunitiesDetail.created).format('YYYY-MM-DD HH:mm:ss')}}</p>
                <p class='step-all-process-time' v-if='salesOpportunitiesDetail.stage == 2 && isChangeFollower'>
                  <el-button type="success" plain size="mini" @click="editIntentionLeve(1)">需求判断</el-button>
                </p>
              </li>
              <!-- 跟单中 -->
              <li>
                <p class='step-all-process-personnel'>
                  <span v-if='salesOpportunitiesDetail.team.counselorId != null'>
                    <span class='step-all-process-personnel-type'>咨询师</span>
                    <span class='step-all-process-personnel-detail'>{{salesOpportunitiesDetail.team.counselorName}}</span>
                    <span class='step-all-process-personnel-mobileimg'>
                      <el-tooltip class="item" effect="dark" :content="salesOpportunitiesDetail.team.counselorMobilePhone" placement="top">
                        <img src="../../../../assets/icon/detail-mobile.png" alt="">
                      </el-tooltip>
                      <!-- <img src="../../../../assets/icon/detail-edit.png" alt=""> -->
                    </span>
                  </span>
                </p>
                <p class='step-all-process-circular'>
                  <span>
                    <span class='step-all-process-circular-ciry' v-if='salesOpportunitiesDetail.stage < 3 && salesOpportunitiesDetail.stage != -1'></span>
                    <span class='step-all-process-circular-ciryNew' v-if='salesOpportunitiesDetail.stage > 4 || salesOpportunitiesDetail.stage == -1'></span>
                    <span class='step-all-process-circular-ciryIng' v-if='salesOpportunitiesDetail.stage == 3 || salesOpportunitiesDetail.stage == 4'></span>
                  </span>
                </p>
                <p :style='"color: " + ((salesOpportunitiesDetail.stage >= 3 || salesOpportunitiesDetail.stage == -1) ? "#333E48;" : "#AAAAAA;")'>跟单中</p>
                <p :style='"color: " + ((salesOpportunitiesDetail.stage >= 3 || salesOpportunitiesDetail.stage == -1) ? "#333E48;" : "#AAAAAA;")' class='step-all-process-time' v-if='salesOpportunitiesDetail.contactDate'>{{salesOpportunitiesDetail.contactDate && $moment(salesOpportunitiesDetail.contactDate).format('YYYY-MM-DD HH:mm:ss')}}</p>
                <p class='step-all-process-time'>
                  <el-button type="success" plain size="mini" v-if='salesOpportunitiesDetail.stage == 3 && isChangeFollower' @click='stepClickHandle({type: salesOpportunitiesDetail.stage})'>需求定价</el-button>
                  <el-button type="success" plain size="mini" v-if='salesOpportunitiesDetail.stage == 4 && isChangeFollower' @click='stepClickHandle({type: salesOpportunitiesDetail.stage})'>通知客户</el-button>
                </p>
              </li>
              <!-- 已下单 -->
              <li>
                <p class='step-all-process-personnel'></p>
                <p class='step-all-process-circular'>
                  <span>
                    <span class='step-all-process-circular-ciry' v-if='salesOpportunitiesDetail.stage < 5 && salesOpportunitiesDetail.stage != -1'></span>
                    <span class='step-all-process-circular-ciryNew' v-if='salesOpportunitiesDetail.stage == -1'></span>
                    <span class='step-all-process-circular-ciryIng' v-if='salesOpportunitiesDetail.stage > 4'></span>
                  </span>
                </p>
                <p :style='"color: " + ((salesOpportunitiesDetail.stage > 4 || salesOpportunitiesDetail.stage == -1) ? "#333E48;" : "#AAAAAA;")'>已下单</p>
                <p class='step-all-process-time' :style='"color: " + ((salesOpportunitiesDetail.stage > 4 || salesOpportunitiesDetail.stage == -1) ? "#333E48;" : "#AAAAAA;")' v-if='salesOpportunitiesDetail.finishDate'>{{salesOpportunitiesDetail.finishDate && $moment(salesOpportunitiesDetail.finishDate).format('YYYY-MM-DD HH:mm:ss')}}</p>
              </li>
              <!-- 输单 -->
              <li>
                
                <p class='step-all-process-personnel'></p>
                <p class='step-all-process-circular'>
                  <span>
                    <span class='step-all-process-circular-ciry' v-if='salesOpportunitiesDetail.stage != -1'></span>
                    <span class='step-all-process-circular-ciryIng' v-if='salesOpportunitiesDetail.stage == -1'></span>
                  </span>
                </p>
                <p :style='"color: " + (salesOpportunitiesDetail.stage == -1 ? "#333E48;" : "#AAAAAA;")'>输单</p>
                <p :style='"color: " + (salesOpportunitiesDetail.stage == -1 ? "#333E48;" : "#AAAAAA;")' class='step-all-process-time' v-if='salesOpportunitiesDetail.discardDate'>{{salesOpportunitiesDetail.discardDate && $moment(salesOpportunitiesDetail.discardDate).format('YYYY-MM-DD HH:mm:ss')}}</p>
              </li>
            </ul>
          </div>
          <!-- <el-steps :active="salesOpportunitiesDetail.stage == 4 ? 3 : salesOpportunitiesDetail.stage" align-center> -->
            <!-- <el-step @click.native="stepClickHandle(item)" v-for="(item, index) in salesState" :key="index" -->
            <!-- <el-step v-for="(item, index) in salesState" :key="index" -->
                     <!-- :title="item.value" v-if="index !== 0"></el-step> -->
            <!-- <el-step title="输单"></el-step> -->
          <!-- </el-steps> -->
          <!-- 展示时间以及按钮组 -->
         <!-- <ul class='mytep-ul'> -->
            <!-- <li v-for="(item, index) in salesState" :key="index" v-if="index !== 0"> -->
              <!-- 创建时间显示 -->
              <!-- <p class="mytep-created" v-if='index == 1'>{{salesOpportunitiesDetail.created && $moment(salesOpportunitiesDetail.created).format('YYYY-MM-DD HH:mm:ss')}}</p> -->
              <!-- 已联系时间 -->
              <!-- <p class="mytep-created" v-if='index == 2 && salesOpportunitiesDetail.stage > 2'>联系时间 {{salesOpportunitiesDetail.contactDate && $moment(salesOpportunitiesDetail.contactDate).format('YYYY-MM-DD')}}</p> -->
              <!-- <p class="mtep-all-btn"> -->
                <!-- 需求判断 -->
                <!-- <el-button v-if="index == 2 && salesOpportunitiesDetail.stage == 2" type="success" plain>{{item.btn}}</el-button> -->
                <!-- 需求定价 -->
                <!-- <el-button v-if="index == 3 && salesOpportunitiesDetail.stage == 3" type="success" plain>{{item.btn}}</el-button> -->
                <!-- 通知客户 -->
                <!-- <el-button v-if="index == 3 && salesOpportunitiesDetail.stage == 4" type="success" plain>{{item.btns}}</el-button> -->
              <!-- </p> -->
            <!-- </li> -->
          <!-- </ul> -->
        </div>
        <!--输单后隐藏删除以外得按钮， 调整为更近人操作-->
<!--        <a v-if="salesOpportunitiesDetail.stage !== -1 && isChangeFollower" class="lose-bill"
           @click="operateOptions('discard')">输单</a> -->
      </div>

    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="detail-left com-box-padding">
        <el-tabs v-model="activeViewName" type="card" @tab-click="handleTabsClick">
          <el-tab-pane label="销售需求资料信息" name="detail">
            <p class="table-title" v-if="salesOpportunitiesDetail.customerId">客户基本信息</p>
            <table class="detail-table" v-if="salesOpportunitiesDetail.customerId">
              <tr>
                <td class="td-title">客户类型</td>
                <td>
                  <span v-if="customerDetail.cate === 1">个人</span>
                  <span v-if="customerDetail.cate === 2">机构</span>
                </td>
                <td class="td-title">客户名称</td>
                <td>{{customerDetail.name}}</td>
                <td class="td-title">客户识别码</td>
                <td>{{customerDetail.cdKey}}</td>
              </tr>
              <tr>
                <td class="td-title">所在公海</td>
                <td>{{customerDetail.seaName}}</td>
                <td class="td-title">客户级别</td>
                <td>{{customerDetail.level}}</td>
                <td class="td-title">客户行业</td>
                <td>{{customerDetail.industry}}</td>
              </tr>
              <tr>
                <td class="td-title">所在地区</td>
                <td>{{ customerDetail.provinceName }}
                  {{ customerDetail.cityName }}
                  {{ customerDetail.areaName }}
                </td>
                <td class="td-title">公司网站</td>
                <td>{{customerDetail.website}}</td>
                <td class="td-title">客户电话</td>
                <td>{{customerDetail.phone}}</td>
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
              <tr>
                <td class="td-title">客户有效性</td>
                <td colspan="5" v-if='customerDetail.customerStatus != -1'>{{customerStatus[customerDetail.customerStatus] || '待判断'}}</td>
                <td colspan="5" v-else>无效</td>
              </tr>
							<tr>
								<td class='td-title'>无效原因</td>
								<td colspan="5">{{customerDetail.invalidCauseName}}</td>
							</tr>
							<tr>
								<td class='td-title'>无效描述</td>
								<td colspan="5">{{customerDetail.invalidRemark}}</td>
							</tr>
							<tr>
								<td class='td-title'>证明文件</td>
								<td colspan="5">
									<a :href="customerDetail.invalidFileUrl" :download="customerDetail.invalidFileName" target="_blank">{{customerDetail.invalidFileName}}</a>
								</td>
							</tr>
            </table>
            <!---->
            <p class="table-title">销售需求基本信息</p>
            <table class="detail-table">
              <tr>
                <td class="td-title">客户名称</td>
                <td>{{salesOpportunitiesDetail.customerName}}</td>
                <td class="td-title">客户联系人</td>
                <td>{{salesOpportunitiesDetail.contacter}}[{{salesOpportunitiesDetail.contactPhone}}]</td>
                <td class="td-title">需求进度</td>
                <td>
                  <span v-for="item in salesStateNew"
                        :key="item.type"
                        v-if="item.type === salesOpportunitiesDetail.stage">{{item.value}}</span>
                </td>
              </tr>
              <tr>
                <td class="td-title">预计签单时间</td>
                <td>{{salesOpportunitiesDetail.billDate &&
                  $moment(salesOpportunitiesDetail.billDate).format('YYYY-MM-DD')}}
                </td>
                <td class="td-title">意向商品</td>
                <td>{{salesOpportunitiesDetail.intentProductName}}</td>
                <td class="td-title">预计签单金额</td>
                <td>{{salesOpportunitiesDetail.intentBillAmount}}</td>
              </tr>
              <tr>
                <td class="td-title">签单订单号</td>
                <td>{{salesOpportunitiesDetail.orderId}}</td>
                <td class="td-title">签单商品</td>
                <td>{{salesOpportunitiesDetail.productName}}</td>
                <td class="td-title">实际签单金额</td>
                <td>{{salesOpportunitiesDetail.billAmount}}</td>
              </tr>
              <tr>
                <td class="td-title">销售需求备注</td>
                <td colspan="5">{{salesOpportunitiesDetail.chanceRemark || '暂无备注信息'}}</td>
              </tr>
              <tr>
                <td class="td-title">需求来源</td>
                <td colspan="5">{{salesOpportunitiesDetail.chanceSourceName}}</td>
              </tr>
              <tr>
                <td class="td-title">销售合同网址</td>
                <!--<td colspan="5">{{salesOpportunitiesDetail.contractUrl}}</td>-->
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
                <td class="td-title">需求输单原因</td>
                <td colspan="5">{{salesOpportunitiesDetail.discardCauseName}}</td>
              </tr>
              <tr>
                <td class="td-title">需求输单备注</td>
                <td colspan="5">{{salesOpportunitiesDetail.discardRemark || '暂无备注信息'}}</td>
              </tr>
              <tr>
                <td class="td-title">客户意向</td>
                <td colspan="5">
									<span v-if='salesOpportunitiesDetail.customerIntentionLevel == 0'>无</span>
									<span v-if='salesOpportunitiesDetail.customerIntentionLevel == 1'>低</span>
									<span v-if='salesOpportunitiesDetail.customerIntentionLevel == 2'>中</span>
									<span v-if='salesOpportunitiesDetail.customerIntentionLevel == 3'>高</span>
									<span v-if='salesOpportunitiesDetail.customerIntentionLevel == null'>暂未配置</span>
								</td>
              </tr>
              <tr>
                <td class="td-title">证据文件</td>
                <td colspan="5">
									<a :href="salesOpportunitiesDetail.recorderFileUrl" :download="salesOpportunitiesDetail.recorderFileName" target="_blank">{{salesOpportunitiesDetail.recorderFileName}}</a>
								</td>
              </tr>
              <tr>
                <td class="td-title">描述信息</td>
                <td colspan="5">{{salesOpportunitiesDetail.chatRecord}}</td>
              </tr>
            </table>

            <p class="table-title">销售需求操作记录</p>
            <table class="detail-table">
              <!--<tr>-->
              <!--<td class="td-title">销售需求创建时间</td>-->
              <!--<td colspan="3">{{salesOpportunitiesDetail.created &&-->
              <!--$moment(salesOpportunitiesDetail.created).format('YYYY-MM-DD HH:mm:ss')}}-->
              <!--</td>-->
              <!--<td class="td-title">所有人</td>-->
              <!--<td>{{salesOpportunitiesDetail.creatorName}}</td>-->
              <!--</tr>-->
              <!--<tr>-->
              <!--<td class="td-title">销售需求修改时间</td>-->
              <!--<td colspan="3">{{salesOpportunitiesDetail.modified &&-->
              <!--$moment(salesOpportunitiesDetail.modified).format('YYYY-MM-DD HH:mm:ss')}}-->
              <!--</td>-->
              <!--<td class="td-title">修改人</td>-->
              <!--<td>{{salesOpportunitiesDetail.modifierName}}</td>-->
              <!--</tr>-->
              <!--<tr>-->
              <!--<td class="td-title">销售需求活动时间</td>-->
              <!--<td colspan="3">{{ salesOpportunitiesDetail.followDate &&-->
              <!--$moment(salesOpportunitiesDetail.followDate).format('YYYY-MM-DD HH:mm:ss')}}-->
              <!--</td>-->
              <!--<td class="td-title">跟进人</td>-->
              <!--<td>{{salesOpportunitiesDetail.team.salerName}}</td>-->
              <!--</tr>-->
              <tr>
                <td colspan="5" class="td-title">销售需求操作记录</td>
                <td class="td-title">操作人</td>
                <td class="td-title">操作时间</td>
              </tr>
              <tr v-for="(item, index) in salesOpportunitiesDetail.operateLogList" :key="index">
                <td colspan="5">{{item.detail}}</td>
                <td>{{item.userName}}</td>
                <td>{{item.operateTime && $moment(item.operateTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
            </table>
          </el-tab-pane>
          <!---->
          <el-tab-pane label="销售需求相关信息" name="related">

            <div class="related-btn-group">
              <com-button buttonType="theme" @click="handleRoute('contact')">联系人({{contactTotal}})</com-button>
              <com-button buttonType="grey" @click="handleRoute('orderRecords')">跟单记录({{orderRecordsTotal}})
              </com-button>
              <com-button buttonType="grey" @click="handleRoute('order')">APP订单({{orderTotal}})</com-button>
            </div>

            <p class="table-title">
              联系人({{contactTotal}})
              <!--<a class="more" v-if="contactTotal > 5" @click="handleRoute('contact')">更多》</a>-->
              <!--（-1 输单）-->
              <a v-if="salesOpportunitiesDetail.stage !== -1 && (isChangeFollower || isChanceCreater)" class="table-add"
                 @click="quickOperation('addContact')"><i class="el-icon-plus"></i>新增联系人</a>
            </p>
            <table class="detail-table related-table">
              <tr>
                <th class="td-title">姓名</th>
                <th class="td-title">联系电话</th>
                <th class="td-title">公司职务</th>
                <th class="td-title">微信</th>
                <th class="td-title">QQ</th>
                <th class="td-title">创建时间</th>
                <th class="td-title" style='width: 260px;'>操作</th>
              </tr>
              <tr v-for="item in contactList" :key="item.id">
                <td>{{item.contacterName}}</td>
                <td>{{item.phone}}</td>
                <td>{{item.position}}</td>
                <td>{{item.wx}}</td>
                <td>{{item.qq}}</td>
                <td>{{item.created && $moment(item.created).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>
                  <el-button type="success" plain size="mini" icon="el-icon-phone-outline" @click='callIng(item, 1)'>呼叫</el-button>
                  <el-button type="danger" plain size="mini" icon="el-icon-error" @click='callIng(item, 0)' v-if="showHangUp">挂断</el-button>
                </td>
              </tr>
            </table>

            <p class="table-title">
              跟单记录({{orderRecordsTotal}})
              <!--<a class="more" v-if="orderRecordsTotal > 5" @click="handleRoute('orderRecords')">更多》</a>-->
              <!--（-1输单）-->
              <a v-if="salesOpportunitiesDetail.stage !== -1 && isChangeFollower" class="table-add"
                 @click="quickOperation('addRecord')"><i class="el-icon-plus"></i>新增跟单记录</a>
            </p>
            <table class="detail-table related-table">
              <tr>
                <th class="td-title" colspan="4">跟单描述</th>
                <th class="td-title" colspan="1">跟进人</th>
                <th class="td-title" colspan="1">跟进时间</th>
              </tr>
              <tr v-for="item in orderRecordsList" :key="item.id">
                <td colspan="4" style="text-align: left;padding-left: 5px;padding-right: 5px;">{{item.followDesc}}</td>
                <td colspan="1">{{item.creatorName}}</td>
                <td colspan="1">{{$moment(item.created).format('YYYY-MM-DD HH:mm:ss')}}</td>
              </tr>
            </table>

            <p class="table-title">
              销售订单({{orderTotal}})
              <!--<a class="more" v-if="orderTotal > 5" @click="handleRoute('order')">更多》</a>-->
              <!--（-1 输单）-->
<!--              <a v-if="salesOpportunitiesDetail.stage !== -1 && isChangeFollower" class="table-add"
                 @click="quickOperation('addOrder')"><i class="el-icon-plus"></i>新增关联订单</a> -->
            </p>
            <table class="detail-table related-table">
              <tr>
                <th class="td-title">订单编号</th>
                <th class="td-title">是否续费</th>
                <th class="td-title">订单状态</th>
                <th class="td-title">购买商品</th>
                <th class="td-title">订单金额</th>
                <th class="td-title">回款金额</th>
                <th class="td-title">创建时间</th>
                <th class="td-title">关联状态</th>
                <th class="td-title">操作</th>
              </tr>
              <tr>
              <tr v-for="item in orderList" :key="item.id">
                <td>{{item.id}}<span v-if="item.orderId">{{'-' + item.orderId}}</span></td>
                <td>{{item.isRenew?'续费订单':'新签订单'}}</td>
                <td><span v-for="os in orderState" :key="os.type"
                          v-if="item.orderState === os.type">{{os.value}}</span>
                </td>
                <td>{{item.productName}}</td>
                <td>{{item.billAmount}}</td>
                <td>{{item.refund_amount}}</td>
                <td>{{item.created && $moment(item.created).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>
                  <span v-if="item.relState ===1">关联中</span>
                  <span v-if="item.relState ===2">已完成</span>
                  <span v-if="item.relState ===3">已作废</span>
                </td>
                <td>
                  <!--续费按钮出现的条件：-->
                  <!--1.订单中的商品为计时类商品；-->
                  <!--2.订单处于服务中或已完成状态。-->
                  <!--计费类型（TIMES计次，ANNUALLY包年） 包年就是计时商品-->
                  <a
                    v-if="salesOpportunitiesDetail.stage !== -1 && isChangeFollower && (item.orderState === 3 || item.orderState === 4) && item.billingType === 'ANNUALLY'"
                    class="table-op" @click="quickOperation('reNew', item.id, item)">续费</a>
                  <!--<a v-if="true" class="table-op" @click="quickOperation('reNew', item.id, item)">续费</a>-->
                </td>
              </tr>
            </table>

            <p class="table-title">通话记录</p>
            <ul class='all-callRecord'>
              <li class='noData' v-if='callList.length < 1'>暂无通话记录</li>
              <li v-for='item in callList' :key='item.id'>
                <div class='all-callRecord-time'>
                  <p class='all-callRecord-time-date'>{{item.created && $moment(item.created).format('YYYY-MM-DD')}}</p>
                  <p class='all-callRecord-time-time'>{{item.created && $moment(item.created).format('HH:mm:ss')}}</p>
                </div>
                <div class='all-callRecord-content'>
                  <p class='all-callRecord-content-info'>
                    <span class='all-callRecord-content-info-contant'>
                      <img  class='all-callRecord-content-info-contant-img' src="../../../../assets/icon/call-cancat.png" alt="">
                      <span class='all-callRecord-content-info-contant-name'>{{item.userName}}</span>
                      <img class='all-callRecord-content-info-contant-jian' src="../../../../assets/icon/call-left-j.png" alt="" v-if='item.direct == 2'>
                      <img class='all-callRecord-content-info-contant-jian' src="../../../../assets/icon/call-right-j.png" alt="" v-else>
                      <img  class='all-callRecord-content-info-contant-img' src="../../../../assets/icon/call-cancat.png" alt="" v-if='item.direct == 3'>
                      <img  class='all-callRecord-content-info-contant-img imgmt' src="../../../../assets/icon/call-cancat2.png" alt="" v-else>
                      <span class='all-callRecord-content-info-contant-name'>{{item.contacterName}}</span>
                    </span>
                    <span class='all-callRecord-content-info-time' @click='listenSoundRecord(item)' v-if='item.answered == 1'>
                      <span class='all-callRecord-content-info-time-duration'>{{getTimeDifference(item.callsec)}}</span>
                      <span class='all-callRecord-content-info-time-frame'>{{item.startTime && $moment(item.startTime).format('HH:mm:ss')}}-{{item.endTime && $moment(item.endTime).format('HH:mm:ss')}}</span>
                    </span>
                    <span class='all-callRecord-content-info-time' v-if='item.answered == 2'>未接通</span>
                    <span class='all-callRecord-content-info-time' v-if='item.answered == null'>同步中</span>
                    <span class='all-callRecord-content-info-name'>{{item.intentProductName}}</span>
                  </p>
                  <p class='all-callRecord-content-remark' v-if='item.remark'>备注 : {{item.remark}}</p>
                  <el-button type="success" plain size="mini" @click='addRemark(item)' v-else>添加备注</el-button>
                </div>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!--团队成员-->
      <div class="detail-right com-box-padding">
        <div class="team-title">
          <span class="title-text">团队成员</span>
        </div>
        <ul class="team-member">
          <li class="team-member-item">
            <div class="head">
              <img style="width: 58px;height: 58px;border-radius: 100%;"
                   v-if="salesOpportunitiesDetail.team.creatorAvatar" :src="salesOpportunitiesDetail.team.creatorAvatar"
                   alt="">
              <img v-else src="../../../../assets/icon/headDefault.png" alt="">
            </div>
            <div class="text">
              <h4>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.creatorName}}</h4>
              <p>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.creatorMobilePhone}}</p>
            </div>
            <div class="post">
              <span class="post-tag-1">创建人</span>
            </div>
          </li>
          <li class="team-member-item">
            <div class="head">
              <img style="width: 58px;height: 58px;border-radius: 100%;"
                   v-if="salesOpportunitiesDetail.team.salerAvatar" :src="salesOpportunitiesDetail.team.salerAvatar"
                   alt="">
              <img v-else src="../../../../assets/icon/headDefault.png" alt="">
            </div>
            <div class="text">
              <h4>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.salerName}}</h4>
              <p>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.salerMobilePhone}}</p>
            </div>
            <div class="post">
              <span class="post-tag-2">销售员</span>
            </div>
          </li>
          <li class="team-member-item">
            <div class="head">
              <img style="width: 58px;height: 58px;border-radius: 100%;"
                   v-if="salesOpportunitiesDetail.team.counselorAvatar"
                   :src="salesOpportunitiesDetail.team.counselorAvatar" alt="">
              <img v-else src="../../../../assets/icon/headDefault.png" alt="">
            </div>
            <div class="text">
              <h4>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.counselorName}}</h4>
              <p>{{salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.counselorMobilePhone}}</p>
            </div>
            <div class="post">
              <span class="post-tag-2">咨询师</span>
            </div>
          </li>
        </ul>
        <!--输单后隐藏删除以外得按钮-->
        <!--当销售需求进入100%阶段后，咨询师相关的操作按钮作隐藏处理。包含“申请咨询师协同”“申请替换咨询师”“咨询师主动退出”-->
        <div class="team-btn-group"
             v-if="salesOpportunitiesDetail.stage !== -1 && salesOpportunitiesDetail.stage !== 5">
          <div v-if="salesOpportunitiesDetail.team && !salesOpportunitiesDetail.team.counselorId && isChangeFollower"
               class="btn-item-1" @click="operateOptions('apply')">申请咨询师协同
          </div>
          <div v-if="salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.counselorId && isChanceCounselor"
               class="btn-item-2" @click="operateOptions('exit')">咨询师主动退出
          </div>
          <div v-if="salesOpportunitiesDetail.team && salesOpportunitiesDetail.team.counselorId && isChangeFollower"
               class="btn-item-3" @click="operateOptions('replace')">申请替换咨询师
          </div>
        </div>
      </div>
    </div>
    <!-- 录音弹框 -->
    <el-dialog
      title='录音文件'
      :visible.sync="soundRecording"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <div>
        <audio style='width: 100%;' :src="soundRecordingUrl" controls="controls"></audio>
      </div>
    </el-dialog>
    <!-- 添加备注弹框 -->
    <el-dialog
      title='添加备注'
      :visible.sync="showRemarks"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <div>
        <el-form label-width="80px">
          <el-form-item label='备注信息'>
            <el-input type='textarea' :rows="5" placeholder="请输入备注信息" v-model="remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showRemarks = false">取 消</el-button>
        <el-button type="primary" @click="subRemarksInfo">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
  import comButton from '../../../../components/button/comButton'
  import { mapState, mapActions } from 'vuex'
  import API from '../../../../utils/api'
  import moveDialog from './moveDialog'
  import applyDialog from './applyDialog'
  import discard from './discard'
  import addDialog from './addDialog'
  import addOrderDialog from '../salesOrders/addDialog'
  import demandPricingDialog from './demandPricingDialog'
  import intentionLevelDialog from './intentionLevelDialog'
  import webStorage from 'webStorage'
  import addContactDialog from '../contacts/addDialog'
  import addRenew from '../salesOrders/addRenew'
  import addOrderRecord from '../followOrderRecords/addDialog'
  import order from './order'
  import bindCustomer from './bindCustomer'

  export default {
    name: 'detailInfo',
    data () {
      return {
        dataLoading: false,
        showHangUp: false,
        showRemarks: false,     //备注弹框
        remarkRecordId: '',    //要添加备注的id
        remark: '',            //备注信息
        soundRecording: false, //录音弹框
        soundRecordingUrl: '', //音频地址
        activeViewName: '',
        contactList: [],
        contactTotal: 0,
        orderRecordsList: [],
        orderRecordsTotal: 0,
        callList: [],          //通话记录列表
        orderList: [],
        orderTotal: 0,
        userInfo: '',
        isChangeFollower: true, // 当前用户是需求的更进人
        isChanceCreater: true, // 当前用户是需求的创建人，
        isChanceCounselor: true, // 当前用户是需求的咨询师
        customerDetail: {}, // 客户详细
				customerStatus: {
					0: '待判断',
					1: '有效',
				},
        stepLineWidth: 0,        //step线的宽度
      }
    },
    computed: {
      ...mapState('constData', [
        'salesState',
        'salesStateNew',
        'orderState',
        'themeIndex',
        'topSource',
      ]),
      ...mapState('salesOpportunities', [
        'salesOpportunitiesDetail',
      ]),
    },
    watch: {
      '$route.query.view' (view) {
        this.activeViewName = view
      },
    },
    components: {
      comButton,
      // teamMember,
      moveDialog,
      applyDialog,
    },
    methods: {
      ...mapActions('salesOpportunities', [
        'ac_salesOpportunitiesDetail',
      ]),
			editIntentionLeve (num) {
				API.customer.chanceCheckValid({id: this.$route.query.id}, (data) => {
					if(data.status && data.data == 1) {
						this.$vDialog.modal(intentionLevelDialog, {
							title: '客户需求意向程度',
							width: 600,
							height: 460,
							params: {
								intentionLeve: this.salesOpportunitiesDetail,
                type: num ? 1 : null,
							},
							callback: (data) => {
								if (data.type === 'save') {
									this.getList();
								}
							},
						})
					}
				})
			},
      handleTabsClick (tab, event) {
        // console.log(tab.name)
        this.$router.push(
          {
            name: 'salesOpportunitiesDetail',
            params: {end: this.themeIndex === 0 ? 'FE' : 'ME'},
            query: {view: tab.name, id: this.$route.query.id},
          })
      },
      operateOptions (op) {
        switch (op) {
          case 'move': // 转移
            // this.moveDialogOpen = true
            this.$vDialog.modal(moveDialog, {
              title: '转移销售需求',
              width: 500,
              height: 240,
              params: {
                salesState: this.salesState,
                multipleSelection: [{id: this.salesOpportunitiesDetail.id}],
              },
              callback: (data) => {
                this.getSalesOpportunitiesDetail()
              },
            })
            break
          case 'delete': // 删除
            this.$confirm('确定删除销售需求, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              API.salesOpportunities.delete(this.salesOpportunitiesDetail.id, (data) => {
                if (data.status) {
                  this.$message.success('删除成功')
                  this.$router.push({name: 'salesOpportunitiesList', params: 'FE'})
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              })
            })
            break
          case 'discard': // 输单
            this.$vDialog.modal(discard, {
              title: '销售输单',
              width: 520,
              height: 340,
              params: {
                detail: this.salesOpportunitiesDetail,
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getSalesOpportunitiesDetail()
                }
              },
            })
            break
          case 'apply': // 申请咨询师
            this.$vDialog.modal(applyDialog, {
              title: '申请咨询师协同',
              width: 520,
              height: 280,
              params: {
                type: 'apply',
                chanceId: this.salesOpportunitiesDetail.id,
                exceptUserIds: this.getTeamAndOwn(),
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getSalesOpportunitiesDetail()
                }
              },
            })
            break
          case 'exit': // 咨询师退出
            this.$confirm('确定咨询师主动退出, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              API.salesOpportunities.counselorExit(this.salesOpportunitiesDetail.id, (data) => {
                if (data.status) {
                  this.$message.success('操作成功')
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消',
              })
            })
            break
          case 'replace': // 咨询师替换
            this.$vDialog.modal(applyDialog, {
              title: '申请替换咨询师',
              width: 520,
              height: 280,
              params: {
                type: 'replace',
                chanceId: this.salesOpportunitiesDetail.id,
                exceptUserIds: this.getTeamAndOwn(),
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getSalesOpportunitiesDetail()
                }
              },
            })
            break
          case 'return':
            this.$confirm('确定退回需求公池, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              this.dataLoading = true
              API.salesOpportunities.returnSea({chanceIds: this.salesOpportunitiesDetail.id}, (data) => {
                if (data.status) {
                  if (data.data.fail > 0) {
                    this.$message.warning(`成功${data.data.success}, 失败${data.data.fail}, 失败原因：${data.data.errorMessage}`)
                  } else {
                    this.$message.success(`成功${data.data.success},失败${data.data.fail}`)
                  }
                  setTimeout(() => {
                    this.dataLoading = false
                    this.getSalesOpportunitiesDetail()
                  }, 500)
                } else {
                  setTimeout(() => {
                    this.dataLoading = false
                  }, 500)
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              })
            })
            break
          case 'bind':
            this.$vDialog.modal(bindCustomer, {
              title: '绑定客户(可二选一操作)',
              width: 800,
              height: 380,
              params: {
                chanceDetail: JSON.parse(JSON.stringify(this.salesOpportunitiesDetail))
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getSalesOpportunitiesDetail()
                }
              },
            })
            break
        }
      },
      getTeamAndOwn () {
        let arrIds = []
        arrIds.push(webStorage.getItem('userInfo').id) // 自己
        if (this.salesOpportunitiesDetail.team) {
          if (this.salesOpportunitiesDetail.team.creator) { // 创建人
            arrIds.push(this.salesOpportunitiesDetail.team.creator)
          }
          if (this.salesOpportunitiesDetail.team.counselorId) { // 咨询师
            arrIds.push(this.salesOpportunitiesDetail.team.counselorId)
          }
          if (this.salesOpportunitiesDetail.team.salerId) { // 销售
            arrIds.push(this.salesOpportunitiesDetail.team.salerId)
          }
        }
        return [...new Set(arrIds)] // 去重
      },
			getList () {
				this.getSalesOpportunitiesDetail();
			},
      getSalesOpportunitiesDetail () {
        this.dataLoading = true
        API.salesOpportunities.detail(this.$route.query.id, (data) => {
          this.ac_salesOpportunitiesDetail(data.data)
          if (data.data.customerId) {
            this.getContactList(data.data.customerId)
            this.getCustomerDetail(data.data.customerId)
          }
          this.getOrderRecordsList(data.data.id)
          this.getAppOrderList(data.data.id)
          
          this.getCallRecordList(data.data.id);
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
          if (this.userInfo.id !== this.salesOpportunitiesDetail.team.salerId) { // 判断需求的更进人
            this.isChangeFollower = false
          }
          if (this.userInfo.id !== this.salesOpportunitiesDetail.team.creator) { // 判断需求的创建人
            this.isChanceCreater = false
          }
          if (this.userInfo.id !== this.salesOpportunitiesDetail.team.counselorId) { // 判断需求的创建人
            this.isChanceCounselor = false
          }
          // 根据状态设置step线的长度
          let stepW = 0;
          stepW = this.salesOpportunitiesDetail.stage == 2 && 25 ||
                  this.salesOpportunitiesDetail.stage == 3 && 50 ||
                  this.salesOpportunitiesDetail.stage == 4 && 50 ||
                  this.salesOpportunitiesDetail.stage == 5 && 75 ||
                  this.salesOpportunitiesDetail.stage == -1 && 100 || 0;
          this.stepLineWidth = stepW;
        })
      },
      getCustomerDetail (customerId) {
        this.dataLoading = true
        API.customer.detailNoAuth({id: customerId}, (data) => {
          this.customerDetail = data.data
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        })
      },
      getContactList (customerId) {
        API.contacts.listNoAuth({customerId: customerId, pageSize: 10000, page: 0, sort: 'created,desc'}, (da) => {
          this.contactList = da.data.content
          this.contactTotal = da.data.totalElements
        })
      },
      getOrderRecordsList (id) {
        API.orderRecords.listNoAuth({chanceId: id, pageSize: 10000, page: 0, sort: 'created,desc'}, (da) => {
          this.orderRecordsList = da.data.content
          this.orderRecordsTotal = da.data.totalElements
        })
      },
      getAppOrderList (id) {
        API.salesOrder.listNoAuth({chanceId: id, pageSize: 10000, page: 0, sort: 'created,desc'}, (da) => {
          this.orderList = da.data.content
          this.orderTotal = da.data.totalElements
        })
      },
      stepClickHandle (step) {
        // alert(step.type)
        // console.log(step)
        switch (step.type) {
          case 3:
            if (this.salesOpportunitiesDetail.stage === -1) {
              this.$message.warning('销售需求已经输单，不能操作！')
            } else if (!this.isChangeFollower) {
              this.$message.warning('不是销售跟进人员，不能操作！')
            } else if (this.salesOpportunitiesDetail.stage !== 3) {
              this.$message.warning('已联系阶段的订单才能进行定价！')
            } else {
              this.$vDialog.modal(demandPricingDialog, {
                title: '需求定价',
                width: 900,
                height: 480,
                params: {
                  detailCustomersId: this.salesOpportunitiesDetail.customerId,
                  detailChanceId: this.salesOpportunitiesDetail.id,
                  team: this.salesOpportunitiesDetail.team,
                  fromChance: true,
                },
                callback: (data) => {
                  if (data.type === 'save') {
                    this.getSalesOpportunitiesDetail()
                  }
                },
              })
            }
            break
          case 4:
            if (this.salesOpportunitiesDetail.stage === -1) {
              this.$message.warning('销售需求已经输单，不能操作！')
            } else if (!this.isChangeFollower) {
              this.$message.warning('不是销售跟进人员，不能操作！')
            } else if (this.salesOpportunitiesDetail.stage !== 4) {
              this.$message.warning('定价阶段才能签单！')
            } else {
              this.$vDialog.modal(order, {
                title: '通知客户',
                width: 964,
                height: 500,
                params: {
                  salesOpportunitiesDetail: this.salesOpportunitiesDetail,
                  orderState: this.orderState,
                },
                callback: (data) => {
                  if (data.type === 'save') {
                    this.getSalesOpportunitiesDetail()
                  }
                },
              })
            }
            break
          case 5:
            break
        }
      },
      handleRoute (list) {
        switch (list) {
          case 'contact':
            // this.$router.push({name: 'contactsList', query: {customerId: this.salesOpportunitiesDetail.customerId}})
            break
          case 'orderRecords': // 需求
            // this.$router.push({name: 'orderRecordsList', query: {chanceId: this.salesOpportunitiesDetail.id}})
            break
          case 'order':
            // this.$router.push({name: 'salesOrdersList', query: {chanceId: this.salesOpportunitiesDetail.id}})
            break
        }
      },
      quickOperation (op, id, obj) {
        let that = this
        switch (op) {
          case 'addContact':
            if (this.salesOpportunitiesDetail.customerId) {
              this.$vDialog.modal(addContactDialog, {
                title: '新增联系人',
                width: 900,
                height: 460,
                params: {
                  detailCustomersId: this.salesOpportunitiesDetail.customerId,
                },
                callback (data) {
                  if (data.type === 'save') {
                    that.getContactList(that.salesOpportunitiesDetail.customerId)
                  }
                },
              })
            } else {
              this.$message.warning('未绑定客户！')
            }
            break
          case 'addRecord':
            this.$vDialog.modal(addOrderRecord, {
              title: '新建跟单记录',
              width: 700,
              height: 320,
              params: {
                detailCustomersId: this.salesOpportunitiesDetail.customerId,
                detailChanceId: this.salesOpportunitiesDetail.id,
              },
              callback (data) {
                if (data.type === 'save') {
                  that.getOrderRecordsList(that.salesOpportunitiesDetail.id)
                }
              },
            })
            break
          case 'addOrder':
            this.$vDialog.modal(addOrderDialog, {
              title: '新增关联订单',
              width: 900,
              height: 480,
              params: {
                detailCustomersId: this.salesOpportunitiesDetail.customerId,
                detailChanceId: this.salesOpportunitiesDetail.id,
                fromChance: true,
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getSalesOpportunitiesDetail()
                }
              },
            })
            break
          case 'reNew':
            this.$vDialog.modal(addRenew, {
              title: '续费',
              width: 900,
              height: 480,
              params: {
                orderDetail: obj,
                topSource: this.topSource, // 顶级客户来源
                isRenew: true,
              },
              callback (data) {
                if (data.type === 'save') {
                  that.getSalesOpportunitiesDetail()
                }
              },
            })
            break
        }
      },
      routeToContract () {
        this.$router.push({name: 'onetimeContract', query: {name: '商品名称'}})
      },
      // 进行呼叫/挂断
      callIng (item, type) {
        if(this.isChangeFollower) {
          let phone = item.phone, contacterId = item.id, chanceId = this.$route.query.id;
          if(!phone) {
            return this.$message({
              type: 'error',
              message: item.contacterName + '没有联系电话',
              duration: 1500
            });
          }
          if(type) {  // 呼叫
            let params = {
                  phone,
                  contacterId,
                  chanceId
                };
             API.salesOrder.zhuxinCallIng(params, (da) => {
               this.showHangUp = true;
             })
          }else {// 挂断
            let params = {
              chanceId
            };
            API.salesOrder.zhuxinHangUp(params, (da) => {
             if(da.status) {
               this.getCallRecordList(this.$route.query.id);
               this.$message('挂断成功');
               this.showHangUp = false;
             }
            })
            
          }
        }else {
          this.$message({
            type: 'error',
            message: '只有跟进人才能进行操作',
            duration: 1500
          })
        }
      },
      // 获取通话记录
      getCallRecordList (id) {
        API.salesOrder.zhuxinSalesOpportunitiesCallRecordList(id, (da) => {
          if(da.status) {
            this.callList = da.data
          }
        })
      },
      // 去听录音
      listenSoundRecord (item) {
        this.soundRecordingUrl = [];
        this.soundRecordingUrl = item.record;
        this.soundRecording = true;
      },
      // 添加备注弹框
      addRemark (item) {
        if(this.isChangeFollower) {
          this.remarkRecordId = item.id;
          this.showRemarks = true;
        }else {
          this.$message({
            type: 'error',
            message: '只有跟进人才能进行操作',
            duration: 1500
          })
        }
      },
      // 确定添加备注
      subRemarksInfo () {
        let _id = this.remarkRecordId, remark = this.remark;
        if(!remark) {
          return this.$message({
            type: 'error',
            message: '请输入备注信息',
            duration: 1500
          });
        };
        let _params = {
          id: _id,
          remark,
        };
        API.salesOrder.zhuxinCallAddRemark(_params, (data) => {
          console.log('备注添加成功信息: ' + data);
          if(data.status) {
            this.showRemarks = false;
            this.getCallRecordList(this.$route.query.id);
            this.$message({
              type: 'success',
              message: '备注添加成功',
              duration: 1500
            })
          }
        })
      },
      getTimeDifference (oldsecond) {
        let _totalSecond = oldsecond,
            _day = Math.floor(_totalSecond / (24 * 60 * 60)),
            _hour = Math.floor((_totalSecond % (24 * 60 * 60)) / (60 * 60)),
            _minute = Math.floor(((_totalSecond % (24 * 60 * 60)) % (60 * 60)) / 60),
            _second = Math.floor(((_totalSecond % (24 * 60 * 60)) % (60 * 60)) % 60),
            _time = _hour + '时' + _minute + '分' + _second + '秒';
        return _time
      },
    },
    created () {
      this.activeViewName = this.$route.query.view
      this.getSalesOpportunitiesDetail()
      this.userInfo = webStorage.getItem('userInfo')
    },
  }
</script>
<style scoped>
  .step >>> .is-process {
    color: #c0c4cc;
    font-weight: normal;
    border-color: #c0c4cc;
  }
</style>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/commons";

  .step-box {
    margin-top: 20px;
  }

  .step {
    width: calc(100% - 30px);
    background: #F5F8FA;
    padding: 75px 15px 90px 15px;
    display: inline-block;
    overflow: hidden;
    .step-all-div {
      width: 85%;
      margin: 0 auto;
      height: 1px;
      background: #BBBBBB;
      position: relative;
      .step-all-line {
        width: 0;
        height: 1px;
        position: absolute;
        top: 0;
        left: 0;
        background: #4BCF99;
      }
      .step-all-process {
        width: 125%;
        overflow: hidden;
        position: absolute;
        top: -41px;
        left: -12.5%;
        li {
          width: 20%;
          float: left;
          text-align: center;
          color: #AAAAAA;
          font-size: 12px;
          .step-all-process-personnel {
            height: 40px;
            line-height: 40px;
            font-size: 12px;
            color: #4F5F6F;
            .step-all-process-personnel-type {
              font-size: 14px;
              font-weight: bold;
            }
            .step-all-process-personnel-mobileimg {
              img {
                width: 25px;
                height: 25px;
                position: relative;
                top: 7px;
                cursor: pointer;
              }
            }
          }
          .step-all-process-circular {
            margin-bottom: 5px;
            margin-top: -5px;
            .step-all-process-circular-ciry {
              display: inline-block;
              width: 10px;
              height: 10px;
              background: #BBBBBB;
              border-radius: 50%;
            }
            .step-all-process-circular-ciryNew {
              display: inline-block;
              width: 10px;
              height: 10px;
              background: #4BCF99;
              border-radius: 50%;
            }
            .step-all-process-circular-ciryIng {
              display: inline-block;
              width: 12px;
              height: 12px;
              background: #4BCF99;
              box-shadow: 0 0 5px #4BCF99;
              border-radius: 50%;
            }
          }
          .step-all-process-time {
            margin-top: 5px;
          }
        }
      }
    }
  }

  .lose-bill {
    display: inline-block;
    padding: 4px 22px;
    background-color: #00A7FE;
    color: #fff;
    border-radius: 20px;
    cursor: pointer;
  }

  .team-btn-group {
    border: 1px;
    padding: 20px;
    .base {
      text-align: center;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid;
      margin-top: 20px;
      cursor: pointer;
    }
    .btn-item-1 {
      @extend .base;
      border-color: #39C189;
      color: #39C189;
    }
    .btn-item-2 {
      @extend .base;
      border-color: #00A7FE;
      color: #00A7FE;
    }
    .btn-item-3 {
      @extend .base;
      border-color: #F94849;
      color: #F94849;
    }
  }
  .mytep-ul {
    width: 100%;
    overflow: hidden;
    li {
      float: left;
      width: 20%;
      text-align: center;
      font-size: 13px;
      .mytep-created {
        color: #aaa;
        font-size: 13px;
      }
    }
  }
  
  .all-callRecord {
    width: 100%;
    border-top: 1px solid #e4e7ed;
    .noData {
      font-size: 14px;
      text-align: center;
      color: #aaa;
      border: 0;
    }
    li {
      padding: 15px;
      border-bottom: 1px solid #e4e7ed;
      overflow: hidden;
      .all-callRecord-time {
        float: left;
        padding-right: 20px;
        p {
          line-height: 25px;
          font-size: 12px;
        }
        .all-callRecord-time-time {
          color: #aaa;
        }
      }
      .all-callRecord-content {
        width: calc(100% - 82px);
        float: left;
        .all-callRecord-content-info {
          position: relative;
          .all-callRecord-content-info-contant {
            display: inline-block;
            line-height: 25px;
            overflow: hidden;
            .all-callRecord-content-info-contant-img {
              float: left;
              width: 16px;
              height: 16px;
              margin-top: 2px;
            }
            .imgmt {
              margin-top: 4px;
            }
            .all-callRecord-content-info-contant-name {
              float: left;
              margin-left: 5px;
              font-size: 14px;
            }
            .all-callRecord-content-info-contant-jian {
              float: left;
              margin: 10px 10px 0 10px;
              width: 55px;
              height: 6px;
            }
          }
          .all-callRecord-content-info-name {
            display: inline-block;
            width: 100%;
            height: 25px;
            text-align: center;
            line-height: 25px;
            position: absolute;
            top: 0;
            left: 0;
            font-size: 14px;
            color: #6B6B6B;
            font-weight: bold;
          }
          .all-callRecord-content-info-time {
            position: relative;
            z-index: 5;
            text-decoration: underline;
            cursor: pointer;
            float: right;
            color: #6B6B6B;
            margin-left: 7%;
            width: 225px;
            text-align: left;
            line-height: 25px;
            .all-callRecord-content-info-time-duration {
              font-weight: bold;
            }
            .all-callRecord-content-info-time-frame {
              color: #aaa;
            }
          }
        }
        .all-callRecord-content-remark {
          margin-top: -3px;
          font-size: 13px;
          color: #aaa;
          line-height: 25px;
        }
      }
    }
  }
</style>
