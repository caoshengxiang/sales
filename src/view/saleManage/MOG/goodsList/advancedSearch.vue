<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="130px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="商品名：">
              <el-input type="text" placeholder="商品名称" v-model="searchForm.goodsName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否下架：">
              <el-select placeholder="请选择" v-model="searchForm.pullOff">
                <el-option :value="0" label="否"></el-option>
                <el-option :value="1" label="是"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否推荐：">
              <el-select placeholder="请选择" v-model="searchForm.recommend">
                <el-option :value="0" label="否"></el-option>
                <el-option :value="1" label="是"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="线上是否可销售：">
              <el-select placeholder="请选择" v-model="searchForm.onlineSales">
                <el-option :value="0" label="否"></el-option>
                <el-option :value="1" label="是"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品类别：">
<!--              <el-select placeholder="请选择" v-model="searchForm.goodsTypeId">
                <el-option v-for="(item, i) in productType" :label="item.name" :value="item.id" :key="i"></el-option>
              </el-select> -->
              <el-cascader
                :change-on-select="true"
                class="ml10"
                :options="chanceSourceType"
                v-model="chanceSourceArr"
                @active-item-change="chanceSourceChangeHandle"
                @change="chanceSourceChangeHandle"
                :props="props"
                :placeholder="defaultPlaceholder">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务方式：">
              <el-select placeholder="请选择" v-model="searchForm.billingType">
                <el-option value='ANNUALLY' label='计时服务'></el-option>
                <el-option value='TIMES' label='计次服务'></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="服务对象：">
              <el-select v-model="searchForm.servicePrincipalType" placeholder="请选择">
                  <el-option value='Company' label='企业'></el-option>
                  <el-option value='Person' label='个人'></el-option>
                  <el-option value='Both' label='企业/个人'></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="附加服务：">
              <el-select v-model="intelligentService" placeholder="请选择" @change="selectIntelligentService">
                <el-option :value='1' label='老板报表'></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品定价类型：">
              <el-select v-model="searchForm.pricingMethod" placeholder="请选择">
                <el-option :value='1' label='标准定价'></el-option>
                <el-option :value='2' label='非标准定价'></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
<!--          <el-col :span="8">
            <el-form-item label="服务流程类型：">
              <el-select v-model="searchForm.process" placeholder="请选择">
                <el-option :value="1" label="专用流程(记账、全托管)"></el-option>
                <el-option :value="2" label="代办业务流程"></el-option>
                <el-option :value="3" label="计时服务流程"></el-option>
                <el-option :value="4" label="计次服务流程"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="16">
            <el-form-item label="创建时间：">
              <el-date-picker
                v-model="created"
                type="daterange"
                @change="timeIntervalHandle"
                :default-value="lastMonthDate()"
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
  import { lastMonthDate } from '../../../../utils/utils'

  export default {
    name: 'advancedSearch',
    data () {
      return {
        searchForm: { // 表单
          goodsName: '',            //商品名称
          pullOff: '',              //是否上下架
          recommend: '',            //是否推荐
          onlineSales: '',          //线上是否销售
          goodsTypeId: '',          //商品类别
          sourceName: '',
          billingType: '',          //服务方式
          servicePrincipalType: '', //服务对象
          hasBossReport: 0,         //是否包含老板报表
          pricingMethod: '',        //商品定价类型
          // process: '',              //服务流程类型
          startDate: '',            //创建时间开始时间
          endDate: '',              //创建时间结束时间
        },
        created: '',                //创建日期
        intelligentService: '',     //选择的附加服务

        chanceSourceType: [],
        chanceSourceArr: [],
        props: {
          value: 'id',
          label: 'name',
        },
        defaultPlaceholder: '请选择',
        sourceNameArr: [],
      }
    },
    props: ['params'],
    methods: {
      lastMonthDate () {
        return lastMonthDate()
      },
      // 清除
      clearForm () {
        this.searchForm = {}
        this.intelligentService = '';
        this.defaultPlaceholder = '请选择';
        this.created = '';
      },
      // 确定
      saveSubmitForm () {
        if(this.chanceSourceArr.length) {
          this.searchForm.goodsTypeId = this.chanceSourceArr[this.chanceSourceArr.length - 1];
          this.searchForm.sourceName = this.traverseTree(this.chanceSourceArr.join('-'));
        }
        this.$vDialog.close({type: 'search', params: this.searchForm})
      },
      // 选择附加服务
      selectIntelligentService () {
        let id = this.intelligentService;
        switch (id) {
            case 1:
                this.searchForm.hasBossReport = 1;
                break;
            default:
                break;
        }
      },
      getConfigData (pid) {
        API.zhuxinGoodsManage.addProductType(pid, (data) => {
            let arr = data.data.map((item) => {
              item.children = []
              return item
            })
            if (this.chanceSourceType.length === 0) {
              this.chanceSourceType = arr
            }
        })
      },
      chanceSourceChangeHandle (va) {
        this.getLastItem(this.chanceSourceType, va, 'id')
        API.zhuxinGoodsManage.addProductType(va[va.length - 1], (data) => {
          if (data.data.length) {
            let arr = data.data.map((item) => {
              item.children = []
              return item
            })
            this.targetObj.children = arr
          } else {
            this.targetObj.children = null
          }
        })
      },
      getLastItem (list, vals, key) { // 获取点击得目标对象, key 对应得 值vals 数组
        let LIST = list || []
        // console.log(LIST, vals, key)
        for (let item of LIST) {
          if (item[key] === vals[vals.length - 1]) {
            this.targetObj = item
            break
          } else {
            this.getLastItem(item.children, vals, key)
          }
        }
      },

      treeGetName (id, node) { // 遍历树获取名称
        if (!node) {
          return ''
        }
        if (node && node.length > 0) {
          var i = 0
          for (i = 0; i < node.length; i++) {
            if (id === node[i].id) {
              this.sourceNameArr.push(node[i].name)
              return node[i].name
            } else {
              this.treeGetName(id, node[i].children)
            }
          }
        }
      },
      traverseTree (source, node) { // 遍历树
        if (!source) {
          return
        }
        let sourceArr = source.split('-')
        this.sourceNameArr = [] // 初始
        sourceArr.forEach((item, index) => {
          this.treeGetName(parseInt(item, 10), this.chanceSourceType)
        })
        return this.sourceNameArr.join('-')
      },
      // 创建时间选择
      timeIntervalHandle (value) {
        this.searchForm.startDate = value[0] || ''
        this.searchForm.endDate = value[1] || ''
      },
    },
    created () {
      this.productType = this.params.productType
      this.searchForm = this.params.preAdvancedSearch
      if(this.params.preAdvancedSearch.goodsTypeId) {
        this.defaultPlaceholder = this.searchForm.sourceName;
      }
      if(this.params.preAdvancedSearch.hasBossReport == 1) {
        this.intelligentService = 1
      }

      if (this.params.preAdvancedSearch.startDate) { // 日期
        this.created = [this.params.preAdvancedSearch.startDate, this.params.preAdvancedSearch.endDate]
      }
      this.getConfigData(0)
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
