<template>
  <div class="com-dialog-container" v-loading="loading">
    <div class="com-dialog">
      <el-form label-position="left" :model="form" ref="form" :rules="rules" label-width="140px">
          <el-form-item prop="name" label="请输入分组名称">
            <el-input type="text" v-model="form.name" placeholder="请输入分组名称"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="closeDialog">取 消</el-button>
        <el-button class="save-button" @click="save('form')">确 定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '../../../utils/api'
  import { Message } from 'element-ui'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        loading: false,
        form: {
          name: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ]
        },
        type: 'add',
      }
    },
    computed: {
      ...mapState('constData', [
        'organizationType'
      ])
    },
    props: ['params'],
    created () {
      if (this.params.type === 'edit') {
        this.type = 'edit'
        this.form.name = this.params.name
      }
      this.form.organizationId = this.params.organizationId
    },
    methods: {
      closeDialog () {
        this.$vDialog.close()
      },
      save (formName) {
        var that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            switch (that.params.type) {
              case 'add':
                that.loading = true
                API.customerSea.add(Object.assign({}, that.form, {organizationId: that.params.organizationId}), (resData) => {
                  that.loading = false
                  if (resData.status) {
                    Message({
                      message: '新增成功！',
                      type: 'success'
                    })
                    that.$vDialog.close() // 关闭弹窗
                  }
                })
                break
              case 'edit':
                that.loading = true
                API.customerSea.edit(Object.assign({}, that.form, {id: that.params.id}), function (resData) {
                  that.loading = false
                  if (resData.status) {
                    Message({
                      message: '修改成功！',
                      type: 'success'
                    })
                    that.$vDialog.close() // 关闭弹窗
                  }
                }, function () {
                  that.loading = false
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
              type: 'error'
            })
          }
        }, function () {
          that.loading = false
          Message({
            message: '系统繁忙，请稍后再试1！',
            type: 'error'
          })
        })
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
</style>
