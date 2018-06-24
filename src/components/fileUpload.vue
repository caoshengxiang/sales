<!--文件上传组件封装 2018.3.25 姚政伟创建
====================调用说明================
<fileUpload
          :limit="10" //最大上传数量 默认1
          :fileList="form.videos" //初始化文件列表 默认为空
          ref="uploadVideosControl" //组件声明别名
          flag="routineWork" //文件标识
          :multiple="true" //是否支持多选文件 默认为false
          :styleType="2" //样式类型(1:图片类型 2.附件类型) 默认1
          v-if="!loading"></fileUpload>
===================回调方法（获取上传文件列表）==========
             var listStr = ref[声明别名].getFileListStr();//多张图片逗号分隔
-->
<template>
  <div>
    <el-upload
      v-loading="uploadConfig.loading"
      element-loading-text="正在上传..."
      element-loading-background="rgba(0, 0, 0, 0.6)"
      :action="uploadConfig.prefixServerFileUrl+'/'+flag"
      :show-file-list="true"
      :on-success="handleImageSuccess"
      :before-upload="beforeImageUpload"
      :list-type="styleType == 1 ? 'picture-card':'text'"
      :limit="limit"
      :on-preview="handleImagePreview"
      :on-remove="handleImageUploadRemove"
      :file-list="uploadConfig.initFileList"
      :class="uploadConfig.succeedFileList.length>=limit ? 'uploadDisabled':''"
      :multiple="multiple"
      :on-exceed="handleExceed"
      ref="uploadCtl"
    >
      <i class="el-icon-plus" v-show="styleType == 1"></i>
      <el-button size="small" type="primary" v-show="styleType == 2">点击上传</el-button>
    </el-upload>
    <div class="el-upload__tip">{{tipMessage}}</div>
    <el-dialog :visible.sync="uploadConfig.dialogVisible">
      <el-row v-show="styleType == 1"><img width="100%" :src="uploadConfig.previewImageUrl" alt=""></el-row>
      <el-row v-show="styleType == 2">
        <el-col :span="6">
          <el-button type="info" @click="openLinkUrl(uploadConfig.previewImageUrl)">下载文件</el-button>
        </el-col>
        <el-col :span="18">
          <el-alert
            title="点击下载打开页面，右键保存即可！"
            type="info"
            show-icon
            :closable="false">
          </el-alert>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  // import API from '@/utils/api'
  // import { Message } from 'element-ui'

  export default {
    data () {
      return {
        // 上传文件配置属性
        uploadConfig: {
          loading: false,
          prefixServerFileUrl: utils.getConst('FILEURL'),
          previewImageUrl: '',
          succeedFileList: [],
          dialogVisible: false,
          initFileList: [],
        },
      }
    },
    // 接收参数
    props: {
      // 最大上传数量 默认1
      limit: {
        type: Number,
        required: false,
        default: 1,
      },
      // 初始化文件列表 默认为空
      fileList: {
        type: String,
        required: false,
        default: '',
      },
      // 文件标识
      flag: {
        type: String,
        required: true,
      },
      // 是否支持多选文件 默认为false
      multiple: {
        type: Boolean,
        required: false,
        default: false,
      },
      // 样式类型(1:图片类型 2.附件类型) 默认1
      styleType: {
        type: Number,
        required: false,
        default: 1,
      },
      // tip备注提示
      tipMessage: {
        type: String,
        required: false,
      },
      // 允许上传文件类型后缀白名单（例如：".jpg|.png"，|分隔）
      allowFileTypes: {
        type: String,
        required: false,
        default: '.jpg|.jpeg|.gif|.png',
      },
    },
    created () {
      var that = this
      that.$options.methods.initFileList.bind(that)(that.fileList)
    },
    methods: {
      handleImageSuccess (res, file) {
        var that = this
        that.uploadConfig.loading = false
        that.uploadConfig.succeedFileList.push(file.response.data)
      },
      beforeImageUpload (file) {
        var that = this
        var checkFile = false
        const fileNameSuffix = file.name.substring(file.name.lastIndexOf('.'))
        const allowFileTypes = that.allowFileTypes.split('|')
        const isLt2M = file.size / 1024 / 1024 < 2
        if (allowFileTypes && allowFileTypes.length > 0) {
          for (var i = 0; i < allowFileTypes.length; i++) {
            if (allowFileTypes[i].toUpperCase() === fileNameSuffix.toUpperCase()) {
              checkFile = true
              break
            }
          }
        }
        if (!checkFile) {
          that.$message.error('上传文件格式错误!')
          return false
        }
        if (that.styleType === 1 && !isLt2M) {
          that.$message.error('上传图片大小不能超过 2MB!')
          return false
        }
        that.uploadConfig.loading = true
        return true
      },
      handleImageUploadRemove (file, fileList) {
        var that = this
        that.uploadConfig.succeedFileList.splice(0, that.uploadConfig.succeedFileList.length)
        if (fileList.length > 0) {
          for (var i = 0; i < fileList.length; i++) {
            var fileItem = fileList[i]
            that.uploadConfig.succeedFileList.push(fileItem.response.data)
          }
        }
      },
      handleImagePreview (file) {
        this.uploadConfig.previewImageUrl = file.url
        this.uploadConfig.dialogVisible = true
      },
      initFileList (fileListStr) {
        var that = this
        if (fileListStr != null && fileListStr !== '') {
          var list = fileListStr.split(',')
          for (var i = 0; i < list.length; i++) {
            var model = {}
            model.name = list[i].substring(list[i].lastIndexOf('/') + 1)
            if (list[i].indexOf('http') !== -1) {
              model.url = list[i]
            } else {
              model.url = that.uploadConfig.prefixServerFileUrl + list[i]
            }
            model.response = {data: list[i]}
            that.uploadConfig.initFileList.push(model)
            that.uploadConfig.succeedFileList.push(list[i])
          }
        }
      },
      getFileListStr () {
        var that = this
        return that.uploadConfig.succeedFileList.join(',')
      },
      handleExceed (files, fileList) {
        var that = this
        that.$message.warning(
          `当前最多上传 ${that.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      openLinkUrl (url) {
        location.href = url
      },
      clearFileUpload () {
        var that = this
        that.$refs.uploadCtl.clearFiles()
        that.uploadConfig.succeedFileList.splice(0, that.uploadConfig.succeedFileList.length)
      },
    },
  }
</script>
<style>
  /*文件上传样式重写 2018.3.24 姚政伟 新增*/
  .uploadDisabled .el-upload {
    display: none !important;
  }
</style>
