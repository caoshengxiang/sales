<template>
	<div class="com-container com-detail-container" v-loading="dataLoading" element-loading-text="数据加载中...">
		<!--头部-->
		<div class="com-head">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item v-if="themeIndex === 0" v-for="item in $route.meta.pos" :key="item.name" :to="{ name: item.toName }">{{ item.name }}</el-breadcrumb-item>
				<el-breadcrumb-item v-if="themeIndex === 1" v-for="item in $route.meta.pos2" :key="item.name" :to="{ name: item.toName }">{{ item.name }}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!--控制栏-->
		<div class="com-bar com-bars">
			<div class="com-info-left">
				<!--<img class="com-info-img" src="../../../../assets/icon/company.png" alt="">-->
				<div class="com-info-img">
					<vue-qr
						@click.native="dialogVisible = true"
						:logoSrc="config1.logo"
						:text="config1.value"
						:size="60"
						:margin="0"
						:callback="agentRecCallback"
						qid="activity-1"
					></vue-qr>
				</div>
				<div class="com-info-text">
					<h3>
						{{ detailInfo.meetingName }}
						<span
							style="position:relative;top: -5px;font-size: 12px; background: #FF7700; color: #fff;padding: 4px 12px;border:1px solid #FF7700;margin-left: 20px;border-radius: 20px;"
							v-if="detailInfo.state == 1"
						>
							{{ detailInfo.stateName }}
						</span>
						<span
							style="position:relative;top: -5px;font-size: 12px; background: #26C6DA; color: #fff;padding: 4px 12px;border:1px solid #26C6DA;margin-left: 20px;border-radius: 20px;"
							v-if="detailInfo.state == 2"
						>
							{{ detailInfo.stateName }}
						</span>
						<span
							style="position:relative;top: -5px;font-size: 12px; background: #C4C4C4; color: #fff;padding: 4px 12px;border:1px solid #C4C4C4;margin-left: 20px;border-radius: 20px;"
							v-if="detailInfo.state == 3"
						>
							{{ detailInfo.stateName }}
						</span>
					</h3>
					<p>
						<!--            <span class="com-d-item">负责部门: <span>{{detailInfo.meetingCreatorDepartmentName}}</span></span>
            <span class="com-d-item">负责人: <span>{{detailInfo.meetingCreatorName}}</span></span>
            <span class="com-d-item">创建日期: <span>{{detailInfo.created && $moment(detailInfo.created).format('YYYY-MM-DD HH:mm:ss')}}</span></span> -->
						<span class="com-d-item">
							创建人:
							<span>{{ detailInfo.meetingCreatorName }}</span>
						</span>
						<span class="com-d-item">
							创建日期:
							<span>{{ detailInfo.created && $moment(detailInfo.created).format('YYYY-MM-DD HH:mm:ss') }}</span>
						</span>
						<span class="com-d-item">
							活动地址:
							<span>{{ detailInfo.address }}</span>
						</span>
					</p>
				</div>
			</div>
			<div class="com-info-right right-top">
				<!--        <ul class="com-info-op-group">
          <li class="op-active" @click="operateOptions('edit')">编辑</li>
          <li class="op-active" @click="operateOptions('end')">结束</li>
          <li class="op-active" @click="operateOptions('delete')">删除</li>
        </ul> -->
				<com-button class="green-color" @click="operateOptions('end')">结束</com-button>
				<com-button class="green-color" @click="operateOptions('edit')">完善</com-button>
				<com-button class="green-color" @click="operateOptions('delete')">删除</com-button>
			</div>
		</div>
		<!--详细-->
		<div class="meeting-detail-all">
			<div class="meeting-detail-all-left">
				<p class="com-titles">基本信息</p>
				<div class="detail-all-right-table">
					<div class="com-dialog">
						<table class="com-dialog-table table-line-color">
							<tr>
								<td class="td-title">活动名称</td>
								<td>{{ detailInfo.meetingName }}</td>
								<td class="td-title">报名时间</td>
								<td>
									{{
										detailInfo.applyTimeStart
											? $moment(detailInfo.applyTimeStart).format('YYYY/MM/DD') + ' - ' + $moment(detailInfo.applyTimeEnd).format('YYYY/MM/DD')
											: ''
									}}
								</td>
								<td class="td-title">活动时间</td>
								<td>
									{{
										detailInfo.meetingTimeStart
											? $moment(detailInfo.meetingTimeStart).format('YYYY/MM/DD HH:mm') +
											  ' - ' +
											  $moment(detailInfo.meetingTimeEnd).format('YYYY/MM/DD HH:mm')
											: ''
									}}
								</td>
							</tr>
							<tr>
								<td class="td-title">主办单位</td>
								<td colspan="5">
									<el-tag type="success" style="margin-right: 5px; margin-bottom: 5px; margin-top: 5px; cursor:pointer;" v-for="item in host">
										<span @click="showErWeiMa(item)">
											<img style="float: left; width: 15px;height: 15px;margin-top:3px;margin-right: 3px;" src="../../../../assets/icon/erweima.png" />
											{{ item.name }}
										</span>
									</el-tag>
								</td>
							</tr>
							<tr>
								<td class="td-title">承办单位</td>
								<td>{{ detailInfo.organizer }}</td>
								<td class="td-title">报名客户意向</td>
								<td colspan="3"><span class="sponsor-unit-left-selects" @click="setMeetingIntention">点击查看报名客户意向</span></td>
							</tr>
							<tr>
								<td class="td-title">获客目标</td>
								<td>{{ detailInfo.winCustomerNum }}</td>
								<td class="td-title">费用预算</td>
								<td>{{ detailInfo.meetingMoney }}</td>
								<td class="td-title">申请人</td>
								<td>{{ detailInfo.meetingProposer }}</td>
							</tr>
							<tr>
								<td class="td-title">申请时间</td>
								<td>{{ detailInfo.created && $moment(detailInfo.created).format('YYYY-MM-DD') }}</td>
								<td class="td-title">活动方案</td>
								<td>
									<a :href="detailInfo.meetingActivityPlan" class="acolor">{{ detailInfo.meetingActivityPlanName }}</a>
								</td>
								<td class="td-title">活动课件</td>
								<td>
									<a :href="detailInfo.meetingCourseware" class="acolor">{{ detailInfo.meetingCoursewareName }}</a>
								</td>
							</tr>
							<tr>
								<td class="td-title">活动地址</td>
								<td colspan="5">{{ detailInfo.address }}</td>
							</tr>
							<tr>
								<td class="td-title">活动备注</td>
								<td colspan="5">{{ detailInfo.meetingDesc }}</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div class="meeting-detail-all-right">
				<p class="all-right-title">
					<span>
						<span :class="!vuewL ? 'all-right-title-meeting cur-meeting' : 'all-right-title-meeting'" @click="selectVuewL(false)">会议人员</span>
						<span :class="vuewL ? 'all-right-title-load cur-meeting' : 'all-right-title-load'" @click="selectVuewL(true)">操作记录</span>
					</span>
				</p>
				<div class="all-right-meeting">
					<div class="right-meeting-meeting">
						<!-- 会议人员 -->
						<ul class="right-meeting-meeting-ul" v-if="!vuewL" :style="'max-height: ' + (lookMore ? '260px; overflow-y: auto;' : '205px;')">
							<li v-for="item in allPersonnel">
								<span class="fl right-meeting-meeting-ul-li-person">{{ item.type }}</span>
								<span class="fl right-meeting-meeting-ul-li-name">{{ item.name }}</span>
								<span class="fl right-meeting-meeting-ul-li-mobile">{{ item.phone }}</span>
								<el-tooltip class="item" effect="dark" :content="item.qq ? item.qq : '暂无QQ信息'" placement="top-end">
									<span class="fr right-meeting-meeting-ul-li-qq" @mouseenter="mouseenterImg(1, item)" @mouseleave="mouseleaveImg(1, item)">
										<img src="../../../../assets/icon/qq_gray.png" alt="" v-if="!item.qqCur" />
										<img src="../../../../assets/icon/qq_green.png" alt="" v-else />
									</span>
								</el-tooltip>
								<el-tooltip class="item" effect="dark" :content="item.wx ? item.wx : '暂无微信信息'" placement="top-end">
									<span class="fr right-meeting-meeting-ul-li-weixin" @mouseenter="mouseenterImg(0, item)" @mouseleave="mouseleaveImg(0, item)">
										<img src="../../../../assets/icon/weixin_gray.png" alt="" v-if="!item.wxCur" />
										<img src="../../../../assets/icon/weixin_green.png" alt="" v-else />
									</span>
								</el-tooltip>
							</li>
						</ul>
						<!-- 操作记录 -->
						<ul class="right-meeting-meeting-uls" v-if="vuewL" :style="'max-height: ' + (lookMore ? '260px; overflow-y: auto;' : '205px;')">
							<li v-for="item in operateLogList">
								<p>
									<span>{{ item.userName }}</span>
									<span class="fr">{{ item.operateTime ? $moment(item.operateTime).format('YYYY-MM-DD HH:mm:ss') : '' }}</span>
								</p>
								<p class="meeting-uls-load">{{ item.detail }}</p>
							</li>
						</ul>
						<p class="right-meeting-meeting-lookmore">
							<span style="cursor: pointer;" @click="lookMoreUpdate">{{ lookMore ? '收起更多' : '查看更多' }}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="com-titles" style="position: relative;">
			<span>{{ vuewS ? '客户需求' : '报名用户' }}</span>
			<span>-</span>
			<span>{{ salesOpportunitiesTotal }}</span>
			<span class="fr click-btn" style="margin-right: 20px;" @click="advaSearch">高级搜索</span>
			<span class="fr click-btn" @click="addChanceHandle()">新增客户需求</span>
			<span class="fr click-btn" v-if="!vuewS" @click="excelExports">导出签到表</span>
			<span class="fr click-btn" v-if="!vuewS" @click="goSignIn">签到</span>
			<p class="meeting-detail-all-classify">
				<span>
					<span :class="!vuewS ? 'all-classify-l cur-all-classify' : 'all-classify-l'" @click="selectVuews(false)">报名用户视图</span>
					<span :class="vuewS ? 'all-classify-r cur-all-classify' : 'all-classify-r'" @click="selectVuews(true)">需求客户视图</span>
				</span>
			</p>
		</div>
		<!-- 表格***报名用户 -->
		<div class="com-box com-box-padding com-list-box" v-loading="dataLoadings" v-if="!vuewS">
			<el-table
				ref="multipleTable"
				border
				stripe
				key="vuew"
				:data="tableData"
				tooltip-effect="dark"
				style="width: 100%"
				@sort-change="sortChangeHandle"
				@selection-change="handleSelectionChange"
			>
				<el-table-column fixed type="selection" align="center" width="40"></el-table-column>
				<el-table-column fixed show-overflow-tooltip align="center" sortable="custom" prop="" label="报名用户" width="200">
					<template slot-scope="scope">
						<span>{{ scope.row.name }}</span>
						<!-- <a class="col-link" @click="handleRouter('detail', scope.row.id)">{{ scope.row.name}}</a> -->
						<!-- <a class="col-link">{{ scope.row.name}}</a> -->
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="channelName" label="报名来源" width="200"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="contactPhone" label="联系方式" width="200"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="contacter" label="联系人" width="120"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" label="用户地区" width="250">
					<template slot-scope="scope">
						<span>{{ scope.row.provinceName + '-' + scope.row.cityName + '-' + scope.row.areaName }}</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="" label="用户意向类别" width="200">
					<template slot-scope="scope">
						<span>{{ scope.row.parentApplyIntentionModel.name }}</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" label="报名时间" width="200">
					<template slot-scope="scope">
						<span>{{ scope.row.created ? $moment(scope.row.created).format('YYYY/MM/DD HH:mm') : '' }}</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="verification" label="报名验证码" width="200"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="" label="是否签到" width="100">
					<template slot-scope="scope">
						<span v-if="scope.row.sign == 1">是</span>
						<span v-if="scope.row.sign == 0">否</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="" label="是否审核" width="100">
					<template slot-scope="scope">
						<span v-if="scope.row.applyCheck == 1">是</span>
						<span v-if="scope.row.applyCheck == 0">否</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="操作" width="80">
					<template slot-scope="scope">
						<span class="to-examine" @click="editChanceHandle(scope.row)">审核</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 表格***需求视图 -->
		<div class="com-box com-box-padding com-list-box" v-loading="dataLoadings" v-if="vuewS">
			<el-table ref="multipleTable" border stripe key="vuewS" :data="tableDatas" tooltip-effect="dark" style="width: 100%" @sort-change="sortChangeHandle">
				<el-table-column type="selection" align="center" width="40"></el-table-column>
				<el-table-column fixed show-overflow-tooltip align="center" sortable="custom" prop="intentProductName" label="意向商品" width="200">
					<template slot-scope="scope">
						<a class="col-link" @click="handleRouter('detail', scope.row.id)">{{ scope.row.intentProductName || '暂无' }}</a>
					</template>
				</el-table-column>
				<el-table-column fixed show-overflow-tooltip align="center" sortable="custom" prop="customerName" label="客户名称" width="200">
					<template slot-scope="scope">
						<a class="col-link" @click="handleRouter2('detail', scope.row.customerId)">{{ scope.row.customerName }}</a>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="contacter" label="客户联系人" width="200"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="stage" label="销售阶段" width="100">
					<template slot-scope="scope">
						<span v-for="item in salesState" :key="item.type" v-if="item.type === scope.row.stage">{{ item.value }}</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="latestFollowRecord" label="最近跟进记录" width="220"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="followDate" label="最近跟进时间" width="220">
					<template slot-scope="scope">
						{{ scope.row.followDate && $moment(scope.row.followDate).format('YYYY-MM-DD HH:mm') }}
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="chanceSourceName" label="需求来源" width="100"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="creatorName" label="需求创建人" width="150"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="salerName" label="需求销售员" width="150"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="counselorName" label="需求咨询师" width="150"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="created" label="创建日期" width="200">
					<template slot-scope="scope">
						{{ scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD HH:mm') }}
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="provinceName" label="地区" width="200">
					<template slot-scope="scope">
						{{ scope.row.provinceName }} {{ scope.row.cityName }} {{ scope.row.areaName }}
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="industry" label="行业" width="100"></el-table-column>
				<!-- 				<el-table-column
					show-overflow-tooltip
					align="center"
					label="需求续费类型"
					prop=""
					width="150">
				</el-table-column> -->
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="billDate" label="预计签单时间" width="200">
					<template slot-scope="scope">
						{{ scope.row.billDate && $moment(scope.row.billDate).format('YYYY-MM-DD') }}
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip align="center" sortable="custom" prop="intentBillAmount" label="预计签单金额" width="200"></el-table-column>
			</el-table>
		</div>
		<!--分页-->
		<div class="com-pages-box">
			<el-pagination
				background
				:total="salesOpportunitiesTotal"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:layout="pagesOptions.layout"
				:page-sizes="pagesOptions.pageSizes"
				:page-size="pagesOptions.pageSize"
			></el-pagination>
		</div>

		<!--二维码大图-->
		<el-dialog title="活动二维码" :visible.sync="dialogVisible" width="30%;" class="code">
			<div style="text-align: center;">
				<p class="title">{{ detailInfo.meetingName }}</p>
				<div ref="downloadCode" style="min-height: 200px;margin: 20px;padding: 20px;display: inline-block">
					<vue-qr :logoSrc="config1.logo" :text="config1.value" :size="200" :margin="0" :callback="agentRecCallback" qid="activity-2"></vue-qr>
				</div>
				<p class="name">活动的专属二维码录入销售机会</p>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" v-if="codeImgBase64" @click="downloadCodeHandle">下载二维码</el-button>
			</span>
		</el-dialog>
		<!--二维码-管家-->
		<el-dialog title="活动二维码" :visible.sync="dialogVisible2" width="800px">
			<div style="color: #4F5F6F;">
				<div style="display: flex;margin:20px 0;padding: 20px;border: 1px solid #ddd;">
					<div ref="downloadCodeManager" style="min-height: 200px;margin-right: 20px;display: inline-block;">
						<vue-qr :logoSrc="config.logo" :text="config.value" :size="200" :margin="10" :callback="agentRecCallback" qid="manager-2"></vue-qr>
					</div>
					<div>
						<div style="margin-bottom: 20px;">
							<span style="font-size: 18px;font-weight: bold;margin-right: 10px;">{{ managerCodeDetail.mangerName }}</span>
							<span v-if="managerCodeDetail.managerId">商务管家</span>
							<span v-if="managerCodeDetail.managerId === managerCodeDetail.meetingCreatorId">、活动负责人</span>
						</div>
						<div>
							<p style="margin-bottom:10px;">使用方法</p>
							<p>
								使用方法使用方法使用方法使用方法使用方法使用方法使用方法使用方法使用方法使方法使用方法使用方法使用方法使用方法使用方法使用方法使用方法
								使用方法使用方法使用方法使用方法使用方法 使用方法使用方法使用方法使用方法使用方法 使用方法使用方法使用方法使用方法使用方法
							</p>
						</div>
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible2 = false">取 消</el-button>
				<el-button @click="deleteHousekeeperHandle">移除管家</el-button>
				<el-button type="primary" v-if="codeImgBase64" @click="downloadCodeHandle2">下载二维码</el-button>
			</span>
		</el-dialog>
		<el-dialog title="报名客户意向信息" :visible.sync="dialogVisibles" append-to-body width="500px">
			<div><el-tree :data="intentionInformationList" node-key="id" default-expand-all highlight-current :props="defaultProps"></el-tree></div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisibles = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisibles = false">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog :title="meetConfig.type ? '报名二维码' : '需求二维码'" :visible.sync="dialogVisiblesErWeiMa" width="250px">
			<div ref="meetingErWeiMa">
				<vue-qr :text="meetConfig.value" :size="200" :margin="0" :callback="agentRecCallback" qid="activity-1"></vue-qr>
				<p class="t-center">{{ meetConfig.name }}</p>
				<p><el-button class="erweiBtn" type="primary" v-if="codeImgBase64" @click="downloadCodeHandle3">下载二维码</el-button></p>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import comButton from '../../../../components/button/comButton';
import API from '../../../../utils/api';
import { mapState } from 'vuex';
import webStorage from 'webStorage';
import { underscoreName } from '../../../../utils/utils';
import VueQr from 'vue-qr';
import html2canvas from 'html2canvas';
import editDialog from './editDialog';
import addHousekeeper from './addHousekeeper';
import { activityCodePre, activityCodePres, serverUrl } from '../../../../utils/const';
import Qs from 'qs';
import addChance from './addChance';
import advancedSearch from './advancedSearch';
import chanelAdvancedSearch from './chanelAdvancedSearch';

export default {
	name: 'detailInfo',
	data() {
		return {
			defaultHeadUrl: 'this.src="' + require('../../../../assets/icon/headDefault.png') + '"',
			dialogVisible: false,
			dialogVisibles: false,
			dialogVisiblesErWeiMa: false, //二维码展示
			intentionInformationList: [],
			defaultProps: {
				children: 'children',
				label: 'name'
			},
			multipleSelection: [],
			dialogVisible2: false,
			activeName: 'first',
			posheight: 300,
			vuewS: false, //false:报名用户视图， true: 需求视图
			vuewL: false, //false: 会议人员，true: 操作记录
			lookMore: false, //查看更多
			allPersonnel: [], //所有会议人员
			tableData: [],
			tableDatas: [],
			tableDataTotal: 1,
			dataLoading: false,
			dataLoadings: false,
			activeViewName: '',
			detailInfo: {},
			operateLogList: [],
			salesOpportunitiesList: [],
			salesOpportunitiesTotal: 0,
			host: [], //所有主办单位
			currentPage: 1,
			sortObj: { sort: 'created,desc' }, // 排序
			defaultListParams: {
				// 默认顾客列表请求参数
				page: null,
				pageSize: null,
				meetingId: null,
				meetingSaleCreator: null,
				meetingManagerId: null
			},
			managerList: [],
			config1: {
				value: '', // 显示的值、跳转的地址(要加http)
				logo: 'static/favicon.ico' // 中间logo的地址
			},
			config: {
				value: '', // 显示的值、跳转的地址(要加http)
				logo: 'static/favicon.ico' // 中间logo的地址
			},
			meetConfig: {
				//显示报名二维码的参数
				value: '',
				name: '',
				type: 1
			},
			codeImgBase64: '',
			managerCodeDetail: {}, // 管家详细
			advancedSearch: {} //高级搜索数据
		};
	},
	computed: {
		...mapState('constData', ['pagesOptions', 'salesState', 'demandSource', 'salesOpportunitiesOptions', 'themeIndex', 'topSource'])
	},
	watch: {
		'$route.query.view'(view) {
			this.activeViewName = view;
		}
	},
	components: {
		comButton,
		VueQr
	},
	methods: {
		// 选择会议专员和操作记录切换
		selectVuewL(status) {
			this.lookMore = false;
			this.vuewL = status;
		},
		// 查看更多
		lookMoreUpdate() {
			this.lookMore = !this.lookMore;
		},
		setMeetingIntention() {
			this.dialogVisibles = true;
			this.intentionInformationList = this.detailInfo.meetingIntentions;
		},
		// 鼠标移入微信和qq
		mouseenterImg(idx, item) {
			if (!idx) {
				item.wxCur = true;
			} else {
				item.qqCur = true;
			}
		},
		mouseleaveImg(idx, item) {
			if (!idx) {
				item.wxCur = false;
			} else {
				item.qqCur = false;
			}
		},
		// 选择视图
		selectVuews(status) {
			this.advancedSearch = {};
			this.getQueryParams();
			this.defaultListParams.page = 0;
			this.currentPage = 1;
			this.vuewS = status;
			if (!status) {
				this.tableDatas = [];
				this.getApplyUser();
			} else {
				this.tableData = [];
				this.getDemandList();
			}
		},
		handleTabsClick(tab, event) {
			// console.log(tab.name)
			this.$router.push({
				name: 'meetingActivityDetail',
				params: { end: this.themeIndex === 0 ? 'FE' : 'ME' },
				query: { view: tab.name, id: this.$route.query.id }
			});
		},
		handleRouter(name, id) {
			this.$router.push({
				name: 'meetingActivityDetail',
				query: { view: name, id: id },
				params: { end: this.themeIndex === 0 ? 'FE' : 'ME' }
			});
		},
		getDetail() {
			this.dataLoading = true;
			API.activity.detail(
				this.$route.query.id,
				data => {
					setTimeout(() => {
						this.detailInfo = data.data;
						this.dataLoading = false;
						this.getSalesOpportunititeisList();
						this.getMannerList(this.detailInfo.id);
						this.getLog(this.detailInfo.id);
						this.config1.value =
							activityCodePre +
							Qs.stringify({
								// 拼装活动二维码参数
								meetingId: this.detailInfo.id,
								organizationId: this.detailInfo.meetingCreatorOgrId
							});

						// 赋值主办单位
						if (this.detailInfo.hostUnitAgent.length > 0) {
							this.detailInfo.hostUnitAgent.forEach(a => {
								this.host.push({ name: a.mobilePhone, id: a.id, agent: 0 });
							});
						}

						if (this.detailInfo.hostUnitCooperationChannel.length > 0) {
							this.detailInfo.hostUnitCooperationChannel.forEach(b => {
								this.host.push({ name: b.channelName, id: b.id, agent: 1 });
							});
						}

						// 会议人员集合 allPersonnel
						if (this.detailInfo.meetingCreatorName) {
							this.allPersonnel.push({
								type: '创建人',
								name: this.detailInfo.meetingCreatorName,
								phone: this.setPhone(this.detailInfo.meetingCreatorPhone),
								qqCur: false,
								wxCur: false,
								wx: this.detailInfo.meetingCreatorWx,
								qq: this.detailInfo.meetingCreatorQq
							});
						}
						if (this.detailInfo.meetingHeadModel) {
							this.allPersonnel.push({
								type: '负责人',
								name: this.detailInfo.meetingHeadModel.name,
								qqCur: false,
								wxCur: false,
								phone: this.setPhone(this.detailInfo.meetingHeadModel.mobilePhone),
								wx: this.detailInfo.meetingHeadModel.wx,
								qq: this.detailInfo.meetingHeadModel.qq
							});
						}
						if (this.detailInfo.meetingLecturerModel) {
							this.allPersonnel.push({
								type: '讲师',
								name: this.detailInfo.meetingLecturerModel.lectureName,
								qqCur: false,
								wxCur: false,
								phone: this.setPhone(this.detailInfo.meetingLecturerModel.lecturePhone),
								wx: this.detailInfo.meetingLecturerModel.wx,
								qq: this.detailInfo.meetingLecturerModel.qq
							});
						}
						if (this.detailInfo.meetingCommissioners.length > 0) {
							this.detailInfo.meetingCommissioners.forEach(a => {
								this.allPersonnel.push({ type: '会务专员', name: a.name, phone: this.setPhone(a.mobilePhone), qqCur: false, wxCur: false, wx: a.wx, qq: a.qq });
							});
						}

						this.getApplyUser();
					}, 500);
				},
				data => {
					setTimeout(() => {
						// this.detailInfo = data.data
						// this.dataLoading = false
						// this.getSalesOpportunititeisList()
						// this.getMannerList(this.detailInfo.id)
						// this.getLog(this.detailInfo.id)
					}, 500);
				}
			);
		},
		// 拼接电话号码
		setPhone(phone) {
			let _phone = '';
			if (phone) {
				_phone = phone[0] + phone[1] + phone[2] + '****' + phone[7] + phone[8] + phone[9] + phone[10];
			}
			return _phone;
		},
		getLog(id) {
			API.activity.log(
				{ id: id },
				data => {
					this.operateLogList = data.data;
				},
				data => {
					this.operateLogList = data.data;
				}
			);
		},
		getMannerList(id) {
			API.activity.managerList(id, data => {
				this.managerList = data.data;
			});
		},
		getQueryParams() {
			// 请求参数配置
			this.defaultListParams = {
				page: this.currentPage - 1,
				pageSize: this.pagesOptions.pageSize,
				meetingId: this.detailInfo.id,
				meetingSaleCreator: this.detailInfo.meetingCreatorId,
				meetingManagerId: null
			};
		},
		getSalesOpportunititeisList() {
			// 获取列表
			this.dataLoading = true;
			this.getQueryParams();
			API.activity.chance(Object.assign({}, this.defaultListParams, this.sortObj), data => {
				this.salesOpportunitiesList = data.data.content;
				// this.salesOpportunitiesTotal = data.data.totalElements
				setTimeout(() => {
					this.dataLoading = false;
				}, 500);
			});
		},
		sortChangeHandle(sortObj) {
			// console.log(sortObj)
			let order = null;
			if (sortObj.order === 'ascending') {
				order = 'asc';
			} else if (sortObj.order === 'descending') {
				order = 'desc';
			}
			this.sortObj = { sort: underscoreName(sortObj.prop) + ',' + order };
			if (this.vuewS) {
				this.getDemandList();
			} else {
				this.getApplyUser();
			}
		},
		// 获取报名列表
		getApplyUser() {
			this.dataLoadings = true;
			this.getQueryParams();
			API.activity.applyUserZX(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch), data => {
				this.dataLoadings = false;
				if (data.status) {
					this.tableData = data.data.content;
					this.salesOpportunitiesTotal = data.data.totalElements;
				}
			});
		},
		// 获取需求列表
		getDemandList() {
			this.dataLoadings = true;
			this.getQueryParams();
			API.salesOpportunities.list(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch), data => {
				this.dataLoadings = false;
				if (data.status) {
					this.tableDatas = data.data.content;
					this.salesOpportunitiesTotal = data.data.totalElements;
				}
			});
		},
		showErWeiMa(item) {
			console.log(item);
			this.meetConfig.name = item.name;
			this.meetConfig.type = item.agent;
			if (!item.agent) {
				this.meetConfig.value =
					activityCodePre +
					Qs.stringify({
						// 拼装活动二维码参数
						meetingId: this.detailInfo.id,
						channelId: item.id
					});
			} else {
				console.log(activityCodePres);
				this.meetConfig.value =
					activityCodePres +
					Qs.stringify({
						// 拼装活动二维码参数
						meetingId: this.detailInfo.id,
						channelId: item.id
					});
			}
			this.dialogVisiblesErWeiMa = true;
		},
		editHandle() {
			this.$vDialog.modal(editDialog, {
				title: '完善会议活动',
				width: 930,
				height: 500,
				params: {
					detail: JSON.parse(JSON.stringify(this.detailInfo))
				},
				callback: data => {
					if (data.type === 'save') {
						this.host = [];
						this.allPersonnel = [];
						this.operateLogList = [];
						this.getDetail();
					}
				}
			});
		},
		endHandle() {
			this.$confirm('确定结束会议活动, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.dataLoading = true;
					API.activity.end({ ids: this.detailInfo.id }, data => {
						if (data.status) {
							if (data.data.fail > 0) {
								this.$message.warning(`成功${data.data.success}, 失败${data.data.fail}, 失败原因：${data.data.errorMessage}`);
							} else {
								this.$message.success(`成功${data.data.success},失败${data.data.fail}`);
							}
							setTimeout(() => {
								this.dataLoading = false;
								this.getDetail();
							}, 500);
						} else {
							setTimeout(() => {
								this.dataLoading = false;
							}, 500);
						}
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
		},
		deleteHandle() {
			this.$confirm('确定删除会议活动, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.dataLoading = true;
					API.activity.deleteActivity({ ids: this.detailInfo.id }, data => {
						if (data.status) {
							if (data.data.fail > 0) {
								this.$message.warning(`成功${data.data.success}, 失败${data.data.fail}, 失败原因：${data.data.errorMessage}`);
							} else {
								this.$message.success(`成功${data.data.success},失败${data.data.fail}`);
							}
							setTimeout(() => {
								this.dataLoading = false;
								this.getDetail();
								this.$router.push({ name: 'meetingActivity' });
							}, 500);
						} else {
							setTimeout(() => {
								this.dataLoading = false;
							}, 500);
						}
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
		},
		addHousekeeperHandle() {
			this.$vDialog.modal(addHousekeeper, {
				title: '商务管家管理',
				width: 500,
				height: 300,
				params: {
					id: this.detailInfo.id
				},
				callback: data => {
					if (data.type === 'save') {
						this.getMannerList(this.detailInfo.id);
					}
				}
			});
		},
		operateOptions(type) {
			switch (type) {
				case 'edit':
					this.editHandle();
					break;
				case 'end':
					this.endHandle();
					break;
				case 'delete':
					this.deleteHandle();
					break;
				case 'addHousekeeper':
					this.addHousekeeperHandle();
					break;
			}
		},
		addChanceHandle() {
			this.$vDialog.modal(addChance, {
				title: '新增客户需求',
				width: 900,
				height: 500,
				params: {
					salesState: this.salesState,
					topSource: this.topSource, // 顶级客户来源
					meetingId: this.detailInfo.id,
					meetingCreatorId: this.detailInfo.meetingCreatorId,
					meetingCreatorName: this.detailInfo.meetingCreatorName
				},
				callback: data => {
					if (data.type === 'save') {
						this.vuewS = 1;
						this.getDemandList();
					}
				}
			});
		},
		editChanceHandle(item) {
			if (item.applyCheck) {
				this.$message('该报名用户需求已完善');
				return;
			}
			this.$vDialog.modal(addChance, {
				title: '报名用户完善',
				width: 900,
				height: 500,
				params: {
					salesState: this.salesState,
					topSource: this.topSource, // 顶级客户来源
					meetingId: this.detailInfo.id,
					meetingCreatorId: this.detailInfo.meetingCreatorId,
					meetingCreatorName: this.detailInfo.meetingCreatorName,
					detail: item
				},
				callback: data => {
					if (data.type === 'save') {
						this.vuewS = 1;
						this.getDemandList();
					}
				}
			});
		},
		// 高级搜索
		advaSearch() {
			this.defaultListParams.page = 0;
			let _status = this.vuewS;
			if (!_status) {
				this.$vDialog.modal(advancedSearch, {
					title: '报名用户高级搜索',
					width: 900,
					height: 500,
					params: {
						salesState: this.salesState,
						demandSource: this.demandSource,
						preAdvancedSearch: this.advancedSearch
					},
					callback: data => {
						if (data.type === 'search') {
							// console.log('高级搜索数据：', data.params)
							this.advancedSearch = data.params;
							this.getApplyUser();
						}
					}
				});
			} else {
				this.$vDialog.modal(chanelAdvancedSearch, {
					title: '需求客户高级搜索',
					width: 900,
					height: 500,
					params: {
						salesState: this.salesState,
						demandSource: this.demandSource,
						preAdvancedSearch: this.advancedSearch
					},
					callback: data => {
						if (data.type === 'search') {
							console.log('高级搜索数据：', data.params);
							data.params.applyIntention = data.params.applyIntention.toString();
							this.advancedSearch = data.params;
							this.getDemandList();
						}
					}
				});
			}
		},
		currentUserIsTeamNum() {
			// 判断当前用户是否为团对成员
			let currentUserId = webStorage.getItem('userInfo').id;
			let team = this.detailInfo.team; // creator 创建人id; salerList[] salerId 销售员id
			if (currentUserId === team.creator) {
				return true;
			} else {
				let isSaler = team.salerList.some(item => {
					return item.salerId === currentUserId;
				});
				if (isSaler) {
					return true;
				} else {
					return false;
				}
			}
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			if (this.vuewS) {
				this.getDemandList();
			} else {
				this.getApplyUser();
			}
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this.dataLoadings = true;
			if (this.vuewS) {
				this.getDemandList();
			} else {
				this.getApplyUser();
			}
		},
		handleRoute(list) {
			switch (
				list
				// case 'contact':
				//   this.$router.push({name: 'contactsList', query: {customerId: this.detailInfo.customerId}})
				//   break
			) {
			}
		},
		handleRouter(name, id) {
			this.$router.push({
				name: 'salesOpportunitiesDetail',
				query: { view: name, id: id },
				params: { end: this.themeIndex === 0 ? 'FE' : 'ME' }
			});
		},
		handleRouter2(name, id) {
			this.$router.push({
				name: 'customersDetail',
				query: { view: name, customerId: id },
				params: { end: this.themeIndex === 0 ? 'FE' : 'ME' }
			});
		},
		agentRecCallback(codeImgBase64) {
			this.codeImgBase64 = codeImgBase64;
		},
		downloadCodeHandle() {
			html2canvas(this.$refs.downloadCode).then(canvas => {
				// document.body.appendChild(canvas)
				var a = document.createElement('a');
				a.href = canvas.toDataURL('image/png'); // 将画布内的信息导出为png图片数据
				a.download = this.detailInfo.meetingName + '二维码'; // 设定下载名称
				a.click(); // 点击触发下载
			});
		},
		downloadCodeHandle2() {
			html2canvas(this.$refs.downloadCodeManager).then(canvas => {
				// document.body.appendChild(canvas)
				var a = document.createElement('a');
				a.href = canvas.toDataURL('image/png'); // 将画布内的信息导出为png图片数据
				a.download = this.detailInfo.meetingName + ',' + this.managerCodeDetail.mangerName + '二维码'; // 设定下载名称
				a.click(); // 点击触发下载
			});
		},
		downloadCodeHandle3() {
			html2canvas(this.$refs.meetingErWeiMa).then(canvas => {
				// document.body.appendChild(canvas)
				var a = document.createElement('a');
				a.href = canvas.toDataURL('image/png'); // 将画布内的信息导出为png图片数据
				a.download = this.detailInfo.meetingName + '-' + this.meetConfig.name + '二维码'; // 设定下载名称
				a.click(); // 点击触发下载
			});
		},
		deleteHousekeeperHandle() {
			this.$confirm('确定移除商务管家, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
					API.activity.deleteHousekeeper(
						{
							id: this.detailInfo.id,
							ids: this.managerCodeDetail.managerId
						},
						da => {
							if (da.status) {
								this.$message.success('移除成功!');
								this.getMannerList(this.detailInfo.id);
								this.dialogVisible2 = false;
							}
						}
					);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
		},
		showManagerCode(item) {
			this.dialogVisible2 = true;
			this.managerCodeDetail = item;
			this.config.value =
				activityCodePre +
				Qs.stringify({
					// 拼装活动管家二维码参数
					meetingId: this.detailInfo.id,
					organizationId: this.detailInfo.meetingCreatorOgrId,
					meetingManagerId: item.managerId
				});
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		// 签到 applySignInZX  ids
		goSignIn() {
			let _list = this.multipleSelection,
				ids = [],
				names = [];
			if (_list.length < 1) {
				this.$message({
					type: 'error',
					message: '请选择报名用户',
					duration: 1000
				});
				return;
			}
			_list.forEach(a => {
				if (a.sign != 1) {
					//只添加未报名的用户
					ids.push(a.id);
					names.push(a.name);
				}
			});
			if (_list.length > 0 && names.length < 1) {
				this.$message({
					type: 'error',
					message: '请选择未报名用户',
					duration: 1000
				});
				return;
			}
			let params = {
				ids: ids.map(a => a).join()
			};

			this.$confirm(`确定对 [${names}] 等报名用户进行签到?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
					API.activity.applySignInZX(params, data => {
						if (data.status) {
							this.$message({
								type: 'success',
								message: '签到成功',
								duration: 1000
							});
							this.getApplyUser();
						}
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消签到'
					});
				});
		},
		// 导出报名用户列表
		excelExports() {
			let as = {};
			for (let key in this.advancedSearch) {
				// 去除null
				if (this.advancedSearch[key]) {
					as[key] = this.advancedSearch[key];
				}
			}
			let dlp = {};
			for (let key in this.defaultListParams) {
				// 去除分页
				if (key !== 'page' && key !== 'pageSize') {
					dlp[key] = this.defaultListParams[key];
				}
			}
			let link = document.createElement('a'); // 创建事件对象
			// let query = QS.stringify({authKey: webStorage.getItem('userInfo').authKey}))
			let query = JSON.stringify(webStorage.getItem('userInfo').authKey);
			// console.log('下载参数：', query)
			link.setAttribute('href', serverUrl + '/applyUser/export?authKey=' + query);
			link.setAttribute('download', '报名用户统计');
			let event = document.createEvent('MouseEvents'); // 初始化事件对象
			event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null); // 触发事件
			link.dispatchEvent(event);
		}
	},
	created() {
		this.activeViewName = this.$route.query.view;
		this.getDetail();
	}
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '../../../../styles/commons';
</style>
<style scoped lang="scss" rel="stylesheet/scss">
.meeting-detail-all {
	width: 100%;
	min-width: 1380px;
	background: #fff;
	border-bottom: 10px solid #f0f3f6;
	border-right: 5px solid #f0f3f6;
	// max-height: 320px;
	overflow: hidden;
}
.meeting-detail-all-left {
	float: left;
	box-sizing: border-box;
	border-right: 10px solid #f0f3f6;
	min-width: 880px;
	width: calc(100% - 490px);

	.detail-all-right-table {
		padding: 10px;
	}
}
.meeting-detail-all-right {
	float: right;
	padding-top: 12px;
	width: 490px;
}
.table-line-color {
	td,
	th {
		border: 1px solid #dfdfdf !important;
	}
}
.all-right-title {
	height: 38px;
	line-height: 38px;
	border-bottom: 1px solid #dce3ea;
	font-size: 16px;
	text-align: center;
	color: #333e48;
}
.all-right-title > span {
	display: inline-block;
	overflow: hidden;
}
.all-right-title-meeting,
.all-right-title-load {
	display: inline-block;
	float: left;
	height: 36px;
	padding: 0 5px;
	margin-right: 50px;
	cursor: pointer;
}
.cur-meeting {
	border-bottom: 2px solid #4bcf99;
	color: #4bcf99;
}
.all-right-meeting {
	padding: 0 10px;
}
.fl {
	float: left;
}
.fr {
	float: right;
}
.right-meeting-meeting-ul {
	width: 100%;
	max-height: 205px;
	overflow: hidden;
	li {
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		border-bottom: 1px dashed #dfdfdf;
		overflow: hidden;
		.right-meeting-meeting-ul-li-person {
			display: inline-block;
			padding: 0 10px;
			background: #e6e9ec;
			border-radius: 15px;
			height: 20px;
			line-height: 20px;
			margin-top: 10px;
			margin-right: 30px;
		}
		.right-meeting-meeting-ul-li-name {
			margin-right: 30px;
		}
		.right-meeting-meeting-ul-li-weixin {
			margin-top: 5px;
			margin-left: 20px;
			img {
				width: 22px;
				height: 18px;
			}
		}
		.right-meeting-meeting-ul-li-qq {
			margin-top: 5px;
			margin-left: 20px;
			img {
				width: 17px;
				height: 20px;
			}
		}
	}
}
.right-meeting-meeting-uls {
	width: 100%;
	max-height: 205px;
	overflow: hidden;
	li {
		padding: 10px 0;
		border-bottom: 1px dashed #dfdfdf;
		p {
			line-height: 22px;
			font-size: 14px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.meeting-uls-load {
			color: #7b858f;
		}
	}
}

.right-meeting-meeting-lookmore {
	width: 100%;
	height: 55px;
	line-height: 60px;
	text-align: center;
	color: #7b858f;
	font-size: 14px;
	span {
		text-decoration: underline;
	}
}

.click-btn {
	height: 28px;
	padding: 0 10px;
	border: 1px solid #4bcf99;
	color: #4bcf99;
	font-size: 14px;
	border-radius: 4px;
	line-height: 30px;
	margin-right: 10px;
	position: relative;
	z-index: 2;
	cursor: pointer;
}
.meeting-detail-all-classify {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	text-align: center;
	span {
		display: inline-block;
		margin: 4px auto;
		overflow: hidden;
		span {
			cursor: pointer;
			float: left;
			display: inline-block;
			height: 30px;
			padding: 0 20px;
			line-height: 30px;
			font-size: 15px;
			color: #4bcf99;
			border: 1px solid #4bcf99;
		}
		.all-classify-l {
			border-top-left-radius: 2px;
			border-bottom-left-radius: 2px;
		}
		.all-classify-r {
			border-top-right-radius: 2px;
			border-bottom-right-radius: 2px;
		}
		.cur-all-classify {
			background: #4bcf99;
			color: #fff;
		}
	}
}
.to-examine {
	color: #1e88e5;
	text-decoration: underline;
	cursor: pointer;
}

.sponsor-unit-left-selects {
	display: inline-block;
	height: 33px;
	margin-top: 14px;
	color: #2587e0;
	font-size: 14px;
	cursor: pointer;
}
.acolor {
	color: #1e88e5;
	cursor: pointer;
}
.t-center {
	text-align: center;
	line-height: 20px;
}
.erweiBtn {
	margin-top: 20px;
	margin-left: 60px;
}
</style>
