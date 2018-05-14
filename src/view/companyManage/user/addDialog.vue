<template>
  <div>
    <el-dialog :title="type==='edit'? '编辑人员':'新增人员'" :visible.sync="addDialogVisible" width="900px" :show-close="false">
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
              <td class="td-title">人员组织</td>
              <td class="td-text">
                <!--<input type="text" v-model="form.levelName">-->
                <el-form-item prop="level">
                  <el-select v-model.number="form.level" placeholder="请选择人员组织">
                    <el-option label="客户级别1" :value="1"></el-option>
                    <el-option label="客户级别2" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="td-title">人员部门</td>
              <td class="td-text">
                <el-form-item prop="areaSelectedOptions">
                  <el-cascader
                    placeholder="请选择人员部门"
                    :options="areaOptions_testData"
                    v-model="areaSelectedOptions"
                    @change="areaSelectedOptionsHandleChange">
                  </el-cascader>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="td-title">人员角色</td>
              <td class="td-text">
                <!--<input type="text">-->
                <el-form-item prop="industry">
                  <el-select v-model="form.roles" multiple placeholder="请选择人员角色">
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
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="2"></el-option>
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
    </el-dialog>
  </div>
</template>
<script>
  import API from '../../../utils/api'

  export default {
    name: 'addDialog',
    data () {
      return {
        id: 1,
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
        areaOptions_testData: [
          {
            value: 1,
            label: '四川',
            children: [
              {
                value: 2,
                label: '成都',
                children: [
                  {
                    value: 3,
                    label: '高新区',
                  },
                  {
                    value: 4,
                    label: '天府新区',
                  },
                ],
              },
            ],
          },
        ],
        areaSelectedOptions: [],
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
          allroles: [],
          choseroles: 1
        },
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
      API.roleList(params, (res) => {
        this.allroles = res
        alert(res)
      }, (mock) => {
        this.allroles = mock.data
        // this.ac_userList(mock.data) // todo ac_userList 未定义
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
            }, (mock) => {
              this.form = mock.data
              this.form.birthday = '2018-01-03'
              this.dataLoading = false
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
        }
        this.addDialogVisible = false
      },
      areaSelectedOptionsHandleChange (value) {
        console.log(value)
      },
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.userAdd(this.form, (res) => {
              alert('添加数据成功')
            }, (mock) => {
              alert('添加数据异常')
            })
            this.initData()
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
