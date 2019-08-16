<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">客户名称</td>
            <td class="td-text">
              <el-form-item prop="customerId">
                <el-select :disabled="params.detailCustomersId?true:false" v-model.number="addForm.customerId"
                           placeholder="请选择客户" style="width: 100%">
                  <el-option v-for="item in customersList" :key="item.id" :label="item.name"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </td>

            <td class="td-title">需求阶段</td>
            <td class="td-text">
              <el-form-item prop="state">
                <el-select :disabled="true" v-model.number="addForm.state" placeholder="" style="width: 100%">
                  <el-option v-for="item in salesState" :key="item.type" :label="item.value"
                             :value="item.type" v-if="item.type !== -1"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">预计签单时间</td>
            <td class="td-text">
              <el-form-item prop="billDate">
                <el-date-picker
                  style="width: 100%"
                  v-model="addForm.billDate"
                  type="datetime"
                  placeholder="选择时间">
                </el-date-picker>
              </el-form-item>
            </td>
            <td class="td-title">预计签单金额</td>
            <td class="td-text">
              <!--<input type="text" v-model="addForm.industry">-->
              <el-form-item prop="intentBillAmount">
                <!--<el-input type="number" minlength="0" v-model.number="addForm.intentBillAmount"></el-input>-->
                <el-input-number style="width: 100%" v-model="addForm.intentBillAmount" :precision="2" :step="1"
                                 :min="0"></el-input-number>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">意向商品分类</td>
            <td class="td-text">
              <el-form-item prop="intentProductCate">
                <el-select v-model.number="addForm.intentProductCate" @change="intentProductCateChangeHandle"
                           placeholder="请选择意向商品分类" style="width: 100%">
                  <el-option v-for="item in intentProductCateList" :key="item.objectId" :label="item.name"
                             :value="item.objectId"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="td-title">意向商品</td>
            <td class="td-text">
              <el-form-item prop="intentProductId">
                <el-select v-model.number="addForm.intentProductId" @change="intentProductIdChangeHandle"
                           placeholder="请选择意向商品" style="width: 100%">
                  <el-option v-for="item in intentProductList" :key="item.id" :label="item.goodsName"
                             :value="item.goodsId"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">客户来源</td>
            <td class="td-text">
              <el-cascader
                style="width: 100%"
                :change-on-select="selectLastLevelMode"
                :options="chanceSourceType"
                v-model="chanceSourceArr"
                @active-item-change="chanceSourceChangeHandle"
                @change="chanceSourceChangeHandle"
                :props="props"
                :placeholder="addForm.chanceSourceName"
              >
              </el-cascader>
            </td>
            <td class="td-title">需求提供人</td>
            <td class="td-text">
              <el-form-item prop="provider">
                <el-select v-model="addForm.provider" filterable placeholder="请选择" style="width: 100%;">
                  <el-option
                    v-for="item in staffList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">需求描述</td>
            <td class="td-text" colspan="3">
              <el-form-item prop="chanceRemark">
                <el-input type="text" v-model="addForm.chanceRemark"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <div class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
        <el-button class="save-button" @click="saveSubmitForm('addForm')">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  import webStorage from 'webStorage'

  export default {
    name: 'addDialog',
    data () {
      return {
        dataLoading: false,
        addForm: { // 添加表单
          customerId: '',
          state: 2,
          billDate: '',
          intentBillAmount: '',
          intentProductCate: '',
          intentProductCateName: '',
          intentProductId: '',
          intentProductName: '',
          chanceRemark: '',
          pageSource: 1, // 公海添加需求，传2. 其他传1
          chanceSource: '',
          provider: '', // 需求提供人
        },
        customersList: [],
        salesState: [],
        intentProductCateList: [],
        intentProductList: [],
        staffList: [], // 机构用户
        rules: {
          customerId: [
            {required: true, message: '请输入所属公司', trigger: 'blur'},
          ],
          state: [
            // {required: true, message: '请选择需求阶段', trigger: 'change'},
          ],
          billDate: [
            {required: true, message: '请选择预计签单时间', trigger: 'change'},
          ],
          intentBillAmount: [
            {required: true, message: '请输入预计签单金额', trigger: 'blur'},
          ],
          intentProductCate: [
            {required: true, message: '请选择意向商品分类', trigger: 'change'},
          ],
          intentProductId: [
            {required: true, message: '请选择意向商品', trigger: 'change'},
          ],
          chanceRemark: [
            // {required: true, message: '请输入需求描述', trigger: 'blur'},
          ],
        },
        chanceSourceType: [], // 来源
        chanceSourceArr: [],
        props: {
          value: 'id',
          label: 'codeName',
        },
        targetObj: null,
        // selectedBindValue: [],
        selectLastLevelMode: true,
      }
    },
    props: ['params'],
    methods: {
      areaSelectedOptionsHandleChange (value) {
        console.log(value)
      },
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataLoading = true
            console.log(this.params); return;
            if (this.params.detail) { // 编辑
              // API.salesOpportunities.confirm({path: this.addForm.id, body: this.addForm}, (data) => {
              //   if (data.status) {
              //     this.$message.success('操作成功')
              //     setTimeout(() => {
              //       this.dataLoading = false
              //       this.$vDialog.close({type: 'save'})
              //     }, 500)
              //   } else {
              //     setTimeout(() => {
              //       this.dataLoading = false
              //     }, 500)
              //   }
              // })
            } else {
              API.customerSea.addChance(this.addForm, (data) => {
                if (data.status) {
                  this.$message.success('添加成功')
                  setTimeout(() => {
                    this.dataLoading = false
                    this.$vDialog.close({type: 'save'})
                  }, 500)
                } else {
                  setTimeout(() => {
                    this.dataLoading = false
                  }, 500)
                }
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getCustomersList () { // 当前登陆用户所有的拥有团队成员权限的客户信息
        API.customer.teamAboutCustomerlist(null, data => {
          if (data.status) {
            this.customersList = data.data
          }
        })
      },
      getIntentProductCateList () {
        API.external.goodsTypeList((data) => {
          this.intentProductCateList = data.content
        })
      },
      getIntentProductList (p) {
        API.common.organizationGoodsConf({
          goodsTypeId: p.id,
          organizationId: webStorage.getItem('userInfo').organizationId,
          servicePrincipalType: p.servicePrincipalType,
          saleable: 1,
        }, (data) => {
          this.intentProductList = data.data
        })
      },
      intentProductIdChangeHandle (id) { // 商品下拉改变
        this.intentProductList.forEach(item => {
          if (item.goodsId === id) {
            this.addForm.intentProductName = item.goodsName
          }
        })
      },
      intentProductCateChangeHandle (id) { // 分类

        let _cusid = this.addForm.customerId, _cate = '', _cuslist = this.customersList, servicePrincipalType = null;
        if(_cuslist.length > 0) {
          _cuslist.forEach(a => {
            if(_cusid == a.id) {
              _cate = a.cate;
            }
          })
        }
        servicePrincipalType = _cate == 1 ? 'Person' : 'Company';

        this.getIntentProductList({id, servicePrincipalType}) // 分类id获取商品
        this.addForm.intentProductName = ''
        this.addForm.intentProductId = ''
        this.intentProductCateList.forEach(item => {
          if (item.objectId === id) {
            this.addForm.intentProductCateName = item.name
          }
        })
      },
      getConfigData (type, pCode) {
        API.common.codeConfig({type: type, pCode: pCode}, (data) => {
          if (type === 2) {
            this.levelList = data.data
          } else if (type === 3) {
            this.industryList = data.data
          } else if (type === 5) {
            // let arr = data.data.map((item) => {
            //   item.children = []
            //   return item
            // })
            if (this.chanceSourceType.length === 0) {
              // this.chanceSourceType = arr
              // 客户公池中列表及详情页面中的新增弹框均固定为调取公司资源，
              // 其他模块中新增调取销售自建，
              // 金钥匙微信端调取代理商并不让用户填写直接把字段传后台
              this.chanceSourceType = [
                { // 公司资源
                  codeName: this.params.topSource[2].name,
                  id: this.params.topSource[2].value,
                  children: [],
                }]
              // this.selectedBindValue.push(this.params.topSource[2].value)
              this.chanceSourceArr.push(this.params.topSource[2].value)
              this.chanceSourceChangeHandle([this.params.topSource[2].value]) // 默认获取第二级
            }
          }
        })
      },
      chanceSourceChangeHandle (va) {
        this.getLastItem(this.chanceSourceType, va, 'id')
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
        // console.log(va)
        this.addForm.chanceSource = va.join('-')
      },
      // chanceSourceChange (va) {
      //   this.addForm.chanceSource = va.join('-')
      // },
      getLastItem (list, vals, key) { // 获取点击得目标对象, key 对应得 值vals 数组
        let LIST = list || []
        // console.log(LIST, vals, key)
        for (let item of LIST) {
          if (item[key] === vals[vals.length - 1]) {
            this.targetObj = item
            // this.selectedBindValue.push(item[key])
            break
          } else {
            this.getLastItem(item.children, vals, key)
          }
        }
      },
      getStaffList () { // 用户信息
        API.user.listOrgUser((data) => {
          this.staffList = data.data
        })
      },
    },
    created () {
      this.getCustomersList()
      this.getIntentProductCateList()
      this.salesState = this.params.salesState
      if (this.params.detail) { // 编辑
        let servicePrincipalType = this.params.detail.customerCate == 1 ? 'Person' : 'Company';
        this.addForm = this.params.detail // 需要根据分类id获取商品列表进行展示
        this.getIntentProductList({id: this.addForm.intentProductCate, servicePrincipalType})
      }
      if (this.params.stateValue) { // 设置默认2，销售阶段；[公海1]
        this.addForm.state = this.params.stateValue
        this.addForm.pageSource = 2 // 公海添加需求，传2. 其他传1
      }
      if (this.params.detailCustomersId) { // 详细页面的添加, 并禁用下拉列表
        this.addForm.customerId = this.params.detailCustomersId
      }

      // 来源
      this.getConfigData(5, 0)
      this.getStaffList()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
</style>
