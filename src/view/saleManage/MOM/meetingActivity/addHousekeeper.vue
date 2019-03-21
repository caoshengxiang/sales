<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="addForm" ref="addForm" label-width="150px" :rules="rules">
          <el-form-item prop="housekeeperSel" label="请选择商务管家">
            <el-select v-model="addForm.housekeeperSel" multiple
                       style="width: 300px;" placeholder="请选择商务管家">
              <el-option v-for="item in houseKeeperList" :key="item.managerId" :label="item.managerName"
                         :value="item.managerId"></el-option>
            </el-select>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
        <el-button class="save-button" @click="saveSubmitForm('addForm')">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  // import { chartLengthRule } from '../../../../utils/const'
  // import { arrToStr } from '../../../../utils/utils'

  export default {
    name: 'addHouseKeeper',
    data () {
      return {
        dataLoading: false,
        addForm: { // 添加表单
          housekeeperSel: [],
          id: null,
        },
        rules: {
          housekeeperSel: [
            {required: true, type: 'array', message: '请选择商务管家', trigger: 'blur'},
          ],
        },
        houseKeeperList: [],
      }
    },
    props: ['params'],
    methods: {
      getHouseKeeperList () {
        API.activity.selectManagerList(this.addForm.id, (da) => {
          this.houseKeeperList = da.data
        }, (da) => {
          this.houseKeeperList = da.data
        })
      },
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataLoading = true
            API.activity.addHousekeeper({id: this.addForm.id, ids: this.addForm.housekeeperSel.join(',')},
              (data) => {
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
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
    },
    created () {
      if (this.params.id) { // add
        this.addForm.id = this.params.id
        this.getHouseKeeperList()
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
</style>
