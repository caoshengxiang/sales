<template>
  <div class="com-dialog-container" v-loading="loading">
    <div class="com-dialog">
      <el-form :model="form" ref="form" :rules="rules" :disabled ="isFormDisabled">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">请输入消息名称</td>
            <td class="td-text">
              <el-form-item prop="name">
                <el-input type="text" v-model="form.name" placeholder="请输入消息名称" :maxlength="30"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">请选择接收角色</td>
            <td class="td-text">
              <el-form-item prop="businessSystems">
                <el-select v-model="businessSystemsOptions" multiple placeholder="请选择接收角色" @change="changeBusinessSystem">
                  <el-option
                    v-for="item in businessSystemList"
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
                <el-select v-model="roleBilitysOptions" multiple placeholder="请选择接收组织">
                  <el-option
                    v-for="item in bilityList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">请输入消息内容</td>
            <td class="td-text">
              <el-form-item prop="name">
                <el-input type="textarea" v-model="form.name" placeholder="请输入消息内容" :rows="5"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">请选择附件内容</td>
            <td class="td-text">
              <el-form-item prop="name">
                <fileUpload
                flag="message"
                :loading="loading"></fileUpload>
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
  import fileUpload from '@/components/fileUpload'

  export default {
    data () {
      return {
        loading:false,
        isFormDisabled:false,
        form: {
          maxSeaFollower:1,
          maxSeaFollowerPerMonth:1

        },
        businessSystemsOptions:[],
        roleBilitysOptions:[],
        rules: {
          name: [
            {required: true, message: '请输入消息名称', trigger: 'blur'}
          ]
        },
        businessSystemList:[],
        bilityList:[]
      }
    },
    props: ['params'],
    components :{
      fileUpload
    },
    created() {
      var that = this;
      that.$store = that.params.store;//状态库赋值
      API.role.getBusinessSystemList(function (res) {
        if(res.status){
          that.businessSystemList = res.data;
          if (that.params.action == 'update') {
            that.$options.methods.getRoleDetail.bind(that)(that.params.id);
          }
        }
      },function () {
        Message({
          message: '系统繁忙，请稍后再试1！',
          type: 'error'
        });
      });
    },
    methods: {
      closeDialog(){
        this.$vDialog.close();
      },
      save(formName) {
        var that = this;
        //组装部分字段数据格式
        var businessSystemsNewArray = [];
        for (var i=0;i<that.businessSystemsOptions.length;i++) {
          var item = {id:that.businessSystemsOptions[i]};
          businessSystemsNewArray.push(item);
        }
        that.form.businessSystems = businessSystemsNewArray;

        var roleBilitysNewArray = [];
        for (var i=0;i<that.roleBilitysOptions.length;i++) {
          var item = {id:that.roleBilitysOptions[i]};
          roleBilitysNewArray.push(item);
        }
        that.form.bilities = roleBilitysNewArray;

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
                    that.$vDialog.close(); // 关闭弹窗
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
                    that.$vDialog.close(); // 关闭弹窗
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
      },
      getRoleDetail(id){
        var that = this;
        that.loading = true;
        API.role.getDetail({id:id},function (res) {
          that.loading = false;
          if(res.status){
            that.form = res.data;
            that.form.businessSystems = [];
            that.businessSystemsOptions = Array.from(that.form.businessSystems,(x) =>x.id);
          }else{
            Message({
              message: res.error.message,
              type: 'error'
            });
          }
        },function () {
          that.loading = false;
          Message({
            message: '系统繁忙，请稍后再试1！',
            type: 'error'
          });
        });
      },
      changeBusinessSystem(){
        var that = this;
        that.bilityList = [];
        that.form.businessSystems = that.businessSystemsOptions;
        console.log(that.businessSystemsOptions);
        API.role.getBilityList({businessSystemIds:that.businessSystemsOptions.join(',')},function (res) {
            if(res.status){
              that.bilityList = res.data;
            }
          },function (error) {
            Message({
              message: '系统繁忙，请稍后再试！',
              type: 'error'
            });
          });
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
