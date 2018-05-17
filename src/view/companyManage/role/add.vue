<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="form" ref="form" label-width="0px" :rules="rules">
        <table class="com-dialog-table">
          <tr v-if="type==='edit'">
            <td class="td-title">员工号</td>
            <td class="td-text">
              <el-form-item prop="jobNo">
                <el-label type="text" v-model="form.jobNo"></el-label>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">人员手机号</td>
            <td class="td-text">
              <el-form-item prop="mobilePhone">
                <el-input type="text" v-model="form.mobilePhone" placeholder="请输入人员手机号"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">人员姓名</td>
            <td class="td-text">
              <el-form-item prop="name">
                <el-input type="text" v-model="form.name" placeholder="请输入人员姓名"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">生日</td>
            <td class="td-text">
              <el-date-picker
                style="width: 100%"
                v-model="form.birthday"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择出生日期">
              </el-date-picker>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="initData">取 消</el-button>
        <el-button class="save-button" @click="saveSubmitForm('form')">确 定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '../../../utils/api'

  export default {
    name: 'addDialog',
    data () {
      return {
        form: { // 添加用户表单
          mobilePhone: '',
          birthday: '',
          name: '',
          sex: '',
          jobNo: '',
          organizationId: '',
          departmentId: '',
          roles: [],
        },
        rules: {
          name: [
            {required: true, message: '请输入用户姓名', trigger: 'blur'},
          ],
          mobilePhone: [
            {required: true, message: '请输入用户手机号', trigger: 'blur'},
          ],
          sex: [
            {required: true, message: '请选择用户性别', trigger: 'blur'},
          ],
          birthday: [
            {required: true, message: '请选择用户生日', trigger: 'blur'},
          ],
          organizationId: [
            {required: true, message: '请选择用户所属组织', trigger: 'blur'},
          ],
          departmentId: [
            {required: true, message: '请选择用户所属部门', trigger: 'blur'},
          ],
        }
      }
    },
    props: ['params'],
    created () {
      alert("你传递过来的参数值id:" + this.params.id);
    },
    methods: {
      saveSubmitForm (formName) {
        this.$vDialog.close(); //关闭弹窗
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
