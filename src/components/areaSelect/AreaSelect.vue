<!--行政区域、寺庙四级联动组件
2018.4.11 姚政伟 构建
=========函数方式获取参数对象===============
that.$refs.areaSelect.form;
-->
<template>
  <div class="areaSelect">
    <el-input placeholder=" " class="labelSelect">
      <template slot="prepend">
        <slot>州/县/寺庙</slot>
      </template>
      <el-select slot="append" placeholder="请选择" v-model="form.provincecode" class="selectItem" @change="provinceChange"
                 v-show="false">
        <el-option label="省" value=""></el-option>
        <el-option v-for="item in provinceData" :key="item.code" :value="item.code" :label="item.codeName"></el-option>
      </el-select>
      <el-select slot="append" placeholder="请选择" v-model="form.statecode" class="selectItem" @change="continentChange">
        <el-option label="州" value=""></el-option>
        <el-option v-for="item in continentData" :key="item.code" :value="item.code" :label="item.codeName"></el-option>
      </el-select>
      <el-select slot="append" placeholder="请选择" v-model="form.countycode" class="selectItem" @change="countyChange">
        <el-option label="县" value=""></el-option>
        <el-option v-for="item in countyData" :key="item.code" :value="item.code" :label="item.codeName"></el-option>
      </el-select>
      <el-select slot="append" placeholder="请选择" v-model="form.templeid" class="selectItem" @change="templeChange">
        <el-option label="寺庙" value=""></el-option>
        <el-option v-for="item in templeData" :key="item.id" :value="item.id" :label="item.templename"></el-option>
      </el-select>
    </el-input>
  </div>
</template>

<script>
  import server from '@/common/server.js'

  export default {
    name: 'areaSelect',
    data () {
      return {
        provinceData: [],
        continentData: [],
        countyData: [],
        templeData: [],
        lastSelectedValue: '',
        form: {
          provincecode: '510000',
          statecode: '',
          countycode: '',
          templeid: '',
        },
      }
    },
    created () {
      var that = this
      server.getAdministrativeArea(function (res) {
        that.provinceData = res.data
        that.provinceChange(that.form.provincecode)
      })
    },
    methods: {
      provinceChange (selectedVal) {
        var that = this
        that.lastSelectedValue = selectedVal
        that.form.provincecode = selectedVal
        that.form.statecode = ''
        that.form.countycode = ''
        that.form.templeid = ''
        that.continentData = []
        that.countyData = []
        that.templeData = []
        for (var i = 0; i < that.provinceData.length; i++) {
          if (that.provinceData[i].code === selectedVal) {
            that.continentData = that.provinceData[i].subItems
          }
        }
      },
      continentChange (selectedVal) {
        var that = this
        that.lastSelectedValue = selectedVal
        that.form.statecode = selectedVal
        that.form.countycode = ''
        that.form.templeid = ''
        that.countyData = []
        that.templeData = []
        for (var i = 0; i < that.continentData.length; i++) {
          if (that.continentData[i].code === selectedVal) {
            that.countyData = that.continentData[i].subItems
          }
        }
      },
      countyChange (selectedVal) {
        var that = this
        that.lastSelectedValue = selectedVal
        that.form.countycode = selectedVal
        that.form.templeid = ''
        that.templeData = []
        server.getTempleList({
          countycode: selectedVal,
          pageSize: 999,
        }, function (res) {
          if (res.status && res.data) {
            that.templeData = res.data.content
          }
        })
      },
      templeChange (selectedVal) {
        var that = this
        that.form.templeid = selectedVal
      },
    },
  }
</script>

<style scoped>
  .areaSelect {
    margin-right: 10px;
  }

  .areaSelect .selectItem {
    width: 33% !important;
    margin: -10px 0;
    display: block;
    float: left;
  }
</style>
