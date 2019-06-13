<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules">
        <table class="com-dialog-table" v-if="addForm.visitorType === 1">
          <tr>
            <td class="td-title">访客名称</td>
            <td class="td-text">
              <el-form-item>
                <el-input type="text" v-model="addForm.name"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">访客联系人</td>
            <td class="td-text">
              <el-form-item>
                <el-input type="text" v-model="addForm.contactName"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">联系电话</td>
            <td class="td-text">
              <el-form-item>
                <el-input type="text" v-model="addForm.phone"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">联系人职务</td>
            <td class="td-text">
              <el-form-item>
                <el-input type="text" v-model="addForm.contactPosition"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">访客地区</td>
            <td class="td-text">
              <el-form-item>
                <AreaSelect ref="areaSe"
                            :area="(addForm.provinceName?addForm.provinceName:'') + ' ' + (addForm.cityName?addForm.cityName:'')  + ' ' + (addForm.areaName?addForm.areaName:'')"
                            @change="areaSelectedOptionsHandleChange"
                            :selectLastLevelMode="true"></AreaSelect>
              </el-form-item>
            </td>
            <td class="td-title">访客行业</td>
            <td class="td-text">
              <!--<input type="text" v-model="addForm.industry">-->
              <el-form-item>
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
                  @change="industryChangeHandle"
                  v-model="addForm.industryArr">
                </el-cascader>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">访客来源</td>
            <td class="td-text">
              <el-form-item>
                <el-cascader
                  style="width: 100%"
                  :change-on-select="true"
                  :options="viscustomerSourceType"
                  v-model="viscustomerSourceArr"
                  @active-item-change="viscustomerSourceChangeHandle"
                  @change="viscustomerSourceChangeHandle"
                  :props="props"
                  :placeholder="addForm.visitorResourceName"
                  :value="selectedBindValue"
                  :disabled="addForm.visitorResource"
                >
                </el-cascader>
              </el-form-item>
            </td>
            <td class="td-title">访客推荐人</td>
            <td class="td-text">
              <el-form-item>
                <el-select v-model="addForm.visitorReferrer" placeholder="请选择客户类型" :disabled="addForm.visitorReferrer">
                  <el-option v-for="item in conferenceExecutiveList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
        </table>
        
        <table class="com-dialog-table" v-else>
          <tr>
            <td class="td-title">客户类型</td>
            <td class="td-text">
              <el-form-item prop="cate">
                <el-select v-model="addForm.cate" placeholder="请选择客户类型">
                  <el-option label="个人" :value="1"></el-option>
                  <el-option label="机构" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="td-title">客户名称</td>
            <td class="td-text">
              <el-form-item prop="name">
                <el-input type="text" v-model="addForm.name"></el-input>
              </el-form-item>
            </td>

            <td class="td-title">证件号码</td>
            <td class="td-text">
              <el-form-item prop="cdKey">
                <el-input type="text" v-model="addForm.cdKey"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">所属公海</td>
            <td class="td-text">
              <el-form-item prop="seaId">
                <el-select v-model.number="addForm.seaId" placeholder="请选择所属公海">
                  <el-option v-for="item in seaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="td-title">客户级别</td>
            <td class="td-text">
              <!--<input type="text" v-model="addForm.levelName">-->
              <el-form-item prop="level">
                <el-select v-model="addForm.level" @change="selectLevel" placeholder="请选择客户级别">
                  <el-option v-for="item in levelList" :key="item.codeName" :label="item.codeName"
                             :value="item.codeName"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="td-title">客户行业</td>
            <td class="td-text">
              <!--<input type="text" v-model="addForm.industry">-->
              <el-form-item prop="industryArr">
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
                  @change="industryChangeHandle"
                  v-model="addForm.industryArr">
                </el-cascader>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">客户地区</td>
            <td class="td-text">
              <el-form-item prop="provinceId">
                <AreaSelect ref="areaSe"
                            :area="(addForm.provinceName?addForm.provinceName:'') + ' ' + (addForm.cityName?addForm.cityName:'')  + ' ' + (addForm.areaName?addForm.areaName:'')"
                            @change="areaSelectedOptionsHandleChange"
                            :selectLastLevelMode="true"></AreaSelect>
              </el-form-item>
            </td>
            <td class="td-title">公司网站</td>
            <td class="td-text">
              <el-form-item prop="website">
                <el-input type="text" v-model="addForm.website"></el-input>
              </el-form-item>
            </td>
          </tr>
          <!--<tr>-->
            <!--<td class="td-title">客户联系人</td>-->
            <!--<td class="td-text">-->
              <!--<el-form-item prop="contactName">-->
                <!--<el-input type="text" v-model="addForm.contactName"></el-input>-->
              <!--</el-form-item>-->
            <!--</td>-->
            <!--<td class="td-title">客户电话</td>-->
            <!--<td class="td-text">-->
              <!--<el-form-item prop="phone">-->
                <!--<el-input type="text" v-model="addForm.phone"></el-input>-->
              <!--</el-form-item>-->
            <!--</td>-->
          <!--</tr>-->
          <tr>
            <td class="td-title">客户来源</td>
            <td class="td-text" colspan="5">
              <el-form-item prop="customerSource">
                <el-cascader
                  style="width: 100%"
                  :disabled="!!params.detail"
                  :change-on-select="selectLastLevelMode"
                  :options="customerSourceType"
                  v-model="customerSourceArr"
                  @active-item-change="customerSourceChangeHandle"
                  @change="customerSourceChangeHandle"
                  :props="props"
                  :placeholder="addForm.customerSourceName"
                  :value="selectedBindValue"
                >
                </el-cascader>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">联系地址</td>
            <td class="td-text" colspan="5">
              <el-form-item prop="address">
                <el-input type="text" v-model="addForm.address"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">主营业务</td>
            <td class="td-text" colspan="5">
              <el-form-item prop="business">
                <el-input type="text" v-model="addForm.business"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
        <el-button class="save-button" @click="saveSubmitForm('addForm', true)" v-if="addForm.visitorType !== 1">保存并新建联系人</el-button>
        <el-button class="save-button" @click="saveSubmitForm('addForm', false)">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import addContactDialog from '../contacts/addDialog'
  import API from '../../../../utils/api'
  import { chartLengthRule } from '../../../../utils/const'

  export default {
    name: 'addDialog',
    data () {
      return {
        addDialogVisible: false, // 新增
        dataLoading: false,
		conferenceExecutiveList: [],       //所有需求提供人
        addForm: { // 添加客户表单
          name: '',
          businessLicense: '',
          level: '',
          contactName: '',
          industry: '',
          provinceId: '',
          cityId: '',
          areaId: '',
          website: '',
          phone: '',
          seaId: '',
          address: '',
          business: '',
          customerSource: '',
          industryArr: [],
          contactPosition: '',
        },
        areaOptionsData: [],
        // areaSelectedOptions: [],
        industryList: [], // 行业
        levelList: [], // 级别
        seaList: [], // 公海
        industryType: [],
        rules: {
          cate: [
            {required: true, message: '请选择客户类型', trigger: 'change'},
            // {min: 1, max: 50, message: '长度为 50 个字符以内', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入客户名称', trigger: 'blur'},
            {min: 1, max: 50, message: '长度为 50 个字符以内', trigger: 'blur'},
          ],
          cdKey: [
            {required: true, message: '请输入证件号码', trigger: 'blur'},
            {min: 1, max: 50, message: '长度为 50 个字符以内', trigger: 'blur'},
          ],
          businessLicense: [
            // {required: true, message: '请输入营业执照', trigger: 'blur'},
            {max: 30, message: '长度为 30 个字符以内', trigger: 'blur'},
          ],
          level: [
            // {required: true, message: '请选择客户等级', trigger: 'change'},
          ],
          contactName: [
            // {required: true, message: '请输入客户简称', trigger: 'blur'},
            {max: 30, message: '长度为 30 个字符以内', trigger: 'blur'},
          ],
          industryArr: [
            {required: true, message: '请选择客户行业', trigger: 'change'},
          ],
          provinceId: [
            {required: true, message: '请选择客户地区', trigger: 'change'},
          ],
          cityId: [],
          areaId: [],
          website: [
            // {required: true, message: '请输入公司网站', trigger: 'blur'},
            {max: 100, message: '长度为 100 个字符以内', trigger: 'blur'},
          ],
          phone: [
            // {required: true, message: '请输入联系电话', trigger: 'blur'},
            chartLengthRule.validatePhone,
          ],
          // seaName: '',
          seaId: [
            {required: true, message: '请选择客户公海', trigger: 'change'},
          ],
          address: [
            {required: true, message: '请输入联系地址', trigger: 'blur'},
          ],
          business: [
            {required: true, message: '请输入主营业务', trigger: 'blur'},
            {max: 100, message: '长度为 100 个字符以内', trigger: 'blur'},
          ],
          // customerSource: [
          //   {required: true, message: '请选择客户来源', trigger: 'change'},
          // ],
        },
        dialogType: 'add',
        customerSourceType: [], // 客户来源
        viscustomerSourceType: [], // 访客来源
        customerSourceArr: [],
        viscustomerSourceArr: [],
        props: {
          value: 'id',
          label: 'codeName',
        },
        targetObj: null,
        selectedBindValue: [],
        selectLastLevelMode: true,
      }
    },
    props: ['params'],
    methods: {
        // 获取所有需求提供人
        getAllStaff () {
            API.activity.staffZX('', (data) => {
                if(data.status) {
                    this.conferenceExecutiveList = data.data;
                }
            })
        },
      areaSelectedOptionsHandleChange (value) {
        let name = this.$refs.areaSe.getSelectedName(value)
        this.addForm.provinceId = value[0] || ''
        this.addForm.cityId = value[1] || ''
        this.addForm.areaId = value[2] || ''
        this.addForm.provinceName = name[0] || ''
        this.addForm.cityName = name[1] || ''
        this.addForm.areaName = name[2] || ''
      },
      selectLevel (val) {
        // this.levelList.forEach(item => {
        //   if (item.id === val) {
        //     this.addForm.levelName = item.codeName
        //   }
        // })
      },
      selectIndustry (val) {
        // this.industryList.forEach(item => {
        //   if (item.id === val) {
        //     this.addForm.industryName = item.codeName
        //   }
        // })
      },
      saveSubmitForm (formName, addContact) {
        // console.log(this.$refs.areaSe.getSelectedValue(), '区域')
        if(this.params.detail.visitorType === 1) {
            let message = !this.addForm.phone && '请输入联系人电话' ||
                          !this.addForm.visitorResource && '请选择访客来源' ||
                          !this.addForm.visitorReferrer && '请选择访客推荐人' || null;
            if(message) {
                return this.$message.info(message);
            }
            // 编辑访客
              API.customer.visEdit({
                path: this.addForm.id,
                body: this.addForm,
              }, (data) => {
                if (data.status) {
                  this.$message.success('访客编辑成功')
                  setTimeout(() => {
                    this.dataLoading = false
                    this.$vDialog.close({type: 'save'})
                    if (addContact) {
                      this.saveAndAddContact()
                    }
                  }, 500)
                } else {
                  setTimeout(() => {
                    this.dataLoading = false
                  }, 500)
                }
              })
            
        }else {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.addForm.industry = this.addForm.industryArr.join(',')
                this.dataLoading = true
                if (this.dialogType === 'add') {
                  API.customer.add({
                    query: {pageSource: this.params.pageSource},
                    body: this.addForm,
                  }, (data) => {
                    if (data.status) {
                      this.$message.success('添加成功')
                      setTimeout(() => {
                        this.dataLoading = false
                        this.$vDialog.close({type: 'save'})
                        if (addContact) {
                          this.saveAndAddContact()
                        }
                      }, 500)
                    } else {
                      setTimeout(() => {
                        this.dataLoading = false
                      }, 500)
                    }
                  })
                } else {
                  API.customer.edit({
                    path: this.addForm.id,
                    body: this.addForm,
                  }, (data) => {
                    if (data.status) {
                      this.$message.success('编辑成功')
                      setTimeout(() => {
                        this.dataLoading = false
                        this.$vDialog.close({type: 'save'})
                        if (addContact) {
                          this.saveAndAddContact()
                        }
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
        }
      },
      saveAndAddContact () {
        this.$vDialog.modal(addContactDialog, {
          title: '新增联系人',
          width: 900,
          height: 460,
          params: {
            addCustomersAndAddContact_customerName: this.addForm.name,
          },
          callback (data) {
            if (data.type === 'save') {}
          },
        })
      },
      getAreaOptionsData (id) {
        API.common.region(id, (data) => {
          this.areaOptionsData = data.data
        })
      },
      handleAreaItemChange (val) {
        console.log('val', val)
      },
      getConfigData (type, pCode) {
        API.common.codeConfig({type: type, pCode: pCode}, (data) => {
          if (type === 2) {
            this.levelList = data.data
            if (this.viscustomerSourceType.length === 0) {
              this.viscustomerSourceType = [
                {
                  codeName: this.params.topSource[2].name,
                  id: this.params.topSource[2].value,
                }]
              if (this.params.detail) { // 编辑
                let arr = this.params.detail.visitorResource.split('-');
                // this.viscustomerSourceArr = arr.map(item => {
                //   return parseInt(item, 10)
                // })
              }
              this.viscustomerSourceChangeHandle([this.params.topSource[2].value]) // 默认获取第二级
            }
          } else if (type === 3) {
            this.industryList = data.data
          } else if (type === 5) {
            // let arr = data.data.map((item) => {
            //   item.children = []
            //   return item
            // })
            if (this.customerSourceType.length === 0) {
              // this.customerSourceType = arr
              // 客户公池中列表及详情页面中的新增弹框均固定为调取公司资源，
              // 其他模块中新增调取销售自建，
              // 金钥匙微信端调取代理商并不让用户填写直接把字段传后台
              this.customerSourceType = [
				{
                  codeName: this.params.topSource[2].name,
                  id: this.params.topSource[2].value,
                }]
              // this.selectedBindValue.push(this.topSource[0].value)
              if (this.params.detail) { // 编辑
                let arr = this.params.detail.customerSource.split('-')
                // this.customerSourceArr = arr.map(item => {
                //   return parseInt(item, 10)
                // })
              }
              this.customerSourceChangeHandle([this.params.topSource[2].value]) // 默认获取第二级
            }
          }
        })
      },
      customerSourceChangeHandle (va) {
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
          this.addForm.customerSource = this.customerSourceArr.join('-')
      },
      viscustomerSourceChangeHandle (va) {
        this.getLastItem(this.viscustomerSourceType, va, 'id')
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
          this.addForm.visitorResource = this.viscustomerSourceArr.join('-')
      },
      industryChangeHandle (va) {
        let parentId
        let that = this
        if (va.length) {
          parentId = va[va.length - 1]
        } else {
          parentId = 0
        }
        API.common.industry({parentId: parentId, status: true}, (data) => {
          // console.log('目标item:', this.targetObj)
          if (data.data.length) {
            let arr = data.data.map((item) => {
              item.children = []
              return item
            })
            if (va.length){
              that.getLastItem(that.industryType, va, 'id')
              that.targetObj.children = arr
            } else {
              that.industryType = arr
              if (that.addForm.industry) {
                that.addForm.industryArr = []
                that.initIndustry(that.addForm.industryArr, that.industryType, that.addForm.industry.split(','), 0)
              }
            }
          } else {
            that.getLastItem(that.industryType, va, 'id')
            that.targetObj.children = null
            setTimeout(function () {
              if ($('.selectIndustryModule').hasClass('is-opened')) {
                $('.selectIndustryModule').trigger('click')
              }
            }, 100)
          }
        })
      },
      initIndustry (industryArr, list, vals, index) {
        let that = this
        if (index < vals.length) {
          for (let item of list) {
            if (item['name'] === vals[index]) {
              industryArr.push(item['id'])
              API.common.industry({parentId: item['id'],status: true}, (data) => {
                // console.log('目标item:', this.targetObj)
                if (data.data.length) {
                  let arr = data.data.map((item) => {
                    item.children = []
                    return item
                  })
                  item.children = arr
                  that.initIndustry(industryArr, item.children, vals, index + 1)
                }
              })
            }
          }
        }
      },
      // customerSourceChange (va) {
      //   this.addForm.customerSource = va.join('-')
      // },
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
    },
    created () {
      this.getAreaOptionsData(null)
      this.getConfigData(2)
      this.getConfigData(5, 0)
      this.getSeaList()
      if (this.params.detail) { // 编辑
        this.addForm = JSON.parse(JSON.stringify(this.params.detail))
        console.log(this.addForm)
        if(this.addForm.visitorResource) {
            this.viscustomerSourceArr = this.addForm.visitorResource.split('-');
        }
        if(this.addForm.customerSource) {
            this.customerSourceArr = this.addForm.customerSource.split('-');
        }
        this.getAllStaff();
        this.dialogType = 'edit'
		this.$set(this.addForm, 'industryArr', []);//给默认值
      }
      this.industryChangeHandle([])
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
</style>
