<!--服务任务-->
<template>
  <div class="com-container" v-loading="loading">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, index) in $route.meta.pos" :key="index" :to="{name: item.toName}">
          {{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <p class="event-head">外勤管家服务统计:</p>
      <div class="com-bar-left">
        <span>统计时间: </span>
        <el-date-picker
          v-model="time"
          type="month"
          value-format="yyyy-MM"
          @change="timeIntervalHandle"
          :unlink-panels="true"
          :default-value="lastMonthDate()"
          placeholder="请选择月份">
        </el-date-picker>
        <com-button buttonType="search" @click="searchHandle(301)">查询</com-button>
      </div>
      <div class="com-bar-right">
      </div>
      <p style="clear: both;"></p>
      <div class="center-table">
        <el-table
          ref="multipleTable2"
          border
          :data="tableData"
          tooltip-effect="dark">
        <el-table-column label="产品名称" show-overflow-tooltip prop="goodsName">
          <template slot-scope="scope">
            <span>{{scope.row.goodsName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="管家类型" show-overflow-tooltip>
          <template slot-scope="scope"><span>{{scope.row.codeName}} ({{scope.row.cityName}})</span></template>
        </el-table-column>
        <el-table-column label="首次服务">
          <el-table-column label="首次沟通">
            <el-table-column label="准时完成数" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.option1.onCompNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.time, scope.row.codeId, scope.row.option1.type, scope.row.cityId, 1, scope.row.goodsId)">{{scope.row.option1.onCompNum}}</a></span>
                <span v-else>{{scope.row.option1.onCompNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="超时完成数" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.option1.overCompNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.time, scope.row.codeId, scope.row.option1.type, scope.row.cityId, 2, scope.row.goodsId)">{{scope.row.option1.overCompNum}}</a></span>
                <span v-else>{{scope.row.option1.overCompNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="未完成-已超时数" width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.option1.overHangNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.time, scope.row.codeId, scope.row.option1.type, scope.row.cityId, 3, scope.row.goodsId)">{{scope.row.option1.overHangNum}}</a></span>
                <span v-else>{{scope.row.option1.overHangNum}}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="首次上门">
            <el-table-column label="准时完成数" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.option2.onCompNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.time, scope.row.codeId, scope.row.option2.type, scope.row.cityId, 1, scope.row.goodsId)">{{scope.row.option2.onCompNum}}</a></span>
                <span v-else>{{scope.row.option2.onCompNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="超时完成数" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.option2.overCompNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.time, scope.row.codeId, scope.row.option2.type, scope.row.cityId, 2, scope.row.goodsId)">{{scope.row.option2.overCompNum}}</a></span>
                <span v-else>{{scope.row.option2.overCompNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="未完成-已超时数" width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.option2.overHangNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.time, scope.row.codeId, scope.row.option2.type, scope.row.cityId, 3, scope.row.goodsId)">{{scope.row.option2.overHangNum}}</a></span>
                <span v-else>{{scope.row.option2.overHangNum}}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="录入资料">
            <el-table-column label="准时完成数" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.option3.onCompNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.time, scope.row.codeId, scope.row.option3.type, scope.row.cityId, 1, scope.row.goodsId)">{{scope.row.option3.onCompNum}}</a></span>
                <span v-else>{{scope.row.option3.onCompNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="超时完成数" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.option3.overCompNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.time, scope.row.codeId, scope.row.option3.type, scope.row.cityId, 2, scope.row.goodsId)">{{scope.row.option3.overCompNum}}</a></span>
                <span v-else>{{scope.row.option3.overCompNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="未完成-已超时数" width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.option3.overHangNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.time, scope.row.codeId, scope.row.option3.type, scope.row.cityId, 3, scope.row.goodsId)">{{scope.row.option3.overHangNum}}</a></span>
                <span v-else>{{scope.row.option3.overHangNum}}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        </el-table>
      </div>
    </div>
    <!--详细-->
    <div class="com-bar">
      <p class="event-head">记账管家服务统计:</p>
      <div class="com-bar-left">
        <span>统计时间: </span>
        <el-date-picker
          v-model="times"
          type="month"
          value-format="yyyy-MM"
          @change="timeIntervalHandles"
          :unlink-panels="true"
          :default-value="lastMonthDate()"
          placeholder="请选择月份">
        </el-date-picker>
        <com-button buttonType="search" @click="searchHandle(300)">查询</com-button>
      </div>
      <div class="com-bar-right">
      </div>
      <p style="clear: both;"></p>
      <div>
        <el-table
          ref="multipleTable"
          border
          stripe
          :data="tableDatas"
          tooltip-effect="dark">
          <el-table-column show-overflow-tooltip align="center" label="产品名称" width="150" prop="goodsName"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="管家类型" width="150">
            <template slot-scope="scope"><span>{{scope.row.codeName}}</span></template>
          </el-table-column>
          <el-table-column align="center" label="首次服务" >
            <el-table-column align="center" label="资料审核">
              <el-table-column label="准时完成数" width="100" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.option1.onCompNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.times, scope.row.codeId, scope.row.option1.type, scope.row.cityId, 1, scope.row.goodsId)">{{scope.row.option1.onCompNum}}</a></span>
                  <span v-else>{{scope.row.option1.onCompNum || 0}}</span>
                </template>
              </el-table-column>
              <el-table-column label="超时完成数" width="100" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.option1.overCompNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.times, scope.row.codeId, scope.row.option1.type, scope.row.cityId, 2, scope.row.goodsId)">{{scope.row.option1.overCompNum}}</a></span>
                  <span v-else>{{scope.row.option1.overCompNum || 0}}</span>
                </template>
              </el-table-column>
              <el-table-column label="未完成-已超时数" width="120" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.option1.overHangNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.times, scope.row.codeId, scope.row.option1.type, scope.row.cityId, 3, scope.row.goodsId)">{{scope.row.option1.overHangNum}}</a></span>
                  <span v-else>{{scope.row.option1.overHangNum || 0}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="资料存档">
              <el-table-column label="准时完成数" width="100" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.option2.onCompNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.times, scope.row.codeId, scope.row.option2.type, scope.row.cityId, 1, scope.row.goodsId)">{{scope.row.option2.onCompNum}}</a></span>
                  <span v-else>{{scope.row.option2.onCompNum || 0}}</span>
                </template>
              </el-table-column>
              <el-table-column label="超时完成数" width="100" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.option2.overCompNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.times, scope.row.codeId, scope.row.option2.type, scope.row.cityId, 2, scope.row.goodsId)">{{scope.row.option2.overCompNum}}</a></span>
                  <span v-else>{{scope.row.option2.overCompNum || 0}}</span>
                </template>
              </el-table-column>
              <el-table-column label="未完成-已超时数" width="120" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.option2.overHangNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.times, scope.row.codeId, scope.row.option2.type, scope.row.cityId, 3, scope.row.goodsId)">{{scope.row.option2.overHangNum}}</a></span>
                  <span v-else>{{scope.row.option2.overHangNum || 0}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="开设账套">
              <el-table-column label="准时完成数" width="100" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.option3.onCompNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.times, scope.row.codeId, scope.row.option3.type, scope.row.cityId, 1, scope.row.goodsId)">{{scope.row.option3.onCompNum}}</a></span>
                  <span v-else>{{scope.row.option3.onCompNum || 0}}</span>
                </template>
              </el-table-column>
              <el-table-column label="超时完成数" width="100" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.option3.overCompNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.times, scope.row.codeId, scope.row.option3.type, scope.row.cityId, 2, scope.row.goodsId)">{{scope.row.option3.overCompNum}}</a></span>
                  <span v-else>{{scope.row.option3.overCompNum || 0}}</span>
                </template>
              </el-table-column>
              <el-table-column label="未完成-已超时数" width="120" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.option3.overHangNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.times, scope.row.codeId, scope.row.option3.type, scope.row.cityId, 3, scope.row.goodsId)">{{scope.row.option3.overHangNum}}</a></span>
                  <span v-else>{{scope.row.option3.overHangNum || 0}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="月度服务" >
            <el-table-column align="center" label="出具财务报表">
              <el-table-column label="准时完成数" width="100" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.option4.onCompNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.times, scope.row.codeId, scope.row.option4.type, scope.row.cityId, 1, scope.row.goodsId)">{{scope.row.option4.onCompNum}}</a></span>
                  <span v-else>{{scope.row.option4.onCompNum || 0}}</span>
                </template>
              </el-table-column>
              <el-table-column label="超时完成数" width="100" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.option4.overCompNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.times, scope.row.codeId, scope.row.option4.type, scope.row.cityId, 2, scope.row.goodsId)">{{scope.row.option4.overCompNum}}</a></span>
                  <span v-else>{{scope.row.option4.overCompNum || 0}}</span>
                </template>
              </el-table-column>
              <el-table-column label="未完成-已超时数" width="120" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.option4.overHangNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.times, scope.row.codeId, scope.row.option4.type, scope.row.cityId, 3, scope.row.goodsId)">{{scope.row.option4.overHangNum}}</a></span>
                  <span v-else>{{scope.row.option4.overHangNum || 0}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="纳税申报">
              <el-table-column label="准时完成数" width="100" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.option5.onCompNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.times, scope.row.codeId, scope.row.option5.type, scope.row.cityId, 1, scope.row.goodsId)">{{scope.row.option5.onCompNum}}</a></span>
                  <span v-else>{{scope.row.option5.onCompNum || 0}}</span>
                </template>
              </el-table-column>
              <el-table-column label="超时完成数" width="100" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.option5.overCompNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.times, scope.row.codeId, scope.row.option5.type, scope.row.cityId, 2, scope.row.goodsId)">{{scope.row.option5.overCompNum}}</a></span>
                  <span v-else>{{scope.row.option5.overCompNum || 0}}</span>
                </template>
              </el-table-column>
              <el-table-column label="未完成-已超时数" width="120" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.option5.overHangNum > 0"><a class="optionItemA" @click="goDetail(defaultListParams.times, scope.row.codeId, scope.row.option5.type, scope.row.cityId, 3, scope.row.goodsId)">{{scope.row.option5.overHangNum}}</a></span>
                  <span v-else>{{scope.row.option5.overHangNum || 0}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { underscoreName, lastMonthDate } from '../../../../utils/utils'
  import API from '../../../../utils/api'
  import comButton from '../../../../components/button/comButton'
  import { serverUrl } from '../../../../utils/const'
  import webStorage from 'webStorage'
  import QS from 'qs'

  export default {
    name: 'list',
    data () {
      return {
        loading: false,
        currentPage: 1,
        defaultListParams: { // 默认顾客列表请求参数
          time: '',
          times: '',
        },
        sortObj: {}, // 排序
        advancedSearch: {}, // 高级搜索
        tableData: [],
        tableDatas: [],
        tableDataTotal: 0,
        serviceTaskNum: [],
				goodsTypeList: [],    //所有分类
				goodsList: [],        //所有商品

        time: '',
        times: '',
        codeId: '',          //外勤管家id
        codeIds: '',         //记账管家id
      }
    },
    watch: {
    },
    computed: {},
    components: {
      comButton,
    },
    methods: {
			// 进入详情页
			goDetail (dateQuery, codeId, type, cityId, overState, goodsId) {
				let _data = {
          dateQuery,
          codeId,
          type,
          cityId,
          overState,
          goodsId,
				};
				let _url = this.$router.resolve({path: 'serviceEventStatisticsDetail', query: _data});
        window.open(_url.href, '_blank')
			},
      lastMonthDate () {
        return lastMonthDate()
      },
      timeIntervalHandle (value) {
        if(!value) {
          this.defaultListParams.time = '';
          return;
        }
        this.defaultListParams.time = value;
      },
      timeIntervalHandles (value) {
        if(!value) {
          this.defaultListParams.times = '';
          return;
        }
        this.defaultListParams.times = value;
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getServiceWorkManager()
      },
      searchHandle (num) {
        let params = {
          dateQuery: this.defaultListParams.time,
        };
        if(num == 0) { //页面初次加载时
          this.loading = true;
          API.zhuxinStatistical.getStatisticsOfServices(params, (data) => {
            this.loading = false;
            if(data.status) {
              let _data = this.setData(data.data);
              if(_data.length) {
                _data.forEach(item => {
                  if(item.codeId == 301) {
                    this.tableData.push(item);
                  }
                  if(item.codeId == 300) {
                    this.tableDatas.push(item);
                  }
                })
              }
            }
          })
        }else {
          if(num == 301) {  //外勤管家
            this.tableData = [];
            params.codeId = num;
            API.zhuxinStatistical.getStatisticsOfServices(params, (data) => {
              if(data.status) {
                let _data = this.setData(data.data);
                if(_data.length) {
                  this.tableData = _data;
                }
              }
            })
            return;
          }
          if(num == 300) {  //记账管家
            this.tableDatas = [];
            params.dateQuery = this.defaultListParams.times;
            params.codeId = num;
            API.zhuxinStatistical.getStatisticsOfServices(params, (data) => {
              if(data.status) {
                let _data = this.setData(data.data);
                if(_data.length) {
                  this.tableDatas = _data;
                }
              }
            })
          }
        }
      },
      // 设置数据
      setData (data) {
        let _data = data;
        if(_data.length > 0) {
          _data.forEach((item, i) => {
            if(item.codeId == 301) {
              let option1 = {compNum: 0, num: null, numName: null, onCompNum: 0, overCompNum: 0, overHangNum: 0, total: 0, type: null, typeName: null,},
                  option2 = {compNum: 0, num: null, numName: null, onCompNum: 0, overCompNum: 0, overHangNum: 0, total: 0, type: null, typeName: null,},
                  option3 = {compNum: 0, num: null, numName: null, onCompNum: 0, overCompNum: 0, overHangNum: 0, total: 0, type: null, typeName: null,};
              this.$set(item, 'option1', option1);
              this.$set(item, 'option2', option2);
              this.$set(item, 'option3', option3);
              if(item.serviceRecordItemStatModels.length > 0) {
                item.serviceRecordItemStatModels.forEach(items => {
                  if(items.type == 1) item.option1 = items;
                  if(items.type == 2) item.option2 = items;
                  if(items.type == 3) item.option3 = items;
                })
              }
            }
            if(item.codeId == 300) {
              let option1 = {compNum: 0, num: null, numName: null, onCompNum: 0, overCompNum: 0, overHangNum: 0, total: 0, type: null, typeName: null,},
                  option2 = {compNum: 0, num: null, numName: null, onCompNum: 0, overCompNum: 0, overHangNum: 0, total: 0, type: null, typeName: null,},
                  option3 = {compNum: 0, num: null, numName: null, onCompNum: 0, overCompNum: 0, overHangNum: 0, total: 0, type: null, typeName: null,},
                  option4 = {compNum: 0, num: null, numName: null, onCompNum: 0, overCompNum: 0, overHangNum: 0, total: 0, type: null, typeName: null,},
                  option5 = {compNum: 0, num: null, numName: null, onCompNum: 0, overCompNum: 0, overHangNum: 0, total: 0, type: null, typeName: null,};
              this.$set(item, 'option1', option1);
              this.$set(item, 'option2', option2);
              this.$set(item, 'option3', option3);
              this.$set(item, 'option4', option4);
              this.$set(item, 'option5', option5);
              if(item.serviceRecordItemStatModels.length > 0) {
                item.serviceRecordItemStatModels.forEach(items => {
                  if(items.type == 6) item.option1 = items;
                  // 暂时没有资料存档以及开设账套  如果有了更改type值； option2为资料存档 option3为开设账套
                  // if(items.type == 2) item.option2 = items;
                  // if(items.type == 3) item.option3 = items;
                  if(items.type == 10) item.option4 = items;
                  if(items.type == 15) item.option5 = items;
                })
              }
            }
          })
        }
        return _data;
      },
    },
    created () {
      // 默认获取今年今月的数据
      let date = new Date(),
          y = date.getFullYear(),
          m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      this.time = `${y}-${m}`;
      this.times = `${y}-${m}`;
      this.defaultListParams.time = this.time;
      this.defaultListParams.times = this.times;
      this.searchHandle(0)
    },
    mounted() {},
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/commons";
	.ml10 {
		margin-left: 10px;
	}
	.blue-span {
		color: #1E88E5;
		cursor: pointer;
	}
	.blue-span:hover {
		text-decoration: underline;
	}
  .el-table th, .el-table td {
    text-align: center !important;
  }
  .com-bar {
    overflow: hidden;
    padding: 15px 0;
  }
  .event-head {
    line-height: 30px;
    font-size: 14px;
    float: left;
    width: 100%;
    margin-bottom: 20px;
  }
  table {
    margin-top: 20px;
  }
  .optionItemA {
    color:#1E88E5;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
<style scoped>
  .center-table >>> th {
    text-align: center;
  }
  .center-table >>> td {
    text-align: center;
  }
  .com-bar >>> .el-table {
    margin-top: 20px;
  }
</style>
