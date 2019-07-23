<template>
  <!--<div class="com-dialog-container">-->
  <div>
    <div class="com-dialog com-container">
      <div style="margin-bottom: 20px;">
        <span>服务年度</span>
        <el-date-picker
          style="width: 160px;"
          v-model="form.serviceYear"
          :disabled="dateDisabled"
          type="year"
          value-format="yyyy"
          @change="yearChangeHandle"
          placeholder="请选择年">
        </el-date-picker>
        &nbsp;&nbsp;
        <span>服务月度</span>
        <el-select v-model="form.serviceMonth" :disabled="dateDisabled" placeholder="请选择月" style="width: 100px;">
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

      <div>
        <table class="detail-table" style="text-align: center">
          <tr>
            <td class="td-title" style="width: 30px;">序号</td>
            <td class="td-title" style="width: 100px;">事项名称</td>
            <td class="td-title" style="width: 100px;">计划完成时限</td>
            <td class="td-title" style="width: 100px;">完成日期</td>
            <td class="td-title" style="width: 50px;">完成状态</td>
            <!--<td class="td-title" v-if="!params.isShow">操作</td>-->
            <td class="td-title">操作</td>
          </tr>
          <tr v-for="(item, index) in serviceItem" :key="index">
            <td style="width: 30px;">{{index+1}}</td>
            <td style="width: 100px;">{{item.title}}</td>
            <td style="width: 100px;">{{item.scheduleTime && $moment(item.scheduleTime).format('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td style="width: 100px;">{{item.finishTime && $moment(item.finishTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
            <td style="width: 50px;">
              <span v-if="item.state === 1">待完成</span>
              <span v-if="item.state === 2">待确认</span>
              <span v-if="item.state === 3">待审核</span>
              <span v-if="item.state === 4">已拒绝</span>
              <span v-if="item.state === 5">重新发起审核</span>
              <span v-if="item.state === 6">待完成</span>
              <span v-if="item.state === 9">已完成</span>
            </td>
            <td v-if="!params.isShow || other.isServiceDirector">
            <!--<td v-if="true">-->
              <!--<el-button type="text"-->
              <!--@click="operationListHandle(item, oplIndex + 1)"-->
              <!--v-for="(opl, oplIndex) in operationList[item.num - 1]"-->
              <!--:key="oplIndex">{{opl}}-->
              <!--</el-button>-->

              <!--
                  状态（1-待完成、2-待确认、3-待审核、4-已拒绝、5-重新发起审核、9-已完成）（注：状态可能只包含其中几个）

                  操作后隐藏按钮 state 1-待完成
                  操作完隐藏按钮 state (不等于)9-已完成
                  审核按钮 3-待审核
              -->
              <div>
                <div v-if="item.num === 1">
                  <el-button v-if="item.state !== 9 && item.state === 1" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                  
                  <span v-if='isNew'>
                      <el-button v-if="item.state === 6" type="text" @click="operationListHandle(item, 5)">
                        {{operationList[1][1-1]}}
                      </el-button>
                     <el-button v-if="item.state === 2" type="text"
                                 @click="operationListHandle(item, 6, 1)">{{operationList[1][2-1]}}
                      </el-button>
                  </span>
                </div>
               <div v-if="item.num === 2 && !isNew">
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                 <el-button v-if="item.state !== 9 && item.state !== 1" type="text"
                             @click="operationListHandle(item, 2)">{{operationList[item.num - 1][2-1]}}
                  </el-button>
                </div>
              <div v-if="item.num === 3 && !isNew">
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                  <el-button v-if="item.state !== 9 && item.state !== 1" type="text"
                             @click="operationListHandle(item, 2)">{{operationList[item.num - 1][2-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 4">
                  <el-button v-if="item.state !== 9" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 5">
                  <el-button v-if="item.state !== 9" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 6">
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 7">
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                  <!--<el-button type="text" @click="operationListHandle(item, 1)">-->
                    <!--{{operationList[item.num - 1][1-1]}}-->
                  <!--</el-button>-->
                  <!--审核未通过，状态-审核失败（隐藏录入按钮，显示修改按钮）-->
                  <el-button type="text"  v-if=" item.state === 4" @click="operationListHandle(item, 2)">{{operationList[item.num - 1][2-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 8">
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                  <el-button v-if="item.state === 4" type="text" @click="operationListHandle(item, 2)">
                    {{operationList[item.num - 1][2-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 9">
                  <el-button type="text" @click="operationListHandle(item, 1)">{{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 10">
                  <el-button v-if="item.state === 3 || item.state === 5" type="text" @click="operationListHandle(item, 2)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 3)">
                    {{operationList[item.num - 1][2-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 11">
                  <el-button v-if="item.state === 3 || item.state === 5" type="text" @click="operationListHandle(item, 2)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 3)">
                    {{operationList[item.num - 1][2-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 12">
                  <el-button v-if="item.state === 3 || item.state === 5" type="text" @click="operationListHandle(item, 2)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 3)">
                    {{operationList[item.num - 1][2-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 13">
                  <el-button v-if="item.state === 3 || item.state === 5" type="text" @click="operationListHandle(item, 2)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 3)">
                    {{operationList[item.num - 1][2-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 14">
                  <el-button v-if="item.state === 3 || item.state === 5" type="text" @click="operationListHandle(item, 2)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 3)">
                    {{operationList[item.num - 1][2-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 15">
                  <el-button v-if="item.state === 3 || item.state === 5" type="text" @click="operationListHandle(item, 2)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 3)">
                    {{operationList[item.num - 1][2-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 16">
                  <el-button v-if="item.state === 3 || item.state === 5" type="text" @click="operationListHandle(item, 2)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 3)">
                    {{operationList[item.num - 1][2-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 17">
                  <el-button v-if="item.state === 3 || item.state === 5" type="text"
                             @click="operationListHandle(item, 1)">{{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 18">
                  <el-button v-if="item.state === 3 || item.state === 5" type="text"
                             @click="operationListHandle(item, 1)">{{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 19">
                  <el-button type="text" @click="operationListHandle(item, 1)">{{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 20">
                  <el-button type="text" @click="operationListHandle(item, 1)">{{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 21">
                  <el-button type="text" @click="operationListHandle(item, 1)">{{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 22">
                  <el-button type="text" @click="operationListHandle(item, 1)">{{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 23">
                  <el-button v-if="item.state !== 9" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 24">
                  <el-button v-if="item.state !== 9" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 25">
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                  <el-button v-if="item.state !== 9" type="text" @click="operationListHandle(item, 2)">
                    {{operationList[item.num - 1][2-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 26">
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 27">
                  <el-button v-if="item.state === 3 || item.state === 5" type="text" @click="operationListHandle(item, 2)">
                    {{operationList[item.num - 1][2-1]}}
                  </el-button>
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 3)">
                    {{operationList[item.num - 1][3-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 28">
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 29">
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                  <el-button v-if="item.state !== 9" type="text" @click="operationListHandle(item, 2)">
                    {{operationList[item.num - 1][2-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 30">
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 31">
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 32">
                  <el-button type="text" @click="operationListHandle(item, 1)">{{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 33">
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 34">
                  <el-button type="text" @click="operationListHandle(item, 1)">{{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 35">
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 36"><!--针对计次类型的服务产品，在上传服务成果之后到客户未确认之前，可以进行修改成果资料,354 服务事项按钮开启时机的修改-->
                  <div v-for="(o, i) in serviceItem" :key="i">
                    <el-button v-if="o.num === 38 && o.state !== 9 && item.state !== 1" type="text" @click="operationListHandle(item, 1)">
                      {{operationList[item.num - 1][1-1]}}
                    </el-button>
                  </div>
                </div>
                <div v-if="item.num === 37">
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                  <el-button v-if="item.state !== 9" type="text" @click="operationListHandle(item, 2)">{{operationList[item.num - 1][2-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 38">
                  <el-button v-if="item.state === 6" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                  <el-button v-if="item.state === 2" type="text" @click="operationListHandle(item, 3)" :disabled="other.isServiceDirector ? false : true">
                    {{operationList[item.num - 1][3-1]}}
                  </el-button>
                  <!--<el-button type="text" @click="operationListHandle(item, 2)">{{operationList[item.num - 1][2-1]}}</el-button>-->
                </div>
                <div v-if="item.num === 39">
                  <el-button type="text" @click="operationListHandle(item, 1)">{{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 40">
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 41">
                  <el-button type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 42">
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                  <!--<el-button type="text" @click="operationListHandle(item, 1)">-->
                  <!--{{operationList[item.num - 1][1-1]}}-->
                  <!--</el-button>-->
                  <!--审核未通过，状态-审核失败（隐藏录入按钮，显示修改按钮）-->
                  <el-button type="text"  v-if=" item.state === 4" @click="operationListHandle(item, 2)">{{operationList[item.num - 1][2-1]}}
                  </el-button>
                </div>
                <div v-if="item.num === 43">
                  <el-button v-if="item.state === 1" type="text" @click="operationListHandle(item, 1)">
                    {{operationList[item.num - 1][1-1]}}
                  </el-button>
                  <!--<el-button type="text" @click="operationListHandle(item, 1)">-->
                  <!--{{operationList[item.num - 1][1-1]}}-->
                  <!--</el-button>-->
                  <!--审核未通过，状态-审核失败（隐藏录入按钮，显示修改按钮）-->
                  <el-button type="text"  v-if=" item.state === 4" @click="operationListHandle(item, 2)">{{operationList[item.num - 1][2-1]}}
                  </el-button>
                </div>
              </div>
              <!-- 申请延期 未完成状态前都显示  && (index == (serviceItem.length - 1))-->
              <el-button type="text" @click="applicationForExtension(item)" v-if="isShowApplication(item)">申请延期</el-button>
            </td>
           <td v-else>
<!--              <div v-if="item.num === 34 || item.num === 39">
                <el-button type="text" @click="operationListHandle(item, 1)">{{operationList[item.num - 1][1-1]}}
                </el-button>
                <el-button type="text" @click="applicationForExtension(item)" v-if="isShowApplication(item)">申请延期</el-button>
              </div> -->
            </td>
          </tr>
        </table>
        <div style="margin-top: 20px;">
          <ul>
            <li v-for="(item, index) in serviceItem"
                :key="index"
                v-if="item.itemRecord">
              工作成果：
              <span>
                   <span v-if="item.num == 1">服务管家设置外勤上门时间</span>
                   <span v-else-if="item.num == 2">客户已查看并确认“客户告知书”</span>
                   <span v-else-if="item.num == 3">客户已查看并确认“众智金管家服务首次交接资料清单”</span>
                   <span v-else>{{item.title}}</span>&nbsp;&nbsp;
              </span>

              <span v-if="item.attachment">
                <span>{{getFileNameFromUrl(item.attachment)}}</span>
                <a target="_blank" :href="getUrl(item.attachment)">附件下载</a>
              </span>
              <span v-if="item.setTime">
                <span v-if="item.num == 5">{{$moment(item.setTime).format('YYYY')}}</span>
                <span v-else-if="item.num === 4 || item.num===40">
                  {{$moment(item.setTime).format('YYYY-MM-DD')}}
                  &nbsp;&nbsp;
                  {{orderDetail.periodEnd && $moment(orderDetail.periodEnd).format('YYYY-MM-DD')}}
                </span>
                <span v-else>{{$moment(item.setTime).format('YYYY-MM-DD')}}</span>
              </span>
              <a style="color: blue" v-if="item.num === 34 || item.num === 39" @click="showContactDetail(item)">查看联系人信息</a>
              <a style="color: blue" v-if="item.num === 7 || item.num === 42 || item.num === 43" @click="showCustomerDetail(item)">查看客户信息表</a>
            </li>
          </ul>
        </div>
      </div>

      <div style="margin-top: 30px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>服务日志</span>
            <span style="float: right;" v-if='params.typeItem.managerId === userInfo.id'>
                <el-button @click='showLog(null)'>添加</el-button>
            </span>
          </div>
          <div style="max-height: 400px;">
<!--            <div v-for="(item, index) in serviceLog" :key="index" class="log-item">
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
                  style="text-align: center"
                  height="400px"
                  tooltip-effect="dark">
                    <el-table-column label="管家" prop="operatorName"></el-table-column>
                    <el-table-column label="操作时间" prop="opTime" width="160">
                        <template slot-scope="scope">
                            <span>{{scope.row.opTime && $moment(scope.row.opTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="事项名称" prop="title">
                      <template slot-scope="scope">
                        <span v-if='scope.row.title'>{{scope.row.title}}</span>
                        <span v-else>{{scope.row.recordName}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作描述" prop="description"></el-table-column>
                    <el-table-column label="办理结果" prop="result"></el-table-column>
                    <el-table-column label="成果附件" >
                        <template slot-scope="scope">
                            <span style='cursor: pointer' v-if="scope.row.attachment"><a :href="scope.row.attachment" target="_blank">查看</a></span>
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
    <!-- 申请延期弹框 -->
    <el-dialog
      title="延期申请"
      :visible.sync="applicationForExtensionShow"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      width="500px">
      <div>
          <el-form ref='appForm' label-width="100px">
            <el-form-item label="延期原因类型">
                <el-select v-model="applicationForm.operationCode" placeholder="请选择延期原因类型">
                  <el-option label="客户原因" :value="1"></el-option>
                  <el-option label="政策原因" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="其他说明">
                <el-input v-model="applicationForm.remark" type="textarea" resize="none" rows="4" placeholder="请填写说明" maxlength="200"></el-input>
            </el-form-item>
            <el-form-item label="计划完成时间">
                <el-date-picker
                  v-model="applicationForm.scheduleTime"
                  type="date"
                  :picker-options="pickerOptions"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="上传资料">
                <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    :on-remove="onRemoveHandle"
                    :headers="{authKey: userInfo.authKey}"
                    :on-success="onSuccessHandle"
                    :file-list="fileList"
                    :limit="1">
                    <el-button type="success" size="small" class='edit-upload-button'>上传</el-button>
                </el-upload>
            </el-form-item>
          </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="applicationForExtensionShow = false">取 消</el-button>
        <el-button type="primary" @click="subApplication">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  import operationCode11 from './items/operationCode1_1'
  import operationCode15 from './items/operationCode1_5'
  import operationCode21 from './items/operationCode2_1'
  import operationCode41 from './items/operationCode4_1'
  import operationCode51 from './items/operationCode5_1'
  import operationCode61 from './items/operationCode6_1'
  import operationCode101 from './items/operationCode10_1'
  import operationCode291 from './items/operationCode29_1'
  import operationCode341 from './items/operationCode34_1'
  import operationCode351 from './items/operationCode35_1'
  import operationCode371 from './items/operationCode37_1'
  import { uploadUrl } from '../../../../utils/const'
  import recordContact from './items/recordContact'
  import operationCode71 from './items/operationCode7_1'
  import operationCode171 from './items/operationCode17_1'
  import operationCode181 from './items/operationCode18_1'
  import operationCode261 from './items/operationCode26_1'
  import Log from './log'
  import webStorage from 'webStorage'

  export default {
    name: 'opItem',
    data () {
      return {
        serviceLog: [],
        serviceItem: [],
        applicationForExtensionShow: false,
        userInfo: webStorage.getItem('userInfo'),
        fileList: [],
        applicationItem: {},
        applicationForm: {
            operationCode: '',       //延期原因类型
            remark: '',              //其他说明
            attachment: '',          //上传资料
            attachName: '',          //上传资料
            scheduleTime: '',        //计划完成时间
        },
        other: null,
        date_num: 1000 * 60 * 60 * 24 * 7,
        operationList: [ // 根据num值确定按钮
          ['设置上门日期'], // num 1
          ['推送客户告知书', '提醒用户查看'], // num 2 客户确认
          ['推送首次交接清单', '提醒用户查看'], // num 3 客户确认
          ['设置服务周期'], // num 4
          ['设置年报时间'], // num 5
          ['上传客户确认函'], // num 6
          ['录入客户信息表', '修改客户信息'], // num 7
          ['上传客户财务资料', '修改客户财务资料'], // num 8
          ['完成装订凭证'], // num 9,  '客户确认装订凭证'
          ['', '事项任务审核', '完成服务'], // num 10
          ['', '事项任务审核', '完成服务'], // num 11
          ['', '事项任务审核', '完成服务'], // num 12
          ['', '事项任务审核', '完成服务'], // num 13
          ['', '事项任务审核', '完成服务'], // num 14
          ['', '事项任务审核', '完成服务'], // num 15
          ['', '事项任务审核', '完成服务'], // num 16
          ['审核客户信息表'], // num 17
          ['审核客户财务资料'], // num 18
          ['完成资料存档'], // num 19
          ['完成开设账套'], // num 20
          ['客户票据审核'], // num 21
          ['记账日常告知'], // num 22
          ['发送抄报提醒'], // num 23
          ['发送清卡提醒'], // num 24
          ['发送财务确认函', '提醒客户确认财务函'], // num 25, '客户确认'
          ['完成工商年报'], // num 26, '客户确认'
          ['', '事项任务审核', '完成服务'], // num 27   用户请求生成
          ['上传财务制度'], // num 28
          ['发送纳税确认函', '提醒客户确认'], // num 29, '客户确认'
          ['上报纳税申请表'], // num 30
          ['完成纳税申报'], // num 31
          ['纳税异常提醒'], // num 32
          ['上传税收风险提示书'], // num 33
          ['完善联系人信息'], // num 34
          ['确认开始服务时间'], // num 35
          ['上传服务成果'], // num 36
          ['添加服务阶段款项', '完成阶段款项添加'], // num 37
          ['向客户推送 “完结确认”', '提醒用户确认', '确认完成服务'], // num 38, '用户确认'
          ['完善联系人信息'], // num 39
          ['设置服务周期'], // num 40
          ['上传服务成果'], // num 41
          ['录入客户信息表', '修改客户信息'], // num 42
          ['录入客户信息表', '修改客户信息'],  // num 43
        ],
        form: {
          // serviceYear: new Date().getFullYear(),
          serviceYear: new Date(),
          serviceMonth: new Date().getMonth() + 1,
          orderId: this.params.orderId,
          type: this.params.numItem.type,
          current: 1,
          pageSize: 10000,
        },
        pickerOptions: this.pickerOptionses(),
        dateDisabled: true,
        orderDetail: '',
        isNew: false,
      }
    },
    computed: {
      // serverUrl () {
      //   return serverUrl
      // }
        uploadUrl () {
            return uploadUrl
        }
    },
    props: ['params'],
    methods: {
        isShowApplication (item) {
            // (item.type === 1 && item.num === 1 && item.state === 1 && isNew) || (item.type === 18 && item.num === 34) || (item.type === 18 && item.num === 35) || (item.type === 19 && item.num === 36) || (item.type === 19 && item.num === 37) || (item.type === 20 && item.num === 39) || (item.type === 20 && item.num === 40) || (item.type === 21 && item.num === 41) || (item.type === 21 && item.num === 42) || (item.type === 19 && item.num === 43)) && item.state !== 9
            let _type = (item.type === 1 && item.num === 1 && item.state === 1 && this.isNew && item.state !== 9) && true ||
                        (item.type === 18 && item.num === 34 && item.state !== 9) && true ||
                        (item.type === 18 && item.num === 35 && item.state !== 9) && true ||
                        (item.type === 19 && item.num === 36 && item.state !== 9) && true ||
                        (item.type === 19 && item.num === 37 && item.state !== 9) && true ||
                        (item.type === 19 && item.num === 38 && item.state !== 9 && item.state !== 2) && true ||
                        (item.type === 20 && item.num === 39 && item.state !== 9) && true ||
                        (item.type === 20 && item.num === 40 && item.state !== 9) && true ||
                        (item.type === 21 && item.num === 41 && item.state !== 9) && true ||
                        (item.type === 21 && item.num === 42 && item.state !== 9) && true ||
                        (item.type === 19 && item.num === 43 && item.state !== 9) && true || false;
            return _type;
        },
      // 申请延期弹框显示
      applicationForExtension (item) {
        // 清空信息
        this.applicationForm = {
            operationCode: '',
            remark: '',
            attachment: '',
            attachmentName: '',
            scheduleTime: '',
        };
        this.fileList = [];
        this.applicationForExtensionShow = true;
        this.applicationItem = item;
      },
      pickerOptionses () {
          let _this = this;
         return {
            disabledDate(time) {
                return time.getTime() < (+_this.applicationItem.scheduleTime);
            }
         }
      },
      showLog (item) {
        this.$vDialog.modal(Log, {
            title: item ? '修改日志' : '添加日志',
            width: 500,
            height: 500,
            params: {
                detail: item,
                workOrderId: this.params.workOrderId,
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
      subApplication () {
          let message = !this.applicationForm.operationCode && '请选择延期原因类型' ||
                        !this.applicationForm.scheduleTime && '请选择计划完成时间' ||
                        !this.applicationForm.attachment && '请上传资料' || null;
          if(message) return this.$message.info(message);
          // 时间变化
          let newTime = new Date(this.$moment(this.applicationForm.scheduleTime).format('YYYY-MM-DD') + ' 23:59:59');
          this.applicationForm.scheduleTime = newTime;
          let item = this.applicationItem;
          if(item.scheduleTime > +newTime) return this.$message.info('请选择原计划完成时间之后的时间');
          this.applicationForm.orderId = item.orderId;
          this.applicationForm.workOrderId = item.workOrderId;
          this.applicationForm.id = item.id;
          this.applicationForm.type = item.type;
          this.applicationForm.num = item.num;
          API.workOrder.applicationForExtension(this.applicationForm, (data) => {
              if(data.status && data.data === 1) {
                this.$message.success('申请延期成功');
                this.applicationForExtensionShow = false;
              }
          })
      },
        // 资料成功上传
        onSuccessHandle (response, file, fileList) {
            this.applicationForm.attachment = response.data.url
            this.applicationForm.attachmentName = response.data.name
        },
        // 删除已上传文件
        onRemoveHandle () {
            this.applicationForm.attachment = '';
            this.applicationForm.attachmentName = '';
        },
      getOrderDetail (orderId) {
        API.serviceOrder.detailByOrderId(orderId, (da) => {
          this.orderDetail = da.data
        })
      },
      getFileNameFromUrl (url) {
        if (!url) {
          return ''
        }
        try {
          let obj = JSON.parse(url)
          if (typeof obj === 'object' && obj) {
            return obj.name
          } else {
            let arr = url.split('/')
            if (arr.length) {
              return arr[arr.length - 1]
            } else {
              return ''
            }
          }
        } catch (e) {
          let arr = url.split('/')
          if (arr.length) {
            return arr[arr.length - 1]
          } else {
            return ''
          }
        }
      },
      getUrl (url) {
        if (!url) {
          return ''
        }
        try {
          let obj = JSON.parse(url)
          if (typeof obj === 'object' && obj) {
            return obj.url
          } else {
            return url
          }
        } catch (e) {
          return url
        }
      },
      getServiceLog () {
        API.workOrder.serviceLog({orderId: this.params.orderId}, (da) => {
          // if(this.serviceItem.length > 0 && da.data.length > 0) {
          //     this.serviceItem.forEach(a => {
          //         da.data.forEach(b => {
          //             if(a.id === b.recordId && !b.title) {
          //                 b.title = a.title
          //             }
          //         })
          //     })
          // }
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
        API.workOrder.serviceItem(Object.assign({}, p), (da) => {
          this.serviceItem = da.data.content
          this.other = da.other
          this.isNew = false;
          if(this.serviceItem.length == 1) {
              // this.serviceItem.splice(1, 2)
              this.serviceItem.forEach(a => {
                  if(a.num === 1) {
                      this.isNew = true;
                  }
              })
          }
          this.getServiceLog()
        })
      },
      yearChangeHandle () {
        this.form.serviceMonth = null
      },
      operationListHandle (item, operationCode, distinguish) {
        let contactId = null // 完善联系人信息时判断 编辑用， 有id就是编辑
        if (item.num === 34 || item.num === 39) {
          contactId = item.result ? JSON.parse(item.result).id : null
        }
        let baseParam = {
          orderId: this.params.orderId,
          workOrderId: this.params.workOrderId,
          id: item.id,
          type: item.type,
          num: item.num,
          operationCode: contactId ? (operationCode + 1) : operationCode,
          serviceMonth:item.serviceMonth,
        }
        if (item.num === 1 && operationCode === 1) {
          this.$vDialog.modal(operationCode11, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 500,
            height: 400,
            params: {
              baseParam: baseParam,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
                this.getServiceLog()
                this.getServiceItem()
              }
            },
          })
        } else if (item.num === 1 && operationCode === 5) {
            // 新告知客户书和推送交接清单合并
          this.$vDialog.modal(operationCode15, {
            title: '推送信息',
            width: 600,
            height: 400,
            params: {
              baseParam: baseParam,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
                this.getServiceLog()
                this.getServiceItem()
              }
            },
          })
            
        } else if (distinguish === 1 && operationCode === 6) {// 无弹窗  新提醒用户
          API.workOrder.serviceItemOperateAll(Object.assign({}, baseParam, {
            num: 1,
            operationCode: 3,
          }), (res) => {
            if (res.status) {
              this.$message.success('操作成功')
              this.getServiceLog()
              this.getServiceItem()
            }
          })
            
        } else if ((item.num === 2 && operationCode === 1 && !this.isNew) || (item.num === 3 && operationCode === 1 && !this.isNew) ||
          (item.num === 9 && operationCode === 1) || (item.num === 19 && operationCode === 1) ||
          (item.num === 20 && operationCode === 1) ||
          (item.num === 23 && operationCode === 1) || (item.num === 24 && operationCode === 1) ||
          (item.num === 25 && operationCode === 1) ||
          (item.num === 37 && operationCode === 2) ||
          (item.num === 38 && operationCode === 1)
        ) { // 备注
          this.$vDialog.modal(operationCode21, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 500,
            height: 220,
            params: {
              baseParam: baseParam,
              distinguish: distinguish,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
                this.getServiceLog()
                this.getServiceItem()
              }
            },
          })
        } else if ((item.num === 1 && operationCode === 5 && this.isNew) || (item.num === 2 && operationCode === 2 && !this.isNew) || (item.num === 3 && operationCode === 2 && !this.isNew) ||
          (item.num === 25 && operationCode === 2) || (item.num === 29 && operationCode === 2) ||
          (item.num === 31 && operationCode === 1) || (item.num === 38 && operationCode === 2)
        ) { // 无弹窗
          API.workOrder.serviceItemOperate(Object.assign({}, baseParam, {
            // remark: this.ruleForm.remark,
            // result: JSON.stringify({})
          }), (res) => {
            if (res.status) {
              this.$message.success('操作成功')
              this.getServiceLog()
              this.getServiceItem()
            }
          })
        } else if (item.num === 38 && operationCode === 3) { // 无弹窗
          API.workOrder.serviceItemOperate(baseParam, (res) => {
            if (res.status) {
              this.$message.success('操作成功')
              this.getServiceLog()
              this.getServiceItem()
            }
          })
        } else if ((item.num === 4 && operationCode === 1) || (item.num === 40 && operationCode === 1)) {
          this.$vDialog.modal(operationCode41, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 500,
            height: 320,
            params: {
              baseParam: baseParam,
              orderId: this.params.orderId,
              itemNum:item.num,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
                this.getServiceLog()
                this.getServiceItem()
                this.getOrderDetail(this.params.orderId)
              }
            },
          })
        } else if ((item.num === 5 && operationCode === 1)) {
          this.$vDialog.modal(operationCode51, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 500,
            height: 300,
            params: {
              baseParam: baseParam,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
                this.getServiceLog()
                this.getServiceItem()
              }
            },
          })
        } else if ((item.num === 6 && operationCode === 1) || (item.num === 8 && operationCode === 1) ||
          (item.num === 8 && operationCode === 2) || ((item.num >= 10 && item.num <= 16) && operationCode === 3) ||
          (item.num === 27 && operationCode === 3) || (item.num === 28 && operationCode === 1) ||
          (item.num === 30 && operationCode === 1) || (item.num === 33 && operationCode === 1) ||
          (item.num === 36 && operationCode === 1) || (item.num === 41 && operationCode === 1)
        ) { // 上传文件
          this.$vDialog.modal(operationCode61, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 500,
            height: 300,
            params: {
              baseParam: baseParam,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
                this.getServiceLog()
                this.getServiceItem()
              }
            },
          })
        } else if ((item.num === 7 && operationCode === 1) || (item.num === 7 && operationCode === 2) ||
          (item.num === 42 && operationCode === 1) || (item.num === 7 && operationCode === 2) ||
          (item.num === 43 && operationCode === 1) || (item.num === 7 && operationCode === 2)) {
          let type = 'show'
          if (operationCode === 1) {
            type = 'add'
          } else if (operationCode === 2) {
            type = 'edit'
          } else {
            type = 'show'
          }
          this.$vDialog.modal(operationCode71, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 1200,
            height: 700,
            params: {
              baseParam: baseParam,
              customerName: this.params.customerName,
              customerId: this.params.customerId,
              type: type,
              result: item.result,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
                this.getServiceLog()
                this.getServiceItem()
              }
            },
          })
        } else if ((item.num === 17 && operationCode === 1)) { // 审核客户资料
          this.$vDialog.modal(operationCode171, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 1200,
            height: 700,
            params: {
              baseParam: baseParam,
              operateItem: item,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
                this.getServiceLog()
                this.getServiceItem()
              }
            },
          })
        } else if ((item.num === 18 && operationCode === 1)) { // 用户财务资料审核
          this.$vDialog.modal(operationCode181, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 500,
            height: 300,
            params: {
              baseParam: baseParam,
              operateItem: item,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
                this.getServiceLog()
                this.getServiceItem()
              }
            },
          })
        } else if (((item.num >= 10 && item.num <= 16) && operationCode === 2) ||
          (item.num === 27 && operationCode === 2)
        ) { // 审核
          this.$vDialog.modal(operationCode101, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 500,
            height: 250,
            params: {
              baseParam: baseParam,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
                this.getServiceLog()
                this.getServiceItem()
              }
            },
          })
        } else if ((item.num === 26 && operationCode === 1)) {
          this.$vDialog.modal(operationCode261, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 500,
            height: 280,
            params: {
              baseParam: baseParam,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
                this.getServiceLog()
                this.getServiceItem()
              }
            },
          })
        } else if ((item.num === 29 && operationCode === 1)
        ) { // 发送纳税确认函
          this.$vDialog.modal(operationCode291, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 500,
            height: 270,
            params: {
              baseParam: baseParam,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
                this.getServiceLog()
                this.getServiceItem()
              }
            },
          })
        } else if ((item.num === 34 && operationCode === 1) || (item.num === 39 && operationCode === 1)) {
          this.$vDialog.modal(operationCode341, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 860,
            height: 600,
            params: {
              baseParam: baseParam,
              customerName: this.params.customerName,
              customerId: this.params.customerId,
              contactId: contactId,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
                this.getServiceLog()
                this.getServiceItem()
              }
            },
          })
        } else if ((item.num === 35 && operationCode === 1)) {
          this.$vDialog.modal(operationCode351, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 500,
            height: 300,
            params: {
              baseParam: baseParam,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
                this.getServiceLog()
                this.getServiceItem()
              }
            },
          })
        } else if ((item.num === 37 && operationCode === 1)) {
          this.$vDialog.modal(operationCode371, {
            title: this.operationList[item.num - 1][operationCode - 1],
            width: 360,
            height: 260,
            params: {
              baseParam: baseParam,
            },
            callback: (data) => {
              if (data.type === 'itemSave') {
                this.getServiceLog()
                this.getServiceItem()
              }
            },
          })
        } else {
          alert('else')
        }
      },
      showContactDetail (item) {
        this.$vDialog.modal(recordContact, {
          title: '查看联系人',
          width: 860,
          height: 400,
          params: {
            contactId: item.result ? JSON.parse(item.result).id : null,
          },
          callback: (data) => {
          },
        })
      },
      showCustomerDetail (item) {
        this.$vDialog.modal(operationCode71, {
          title: '查看客户信息表',
          width: 1200,
          height: 700,
          params: {
            baseParam: null,
            customerName: this.params.customerName,
            customerId: this.params.customerId,
            type: 'show',
            result: item.result,
          },
          callback: (data) => {},
        })
      }
    },
    created () {
      this.dateDisabled = !this.params.isSetInterval
      this.getServiceItem()
      this.getOrderDetail(this.params.orderId)
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .log-item {
    margin-bottom: 6px;
  }
</style>
