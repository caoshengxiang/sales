<template>
  <!--<div class="com-dialog-container">-->
  <div class="com-dialog com-container">
    <div>
      <div style="margin-bottom: 20px;">
        <span>服务年度</span>
        <el-date-picker
          style="width: 160px;"
          v-model="form.serviceYear"
          type="year"
          value-format="yyyy"
          :disabled="dateDisabled"
          @change="yearChangeHandle"
          placeholder="请选择年">
        </el-date-picker>
        &nbsp;&nbsp;
        <span>服务月度</span>
        <el-select v-model="form.serviceMonth"  :disabled="dateDisabled" placeholder="请选择月" style="width: 100px;">
          <el-option
            v-for="item in 12"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        &nbsp;&nbsp;
        <el-button type="primary" @click="getServiceItem">搜索</el-button>
        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
        <span>服务客户: {{params.customerName}}</span>
        &nbsp;&nbsp;
        <span>服务管家: {{params.typeItem.managerName}}</span>
      </div>

      <div class="operation-code-box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
          <el-form-item label="" prop="remark">
            <el-input
              type="textarea"
              placeholder="请输入记账日常告知"
              :rows="3"
              v-model="ruleForm.message">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button class="save-button" :disabled="params.isShow" @click="saveSubmitForm('ruleForm')">发布记账日常告知</el-button>
        <!--类似记账日常告知，因为不是要必须操作的选择，所以为已完成的状态，但是无法成功发布信息（按理说这种，是完成后，依旧可以再操作的）-->
      </div>
    </div>

    <div>
      <div style="margin-bottom: 10px;">发布记录</div>
      <table class="detail-table" style="text-align: center">
        <tr>
          <td class="td-title" style="width: 30px;">序号</td>
          <td class="td-title" style="width: 100px;">事项名称</td>
          <td class="td-title" style="width: 100px;">内容</td>
          <td class="td-title" style="width: 100px;">建立时间</td>
          <td class="td-title" style="width: 100px;">发布人</td>
        </tr>
        <tr v-for="(item, index) in serviceItem" :key="index">
        <td style="width: 30px;">{{index+1}}</td>
        <td style="width: 100px;">{{item.title}}</td>
        <td style="width: 100px;">{{item.result}}</td>
        <td style="width: 100px;">{{item.created && $moment(item.created).format('YYYY-MM-DD HH:mm:ss')}}
        </td>
        <td style="width: 100px;">{{item.operatorName}}</td>
        </tr>
      </table>
    </div>

    <div style="margin-top: 30px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>服务日志</span>
          <span style="float: right;" v-if='params.typeItem.managerId === userInfo.id'>
              <el-button @click='showLog(null)'>添加</el-button>
          </span>
        </div>
        <div style="min-height: 200px;">
<!--          <div v-for="(item, index) in serviceLog" :key="index" class="log-item">
            {{item.operatorName}}
            &nbsp;&nbsp;
            {{item.created && $moment(item.created).format('YYYY-MM-DD HH:mm:ss')}}
            &nbsp;&nbsp;
            {{item.description}}
            &nbsp;&nbsp;
            {{item.remark}}
          </div> -->
            <div>
                <el-table
                  ref="multipleTable"
                  border
                  stripe
                  :data="serviceLog"
                  height="400px"
                  style="text-align: center"
                  tooltip-effect="dark">
                    <el-table-column label="管家" prop="operatorName"></el-table-column>
                    <el-table-column label="操作时间" prop="opTime" width="160">
                        <template slot-scope="scope">
                            <span>{{scope.row.opTime && $moment(scope.row.opTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="事项名称" prop="recordName"></el-table-column>
                    <el-table-column label="操作描述" prop="description"></el-table-column>
                    <el-table-column label="办理结果" prop="result"></el-table-column>
                    <el-table-column label="成果附件" >
                        <template slot-scope="scope">
                            <span style='cursor: pointer' v-if="scope.row.attachment"><a :href="scope.row.attachment">查看</a></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注信息" prop="remark"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <!-- 权限： 当前登陆用户是该事项的服务管家 && 没有处理结果(服务管家自己添加的) -->
                            <span v-if="(scope.row.operatorId === userInfo.id) && scope.row.result">
                                <el-button type="text" @click='showLog(scope.row)'>编辑</el-button>
                                <el-button type="text" @click="deleteLog(scope.row)">删除</el-button>
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  import { uploadUrl } from '../../../../utils/const'
  import Log from './log'
  import webStorage from 'webStorage'

  export default {
    name: 'opItem22',
    data () {
      return {
        serviceLog: [],
        serviceItem: [],
        userInfo: webStorage.getItem('userInfo'),
        fileList: [],
        form: {
          serviceYear: new Date(),
          serviceMonth: new Date().getMonth() + 1,
          orderId: this.params.orderId,
          type: this.params.numItem.type,
        },
        ruleForm: {
          message: '', // 存result
        },
        rules: {
          message: [
            {required: true, message: '请输入记账日常告知', trigger: 'blur'},
          ],
        },
        dateDisabled: false,
      }
    },
    computed: {
      uploadUrl () {
        return uploadUrl
      }
    },
    props: ['params'],
    methods: {
      getServiceLog () {
        API.workOrder.serviceLog({orderId: this.params.orderId, type: this.params.numItem.type}, (da) => {
          if(this.serviceItem.length > 0 && da.data.length > 0) {
              this.serviceItem.forEach(a => {
                  da.data.forEach(b => {
                      if(a.id === b.recordId) {
                          b.recordName = a.title
                      }
                  })
              })
          }
          this.serviceLog = da.data
        })
      },
      getServiceItem () {
        var p = {}
        if (this.params.isSetInterval) {
          p = JSON.parse(JSON.stringify(this.form))
          if (typeof this.form.serviceYear === 'object') {
            p.serviceYear = new Date().getFullYear()
          }
        } else {
          p = {
            orderId: this.params.orderId,
            type: this.params.numItem.type,
          }
        }
        API.workOrder.serviceItem(p, (da) => {
          this.serviceItem = da.data.content
          this.getServiceLog()
        })
      },
      showLog (item) {
        this.$vDialog.modal(Log, {
            title: item ? '修改日志' : '添加日志',
            width: 500,
            height: 500,
            params: {
                detail: item,
                serviceItem: this.serviceItem,
            },
            callback: (data) => {
                if (data.type === 'itemSave') {
                    this.getServiceLog()
                }
            },
        })
      },
      // 删除日志
      deleteLog (item) {
            let id = item.id;
            this.$confirm('确定删除该条日志信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                API.workOrder.deleteServiceLog(item.id, (data) => {
                    if(data.status && data.data === 1) {
                      this.$message({
                        type: 'success',
                        message: '删除成功!'
                      });
                      this.getServiceLog()
                    }
                })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
        
      },
      yearChangeHandle () {
        this.form.serviceMonth = null
      },
      saveSubmitForm (item) {
        let baseParam = {
          orderId: this.params.orderId,
          workOrderId: this.params.workOrderId,
          // id: item.id,
          type: 8,
          num: 22,
          operationCode: 1,
        };
        API.workOrder.serviceItemOperate(Object.assign({}, baseParam, {
          result: this.ruleForm.message,
        }), (res) => {
          if (res.status) {
            this.$message.success('操作成功')
            this.getServiceLog()
            this.getServiceItem()
            this.ruleForm = {
              message: '',
            }
          }
        })
      },
    },
    created () {
      this.dateDisabled = !this.params.isSetInterval
      this.getServiceItem()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .log-item {
    margin-bottom: 6px;
  }
</style>
