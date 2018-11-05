<template>
  <div class="com-dialog com-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
             label-width="160px"
             label-position="left"
             class="demo-ruleForm">
      <el-form-item label="服务商品名称">
        <label>{{params.goodName}}</label>
      </el-form-item>
      <el-form-item label="商品事项配置" prop="serviceType">
        <!--         default-expand-all-->
        <el-tree :data="serviceItemConfigAll"
                 node-key="itemType"
                 show-checkbox
                 :default-checked-keys="defaultCheckedKeys"
                 :props="defaultProps"
                 @check-change="handleCheckChange"
                 @node-click="handleNodeClick"></el-tree>
      </el-form-item>
      <el-form-item>
        <div class="dialog-footer">
          <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
          <el-button class="save-button" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import API from '../../../../utils/api'

  export default {
    name: 'serviceItem',
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
            // let item1 = [[], [], [], [], [], [], []]
            // let item2 = []
            // let item3 = []
            for (let key in this.checkItem) {
              let arr = key.split('-')
              console.log(arr)

              // let checkItem = this.checkItem[key]
              // if (checkItem.itemType >= 1 && checkItem.itemType <= 3) {
              //   serviceName
              // }
              // let serviceContentP = {
              //   serviceName: this.serviceItemConfigAll[arr[0]].serviceName,
              //   serviceType: this.serviceItemConfigAll[arr[0]].serviceType,
              //   modules: this.serviceItemConfigAll[arr[0]].modules[arr[1]]
              // }
              // serviceContentP.push([{
              //   serviceName: this.serviceItemConfigAll[arr[0]].serviceName,
              //   serviceType: this.serviceItemConfigAll[arr[0]].serviceType,
              //   modules: this.serviceItemConfigAll[arr[0]].modules
              // }])
                }

            console.log(serviceContentP)
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
        console.log(data.pos.length)
        console.log(data, checked, indeterminate)
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
        console.log(this.checkItem)
      },
      initChecked () { //  初始选中
        if (this.params.serviceContent) {
          this.params.serviceContent.forEach((item1, index1) => {
            if (item1.modules.length) {
              item1.modules.forEach((item2, index2) => {
                if (item2.items.length) {
                  item2.items.forEach((item3, index3) => {
                    console.log(item3.itemType)
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
