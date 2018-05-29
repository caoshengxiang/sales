<template>
  <div class="sign-in">
    <div class="sign-box">
      <div class="logo-box">
        <img src="../../assets/icon/logo.png" alt="">
        <span>众智联邦销售管理系统</span>
      </div>
      <div class="sign-bc-title">
      </div>
      <div class="sign-form-box">
        <el-form label-width="0px" :model="formData" :rules="rules" ref="ruleForm">
          <el-form-item label="账号" prop="username" class="el-item"  label-width="80px">
            <el-input  v-model="formData.username" placeholder="请输入登录手机号"></el-input>
          </el-form-item>
          <el-form-item label="密码" class="el-item"  prop="password" label-width="80px">
            <el-input @keydown.native="keydown" type="password" v-model="formData.password" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-form-item label="" prop="type">
            <el-checkbox-group v-model="isRemember" class="rember">
              <el-checkbox label="记住密码" name="type"></el-checkbox>
            </el-checkbox-group>
            <a class="forget" @click="recoverPassword">忘记密码</a>
          </el-form-item>
          <el-form-item>
            <el-button class="el-submit" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <p>众智联邦销售管理平台  2017-2017 @凡特赛科技</p>
    </div>
    <fe-element></fe-element>
  </div>
</template>

<script>
  import { chartLengthRule } from '../../utils/const'
  import feElement from '../../components/feElement'
  import API from '../../utils/api'
  import sha1 from 'js-sha1'
  import webStorage from 'webStorage'

  export default {
    name: 'signIn',
    data () {
      return {
        formData: {
          username: '',
          password: '',
        },
        isRemember: false,
        rules: {
          username: [
            {required: true, message: '请输入你的登录账号', trigger: 'blur'},
            ...chartLengthRule.defaultRule,
          ],
          password: [
            {required: true, message: '请输入你的登录密码', trigger: 'blur'},
            ...chartLengthRule.defaultRule,
          ],
        },
      }
    },
    components: {
      feElement
    },
    mounted() {
      this.getCookie();
    },
    methods: {
      //设置cookie
      setCookie(c_name, c_pwd, c_isRemember,exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "checked" + "=" + c_isRemember + ";path=/;expires=" + exdate.toGMTString();
      },
      //读取cookie
      getCookie: function() {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] == 'userName') {
              this.formData.username = arr2[1]; //保存到保存数据的地方
            } else if (arr2[0] == 'userPwd') {
              this.formData.password = arr2[1];
            }
            else if(arr2[0] == 'checked') {
              this.isRemember = arr2[1]
            }
          }
        }
      },
      //清除cookie
      clearCookie: function() {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.isRemember){
              this.setCookie(this.formData.username, this.formData.password,this.isRemember, 7)
            }
            else{
              this.clearCookie()
            }

            var pwd  = sha1(this.formData.password);
            API.login.login({account:this.formData.username,pwd:pwd,client:2}, (res) => {
              this.loading = false;
              if(res.status){
                webStorage.setItem('userInfo', res.data);
                this.$router.push({name: 'saleHome', params: {end: 'ME'}})
              }
              else
              {
                if(res.error.statusCode === "10011") {
                  this.$router.push({name: 'resetPassword', params: {end: 'ME'}})
                }
              }
            }, (mock) => {
              this.loading = false;
              Message({
                message: '系统繁忙，请稍后再试！',
                type: 'error'
              });
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      keydown (e) {
        if (e.keyCode === 13) {
          this.submitForm('ruleForm')
        }
      },
      recoverPassword () {
        this.$router.push({name: 'recoverPassword', params: {end: 'FE'}})
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .sign-in {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .sign-box {
    width: 440px;
    margin: 100px auto;
    .logo-box {
      text-align: center;
      display: flex;
      align-items: center;
      img {
        width: 48px;
      }
      span {
        font-size: 34px;
        margin-left: 20px;
      }
    }
    .sign-bc-title{
      margin: 80px auto 0 -150px;
      width:820px;
      height:6px;
      background:rgba(11,195,196,1);
    }
    .sign-form-box {
      margin: 80px auto 0 auto;
      width:400px;
      height:400px;
      background:rgba(255,255,255,1);
      .forget {
        float: right;
        margin-top: -38px;
        cursor: pointer;
      }
      .el-item{
      }
      .el-label{
        width:33px;
        height:14px;
        font-size:16px;
        font-family:MicrosoftYaHei;
        color:rgba(114,131,149,1);
        line-height:0px;
      }
      .rember{
        margin: 0 auto 0 auto;
        width: 50%;
      }
      .el-submit {
        width: 320px;
        height:48px;
        margin-left: 80px;
        background-color: #4BCF99;
        color: #fff;
        &:active {
          color: #FFF;
          border: 1px solid #39C189;
          outline: 0;
        }
      }
    }
  }
  .footer {
    height: 20%;
    background-color: #D7DDE4;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    p {
      position: absolute;
      bottom: 20px;
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #333E48;
    }
  }

</style>
