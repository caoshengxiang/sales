<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form v-loading="loading" :model="form" ref="form" :rules="rules" :disabled ="isFormDisabled">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">请输入角色名称</td>
            <td class="td-text">
              <el-form-item prop="name">
                <el-input type="text" v-model="form.name" placeholder="请输入角色名称"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">请选择角色系统</td>
            <td class="td-text">
              <el-form-item prop="businessSystems">
                <el-select v-model="form.businessSystems" multiple placeholder="请选择角色系统">
                  <el-option
                    v-for="item in businessSystems"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">请选择角色职能</td>
            <td class="td-text">
              <el-form-item prop="roleBilitys">
                <el-select v-model="form.roleBilitys" multiple placeholder="请选择角色职能">
                  <el-option
                    v-for="item in roleBilitys"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">请设置角色跟进公池客户最大数量</td>
            <td class="td-text">
              <el-form-item prop="maxSeaFollower">
                <el-input type="text" v-model="form.maxSeaFollower" placeholder="请设置角色跟进公池客户最大数量"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">请设置角色每月公池客户最大获取量</td>
            <td class="td-text">
              <el-form-item prop="maxSeaFollowerPerMonth">
                <el-input type="text" v-model="form.maxSeaFollowerPerMonth" placeholder="请设置角色每月公池客户最大获取量"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button">取 消</el-button>
        <el-button class="save-button" @click="save('form')">确 定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '../../../utils/api'
  import { mapState } from 'vuex'
  import { Message } from 'element-ui'

  export default {
    data () {
      return {
        loading:false,
        isFormDisabled:false,
        form: {
          businessSystems:[100],
          roleBilitys:[600]
        },
        rules: {
          name: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
          roleBilitys: [
            {required: true, message: '请选择角色职能', trigger: 'blur'},
          ],
          businessSystems: [
            {required: true, message: '请选择角色系统', trigger: 'blur'},
          ],
          maxSeaFollower: [
            {required: true, message: '请设置角色跟进公池客户最大数量', trigger: 'blur'},
          ],
          maxSeaFollowerPerMonth: [
            {required: true, message: '请设置角色每月公池客户最大获取量', trigger: 'blur'},
          ]
        }
      }
    },
    computed:{
      ...mapState('constData', [
        'businessSystems',
        'roleBilitys'
      ])
    },
    props: ['params'],
    created() {
      this.$store = this.params.store;//状态库赋值
    },
    methods: {
      save(formName) {
        var that = this;
        that.$refs[formName].validate((valid) => {
          if(valid){
            switch (that.params.action) {
              case 'add':
                that.loading = true;
                API.role.add(that.form,function (resData) {
                  that.loading = false;
                  if(resData.status){
                    Message({
                      message: '新增角色成功！',
                      type: 'success'
                    });
                  }else{
                    Message({
                      message: resData.error.message,
                      type: 'error'
                    });
                  }
                },function () {
                  that.loading = false;
                  Message({
                    message: '系统繁忙，请稍后再试！',
                    type: 'error'
                  });
                })
                break;
              case 'update':
                that.loading = true;
                API.role.update(that.form,function (resData) {
                  that.loading = false;
                  if(resData.status){
                    Message({
                      message: '修改角色成功！',
                      type: 'success'
                    });
                  }else{
                    Message({
                      message: resData.error.message,
                      type: 'error'
                    });
                  }
                },function () {
                  that.loading = false;
                  Message({
                    message: '系统繁忙，请稍后再试！',
                    type: 'error'
                  });
                })
                break;
            }
          }
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
