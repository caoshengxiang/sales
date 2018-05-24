<!--行政区域联动组件
2018.5.24 姚政伟 构建
=========调用方式===============
<AreaSelect :selectLastLevelMode="false"></AreaSelect>
说明：selectLastLevelMode ---- 可选参数(是否限制选择最后一级:true 必须选择最后一级 false 任选)
=========获取值方式=============
this.$refs.组件名称.getSelectedValue()
-->
<template>
  <div>
    <el-cascader
      :options="list"
      @change="handleItemChange"
      @active-item-change="handleItemChange"
      :props="props"
      :change-on-select = "true"
      :value="selectedBindValue"
      class="selectAreaModule"
      ref="areaSelectCtl"
    ></el-cascader>
  </div>
</template>

<script>
  import API from '@/utils/api'
  import { Message } from 'element-ui'

  export default {
    name: 'areaSelect',
    props: {
      //是否限制选择最后一级:true 必须选择最后一级 false 任选
      selectLastLevelMode: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data () {
      return {
        list: [],
        props: {
          value:'id',
          label: 'name'
        },
        selectedValue:[],
        selectedBindValue:[]
      }
    },
    created () {
      var that = this;
      that.$options.methods.queryList.bind(that)(0);
    },
    methods: {
      queryList(pid){
        var that = this;
        API.common.queryAreaList({pid:pid},function (res) {
          if (res.status == true) {
            if (res.data && res.data.length > 0) {
              for (var i=0;i<res.data.length;i++) {
                res.data[i].children = [];
              }
              if (pid != 0) {
                var loopArea = function (list,pid) {
                  var item = list.find((n) => n.id == pid);
                  if (item) {
                    console.log(item.name);
                    item.children = res.data;
                    return;
                  }else{
                    for (var j=0;j<list.length;j++) {
                      var n = list[j];
                      if (n.children && n.children.length > 0) {
                        loopArea(n.children,pid);
                      }
                    }
                  }
                };
                loopArea(that.list,pid);
              }else{
                that.list = res.data;
              }
            }else{
              that.selectedBindValue = that.selectedValue;
              $(".selectAreaModule").trigger("click");
            }
          }
        }, (mock) => {
          Message({
            message: mock,
            type: 'error'
          });
        });
      },
      handleItemChange(val) {
        var that = this;
        if (that.selectLastLevelMode) {
          that.selectedBindValue = [];
        }else{
          that.selectedBindValue = val;
        }
        that.selectedValue = val;
        that.$options.methods.queryList.bind(that)(val[val.length-1]);
      },
      getSelectedValue(){
        return this.selectedBindValue;
      }
    }
  }
</script>
