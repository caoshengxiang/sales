<template>
  <div class="com-container"
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
      <div class="com-bar-left">
        <com-button buttonType="add" icon="el-icon-plus" @click="operateOptions('add')">新增</com-button>
<!--        <com-button buttonType="delete" icon="el-icon-delete" @click="operateOptions('delete')"
                    :disabled="multipleSelection.length <= 0">删除 -->
        <!-- </com-button> -->
      </div>
      <div class="com-bar-right" v-if="themeIndex === 0"><!--前端-->
        <el-button style="background: #39C189 !important;" type="primary" icon="el-icon-news" :disabled="multipleSelection.length < 1" @click="setProductType">返佣类别</el-button>
        <el-button style="background: #39C189 !important;" type="primary" icon="el-icon-sort-up" :disabled="multipleSelection.length < 1" @click="setGoods(1)">上架</el-button>
        <el-button style="background: #39C189 !important;" type="primary" icon="el-icon-sort-down" :disabled="multipleSelection.length < 1" @click="setGoods(2)">下架</el-button>
        <el-button style="background: #39C189 !important;" type="primary" icon="el-icon-sort-up" :disabled="multipleSelection.length < 1" @click="setIsOnlineSales('')">线上销售设置</el-button>
        <com-button buttonType="search" @click="advancedSearchHandle">高级搜索</com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        stripe
        :data="tableData"
        :max-height='posheight'
        tooltip-effect="dark"
        style="width: 100%"
        @sort-change="sortChangeHandle"
        @selection-change="handleSelectionChange">
        <el-table-column
          fixed
          type="selection"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="goodsId"
          label="商品ID"
          show-overflow-tooltip
          width="160">
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="goodsName"
          fixed
          label="商品名"
          show-overflow-tooltip
          width="200">
          <template slot-scope="scope">
            <a class="col-link" @click="handleRouter('detail', scope.row.goodsId)">{{ scope.row.goodsName}} <span
              v-if="!(scope.row.goodsName)">-</span></a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="versionNum"
          label="版本号"
          show-overflow-tooltip
          width="160">
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="pullOff"
          label="售卖状态"
          show-overflow-tooltip
          width="160">
          <template slot-scope="scope">
            <span v-if='!scope.row.pullOff'>上架</span>
            <span v-if='scope.row.pullOff'>下架</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="recommend"
          label="是否推荐"
          show-overflow-tooltip
          width="160">
          <template slot-scope="scope">
            <span v-if='!scope.row.recommend'>否</span>
            <span v-if='scope.row.recommend'>是</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          label="线上销售"
          prop="onlineSales"
          show-overflow-tooltip
          width="140">
          <template slot-scope="scope">
           <span v-if='!scope.row.onlineSales'>否</span>
            <span v-if='scope.row.onlineSales'>是</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="goodsSort"
          label="排序值"
          show-overflow-tooltip
          width="160">
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="goodsTypeId"
          label="商品类别"
          show-overflow-tooltip
          width="160">
          <template slot-scope="scope">
              <span>{{scope.row.goodsTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="billingType"
          label="服务方式"
          show-overflow-tooltip
          width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.billingType === 'TIMES'">计次</span>
            <span v-if="scope.row.billingType === 'ANNUALLY'">计时</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="servicePrincipalType"
          label="服务类型"
          show-overflow-tooltip
          width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.servicePrincipalType === 'Person'">个人</span>
            <span v-if="scope.row.servicePrincipalType === 'Company'">企业</span>
            <span v-if="scope.row.servicePrincipalType === 'Both'">个人/企业</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="pricingMethod"
          label="定价类型"
          show-overflow-tooltip
          width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.pricingMethod === 2">非标准收费</span>
            <span v-if="scope.row.pricingMethod === 1">标准收费</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="goodsAgreementId"
          label="服务协议"
          show-overflow-tooltip
          width="160">
          <template slot-scope="scope">
              <span>{{scope.row.goodsAgreementName}}</span>
          </template>
        </el-table-column>
<!--        <el-table-column
          align="center"
          sortable="custom"
          prop="process"
          label="产品工单服务环节类型"
          show-overflow-tooltip
          width="170">
          <template slot-scope="scope">
            <span v-if="scope.row.process == 1">专用流程(记账、全托管)</span>
            <span v-if="scope.row.process == 2">代办业务流程</span>
            <span v-if="scope.row.process == 3">计时服务流程</span>
            <span v-if="scope.row.process == 4">计次服务流程</span>
          </template>
        </el-table-column> -->
        <el-table-column
          align="center"
          sortable="custom"
          prop="productType"
          label="产品返佣类别"
          show-overflow-tooltip
          width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.productType == 1">A类产品（记账/托管）</span>
            <span v-if="scope.row.productType == 2">A类产品（税务顾问/财税金融咨询）</span>
            <span v-if="scope.row.productType == 3">B类标准化产品</span>
            <span v-if="scope.row.productType == 4">B类定制化产品</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="created"
          label="创建日期"
          show-overflow-tooltip
          width="160">
          <template slot-scope="scope">
            {{scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          width="200">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="operateOptions('edit', scope.row)">编辑</el-button> -->
            <el-button type="text" @click="showRecommentModel(scope.row)">推荐</el-button>
            <el-button type="text" @click="setSortModel(scope.row)">排序值</el-button>
            <el-button type="text" @click="versionReplacement(scope.row.goodsFlag, scope.row)">版本设置</el-button>
            <!-- <el-button type="text">历史数据处理</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="com-pages-box">
      <el-pagination
        background
        :total="tableDataTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :layout="pagesOptions.layout"
        :page-sizes="pagesOptions.pageSizes"
        :page-size="pagesOptions.pageSize">
      </el-pagination>
    </div>
    <el-dialog
      title="设置线上销售"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="isOnlineSalesModel"
      width="400px">
      <div>
        <p>是否线上销售</p>
        <p style="margin-top: 15px;">
          <el-select v-model="isLineSale">
            <el-option :value="1" label="是"></el-option>
            <el-option :value="2" label="否"></el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isOnlineSalesModel = false">取 消</el-button>
        <el-button @click="subIsOnlineSales">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="设置产品返佣类别"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="productTypeModel"
      width="400px">
      <div>
        <p>产品返佣类别</p>
        <p style="margin-top: 15px;">
          <el-select v-model="productType" placeholder="设置产品返佣类别" clearable>
            <el-option :value="1" label="A类产品（记账/托管）"></el-option>
            <el-option :value="2" label="A类产品（税务顾问/财税金融咨询）"></el-option>
            <el-option :value="3" label="B类标准化产品"></el-option>
            <el-option :value="4" label="B类定制化产品"></el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="productTypeModel = false">取 消</el-button>
        <el-button @click="subProductType">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="设置排序"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="sortModel"
      width="300px">
      <div>
        <el-input type="number" v-model.number="sort" placeholder="输入非0的排序值"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sortModel = false">取 消</el-button>
        <el-button @click="subSort">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="产品推荐"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="recommendModel"
      width="500px">
      <div class="all-remmoend">
        <p class='mb10'>
            <el-checkbox v-model="recommendData.recommend">app推荐</el-checkbox>
        </p>
        <el-form :model="recommendData" ref="addForm" label-position="left" label-width="100px" v-if="recommendData.recommend">
            <el-form-item label="推荐位图片">
                <template slot-scope="scope">
                <p class="upload-text">请上传长宽比为15：8的图片，大小在1M以内（1张）</p>
                <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    list-type="picture-card"
                    :on-remove="onRemoveHandle"
                    :before-upload="beforeImgUpload"
                    :headers="{ authKey: userInfo.authKey }"
                    :on-success="onSuccessHandle"
                    :file-list="fileList"
                    accept=".jpg,.jpeg,.png,.pneg"
                    :limit="1">
                    <i class='el-icon-plus'></i>
                </el-upload>
                </template>
            </el-form-item>
            <el-form-item label="推荐描述">
                <template slot-scope="scope">
                    <el-input type="textarea" rows="3" resize="none" placeholder="请输入推荐描述文案" v-model="recommendData.recommendPositionRemark" ></el-input>
                </template>
            </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="recommendModel = false">取 消</el-button>
        <el-button @click="subRecommend">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="商品版本"
      center
      :visible.sync="goodsEditionDialog"
      width="500px">
      <div class="goodsEdition-div">
        <el-scrollbar style="height: 100%">
          <ul>
            <li class="mb15">商品名称: {{benRow.goodsName}}</li>
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
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import comButton from '../../../../components/button/comButton'
  import { uploadUrl } from '../../../../utils/const'
  import API from '../../../../utils/api'
  import advancedSearch from './advancedSearch'
  import webStorage from 'webStorage'
  import { underscoreName, arrToStr } from '../../../../utils/utils'

  export default {
    name: 'list',
    data () {
      return {
        userInfo: webStorage.getItem('userInfo'),
        h: document.body.clientHeight,
        isOnlineSalesModel: false,
        isLineSale: '',
        onlineRow: '',
        sortModel: false,
        sort: '',
        sortRow: '',
        productType: '',
        productTypeModel: false,
        goodsEditionDialog: false,
        versionGoodsId: '',
        versionAll: [],                              //所有版本信息
        recommendModel: false,
        recommendData: {
          id: '',                                    //主键id
          recommend: 0,                              //是否APP推荐
          recommendPositionPath: '',                 //推荐位图片地址
          recommendPositionRemark: '',               //app推荐描述文案
        },
        fileList: [],
        posheight: 100,
        timer: false,
        dataLoading: false,
        orderTypeOption: null,
        tableData: [],
        tableDataTotal: 0,
        multipleSelection: [],
        currentPage: 1,
        defaultListParams: {                          // 默认顾客列表请求参数
          page: null,
          pageSize: null,
          type: null,
          defaultVersion: 0,                          //版本是否启用
          customerId: null,
          organizationId: null,
        },
        sortObj: {sort: 'created,desc'},              // 排序
        productType: [],                              //商品类别
        advancedSearch: {},                           // 高级搜索
        deleteImg: [],                                //要删除的图片
        benRow: {},
      }
    },
    watch: {
      // 页面高度改变过后改变table的max_height高度
      h (val) {
        if(!this.timer) {
          this.posheight = val - 260
          this.timer = true
          let that = this
          setTimeout(function (){
            that.timer = false
          },400)
        }
      }
    },
    mounted() {
      // 监听页面高度
      const that = this
      window.onresize = () => {
        return (() => {
          let a = document.body.clientHeight
          that.h = a
        })()
      }
    },
    created () {
      this.getGoodsList()
      this.posTableHeight();            //根据屏幕高度设置table高度
      this.getProductType();
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
        'orderTypeOptions',
        'orderState',
        'orderSource',
        'themeIndex',
        'topSource',
      ]),
      uploadUrl() {
          return uploadUrl;
      }
    },
    components: {
      comButton,
    },
    methods: {
      operateOptions (op, row) {
        let that = this;
        switch (op) {
          case 'add':
            webStorage.removeItem('GOODSDETAIL');
            this.clearCache();
            this.$router.push({name: 'addGoods', query: {detail: 0}})
            break
          case 'edit':
            that.clearCache();
            webStorage.setItem('GOODSDETAIL', JSON.stringify(row));
            that.$router.push({name: 'addGoods', query: {detail: 1, step: 1}});
            break;
          case 'delete':
            this.$confirm('确定删除销售订单, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              API.salesOrder.batchDeleteOrder({salerOrderIds: arrToStr(this.multipleSelection, 'id')}, (da) => {
                if (da.status) {
                  if (da.data.fail > 0) {
                    this.$message.warning(`成功${da.data.success}, 失败${da.data.fail}, 失败原因：${da.data.errorMessage}`)
                  } else {
                    this.$message.success(`成功${da.data.success},失败${da.data.fail}`)
                  }
                  this.getGoodsList()
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              })
            })
            break
        }
      },
      // 设置上下架
      setGoods (type, row) {
        let test = type == 1 && '设置上架成功' ||
                   type == 2 && '设置下架成功' || null;
          let _list = [], goodsId = '';
          if(this.multipleSelection.length > 0) {
            this.multipleSelection.forEach(obj => {
              _list.push(obj.goodsId);
            })
          }
          goodsId = row ? row.goodsId.toString() : _list.join();
          let _data = {
            type: type,
            data: {
              goodsIds: goodsId,
            }
          };
          API.zhuxinGoodsManage.editProductTion(_data, (data) => {
            if(data.status) {
              this.$message.success(test);
              this.getGoodsList();
            }
          })
      },
      // 设置是否线上销售
      setIsOnlineSales (row) {
        this.onlineRow = row;
        this.isLineSale = '';
        this.isOnlineSalesModel = true;
      },
      // 确定是否线上销售
      subIsOnlineSales () {
        let row = this.onlineRow, type = this.isLineSale == 1 && 3 || this.isLineSale == 2 && 4 || null;
        if(!type) return this.$message.warning('请选择是否线上销售');
        let test = type == 3 && '设置线上销售成功' ||
                   type == 4 && '设置线下销售成功' || null;
          let _list = [], goodsId = '';
          if(this.multipleSelection.length > 0) {
            this.multipleSelection.forEach(obj => {
              _list.push(obj.goodsId);
            })
          }
          goodsId = row ? row.goodsId.toString() : _list.join();
          let _data = {
            type: type,
            data: {
              goodsIds: goodsId,
            }
          };
          API.zhuxinGoodsManage.editProductTion(_data, (data) => {
            if(data.status) {
              this.$message.success(test);
              this.isOnlineSalesModel = false;
              this.getGoodsList();
            }
          })
      },
      setSortModel (row) {
        this.sort = row.goodsSort;
        this.sortRow = row;
        this.sortModel = true;
      },
      // 确定排序
      subSort () {
        if(!this.sort) return this.$message.warning('请输入大于0得排序值');
        let row = this.sortRow;
        let _data = {
          goodsFlag: row.goodsFlag,
          goodsSort: this.sort,
        };
        API.zhuxinGoodsManage.editProductSort(_data, (data) => {
          if(data.status) {
            this.$message.success('设置排序成功');
            this.sortModel = false;
            this.getGoodsList();
          }
        })
      },
      // 显示返佣类别
      setProductType () {
        this.productType = '';
        this.productTypeModel = true;
      },
      // 确定返佣类别
      subProductType () {
        if(!this.productType) return this.$message.warning('请选择返佣类别');
          if(this.multipleSelection.length > 0) {
            this.multipleSelection.forEach(obj => {
              obj.productType = this.productType;
            })
          }
          let _list = this.multipleSelection;
          let _data = {
            goodsTypes: _list,
          };
          API.baseSetting.updateProductType(_data, (data) => {
            if(data.status) {
              this.$message.success('设置返佣类别成功');
              this.productTypeModel = false;
              this.getGoodsList();
            }
          })
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
      versionReplacement (id, row) {
        this.versionAll = [];
        this.versionGoodsId = id;
        this.benRow = row;
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
          },
        };
        API.zhuxinGoodsManage.editProductTion(_data, (data) => {
          if(data.status) {
            this.$message.success('设置版本成功');
            this.goodsEditionDialog = false;
            this.getGoodsList();
          }
        })
      },
      // 弹出推荐弹框
      showRecommentModel (row) {
        this.fileList = [];
        this.deleteImg = [];
        this.recommendData.id = row.id;
        this.recommendData.recommend = row.recommend;
        this.recommendData.recommendPositionPath = row.recommendPositionPath;
        this.recommendData.recommendPositionRemark = row.recommendPositionRemark;
        if(row.recommendPositionPath) {
            let recoImg = row.recommendPositionPath.split(',');
            recoImg.forEach(imgs => {
                this.fileList.push({name: imgs, url: imgs})
            })
        }
        setTimeout(() => {
          this.recommendModel = true;
        }, 500)
      },
      // 确定推荐
      subRecommend () {
        let message = (this.recommendData.recommend && !this.recommendData.recommendPositionPath) && '请上传推荐位图片' ||
                      (this.recommendData.recommend && !this.recommendData.recommendPositionRemark) && '请填写推荐描述' || null;
        if(message) return this.$message.warning(message);
        if(!this.recommendData.recommend) {
          this.fileList = [];
          this.recommendData.recommendPositionPath = '';
          this.recommendData.recommendPositionRemark = '';
        }
        let data = this.recommendData;
        API.zhuxinGoodsManage.editProductSort(data, (data) => {
            if(data.status) {
                this.$message.success('设置商品推荐成功');
                this.recommendModel = false;
                this.getGoodsList();
                if(this.deleteImg.length > 0) {
                  let _name = this.deleteImg.join();
                  API.zhuxinGoodsManage.deleteFile({fileName: _name}, (data) => {})
                }
            }
        })
      },
      posTableHeight () {
        let h = document.body.clientHeight,
            new_h = h - 260;
        this.posheight = new_h;
      },
      // 获取产品类型
      getProductType () {
          API.zhuxinGoodsManage.addProductType(0, (data) => {
              if(data.status) {
                  this.productType = data.data;
              }
          })
      },
      advancedSearchHandle () {
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 500,
          params: {
            productType: this.productType,
            preAdvancedSearch: this.advancedSearch,
          },
          callback: (data) => {
            if (data.type === 'search') {
              console.log('高级搜索数据：', data.params)
              this.currentPage = 1;
              this.advancedSearch = data.params
              this.tableDataTotal = 0;
              this.getGoodsList()
            }else {
                this.advancedSearch = {};
            }
          },
          cancelCallback: (val) => {
              this.advancedSearch = {};
          },
        })
      },
      // 清除保存的步骤数据
      clearCache () {
          webStorage.removeItem('stepOne');
          webStorage.removeItem('stepTwo');
          webStorage.removeItem('stepThree');
          webStorage.removeItem('stepFour');
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.getGoodsList()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getGoodsList()
      },
      handleRouter (name, id) {
        let _url = this.$router.resolve({name: 'listOfGoodsDetail', query: {view: name, goodsId: id}, params: {end: 'FE'}});
		window.open(_url.href, '_blank')
      },
      getGoodsList () {
        this.dataLoading = true
        this.getQueryParams()
        //排序增加 this.sortObj
        console.log(1111, this.advancedSearch);
        API.zhuxinGoodsManage.getGoodsList(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch), (data) => {
          if(data.status) {
              this.tableData = data.data.content
              this.tableDataTotal = data.data.totalElements
          }
          setInterval(() => {
            this.dataLoading = false
          }, 800)
        })
      },
      sortChangeHandle (sortObj) {
        // console.log(sortObj)
        let order = null
        if (sortObj.order === 'ascending') {
          order = 'asc'
        } else if (sortObj.order === 'descending') {
          order = 'desc'
        }
        this.sortObj = {sort: underscoreName(sortObj.prop) + ',' + order}
        this.getGoodsList()
      },
      getQueryParams () { // 请求参数配置
        this.customerId = this.$route.query.customerId
        this.chanceId = this.$route.query.chanceId
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          status: 1,
          defaultVersion: 1,
          type: this.orderTypeOption, // 前端
          organizationId: this.organizationId, // 后端
        }
        if (this.customerId) { // 更多[来至客户，联系人]
          this.defaultListParams.customerId = this.customerId
        }
        if (this.chanceId) { // 更多[来至机会]
          this.defaultListParams.chanceId = this.chanceId
        }
      },
      // 推荐位图片成功上传
      onSuccessHandle (response, file, fileList) {
          this.recommendData.recommendPositionPath = response.data.url
      },
      // 删除已上传推荐位图片
      onRemoveHandle (response, file, fileList) {
          let name = '';
          if(response.size) {
            name = response.response.data.url.split('/')[response.response.data.url.split('/').length - 1];
          }else {
            name = response.url.split('/')[response.url.split('/').length - 1];
          }
          if(name) this.deleteImg.push(name);
          this.recommendData.recommendPositionPath = '';
      },
      // 文件上传前的钩子
      beforeImgUpload (file) {
          // 限制上传文件兆数大小
          let file1M = (file.size / 1024 /1024) < 1;
          if(!file1M) this.$message.warning('只能上传小于1M并且长宽比为15:8的图片');

          // 限制宽高比图片15:8
          let isSize = new Promise((resolve, reject) => {
              let width = 15, height = 8, _url = window.URL || window.webkitURL, img = new Image();
              img.onload = () => {
                  let valid = (width / height) == (img.width / img.height);
                  valid ? resolve() : reject();
              }
              img.src = _url.createObjectURL(file);
          }).then(() => {
              return file;
          }, () => {
              this.$message.warning('上传图片的长宽比必须是15:8');
              return Promise.reject();
          })
          return file1M && isSize;
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/commons";
  @import "../../../../styles/stepCommon";
  .com-container .com-bar .com-bar-right {
    margin-bottom: 15px;
  }
  .com-container .com-bar .com-bar-left {
    margin-top: 8px;
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
    .all-remmoend >>> .el-upload--picture-card {
        width: 150px !important;
        height: 80px !important;
        line-height: 80px !important;
        border-radius: 0 !important;
    }
    .all-remmoend >>> .el-upload-list--picture-card .el-upload-list__item {
        width: 150px !important;
        height: 80px !important;
        border-radius: 0 !important;
    }
    .all-remmoend >>> .w-e-text-container {
        height: 160px !important;
    }
  .goodsEdition-div >>> .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
</style>
