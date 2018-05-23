<template>
  <div class="com-dialog-container" v-loading="loading">
      <div class="com-dialog">
        <el-form :model="form" ref="form" label-width="0px" :rules="rules"  :disabled ="isFormDisabled">
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
              <td class="td-title">人员组织</td>
              <td class="td-text">
                <!--<input type="text" v-model="form.levelName">-->
                <el-form-item prop="level">
                  <el-form-item prop="areaSelectedOptions">
                    <el-cascader
                      placeholder="请选择人员组织"
                      :change-on-select="true"
                      :options="allorganization"
                      v-model="areaSelectedOptions"
                      @change="areaSelectedOptionsHandleChange"
                      :props="props"
                 >
                    </el-cascader>
                  </el-form-item>

                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="td-title">人员部门</td>
              <td class="td-text">
                <el-select v-model.number="form.departmentId" placeholder="请选择人员部门">
                  <el-option
                    v-for="item in alldepartments"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    >
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="td-title">人员角色</td>
              <td class="td-text">
                <!--<input type="text">-->
                <el-form-item prop="industry">
                  <el-select v-model="choseroles" multiple placeholder="请选择人员角色">
                    <el-option
                      v-for="item in allroles"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="td-title">性别</td>
              <td class="td-text">
                <!--<input type="text" v-model="form.industry">-->
                <el-form-item prop="sex">
                  <el-select v-model.number="form.sex" placeholder="请选择员工性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
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
        loading:false,
        isFormDisabled:false,
        id: 1,
        props:{
          children:'children',
          value:'id',
          label:'name',
        },
        addDialogVisible: false, // 新增弹窗
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
        },
        allroles: [],
        areaSelectedOptions: [],
        allorganization: [
        ],
        alldepartments: [],
        choseroles: []
      }
    },
    props: {
      addDialogOpen: {
        default: false,
        type: Boolean,
      },
      userDetail: {
        default () {
          return {}
        },
        type: Object,
      },
      type: {
        default: '',
        type: String,
      },
    },
    created () {
      let params = {
        page: 1,
        pageSize: 999,
      }
      API.user.roleList(params, (res) => {
        this.allroles = res.data
      }, (mock) => {
        this.allroles = mock.data
        // this.ac_userList(mock.data) // todo ac_userList 未定义
        this.dataLoading = false
      })
      params = {}
      API.organizationTreeList(params, (res) => {
        this.allorganization = res.data
      }, (mock) => {
        this.allorganization = mock.data
        this.dataLoading = false
      })
    },
    watch: {
      addDialogOpen (open) {
        if (open) {
          this.addDialogVisible = true
          this.$emit('hasAddDialogOpen')
          if (this.id > 0 && this.type === 'edit') { // 这里是修改数据
            let param = {
              id: this.id,
            }

            API.userDetail(param, (res) => {
              this.form = res
              // todo:1、需要初始化组织 2需要初始化部门
              for (var i = 0; i < this.form.roles.length; i++) {
                this.choseroles.push(this.form.roles[i].id)
              }
            }, (mock) => {
              this.form = mock.data
              this.form.birthday = '2018-01-03'
              this.dataLoading = false

              for (var i = 0; i < this.form.roles.length; i++) {
                this.choseroles.push(this.form.roles[i].id)
              }
            })
          }
        }
      },
      userDetail (d) {
        this.form = JSON.parse(JSON.stringify(d))
      },
    },
    methods: {
      initData () {
        if (this.type === 'edit') {
          this.form = JSON.parse(JSON.stringify(this.userDetail))
        } else {
          this.form = { // 添加客户表单
            mobilePhone: '',
            birthday: '',
            name: '',
            sex: '',
            jobNo: '',
            organizationId: '',
            departmentId: '',
            roles: [],
          }
          this.choseroles = []
        }
        this.addDialogVisible = false
      },
      areaSelectedOptionsHandleChange (value) {
        this.form.organizationId =value[value.length -1] // 取当前选中的组织
        let depparams = {
          page: 1,
          pageSize: 999,
        }
        depparams.pid = this.form.organizationId
        depparams.type = 2 // 查询出部门
        API.organizationList(depparams, (res) => {
          this.alldepartments = res.data
        }, (mock) => {
          this.alldepartments = mock.data
          this.dataLoading = false
        })
      },
      saveSubmitForm (formName) {
        alert(this.choseroles[0])
        this.form.roles = [];
        for (var i = 0; i < this.choseroles.length; i++) {
          var temp = {}
          temp.id = this.choseroles[i];
          this.form.roles.push(temp)
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.user.userAdd(this.form, (res) => {
              this.$message({
                type: 'success',
                message: '添加用户成功!',
              })
              this.$vDialog.close()
            }, (mock) => {
              alert('添加数据异常')
            })
           // this.initData()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
</style>
