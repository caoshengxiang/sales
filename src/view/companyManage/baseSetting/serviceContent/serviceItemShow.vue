<template>
  <div class="com-dialog"  style="padding: 20px">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
             label-width="160px"
             label-position="left"
             class="demo-ruleForm">
      <el-form-item label="服务商品名称">
        <label>{{params.goodsName}}</label>
      </el-form-item>
      <el-form-item label="商品事项配置" prop="serviceType">
        <!--         default-expand-all-->
        <el-tree :data="serviceItemConfigAll"
                 node-key="itemType"
                 show-checkbox
                 default-expand-all
                 :default-checked-keys="defaultCheckedKeys"
                 :props="defaultProps"
                 @check-change="handleCheckChange"
                 @node-click="handleNodeClick"></el-tree>
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <!--<el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>-->
      <!--<el-button class="save-button" type="primary" @click="submitForm('ruleForm')">确 定</el-button>-->
    </div>
  </div>
</template>

<script>
  import API from '../../../../utils/api'

  export default {
    name: 'serviceItemShow',
    data () {
      return {
        ruleForm: {
          serviceType: 1, // 服务顺序类型 1-串行 2-并行
        },
        rules: {
          // name: [
          //   {required: true, message: '请输入活动名称', trigger: 'blur'},
          //   {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'},
          // ],
          // region: [
          //   {required: true, message: '请选择活动区域', trigger: 'change'},
          // ],
        },
        serviceItemConfigAll: [],
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
        checkItem: {},
        checkItemAll: {},
        defaultCheckedKeys: [],
      }
    },
    props: ['params'],
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let serviceContentP = []
            this.serviceItemConfigAll.forEach(allItem => {
              serviceContentP.push({
                serviceName: allItem.serviceName,
                serviceType: allItem.serviceType,
                items: [],
              })
            })
            for (let key in this.checkItem) {
              let checkItem = this.checkItem[key]
              let arr = checkItem.pos.split('-')
              serviceContentP[arr[0]].items.push(
                {
                  itemType: this.checkItem[key].itemType,
                  itemTitle: this.checkItem[key].itemTitle,
                  moduleName: this.checkItem[key].moduleName,
                  moduleType: this.checkItem[key].moduleType
                })
            }
            // console.log(serviceContentP)
            let serviceContentParam = serviceContentP.filter(item => {
              return item.items.length
            })
            // console.log(serviceContentParam)
            this.$vDialog.close({type: 'configItem', serviceContent: serviceContentParam})
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      getServiceItemConfigAll () {
        API.common.serviceItemConfigAll(null, (da) => {
          this.serviceItemConfigAll = da.data
          this.serviceItemConfigAll.forEach((item1, index1) => {
            item1.label = item1.serviceName
            item1.pos = index1 + ''
            if (item1.modules.length) {
              item1.children = JSON.parse(JSON.stringify(item1.modules))
              item1.children.forEach((item2, index2) => {
                item2.label = item2.moduleName
                item2.pos = index1 + '-' + index2
                if (item2.items.length) {
                  item2.children = JSON.parse(JSON.stringify(item2.items))
                  item2.children.forEach((item3, index3) => {
                    item3.moduleName = item2.moduleName
                    item3.moduleType = item2.moduleType
                    item3.label = item3.itemTitle
                    item3.pos = index1 + '-' + index2 + '-' + index3
                    this.checkItemAll[item3.pos] = item3
                  })
                }
              })
            }
          })
          this.initChecked()
        })
      },
      handleNodeClick (data) {
        console.log(data)
      },
      handleCheckChange (data, checked, indeterminate) {
        // console.log(data.pos.length)
        // console.log(data, checked, indeterminate)
        if (data.pos.length === 1 && !indeterminate) {
          data.children.forEach(item1 => {
            item1.children.forEach(item2 => {
              if (checked) {
                this.checkItem[item2.pos] = item2
              } else {
                delete this.checkItem[item2.pos]
              }
            })
          })
        } else if (data.pos.length === 3 && !indeterminate) {
          data.children.forEach(item1 => {
            if (checked) {
              this.checkItem[item1.pos] = item1
            } else {
              delete this.checkItem[item1.pos]
            }
          })
        } else if (data.pos.length === 5) {
          if (checked) {
            this.checkItem[data.pos] = data
          } else {
            delete this.checkItem[data.pos]
          }
        }
        // console.log(this.checkItem)
      },
      initChecked () { //  初始选中
        if (this.params.serviceContent) {
          this.params.serviceContent.forEach((item1, index1) => {
            if (item1.items.length) {
              item1.items.forEach((item3, index3) => {
                for (let key in this.checkItemAll) {
                  if (this.checkItemAll[key].itemType === item3.itemType) {
                    this.defaultCheckedKeys.push(this.checkItemAll[key].itemType)
                    this.checkItem[key] = this.checkItemAll[key]
                  }
                }
              })
            }
          })
        }
      },
    },
    created () {
      // this.$vDialog.close({type: 'save'})
      this.getServiceItemConfigAll()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
