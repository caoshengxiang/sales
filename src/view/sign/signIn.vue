<template>
  <div class="sign-in">
    <div class="sign-box">
      <div class="logo-box">
        <img src="../../assets/icon/logo.png" alt="">
        <span>众智联邦销售管理系统</span>
      </div>
      <div class="sign-form-box">
        <el-form label-width="0px" :model="formData" :rules="rules" ref="ruleForm">
          <el-form-item label="" prop="username">
            <el-input v-model="formData.username" placeholder="请输入你的登录账号"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input @keydown.native="keydown" type="password" v-model="formData.password" placeholder="请输入你的登录密码"></el-input>
          </el-form-item>
          <el-form-item label="" prop="type">
            <el-checkbox-group v-model="isRemember">
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
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var pwd  = sha1(this.formData.password);
            API.login.login({account:this.formData.username,pwd:pwd,client:2}, (res) => {
              this.loading = false;
              if(res.status){
                webStorage.setItem('userInfo', res.data);
                this.$router.push({name: 'saleHome', params: {end: 'ME'}})
              }
              else
              {
                this.$router.push({name: 'resetPassword', params: {end: 'ME'}})
              }
            }, (mock) => {
              this.loading = false;
              Message({
                message: '系统繁忙，请稍后再试！',
                type: 'error'
              });
            })
            let ss = {
              name:"用户姓名",
              authKey:"eydhbGcnOidIUzI1NicsJ3R5cGUnOidKV1QnfQ%3D%3D.eyJ1c2VyIjoiMDQ2MkYwOEVBQzEwMDE2RTNCMEE1NkJERDExMjdGM0YiLCJ2YWxpZFBlcmlvZCI6MTAzNjgwMDAwMDAsImlhdCI6MTUyNzM0OTg0NDA3NH0%3D.%2BVaOKCw8Abt3mo7%2BB6dDvZOfOcDoPo6Ft4fuDh%2BBvaU%3D"
            }
            webStorage.setItem('userInfo', ss);
            this.$router.push({name: 'saleHome', params: {end: 'ME'}})
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
    .sign-form-box {
      margin: 80px auto 0 auto;
      width: 340px;
      .forget {
        float: right;
        margin-top: -38px;
        cursor: pointer;
      }
      .el-submit {
        width: 50%;
        margin-left: 90px;
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
