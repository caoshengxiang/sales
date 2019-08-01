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
          <div class="voerflow">
            <h3 class="fl">{{goodsDetail.goodsName}}</h3>
            <div class="fl ml10" style="margin-top: 2px;">
              <el-tag type="info" class="ml5" v-if="goodsDetail.billingType">{{goodsDetail.billingType === 'TIMES' && '计次' || goodsDetail.billingType === 'ANNUALLY' && '计时' || null}}</el-tag>
              <el-tag type="info" class="ml5" v-if="goodsDetail.servicePrincipalType">{{goodsDetail.servicePrincipalType === 'Person' && '个人' || goodsDetail.servicePrincipalType === 'Company' && '企业' || goodsDetail.servicePrincipalType === 'Both' && '个人/企业' || null}}</el-tag>
              <el-tag type="info" class="ml5">{{goodsDetail.pullOff ? '下架' : '上架'}}</el-tag>
              <el-tag type="info" class="ml5" v-if="goodsDetail.pricingMethod">{{goodsDetail.pricingMethod == 1 && '标准商品' || goodsDetail.pricingMethod == 2 && '非标准商品' || null}}</el-tag>
            </div>
          </div>
          <p style="width: 100%;">
            <span class="com-d-item">创建日期: <span>{{goodsDetail.created && $moment(goodsDetail.created).format('YYYY-MM-DD HH:mm:ss')}}</span></span>
            <span class="ml20">购买限制: {{goodsDetail.lowerLimit}}-{{goodsDetail.upperLimit}}</span>
          </p>
        </div>
      </div>
      <div class="com-info-right">
        <div style="overflow: hidden;">
          <ul class="com-info-op-group mb10 fr">
            <li class="op-active fr" @click="operateOptions('edit')">编辑</li>
          </ul>
        </div>
        <p style="width: 100%; overflow: hidden;">
          <span class="fr currentVersion">当前版本: <span class="versionNum" @click="getGoodsEdition">{{goodsDetail.versionNum}}</span></span>
          <span class="fr goodsNum mr20">商品号: {{goodsDetail.goodsId}}</span>
        </p>
      </div>
      <div class="title-bottom">可服务地区: <span class="ml10" v-for="(item, i) in newTemporaryList">{{item}}</span></div>
    </div>
    <!--详细-->
    <div class="com-box detail-info-box">
      <div class="detail-left com-box-padding">
        <p class="table-title">费用信息</p>
        <!-- 服务费 -->
        <div class="serviceCharge mt15 mb15 voerflow">
          <div class="serviceCharge-left fl">服务费</div>
          <div class="serviceCharge-right fl">
            <el-table
              :data="tableData"
              border
              center
              height="230"
              style="width: 100%">
              <el-table-column align="center" label="地区">
                <template slot-scope="scope">
                  <p v-for="(item, idx) in scope.row.allArea">{{item.provinceName}} {{item.cityName ? '-' + item.cityName : ''}} {{item.areaName ? '-' + item.areaName : ''}}</p>
                  <!-- <p>{{scope.row.provinceName}} {{scope.row.cityName ? '-' + scope.row.cityName : ''}} {{scope.row.areaName ? '-' + scope.row.areaName : ''}}</p> -->
                </template>
              </el-table-column>
              <el-table-column v-for="(item, idx) in goodsRegionSpecificationsList" :key="idx" align="center" :label="item.specificationsTypeName">
                <template slot-scope="scope">
                  <span>{{scope.row.goodsRegionSpecificationsList[idx].specificationsName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="价格">
                <template slot-scope="scope">
                  <span>{{scope.row.goodsRegionSpecificationsList.length ? (scope.row.goodsRegionSpecificationsList[scope.row.goodsRegionSpecificationsList.length - 1].price ? scope.row.goodsRegionSpecificationsList[scope.row.goodsRegionSpecificationsList.length - 1].price : scope.row.goodsRegionSpecificationsList[0].price) : scope.row.price}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 成果费用 -->
        <div class="serviceCharge mt15 mb15 voerflow border"  style="height: 90px !important;" v-if="goodsDetail.pricingMethod == 2">
          <!-- <div class="serviceCharge-left fl">其他费用</div> -->
          <!-- <div class="serviceCharge-right fl" style="width: 100%;"> -->
            <div class="serviceCharge-right-top voerflow">
              <div class="serviceCharge-right-top-left fl">成果服务费</div>
              <div class="serviceCharge-right-top-right fl">
                <p class="border-bottom"><span class="end-span-w">{{goodsDetail.proportionalCharge ? '比例收费' : '不支持比例收费'}}</span><span class="end-span-ws"> {{goodsDetail.achievementName}} {{goodsDetail.achievementRemark ? '- ' + goodsDetail.achievementRemark : ''}}</span></p>
                <p><span class="end-span-w">{{goodsDetail.disposableCharge ? '包干价收费' : '不支持包干价收费'}}</span><span class="end-span-ws"> {{goodsDetail.stageCharge ? '支持分阶段付款' : '不支持分阶段付款'}}</span></p>
              </div>
            </div>
          <!-- </div> -->
        </div>
        <!-- 其他费用 -->
        <div class="serviceCharge mt15 mb15 voerflow border" v-if="goodsDetail.goodsOtherCostList.length">
            <div class="serviceCharge-right-bottom voerflow">
              <div class="serviceCharge-right-bottom-left fl">其他费用</div>
              <div class="serviceCharge-right-bottom-right fl">
                <ul>
                  <li v-for="(item, i) in goodsDetail.goodsOtherCostList" :key="i">
                    <p class="file-all">{{item.name}} ￥{{item.price}}（{{conditionsAll[item.conditions]}}）</p>
                    <p class='file-info'>{{item.remark}}</p>
                  </li>
                </ul>
              </div>
            </div>
        </div>
        <p class="table-title">服务管理</p>
        <div class="all-service-manage">
          <div class="service-manage-head">
            <span class="mr35"><span class="bold">服务对象: </span>{{goodsDetail.servicePrincipalType === 'Person' && ' 个人' || goodsDetail.servicePrincipalType === 'Company' && ' 企业' || goodsDetail.servicePrincipalType === 'Both' && ' 个人/企业' || ''}}</span>
            <span class="mr35"><span class="bold">服务方式: </span>{{goodsDetail.billingType === 'TIMES' && ' 计次服务' || goodsDetail.billingType === 'ANNUALLY' && ' 计时服务' || ''}}</span>
            <span class="mr35"><span class="bold">附加智能服务: </span>{{goodsDetail.hasBossReport == 1 && ' 包含老板报表' || ''}}</span>
          </div>
          <div class='three-service-table-box'>
              <ul>
                  <li v-if='goodsWorkList.length < 1' class="service-table-noData">暂无数据</li>
                  <li v-if="goodsWorkList.length > 0" v-for="(item, idx) in goodsWorkList" :style="'height: ' + item.liHeight">
                      <div class="service-table-item-top" :style="'background: ' + (!item.selected ? 'none;' : '#F5FDFE;')">
                          <div class="service-table-item">{{item.serviceTypeName}}</div>
                          <div class="service-table-item"><span class="table-title-title"></span>{{searchManager(item.serviceManagerType)}}</div>
                          <div class="service-table-item"><span class="table-title-title">{{commissionType[item.commissionType]}} — {{item.commissionProportion}}{{item.commissionType == 1 && '%' || item.commissionType == 2 && '元' || ''}}</span></div>
                          <div class="service-table-item"><span class="table-title-title">完成时限: {{item.timeLimit}}天</span></div>
                          <div class="service-table-item"><span class="table-title-title">工单服务方式: {{processType[item.process]}}</span></div>
                          <div class="service-table-item">
                              <div class="table-title-title">
                                  <el-button type="text" @click="lookProcess(item)" style="color: #1E88E5;">查看 <i :class="!item.selected ? 'el-icon-caret-right' : 'el-icon-caret-bottom'"></i></el-button>
                              </div>
                          </div>
                      </div>
                      <div class="service-table-item-bottom">
                          <p class='stepOne-head'>
                              <span class='stepOne-head-title'>工单环节</span>
                          </p>
                          <div class="prosses-info">
                              <div class="prosses-info-left">
                                  <ul>
                                      <li v-for="(items) in item.serviceModuleModelList" :class="items.selected ? 'info-left-cur' : ''" @click="selectProssesInfo(item.serviceModuleModelList, items)">{{items.name}}</li>
                                  </ul>
                              </div>
                              <div class="prosses-info-right">
                                  <p class="prosses-info-right-head">
                                      <span>延期时限: {{selectPoressDetal.timeLimit}}天</span>
                                      <span class="ml20">延期审批角色: {{approvalRole[selectPoressDetal.approvalRole]}}</span>
                                  </p>
                                  <div class="prosses-info-right-table">
                                      <div class="prosses-info-right-table-head">
                                          <span class='table-head-title'>事项名</span>
                                          <span class='table-head-title'>事项操作</span>
                                          <span class='table-head-titles'>事项说明</span>
                                      </div>
                                      <div class="prosses-info-right-table-content" v-for="(inPro, index) in selectPoressDetal.serviceModuleItemModelList" :key="index">
                                          <div class='table-head-title noBorderRight'>{{inPro.name}}</div>
                                          <div class='table-head-title'>
                                            <p v-for="(oper, inop) in inPro.serviceModuleItemOperationList" :key="inop">{{oper.name}}</p>
                                          </div>
                                          <div class='table-head-titles'>{{inPro.remark}}</div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </li>
              </ul>
          </div>
        </div>
      </div>
      <div class="detail-right">
        <div class="detail-right-padding-top">
          <p class="table-title">协议管理</p>
          <div class="protocolManagement">
            <p><span class="bold">服务协议: </span><span class="ml10">{{goodsDetail.goodsAgreementModel ? goodsDetail.goodsAgreementModel.name : ''}}</span></p>
            <p><span class="bold">是否支持服务商收费: </span><span class="ml10">{{goodsDetail.serviceProviderFees ? '是' : '否'}}</span></p>
            <p><span class="bold">签约主体: </span></p>
            <div class="allsubjectOfContract">
              <div class="mb10" v-for="(item, i) in goodsDetail.goodsContractSubjectModelList">{{item.name}}</div>
            </div>
          </div>
        </div>
        <div class="detail-right-padding-bottom">
          <p class="table-title">商品详情页管理</p>
          <div class="all-detail-manage">
            <p><span class="bold">产品概述: </span>{{goodsDetail.outline}}</p>
            <p><span class="bold">服务内容: </span>{{goodsDetail.serviceContents}}</p>
            <p><span class="bold">产品详情: </span></p>
            <div class="mb10" v-html="goodsDetail.description"></div>
            <p><span class="bold">产品备注: </span>{{goodsDetail.remarks}}</p>
            <p><span class="bold">产品缩略图: </span></p>
            <p v-if="goodsDetail.pictureCollection">
              <img v-for="(item, i) in pictureCollection" :ref="'img' + i" :key="i" :src="item" alt="" style="width: calc(33.333333% - 5px); margin-right: 5px; cursor: pointer;" @click="showBigImg(1, i)">
            </p>
            <p><span class="bold">产品推荐: </span></p>
            <p>推荐文案：{{goodsDetail.recommendPositionRemark}}</p>
            <p>推荐展示图：</p>
            <p>
              <img :src="goodsDetail.recommendPositionPath" ref="imgs" alt="" @click="showBigImg('')" style="width: calc(33.333333% - 5px); cursor: pointer;">
            </p>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="商品版本"
      center
      :visible.sync="goodsEditionDialog"
      width="500px">
      <div class="goodsEdition-div">
        <el-scrollbar style="height: 100%">
          <ul>
            <li class="goodsEdition-li voerflow" v-for="(item, i) in versionAll" :key="i">
              <span class="editionNum fl">{{item.versionNum}}</span>
              <div class="fr" style="width: 60px; min-height: 1px;">
                <span>
                  <el-button size="mini" plain v-if="!item.defaultVersion" @click="enabledVersion(item)">启用</el-button>
                  <span v-else class="curVis">当前版本</span>
                </span>
              </div>
              <span class="fr mr20">{{item.created && $moment(item.created).format('YYYY/MM/DD')}}</span>
              <span class="fr mr20">{{item.createdAccountName ? item.createdAccountName : item.createdAccountId}}</span>
            </li>
          </ul>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="goodsEditionDialog = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 显示大图 -->
    <div class="bigImg-model" v-if="imgSrc" @click="imgSrc = ''"></div>
    <div class="bigImg-box" v-if="imgSrc">
      <img :src="imgSrc" alt="">
    </div>
  </div>
</template>

<script>
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import { mapState, mapActions } from 'vuex'
  import addDialog from './add'
  import webStorage from 'webStorage'

  export default {
    name: 'detailInfo',
    data () {
      return {
        dataLoading: false,
        goodsEditionDialog: false,
        goodsDetail: {
          goodsOtherCostList: [],
        },
        tableData: [],
        regionList: [],

        goodsRegionSpecificationsList: [],
        goodsWorkList: [],
        liHeight: '45px',
        selectPoressDetal: {},
        pictureCollection: [],
        conditionsAll: {
          1: '一次收费,与购买数量无关',
          2: '多次收费,,与购买数量一致',
        },
        commissionType: {
            1: '按比例返佣',
            2: '固定返佣',
        },
        processType: {
            1: '专用流程(记账、全托管)',
            2: '代办业务流程',
            3: '计时服务',
            4: '计次服务',
        },
        approvalRole: {
            1: '客户',
            2: '部门主管',
            3: '自动',
        },
        versionGoodsId: '',
        versionAll: [],               //所有版本信息
        newTemporaryList: [],         //可服务地区
        imgSrc: '',                   //大图图片地址
      }
    },
    computed: {
      ...mapState('constData', [
        'salesState',
        'orderState',
        'themeIndex',
        'topSource',
      ]),
      ...mapState('contacts', [
        'contactsDetail',
      ]),
    },
    watch: {
      '$route.query.view' (view) {
        this.activeViewName = view
      },
    },
    components: {
      comButton,
    },
    methods: {
      ...mapActions('contacts', [
        'ac_contactsDetail',
      ]),
      // 获取详情
      getGoodsDetail () {
        this.dataLoading = true;
        let _id = ~~this.$route.query.goodsId;
        API.zhuxinGoodsManage.getGoodsDetail(_id, (data) => {
          this.dataLoading = false;
          if(data.status) {
            this.goodsDetail = data.data;
            // 服务费组合  regionList
            this.tableData = this.goodsDetail.goodsRegionList
            // 城市规格分组
            if(this.goodsDetail.goodsRegionList.length > 0) {
              this.goodsDetail.goodsRegionList.forEach((goods, i) => {
                goods.allArea = [];
                if(this.regionList.length < 1) {
                  this.regionList.push(goods)
                  this.regionList[0].allArea = [{provinceId: this.regionList[0].provinceId, provinceName: this.regionList[0].provinceName, cityId: this.regionList[0].cityId, cityName: this.regionList[0].cityName, areaId: this.regionList[0].areaId, areaName: this.regionList[0].areaName}]
                }else {
                  let _is = 0;
                  this.regionList.forEach(reg => {
                    if(goods.groupId === reg.groupId) {
                      _is = 1
                    }
                  })
                  if(!_is) {
                    goods.allArea = [{provinceId: goods.provinceId, provinceName: goods.provinceName, cityId: goods.cityId, cityName: goods.cityName, areaId: goods.areaId, areaName: goods.areaName}]
                    this.regionList.push(goods)
                  }else {
                    this.regionList.forEach(regs => {
                      if(regs.groupId === goods.groupId) {
                        regs.allArea.push({provinceId: goods.provinceId, provinceName: goods.provinceName, cityId: goods.cityId, cityName: goods.cityName, areaId: goods.areaId, areaName: goods.areaName});
                      }
                    })
                  }
                }
              })

              this.tableData = this.regionList
              // 设置可服务地区
              if(this.tableData.length > 0) {
                let temporaryList = [], newTemporaryList = [];
                this.tableData.forEach(no => {
                  if(no.allArea.length > 0) {
                    for(let i = 0; i<no.allArea.length; i++) {
                      temporaryList.push(no.allArea[i])
                    }
                  }
                  // temporaryList.concat(no.allArea)
                })
                if(temporaryList.length > 0) {
                  temporaryList.forEach(tem => {
                    newTemporaryList.push((tem.provinceName ? tem.provinceName : '') + (tem.cityName ? '-' + tem.cityName : '') + (tem.areaName ? '-' + tem.areaName : ''))
                  })
                }
                if(newTemporaryList.length > 0) {
                  this.newTemporaryList = [...new Set(newTemporaryList)]
                  console.log(222222, this.newTemporaryList)
                }
              }
            }


            this.goodsRegionSpecificationsList = this.goodsDetail.goodsRegionList[0].goodsRegionSpecificationsList
            this.goodsWorkList = this.goodsDetail.goodsWorkList;
            if(this.goodsDetail.pictureCollection) {
              this.pictureCollection = this.goodsDetail.pictureCollection.split(',');
            }
            if(this.goodsWorkList.length) {
              this.goodsWorkList.forEach(wor => {
                this.$set(wor, 'liHeight', '45px')
                this.$set(wor, 'selected', false)
              })
            }
          }
        })
      },
      // 编辑
      operateOptions (option) {
        let that = this
        switch (option) {
          case 'edit':
            that.clearCache();
            webStorage.setItem('GOODSDETAIL', JSON.stringify(that.goodsDetail));
            that.$router.push({name: 'addGoods', query: {detail: 1, step: 1}});
            break;
        }
      },
      // 点击图片查看大图
      showBigImg (whree, i) {
        if(whree) {
          this.imgSrc = this.$refs['img' + i][0].src;
        }else {
          this.imgSrc = this.$refs.imgs.src;
        }
        if(this.imgSrc) {

        }
      },
      // 清除保存的步骤数据
      clearCache () {
          webStorage.removeItem('stepOne');
          webStorage.removeItem('stepTwo');
          webStorage.removeItem('stepThree');
          webStorage.removeItem('stepFour');
      },
      // 获取商品所有版本信息
      getAllVersion () {
        API.zhuxinGoodsManage.getAllVersionList(this.versionGoodsId, (data) => {
          if(data.status) {
            this.versionAll = data.data;
          }
        })
      },
      // 弹出版本设置
      getGoodsEdition () {
        this.versionAll = [];
        this.versionGoodsId = this.goodsDetail.goodsFlag;
        this.getAllVersion();
        this.goodsEditionDialog = true;
      },
      // 启用版本
      enabledVersion (row) {
        let goodsId = row.goodsId.toString();
        let _data = {
          type: 5,
          data: {
            goodsIds: goodsId,
          }
        };
        API.zhuxinGoodsManage.editProductTion(_data, (data) => {
          if(data.status) {
            this.$message.success('设置版本成功');
            this.goodsEditionDialog = false;
            this.$router.push({name: 'listOfGoodsDetail', query: {view: 'detail', goodsId: goodsId}});
            this.tableData = [],
            this.regionList = [],
            this.goodsRegionSpecificationsList = [],
            this.goodsWorkList = [],
            this.getGoodsDetail();
          }
        })
      },
      // 获取管家类型
      getManagerType () {
          API.organization.zxIdentity({type: 6}, (data) => {
              if(data.status) {
                  this.managerAll = data.data;
              }
          })
      },
      searchManager (id) {
          let _name = '';
          if(this.managerAll.length) {
              this.managerAll.forEach(man => {
                  if(id == man.id) {
                      _name = man.codeName;
                  }
              })
          }
          return _name;
      },
      // 点击内部流程
      selectProssesInfo (perItem, item) {
          perItem.forEach(per => {
              per.selected = false;
          })
          item.selected = true;
          this.selectPoressDetal = item;   //内部流程详情赋值
      },
      // 查看流程
      lookProcess (item) {
          if(item.liHeight === '45px') {
              this.goodsWorkList.forEach(work => {
                  work.liHeight = '45px';
                  work.selected = false;
              })
              item.liHeight = 'auto';
              item.selected = true;

              // 默认选中第一个开始服务
              item.serviceModuleModelList.forEach(ser => {
                  ser.selected = false;
              })
              if(item.serviceModuleModelList[0]) {
                  item.serviceModuleModelList[0].selected = true;
                  this.selectPoressDetal = item.serviceModuleModelList[0];
              }else {
                  this.selectPoressDetal = {}
              }
          }else {
              this.goodsWorkList.forEach(work => {
                  work.liHeight = '45px';
                  work.selected = false;
              })
              item.liHeight = '45px';
              item.selected = false;
          }
      },
    },
    created () {
      this.activeViewName = this.$route.query.view
      this.getManagerType();
      this.getGoodsDetail();
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/commons";
  @import "../../../../styles/stepCommon";

  .bigImg-model {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0,.3);
    top: 0;
    left: 0;
    z-index: 10;
  }
  .bigImg-box {
    width: 750px;
    height: 400px;
    position: fixed;
    top: 200px;
    left: 50%;
    margin-left: -375px;
    z-index: 11;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .com-bar {
    border-bottom: 8px solid #F0F3F6 !important;
    padding-top: 15px !important;
    padding-bottom: 10px !important;
  }
  .detail-right {
    padding-left: 0 !important;
    .detail-right-padding-top {
      padding: 15px;
      border-bottom: 8px solid #F0F3F6;
    }
    .detail-right-padding-bottom {
      padding: 15px;
      .all-detail-manage {
        padding: 15px 0;
        p {
          font-size: 13px;
          color: #4F5F6F;
          line-height: 25px;
          margin-bottom: 10px;
        }
      }
    }
  }
  .com-container .com-box .detail-left {
    border-right: 8px solid #F0F3F6 !important;
  }
  .com-container .com-box .detail-right {
    width: 350px !important;
  }
  .com-container .com-box.detail-info-box {
    min-height: 73vh !important;
  }
  .com-container .com-bar .com-info-left .com-info-text p {
    margin-top: 15px;
  }
  .com-container .com-bar .com-info-right .com-info-op-group li.op-active {
    width: 60px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border: 1px solid #4BCF99;
    background: none;
    border-radius: 4px;
    font-size: 14px;
    color: #4BCF99;
    padding: 0;
  }
  .com-container .com-bar .com-info-right .com-info-op-group {
    border: 0;
  }
  .com-container .com-box .table-title {
    border-bottom: 1px solid #DFDFDF;
  }
  .currentVersion {
    color: #4BCF99;
    font-size: 14px;
    .versionNum {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .goodsNum {
    font-size: 14px;
    color: #4F5F6F;
  }
  .title-bottom {
    width: 100%;
    padding: 10px 0;
    border-top: 1px solid #DFDFDF;
    margin: 5px 0;
    line-height: 20px;
    font-size: 14px;
    color: #4F5F6F;
  }
  .serviceCharge {
    width: 100%;
    height: 230px;
    border-left: 1px solid #ebeef5;
    .serviceCharge-left {
      width: 70px;
      height: 100%;
      text-align: center;
      line-height: 222px;
      color: #333E48;
      font-size: 15px;
      border-top: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
      box-sizing: border-box;
    }
    .serviceCharge-right {
      width: calc(100% - 71px);
      height: 100%;
    }
  }
  .border {
    border: 1px solid #ebeef5;
    .serviceCharge-left {
      border-right: 1px solid #ebeef5;
    }
    // .serviceCharge-right {
      .serviceCharge-right-top {
        height: 90px;
        border-bottom: 1px solid #ebeef5;
        .serviceCharge-right-top-left {
          color: #333E48;
          width: 139px;
          height: 100%;
          border-right: 1px solid #ebeef5;
          font-size: 14px;
          text-align: center;
          line-height: 90px;
        }
        .serviceCharge-right-top-right {
          width: calc(100% - 140px);
          height: 100%;
          p {
            width: 100%;
            height: 45px;
            font-size: 13px;
            color: #333E48;
            line-height: 40px;
            box-sizing: border-box;
            span {
              float: left;
              display: inline-block;
              height: 45px;
            }
            .end-span-w {
              width: 120px;
              text-align: center;
              border-right: 1px solid #ebeef5;
            }
            .end-span-ws {
              text-indent: 10px;
              width: calc(100% - 121px);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #4F5F6F;
            }
          }
        }
        .border-bottom {
          border-bottom: 1px solid #ebeef5;
        }
      }
      .serviceCharge-right-bottom {
        height: 230px;
        .serviceCharge-right-bottom-left {
          color: #333E48;
          width: 139px;
          height: 100%;
          border-right: 1px solid #ebeef5;
          font-size: 14px;
          text-align: center;
          line-height: 230px;
        }
        .serviceCharge-right-bottom-right {
          width: calc(100% - 140px);
          height: 100%;
          padding: 15px;
          box-sizing: border-box;
          overflow-y: scroll;
          ul {
            width: 100%;
            li {
              margin-bottom: 15px;
              p {
                font-size: 13px;
                line-height: 25px;
                text-indent: 15px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .file-all {
                color: #333E48;
              }
              .file-info {
                color: #7B858F;
              }
            }
          }
        }
      }
    // }
  }
  .all-service-manage {
    .service-manage-head {
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      background: #FAFAFA;
      font-size: 13px;
      color: #333E48;
      margin: 15px 0;
    }
    .three-service-table-box {
        margin: 10px 0;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid rgba(225, 225, 225, 1);
        border-bottom: 0;
        ul {
            li {
                width: 100%;
                border-bottom: 1px solid rgba(225, 225, 225, 1);
                overflow: hidden;
                .service-table-item-top {
                    overflow: hidden;
                    height: 45px;
                    .service-table-item {
                        display: inline-block;
                        float: left;
                        width: calc(100% / 6);
                        text-indent: 15px;
                        color: #333E48;
                        font-size: 13px;
                        line-height: 45px;
                        .table-title-title {
                            padding-left: 10px;
                            .lookImg {
                                width: 20px;
                                height: 20px;
                            }
                        }
                    }
                }
                .service-table-item-bottom {
                    padding: 15px;
                    .stepOne-head {
                        width: 100%;
                        .stepOne-head-title {
                            font-size: 13px;
                            color: #333E48;
                            font-weight: bold;
                            margin-right: 50px;
                        }
                    }
                    .prosses-info {
                        width: 100%;
                        overflow: hidden;
                        margin-top: 15px;
                        .prosses-info-left {
                            float: left;
                            width: 140px;
                            ul {
                                li {
                                    width: 100%;
                                    height: 40px;
                                    line-height: 40px;
                                    text-align: center;
                                    color: #8D8D8D;
                                    font-size: 13px;
                                    font-weight: Regular;
                                    border-bottom: 0;
                                    cursor: pointer;
                                }
                                .info-left-cur {
                                    color: #4BCF99;
                                    font-weight: bold;
                                    background: #FAFAFA;
                                    border-left: 2px solid #4BCF99;
                                    box-sizing: border-box;
                                }
                            }
                        }
                        .prosses-info-right {
                            float: left;
                            margin-left: 10px;
                            width: calc(100% - 150px);
                            padding: 15px;
                            box-sizing: border-box;
                            background: #FAFAFA;
                            .prosses-info-right-head {
                                font-size: 12px;
                                color: #4F5F6F;
                                font-weight: bold;
                            }
                            .prosses-info-right-table {
                                margin-top: 15px;
                                width: 100%;
                                border: 1px solid #E1E1E1;
                                .prosses-info-right-table-head {
                                    width: 100%;
                                    height: 40px;
                                    border-bottom: 1px solid #E1E1E1;
                                    .table-head-title {
                                        display: inline-block;
                                        float: left;
                                        width: 140px;
                                        height: 40px;
                                        line-height: 40px;
                                        border-right: 1px solid #E1E1E1;
                                        font-size: 12px;
                                        color: #333E48;
                                        font-weight: bold;
                                        text-align: center;
                                    }
                                    .table-head-titles {
                                        display: inline-block;
                                        float: left;
                                        width: calc(100% - 282px);
                                        height: 40px;
                                        line-height: 40px;
                                        font-size: 12px;
                                        color: #333E48;
                                        text-align: center;
                                        font-weight: bold;
                                    }
                                }
                                .noData {
                                    height: 40px;
                                    line-height: 40px;
                                    text-align: center;
                                    font-size: 13px;
                                }
                                .prosses-info-right-table-content {
                                    width: 100%;
                                    min-height: 40px;
                                    border-top: 1px solid #E1E1E1;
                                    overflow: hidden;
                                    .noBorderRight {
                                      border-right: 0 !important;
                                      box-sizing: border-box;
                                    }
                                    .table-head-title {
                                        display: inline-block;
                                        float: left;
                                        width: 140px;
                                        min-height: 40px;
                                        line-height: 40px;
                                        border-right: 1px solid #E1E1E1;
                                        border-left: 1px solid #E1E1E1;
                                        font-size: 12px;
                                        color: #333E48;
                                        text-align: center;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                    }
                                    .table-head-titles {
                                        display: inline-block;
                                        float: left;
                                        width: calc(100% - 282px);
                                        height: 40px;
                                        line-height: 40px;
                                        font-size: 12px;
                                        color: #333E48;
                                        text-align: center;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .service-table-noData {
                text-align: center;
                font-size: 14px;
                color: #4F5F6F;
                padding: 15px 0;
            }
        }
    }
  }
  .protocolManagement {
    margin: 15px 0;
    p {
      font-size: 13px;
      color: #333E48;
      margin-bottom: 15px;
    }
    .allsubjectOfContract {
      padding: 15px;
      background: #FAFAFA;
      font-size: 13px;
      color: #4F5F6F;
      p {
        color: #4F5F6F;
        line-height: 25px;
      }
    }
  }

  .goodsEdition-div {
    height: 150px;
    .goodsEdition-li {
      font-size: 14px;
      color: #4F5F6F;
      height: 30px;
      line-height: 30px;
      margin-bottom: 15px;
      .editionNum {
        text-decoration: underline;
      }
      .curVis {
        color: #aaa;
        font-size: 12px;
      }
    }
  }
</style>
<style scoped>
  .goodsEdition-div >>> .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  .com-bar >>> .el-tag--info {
    color: #fff !important;
    background-color: #26C6DA !important;
  }
</style>
