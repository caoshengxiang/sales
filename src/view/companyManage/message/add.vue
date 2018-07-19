<template>
  <div class="com-dialog-container" v-loading="loading">
    <div class="com-dialog">
      <el-form :model="form" ref="form" :rules="rules" :disabled="isFormDisabled">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">请输入消息名称</td>
            <td class="td-text">
              <el-form-item prop="title">
                <el-input type="text" v-model="form.title" placeholder="请输入消息名称" :maxlength="30"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">请选择接收角色</td>
            <td class="td-text">
              <el-form-item prop="businessSystems">
                <el-select  v-model="form.roleIds" multiple placeholder="请选择接收角色">
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
            <td class="td-title">请选择接收组织</td>
            <td class="td-text">
              <el-form-item prop="bilities">
                <el-select v-model="form.organizationIds"  multiple @change="selectedOptionsHandleChange"
                           placeholder="请选择接收组织">
                  <el-option
                    v-for="item in allorganization"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">请输入消息内容</td>
            <td class="td-text">
              <el-form-item prop="content">
                <el-input type="textarea" v-model="form.content" placeholder="请输入消息内容" :rows="5"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">请选择附件内容</td>
            <td class="td-text">
              <el-form-item prop="name">
                <fileUpload
                  :limit="1"
                  :fileList="imgurl"
                  ref="uploadControl"
                  flag="notice"
                  :multiple="false"
                  :styleType="2"
                  v-if="!loading"
                ></fileUpload>
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
  import API from '../../../utils/api'
  import { Message } from 'element-ui'
  import fileUpload from '../../../components/fileUpload'
  export default {
    data () {
      return {
        loading: false,
        isFormDisabled: false,
        form: {
          organizationIds:[],
          roleIds:[],
          msgType:2
        },
        businessSystemsOptions: [],
        roleBilitysOptions: [],
        rules: {
          name: [
            {required: true, message: '请输入消息名称', trigger: 'blur'},
          ],
        },
        businessSystemList: [],
        bilityList: [],
        imgurl:'',
        allroles: [],
      }
    },
    props: ['params'],
    components: {
      fileUpload
    },
    created () {
      var that = this
      let params = {
        page: 1,
        pageSize: 999,
      }
      API.user.roleList(params, (res) => {
        that.allroles = res.data
      }, (mock) => {
        that.allroles = mock.data
      })

      params = {
        page: 1,
        pageSize: 999,
        pid: 1,
        type: 1,
        level:2
      }
      API.organization.queryAllList(params, (res) => {
        this.allorganization = res.data
      }, (mock) => {
      })
    },
    methods: {
      save(){
        var that = this
        console.log(that.$refs.uploadControl.getFileListStr())

        that.form.attachments =[]
        var obj={}
        if(that.$refs.uploadControl.getFileListStr().length >0) {
          obj.name=that.$refs.uploadControl.getFileListStr()[0].name
          obj.path=that.$refs.uploadControl.getFileListStr()[0].path
          that.form.attachments.push(obj)
        }
        API.message.addMessage(this.form, (res) => {
          this.$message({
            type: 'success',
            message: '添加消息成功!',
          })
          this.$vDialog.close()
        }, (mock) => {
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
