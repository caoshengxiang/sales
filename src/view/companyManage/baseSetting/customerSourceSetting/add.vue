<template>
  <div class="com-dialog-container" v-loading="loading">
    <div class="com-dialog">
      <el-form :model="form" ref="form" :rules="rules" :disabled="isFormDisabled">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">请输入客户源名称</td>
            <td class="td-text">
              <el-form-item prop="codeName">
                <el-input type="text" v-model="form.codeName" :placeholder="'请输入客户源名称'" :maxlength="30"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr v-if="params.action === 'add'">
            <td class="td-title">上级客户源</td>
            <td class="td-text">
              <el-form-item>
                <el-input type="text" v-model="pName" placeholder="无" :disabled="true"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="closeDialog">取 消</el-button>
        <el-button class="save-button" @click="save('form')">确 定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '../../../../utils/api'
  import { Message } from 'element-ui'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        loading: false,
        isFormDisabled: false,
        form: {
          pCode: 0,
        },
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
        },
        pName: '',
      }
    },
    computed: {
      ...mapState('constData', [
        'organizationType',
      ]),
    },
    props: ['params'],
    created () {
      var that = this
      that.$store = that.params.store // 状态库赋值
      if (that.params.currentNode) {
        if (that.params.action === 'add') {
          that.pName = that.params.currentNode.codeName
          that.form.pCode = that.params.currentNode.id
        } else {
          that.form.codeName = that.params.currentNode.codeName
          that.form.id = that.params.currentNode.id
          that.form.pCode = that.params.currentNode.pCode
        }
      }
    },
    methods: {
      closeDialog () {
        this.$vDialog.close()
      },
      save (formName) {
        var that = this
        that.form.type = 5
        that.$refs[formName].validate((valid) => {
          if (valid) {
            switch (that.params.action) {
              case 'add':
                that.loading = true
                API.baseSetting.add(that.form, function (resData) {
                  that.loading = false
                  if (resData.status) {
                    Message({
                      message: '新增成功！',
                      type: 'success',
                    })
                    that.$vDialog.close() // 关闭弹窗
                  }
                }, function () {
                  that.loading = false
                  Message({
                    message: '系统繁忙，请稍后再试！',
                    type: 'error',
                  })
                })
                break
              case 'update':
                that.loading = true
                // let param = { // 未使用
                //   codeName: that.form.codeName,
                //   type: 5,
                //   id: that.form.id,
                // }
                API.baseSetting.edit(that.form, function (resData) {
                  that.loading = false
                  if (resData.status) {
                    Message({
                      message: '修改成功！',
                      type: 'success',
                    })
                    that.$vDialog.close() // 关闭弹窗
                  }
                }, function () {
                  that.loading = false
                  Message({
                    message: '系统繁忙，请稍后再试！',
                    type: 'error',
                  })
                })
                break
            }
          }
        })
      },
      getRoleDetail (id) {
        var that = this
        that.loading = true
        API.role.getDetail({id: id}, function (res) {
          that.loading = false
          if (res.status) {
            that.form = res.data
          } else {
            Message({
              message: res.error.message,
              type: 'error',
            })
          }
        }, function () {
          that.loading = false
          Message({
            message: '系统繁忙，请稍后再试1！',
            type: 'error',
          })
        })
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
</style>
