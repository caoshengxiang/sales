<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog com-container">
      <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules">
        <table class="detail-table">
          <tr>
            <td class="td-title">平台用户</td>
            <td>
              <el-form-item prop="accountNumber">
                <el-input type="text" v-model="addForm.accountNumber"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">联系姓名</td>
            <td>
              <el-form-item prop="name">
                <el-input type="text" v-model="addForm.name"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">联系电话</td>
            <td>
              <el-form-item prop="mobilePhone">
                <el-input type="text" v-model="addForm.mobilePhone"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">名族</td>
            <td>
              <el-form-item prop="nation">
                <el-input type="text" v-model="addForm.nation"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">性别</td>
            <td>
              <el-form-item prop="sex">
                <el-input type="text" v-model="addForm.sex"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">出生日期</td>
            <td>
              <!--<el-form-item prop="birthday">-->
              <!--<el-input type="text" v-model="addForm.birthday"></el-input>-->
              <!--</el-form-item>-->
            </td>
          </tr>
          <tr>
            <td class="td-title">居民身份证</td>
            <td colspan="5">
              <div style="display: flex;align-items: center;">
                <span>
                <el-form-item prop="idCard" style="width: 200px;">
                  <el-input type="text" v-model="addForm.idCard"></el-input>
                </el-form-item>
              </span>
                <photo-view :photo-data="{
                text: '身份证查看大图',
                images: [
                  {url: addForm.identityCardPhoto, previewText: ''},
                ]
              }">
                </photo-view>
                <el-button type="text" style="position: relative;margin-left: 20px;" icon="el-icon-upload2">
                  上传图片
                  <input type="file" class="com-upload-input" accept="image/png,image/jpeg,image/gif,image/jpg"
                         @change="uploadImg($event, 1, 'identityCardPhoto')">
                </el-button>
              </div>
            </td>
          </tr>
          <tr>
            <td class="td-title">工作单位</td>
            <td>
              <el-form-item prop="organizationName">
                <el-input type="text" v-model="addForm.organizationName"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">工作部门</td>
            <td>
              <el-form-item prop="departmentName">
                <el-input type="text" v-model="addForm.departmentName"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">工作职责</td>
            <td>
              <!--<el-form-item prop="accountNumber">-->
              <!--<el-input type="text" v-model="addForm.accountNumber"></el-input>-->
              <!--</el-form-item>-->
            </td>
          </tr>
          <tr>
            <td class="td-title">职称</td>
            <td>
              <el-form-item prop="jobTitle">
                <el-input type="text" v-model="addForm.jobTitle"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">从业年限</td>
            <td>
              <el-form-item prop="workExperience">
                <el-input type="text" v-model="addForm.workExperience"></el-input>
              </el-form-item>
            </td>
            <td class="td-title"></td>
            <td></td>
          </tr>
          <tr>
            <td class="td-title">最高学历</td>
            <td>
              <el-form-item prop="education">
                <el-input type="text" v-model="addForm.education"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">毕业院校</td>
            <td>
              <el-form-item prop="graduateInstitutions">
                <el-input type="text" v-model="addForm.graduateInstitutions"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">专业</td>
            <td>
              <el-form-item prop="major">
                <el-input type="text" v-model="addForm.major"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">专业资质证书</td>
            <td colspan="5">
              <el-form-item prop="certificate">
                <el-input type="text" v-model="addForm.certificate"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">职称证明</td>
            <td>
              <photo-view :photo-data="{
                text: '查看大图',
                images: [
                  {url: addForm.jobTitleCertificate, previewText: ''},
                ]
              }">
              </photo-view>
              <el-button type="text" style="position: relative;margin-left: 20px;" icon="el-icon-upload2">
                上传图片
                <input type="file" class="com-upload-input" accept="image/png,image/jpeg,image/gif,image/jpg"
                       @change="uploadImg($event, 2, 'jobTitleCertificate')">
              </el-button>
            </td>
            <td class="td-title">学历证明</td>
            <td>
              <photo-view :photo-data="{
                text: '查看大图',
                images: [
                  {url: addForm.educationCertificate, previewText: ''},
                ]
              }">
              </photo-view>
              <el-button type="text" style="position: relative;margin-left: 20px;" icon="el-icon-upload2">
                上传图片
                <input type="file" class="com-upload-input" accept="image/png,image/jpeg,image/gif,image/jpg"
                       @change="uploadImg($event, 3, 'educationCertificate')">
              </el-button>
            </td>
            <td class="td-title">资质证明</td>
            <td>
              <photo-view :photo-data="{
                text: '查看大图',
                images: [
                  {url: addForm.qualificationCertificate, previewText: ''},
                ]
              }">
              </photo-view>
              <el-button type="text" style="position: relative;margin-left: 20px;" icon="el-icon-upload2">
                上传图片
                <input type="file" class="com-upload-input" accept="image/png,image/jpeg,image/gif,image/jpg"
                       @change="uploadImg($event, 4, 'qualificationCertificate')">
              </el-button>
            </td>
          </tr>
          <tr>
            <td class="td-title">认证服务地区</td>
            <td colspan="5">
