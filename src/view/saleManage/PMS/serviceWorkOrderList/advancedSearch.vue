<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="110px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="派单单号：">
              <el-input type="text" v-model="searchForm.orderNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单单号：">
              <el-input type="text" v-model="searchForm.orderId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务客户：">
              <el-input type="text" v-model="searchForm.customerName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="客户联系人：">
              <el-input type="text" v-model="searchForm.contactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单状态：">
              <el-select v-model="serviceStateStr" filterable multiple placeholder="请选择订单状态">
                <el-option v-for="(item, index) in serviceStateList"
                           :key="index"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工单状态：">
              <el-select v-model="orderStateStr" filterable multiple placeholder="请选择工单状态">
                <el-option
                  v-for="(item, index) in orderStateList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="派单类型：">
              <el-select v-model="searchForm.serviceType" placeholder="请选择派单类型">
                <el-option v-for="(item, index) in serviceTypeList" :key="index" :label="item.value"
                           :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="服务商品：">
              <!-- <el-input type="text" v-model="searchForm.goodsName"></el-input> -->
              <el-select 
                  v-model="val1"
                  filterable 
                  multiple  
                  remote
                  reserve-keyword
                  :remote-method='selectProduce'
                  placeholder="请选择"
                  style="width:100%" 
                  >
                <el-option
                  v-for="item in server_pro_options"
                  :key="item.id"
                  :label="item.goodsName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
         <el-col :span="24">
            <el-form-item label="服务管家：">
              <!-- <el-input type="text" v-model="searchForm.managerName"></el-input> -->
              <el-select v-model="searchForm.managerIdStr" 
                  filterable 
                  multiple 
                  placeholder="请选择" 
                  reserve-keyword
                  :remote-method='selectProduceHouser'
                  @focus='getServerHouserKeeper()'
                  style="width:100%" 
                  >
                <el-option
                  v-for="item in server_housekeeper_options"
                  :key="item.userId"
                  :label="item.name"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> 
        </el-row>
        <!--范围-->
        <el-row class="el-row-cla">
          <el-col :span="14">
            <el-form-item label="订单实付金额：">
              <el-row>
                <el-col :span="10">
                  <el-input @change="numberStartHandle('orderPaymentStart', 'orderPaymentEnd')" type="number"
                            v-model.number="searchForm.orderPaymentStart"></el-input>
                </el-col>
                <el-col :span="2">
                  <div style="text-align: center">-</div>
                </el-col>
                <el-col :span="10">
                  <el-input @change="numberEndHandle('orderPaymentStart', 'orderPaymentEnd')" type="number"
                            v-model.number="searchForm.orderPaymentEnd"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="14">
            <el-form-item label="服务派单时间：">
              <el-date-picker
                v-model="timeInterval"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="(value) => {this.timeBillDateIntervalHandle(value, 'assignDateStart', 'assignDateEnd')}"
                :unlink-panels="true"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
        <el-button class="cancel-button" @click="clearForm">清 除</el-button>
        <el-button class="save-button" @click="saveSubmitForm">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  import webStorage from 'webStorage'

  export default {
    name: 'advancedSearch',
    data () {
      return {
        searchForm: { // 表单

        },
        serviceStateList: [{  //订单状态
          value: 1,
          label: '待服务'
        }, {
          value: 2,
          label: '服务中'
        }, {
          value: 3,
          label: '已完成'
        }, {
          value: 4,
          label: '退单中'
        },  {
          value: 5,
          label: '已退单'
        },  {
          value: 6,
          label: '待支付'
        },{
          value: 7,
          label: '已取消'
        }, {
          value: 8,
          label: '待支付'
        }, {
          value: 9,
          label: '已支付'
        }, {
          value: 10,
          label: '已中止'
        },  {
          value: 11,
          label: '失败'
        },  ],
        orderStateList: [  //工单状态
           {
          value: 1,
          label: '待接收'
        }, {
          value: 2,
          label: '已拒绝'
        }, {
          value: 3,
          label: '进行中'
        }, {
          value: 4,
          label: '已完成'
        }, {
          value: 5,
          label: '退单中'
        }, {
          value: 6,
          label: '已退单'
        }, ],
        serviceTypeList: [ // 7种服务类型
          {
            type: 1,
            value: '外勤服务',
          }, {
            type: 2,
            value: '财务记账',
          }, {
            type: 3,
            value: '财务内控',
          }, {
            type: 4,
            value: '纳税申报务',
          }, {
            type: 5,
            value: '税收风控',
          }, {
            type: 6,
            value: '其他计次服务',
          }, {
            type: 7,
            value: '其他计时服务',
          },
        ],
        timeInterval: [],

        // server_pro_options:[],
        server_housekeeper_options: [],
        server_pro_options : [],
        val1:[],   //服务商品被选中的
        orderStateStr:[],  //工单状态的被选中的
        serviceStateStr:[],  //订单状态的被选中的

      }
    },
    props: ['params'],
    methods: {
      clearForm () {
        this.searchForm = {}
        this.searchForm.managerIdStr = [];
        this.val1 = [];
        this.orderStateStr = [];
        this.serviceStateStr = [];
      },
      saveSubmitForm () {
        
        this.searchForm.goodsIdStr =  this.val1.toLocaleString();
        this.searchForm.managerIdStr =  this.searchForm.managerIdStr.toLocaleString();
        this.searchForm.orderStateStr =  this.orderStateStr.toLocaleString();
        this.searchForm.serviceStateStr =  this.serviceStateStr.toLocaleString();


        this.$vDialog.close({type: 'search', params: this.searchForm})
      },
      areaSelectedOptionsHandleChange (value) {
        let name = this.$refs.areaSe.getSelectedName(value)
        this.searchForm.provinceId = value[0] || ''
        this.searchForm.cityId = value[1] || ''
        this.searchForm.areaId = value[2] || ''
        this.searchForm.provinceName = name[0] || ''
        this.searchForm.cityName = name[1] || ''
        this.searchForm.areaName = name[2] || ''
      },
      getCodeConfig () { // 配置接口
        API.baseSetting.getCodeConfig({type: 6}, (res) => { // 6 管家类型
          if (res.status) {
            this.managerTypeList = res.data
          }
        })
      },
      //订单实付金额开始
      numberStartHandle (start, end) {
        if (this.searchForm[start] > this.searchForm[end]) {
          this.searchForm[end] = null
        }
      },
      //订单实付金额结束
      numberEndHandle () {
        if (this.searchForm[start] && this.searchForm[start] >
          this.searchForm[end]) {
          this.searchForm[end] = this.searchForm[start]
        }
      },
      //查询日期
      timeBillDateIntervalHandle (value, start, end) {
        this.searchForm[start] = value[0] || ''
        this.searchForm[end] = value[1] || ''
      },
      //获取服务商品
      getServer(val){
        let data ={ organizationId: webStorage.getItem('userInfo').organizationId };
        if(val) data.goodsName = val;
        API.serviceOrder.getServerProduce(data , ({data})=>{
            data.map(rel=>{
              // 显示商品状态异常的时候
              if(rel.status == 1){
                  if(rel.pullOff == 1){
                      rel.goodsName = rel.goodsName +'(已下架)'
                  }
              }else{
                rel.goodsName = rel.goodsName +'(已删除)'
              }
            })
            this.server_pro_options = data;
        })
      },
      //获取服务管家
      getServerHouserKeeper(val){
        let data ={auditStatus:6 };
        if(val) data.name = val;
        API.serviceOrder.housekeeperQuery(data , ({data})=>{
            this.server_housekeeper_options = data;
        })
      },
      //服务商品的远程搜索
      selectProduce(query){
        if(query.length > 1){
          this.getServer(query)
        }else{
          this.server_pro_options = [];
        }
      },
      //服务管家的远程搜索
      selectProduceHouser(query){
        if(query.length > 1){
          this.getServerHouserKeeper(query)
        }
      }
    },
    created () {
      this.searchForm = this.params.preAdvancedSearch
      this.searchForm.managerIdStr = [];
      this.val1= [];
      this.orderStateStr = [];
      this.serviceStateStr = [];
      this.getCodeConfig();
      /* 日期 */
      if (this.searchForm.assignDateStart) { // 日期
        this.timeInterval = [this.searchForm.assignDateStart, this.searchForm.assignDateEnd]
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
