<template>
  <div class="com-dialog-container" v-loading="loading">
    <div class="com-dialog">
      <el-form :model="form" ref="form" :rules="rules" :disabled="isFormDisabled" label-width="100px">
				<el-row  class="el-row-cla">
<!-- 					<el-col :span="8" v-if='params.className === "region"'>行政区名称</el-col>
					<el-col :span="8" v-if='params.className === "industry"'>行业名称</el-col>
					<el-col :span="8" v-if='params.className === "place"'>职位名称</el-col> -->
					<el-col :span="24">
						<el-form-item prop="name" :label="params.className === 'region' && '行政区名称' || params.className === 'industry' && '行业名称' || '职位名称'">
							<el-input type="text" v-model="form.name" :placeholder="'请输入名称'" :maxlength="30"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="el-row-cla" v-if='params.className === "region"'>
					<!-- <el-col :span="8">地区代码</el-col> -->
					<el-col :span="24">
						<el-form-item label="地区代码">
							<el-input type="number" v-model="form.code" placeholder="请输入地区代码"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="el-row-cla">
					<!-- <el-col :span="8">排列序号</el-col> -->
					<el-col :span="24">
						<el-form-item label="排列序号">
							<el-input type="number" v-model="form.sort" placeholder="请输入排列序号"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="el-row-cla" v-if="params.action === 'add' && params.className === 'region'">
					<!-- <el-col :span="8">上级行政区</el-col> -->
					<el-col :span="24">
						<el-form-item label="父级名称">
							<!-- <el-input type="text" v-model="pName" placeholder="无" :disabled="true"></el-input> -->
							<span>{{pName || "顶级"}}</span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="el-row-cla" v-if="params.action === 'add' && params.className === 'industry'">
					<!-- <el-col :span="8">上级行业</el-col> -->
					<el-col :span="24">
						<el-form-item label="上级行业">
							<!-- <el-input type="text" v-model="iName" placeholder="无" :disabled="true"></el-input> -->
							<span>{{iName || '顶级'}}</span>
						</el-form-item>
					</el-col>
				</el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="closeDialog">取 消</el-button>
        <el-button class="save-button" @click="save('form')">确 定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '../../../../utils/api'
  import { Message } from 'element-ui'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        loading: false,
        isFormDisabled: false,
        form: {
          pid: 0,
					code: '',
					sort: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
        },
        pName: '',
				iName: '',
      }
    },
    computed: {
      ...mapState('constData', [
        'organizationType',
      ]),
    },
    props: ['params'],
    created () {
      var that = this
      that.$store = that.params.store // 状态库赋值
      if (that.params.currentNode) {
        if (that.params.action === 'add') {
          that.pName = that.params.currentNode.name;
          that.iName = that.params.currentNode.name;
          that.form.pid = that.params.currentNode.id;
        } else {
          that.form.name = that.params.currentNode.name
          that.form.id = that.params.currentNode.id
					that.form.code = that.params.currentNode.code
					that.form.sort = that.params.currentNode.sort
        }
      }
    },
    methods: {
      closeDialog () {
        this.$vDialog.close({type: 'close'})
      },
      save (formName) {
        var that = this
				let _name = this.params.className;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            that.loading = true
            switch (that.params.action) {
              case 'add':
								switch (_name) {
									case 'industry':
										delete that.form.code;
										that.form.parentId = that.form.pid;
										delete that.form.pid;
										API.customerAreaSetting.industryAdd(that.form, function (resData) {
											that.loading = false
											if (resData.status) {
												Message({
													message: '新增成功！',
													type: 'success',
												})
												that.$vDialog.close({type: 'save'}) // 关闭弹窗
											}
										}, function () {
											that.loading = false
											Message({
												message: '系统繁忙，请稍后再试！',
												type: 'error',
											})
										})
										break;
									case 'place':
										delete that.form.code;
										delete that.form.pid;
										API.customerAreaSetting.industryPlace(that.form, function (resData) {
											that.loading = false
											if (resData.status) {
												Message({
													message: '新增成功！',
													type: 'success',
												})
												that.$vDialog.close({type: 'save'}) // 关闭弹窗
											}
										}, function () {
											that.loading = false
											Message({
												message: '系统繁忙，请稍后再试！',
												type: 'error',
											})
										})
										break;
									default:
										if(that.form.code == '') delete that.form.code;
										if(that.form.sort == '') delete that.form.sort;
										API.customerAreaSetting.add(that.form, function (resData) {
											that.loading = false
											if (resData.status) {
												Message({
													message: '新增成功！',
													type: 'success',
												})
												that.$vDialog.close({type: 'save'}) // 关闭弹窗
											}
										}, function () {
											that.loading = false
											Message({
												message: '系统繁忙，请稍后再试！',
												type: 'error',
											})
										})
										break;
								}
                break
              case 'update':
                that.loading = true
								switch (_name) {
									case 'industry':
										delete that.form.code;
										that.form.parentId = that.form.pid;
										delete that.form.pid;
										API.customerAreaSetting.industryUpdate(that.form, function (resData) {
											that.loading = false
											if (resData.status) {
												Message({
													message: '修改成功！',
													type: 'success',
												})
												that.$vDialog.close({type: 'save'}) // 关闭弹窗
											}
										}, function () {
											that.loading = false
											Message({
												message: '系统繁忙，请稍后再试！',
												type: 'error',
											})
										})
										break;
									case 'place':
										delete that.form.code;
										delete that.form.pid;
										API.customerAreaSetting.placeUpdate(that.form, function (resData) {
											that.loading = false
											if (resData.status) {
												Message({
													message: '修改成功！',
													type: 'success',
												})
												that.$vDialog.close({type: 'save'}) // 关闭弹窗
											}
										}, function () {
											that.loading = false
											Message({
												message: '系统繁忙，请稍后再试！',
												type: 'error',
											})
										})
										break;
									default:
										delete that.form.pid;
										API.customerAreaSetting.update(that.form, function (resData) {
											that.loading = false
											if (resData.status) {
												Message({
													message: '修改成功！',
													type: 'success',
												})
												that.$vDialog.close({type: 'save'}) // 关闭弹窗
											}
										}, function () {
											that.loading = false
											Message({
												message: '系统繁忙，请稍后再试！',
												type: 'error',
											})
										})
										break;
								}
                break
            }
          }
        })
      },
      getRoleDetail (id) {
        var that = this
        that.loading = true
        API.role.getDetail({id: id}, function (res) {
          that.loading = false
          if (res.status) {
            that.form = res.data
          } else {
            Message({
              message: res.error.message,
              type: 'error',
            })
          }
        }, function () {
          that.loading = false
          Message({
            message: '系统繁忙，请稍后再试1！',
            type: 'error',
          })
        })
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
	.el-row-cla {
		margin-bottom: 10px;
	}
</style>