todo
            </td>
          </tr>
          <tr>
            <td class="td-title">认证商品</td>
            <td colspan="5">
todo
            </td>
          </tr>
          <tr>
            <td class="td-title">现从事专业及研究方向</td>
            <td colspan="5">
              <el-form-item prop="workReasearch">
                <el-input type="text" v-model="addForm.workReasearch"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">社会重要职务</td>
            <td colspan="5">
              <el-form-item prop="socialFunctions">
                <el-input type="text" v-model="addForm.socialFunctions"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">个人简介</td>
            <td colspan="5">
              <el-form-item prop="resume">
                <el-input type="text" v-model="addForm.resume"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
        <el-button class="save-button" @click="saveSubmitForm('addForm')">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import API2 from '../../../../utils/api2'
  import API from '../../../../utils/api'
  import { serverUrl } from '../../../../utils/const'
  import photoView from '../../../../components/photo/photoView'
  import webStorage from 'webStorage'
  import comButton from '../../../../components/button/comButton'

  export default {
    name: 'addDialog',
    data () {
      return {
        dataLoading: false,
        photoData: {},
        addForm: { //
          accountNumber: '',
          name: '',
          mobilePhone: '',
        },
        rules: {
          accountNumber: [
            // {required: true, message: '请输入平台用户名', trigger: 'blur'},
            // {min: 1, max: 50, message: '长度为 50 个字符以内', trigger: 'blur'},
          ],
        },
        dialogType: 'edit',
        targetObj: null,
        userInfo: {},
      }
    },
    props: ['params'],
    components: {
      photoView,
      comButton,
    },
    computed: {
      serverUrl () {
        return serverUrl
      },
    },
    methods: {
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataLoading = true
            API2.serviceManager.edit(this.addForm, (da) => {
              if (da.status) {
                this.$message.success('编辑成功')
                this.$vDialog.close({type: 'save'})
              } else {
                this.$message.warning('编辑失败')
              }
              setTimeout(() => {
                this.dataLoading = false
              }, 500)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      uploadImg (e, type, attr) { // 上传图片
        // type 1-身份证；2-职称证明；3-学历证明；4-资质证明
        var file = e.target.files[0]
        // console.log(file)
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是jpeg,jpg,png,bmp中的一种')
          return false
        }
        let formData = new FormData()
        formData.append('file', file)
        API.common.uploadFile({path: 'avatar', body: formData}, upImg => {
          if (upImg.status) {
            // this.addForm.identityCardPhoto = upImg.data.path
            this.addForm[attr] = upImg.data.url
            this.$message.success('上传成功，确定保存成功后生效！')
          }
        })
      },
    },
    created () {
      this.userInfo = webStorage.getItem('userInfo')

      // setTimeout(() => {
      //   this.photoData = {
      //     text: '身份证.jpg 查看大图',
      //     images: [
      //       {url: '../../../../../static/images/wave-bot.png', previewText: '描述文字1'},
      //       {url: '../../../../../static/images/wave-bot-2.png', previewText: '描述文字2'},
      //     ],
      //   }
      // }, 1000)
      if (this.params.detail) { // 编辑
        this.addForm = JSON.parse(JSON.stringify(this.params.detail))
        this.dialogType = 'edit'
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
</style>
