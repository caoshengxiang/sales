<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="100px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="客户名称：">
              <el-input type="text" v-model="searchForm.name"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="8">-->
          <!--<el-form-item label="营业执照：">-->
          <!--<el-input type="text" v-model="searchForm.businessLicense"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="8">
            <el-form-item label="客户识别码：">
              <el-input type="text" v-model="searchForm.cdKey"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人：">
              <el-input type="text" v-model="searchForm.creatorName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row class="el-row-cla">-->
        <!--<el-col :span="8">-->
        <!--<el-form-item label="销售人：">-->
        <!--<el-input type="text" v-model="searchForm.salerName"></el-input>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="客户级别：">
              <el-select v-model="searchForm.level" placeholder="请选择客户级别">
                <el-option v-for="(item, index) in levelList" :key="index" :label="item.codeName"
                           :value="item.codeName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户行业：" prop="industry">
              <el-cascader
                style="width: 100%"
                :options="industryType"
                class="selectIndustryModule"
                :props="{
                    value: 'id',
                    label: 'name',
                    children: 'children'
                  }"
                :change-on-select="true"
                :placeholder="industryPlaceholder"
                @change="industryChangeHandle"
                @visible-change="visibleChange"
                v-model="searchForm.industryArr">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户地区：">
              <AreaSelect ref="areaSe"
                          :area="(searchForm.provinceName?searchForm.provinceName:'') + ' ' + (searchForm.cityName?searchForm.cityName:'')  + ' ' + (searchForm.areaName?searchForm.areaName:'')"
                          @change="areaSelectedOptionsHandleChange"
                          :selectLastLevelMode="true"></AreaSelect>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="所属公海：">
              <el-select v-model.number="searchForm.seaId" placeholder="请选择所属公海">
                <el-option v-for="item in seaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户来源：">
              <!--<el-select v-model="searchForm.customerSource" placeholder="请选择客户来源">-->
              <!--<el-option v-for="item in customerSourceType" :key="item.type" :label="item.value"-->
              <!--:value="item.type"></el-option>-->
              <!--</el-select>-->
              <el-cascader
                :change-on-select="selectLastLevelMode"
                :options="customerSourceType"
                v-model="customerSourceArr"
                @active-item-change="customerSourceChangeHandle"
                @change="customerSourceChangeHandle"
                :props="props"
                :value="selectedBindValue"
                :placeholder="searchForm.sourceName"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态：">
              <el-select v-model="searchForm.state" placeholder="请选择状态">
                <el-option v-for="item in customerState" :key="item.type" :label="item.value"
                           :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!--<el-col :span="8">-->
          <!--<el-form-item label="联系电话：">-->
          <!--<el-input type="text" v-model="searchForm.phone"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="8">
            <el-form-item label="客户类型：">
              <el-select v-model="searchForm.cate" placeholder="请选择客户类型">
                <el-option label="个人" :value="1"></el-option>
                <el-option label="机构" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="24">
            <el-form-item label="创建日期：">
              <el-date-picker
                v-model="timeInterval"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="timeIntervalHandle"
                :unlink-panels="true"
                :picker-options="pickerOptions"
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
        industryList: [], // 行业
        levelList: [], // 级别
        seaList: [], // 公海
        customerState: [], // 客户状态
        searchForm: { // 表单
          name: null,
          businessLicense: null,
          phone: null,
          creatorName: null,
          salerName: null,
          level: null,
          provinceId: null,
          cityId: null,
          areaId: null,
          seaId: null,
          customerSource: null,
          state: null,
          startDate: null,
          endDate: null,
          cate: null,
          cdKey: null,
        },
        timeInterval: [],
        customerSourceType: [], // 客户来源
        customerSourceArr: [],
        props: {
          value: 'id',
          label: 'codeName',
        },
        targetObj: null,
        selectedBindValue: [],
        selectLastLevelMode: true,
        sourceNameArr: [],
        industryType: [],
        pickerOptions: {
          // disabledDate (t) {
          //   let timestamp = Date.parse(t)
          //   let targeTimestamp = new Date('2018-7-31')
          //   if (timestamp > targeTimestamp) {
          //     return true
          //   } else {
          //     return false
          //   }
          // }
        },
        nameArr: [],
        industryPlaceholder: '请选择',
      }
    },
    props: ['params'],
    methods: {
      lastMonthDate () {
        return lastMonthDate()
      },
      clearForm () {
        this.searchForm = {}
        this.timeInterval = []
      },
      treeGetName (id, node) { // 遍历树获取名称
        if (!node) {
          return ''
        }
        if (node && node.length > 0) {
          var i = 0
          for (i = 0; i < node.length; i++) {
            if (id === node[i].id) {
              this.sourceNameArr.push(node[i].codeName)
              return node[i].codeName
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
          this.treeGetName(parseInt(item, 10), this.customerSourceType)
        })
        return this.sourceNameArr.join('-')
      },
      saveSubmitForm () {
        if(this.searchForm.industryArr){
          this.searchForm.industry = this.searchForm.industryArr.join(',')
          this.searchForm.industryArr = []
        }
        this.searchForm.sourceName = this.traverseTree(this.searchForm.customerSource)
        this.searchForm.nameArr = this.nameArr;
        this.$vDialog.close({type: 'search', params: this.searchForm})
      },
      getConfigData (type, pCode) {
        API.common.codeConfig({type: type, pCode: pCode}, (data) => {
          if (type === 2) {
            this.levelList = data.data
          } else if (type === 3) {
            this.industryList = data.data
          } else if (type === 5) {
            let arr = data.data.map((item) => {
              item.children = []
              return item
            })
            if (this.customerSourceType.length === 0) {
              this.customerSourceType = arr
            } else {

            }
          }
        })
      },
      // customerSourceChange (va) {
      //   this.searchForm.customerSource = va.join('-')
      // },
      customerSourceChangeHandle (va) {
        this.getLastItem(this.customerSourceType, va, 'id')
        API.common.codeConfig({type: 5, pCode: va[va.length - 1]}, (data) => {
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
        this.searchForm.customerSource = va.join('-')
      },
      industryChangeHandle (va) {
        let parentId;
        let that = this;
        if(va.length){
          parentId = va[va.length - 1]
        }else {
          parentId = 0
        }
        API.common.industry({parentId: parentId,status: true}, (data) => {
          // console.log('目标item:', this.targetObj)
          if (data.data.length) {
            let arr = data.data.map((item) => {
              item.children = []
              return item
            })
            if(va.length){
              that.getLastItem(that.industryType, va, 'id')
              that.targetObj.children = arr
            }else {
              that.industryType = arr
            }
          }else {
            that.getLastItem(that.industryType, va, 'id')
            that.targetObj.children = null
            that.searchForm.industry = va.join(',')
            setTimeout(function () {
              if ($('.selectIndustryModule').hasClass('is-opened')) {
                $('.selectIndustryModule').trigger('click')
              }
            }, 100)
          }
        })
      },
      // 临时解决高级搜索选择客户行业后无法显示已选的行业信息
      visibleChange (val) {
        if(!val) {
          let _list = this.industryType, _arr = this.searchForm.industryArr, _nameArr = [];
          if(_list.length > 0 && _arr.length > 0) {
            _list.forEach(a => {
              if(a.id == _arr[0]) {
                _nameArr.push(a.name);
                if(_arr[1]) {
                  a.children.forEach(b => {
                    if(b.id == _arr[1]) {
                      _nameArr.push(b.name);
                      if(_arr[2]) {
                        b.children.forEach(c => {
                          if(c.id == _arr[2]) {
                            _nameArr.push(c.name);
                          }
                        })
                      }
                    }
                  })
                }
              }
            })
          }
          this.nameArr = _nameArr;
        }
      },
      getLastItem (list, vals, key) { // 获取点击得目标对象, key 对应得 值vals 数组
        let LIST = list || []
        // console.log(LIST, vals, key)
        for (let item of LIST) {
          if (item[key] === vals[vals.length - 1]) {
            this.targetObj = item
            this.selectedBindValue.push(item[key])
            break
          } else {
            this.getLastItem(item.children, vals, key)
          }
        }
      },
      getSeaList () {
        API.customerSea.listAboutCustomer((data) => {
          this.seaList = data.data
        })
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
      timeIntervalHandle (value) {
        this.searchForm.startDate = value[0] || ''
        this.searchForm.endDate = value[1] || ''
      },
    },
    created () {
      this.getConfigData(2)
      this.industryChangeHandle([])
      this.getConfigData(5, 0)
      this.getSeaList()
      // this.customerSourceType = this.params.customerSourceType
      this.customerState = this.params.customerState
      this.searchForm = this.params.preAdvancedSearch
      // if(this.params.preAdvancedSearch.nameArr.length > 0) {
      //   this.industryPlaceholder = this.params.preAdvancedSearch.nameArr.split(',').replace(',', '/');
      // }
      if(this.params.preAdvancedSearch.nameArr) {
        if(this.params.preAdvancedSearch.nameArr.length > 0) {
          this.industryPlaceholder = this.params.preAdvancedSearch.nameArr.join('/');
        }
      }
      if (this.searchForm.startDate) { // 日期
        this.timeInterval = [this.searchForm.startDate, this.searchForm.endDate]
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
