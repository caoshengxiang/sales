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
          <el-col :span="8">
            <el-form-item label="营业执照：">
              <el-input type="text" v-model="searchForm.businessLicense"></el-input>
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
                <el-option v-for="item in levelList" :key="item.codeName" :label="item.codeName"
                           :value="item.codeName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户行业：">
              <el-select v-model="searchForm.industry" placeholder="请选择客户行业">
                <el-option v-for="item in industryList" :key="item.codeName" :label="item.codeName"
                           :value="item.codeName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户地区：">
              <AreaSelect ref="areaSe"
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
                :change-on-select="false"
                :options="customerSourceType"
                v-model="customerSourceArr"
                @active-item-change="customerSourceChangeHandle"
                @change="customerSourceChange"
                :props="props"
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
          <el-col :span="8">
            <el-form-item label="联系电话：">
              <el-input type="text" v-model="searchForm.phone"></el-input>
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
        <el-button class="save-button" @click="saveSubmitForm">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../utils/api'

  export default {
    name: 'advancedSearch',
    data () {
      return {
        industryList: [], // 行业
        levelList: [], // 级别
        seaList: [], // 公海
        customerSourceType: [], // 客户来源
        customerState: [], // 客户状态
        searchForm: { // 表单
          name: null,
          businessLicense: null,
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
        },
        timeInterval: '',
        customerSourceArr: [],
        props: {
          value: 'id',
          label: 'codeName',
        },
        targetObj: null,
      }
    },
    props: ['params'],
    methods: {
      saveSubmitForm () {
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
      customerSourceChange (va) {
        this.searchForm.customerSource = va.join('-')
      },
      customerSourceChangeHandle (va) {
        // console.log(va)
        this.getLastItem(this.customerSourceType, va, 'id')
        API.common.codeConfig({type: 5, pCode: va[va.length - 1]}, (data) => {
          // console.log('目标item:', this.targetObj)
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
      getSeaList () {
        API.customerSea.listAboutCustomer((data) => {
          this.seaList = data.data
        })
      },
      areaSelectedOptionsHandleChange (value) {
        this.searchForm.provinceId = value[0] || ''
        this.searchForm.cityId = value[1] || ''
        this.searchForm.areaId = value[2] || ''
      },
      timeIntervalHandle (value) {
        this.searchForm.startDate = value[0] || ''
        this.searchForm.endDate = value[1] || ''
      },
    },
    created () {
      this.getConfigData(2)
      this.getConfigData(3)
      this.getConfigData(5, 0)
      this.getSeaList()
      // this.customerSourceType = this.params.customerSourceType
      this.customerState = this.params.customerState
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
