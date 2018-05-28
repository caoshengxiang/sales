<template>
  <div class="com-dialog-container" v-loading="loading">
    <div class="com-dialog">
      <el-form :model="form" ref="form" :rules="rules" :disabled ="isFormDisabled">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">请输入{{title}}名称</td>
            <td class="td-text">
              <el-form-item prop="name">
                <el-input type="text" v-model="form.name" :placeholder="'请输入'+title+'名称'" :maxlength="30"></el-input>
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
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        loading:false,
        isFormDisabled:false,
        type: 1,
        typedes: '',
        id: 0,
        name:'',
        form: {
          pid:0
        },
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择类型', trigger: 'blur'}
          ]
        },
        pName:"",
        ozTypeSelectDisabled:false,
        title:""
      }
    },
    computed: {
      ...mapState('constData', [
        'organizationType'
      ])
  },
    props: ['params'],
    created() {
      var that = this;
      that.type = that.params.type
      if(that.type == 2){
        that.title = "客户级别"
      }
      else if(that.type == 3){
        that.title = "客户行业"
      }
      else if(that.type == 4){
        that.title = "管家类型"
      }
      that.$store = that.params.store;//状态库赋值
        if (that.params.action === 'add') {
        }else{
          that.form.name = that.params.name
        }
    },
    methods: {
      closeDialog(){
        this.$vDialog.close();
      },
      save(formName) {
        var that = this;
        that.$refs[formName].validate((valid) => {
          if(valid){
            switch (that.params.action) {
              case 'add':
                let params = {
                  codeName:that.form.name,
                  type: that.type
                }
                that.loading = true;
                API.baseSetting.add(params,function (resData) {
                  that.loading = false;
                  if(resData.status){
                    Message({
                      message: '新增'+that.title+'成功！',
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
                let param = {
                  codeName:that.form.name,
                  type: that.type,
                  id: that.params.id
                }
                API.baseSetting.edit(param,function (resData) {
                  that.loading = false;
                  if(resData.status){
                    Message({
                      message: '修改'+that.title+'成功！',
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
