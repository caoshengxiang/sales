<!--行政区域联动组件
2018.5.24 姚政伟 构建
=========调用方式===============
<AreaSelect :selectLastLevelMode="false" :initValue="110100"></AreaSelect>
说明：selectLastLevelMode ---- 可选参数(是否限制选择最后一级:true 必须选择最后一级 false 任选)
      initValue ---- 初始绑定值
=========获取值方式=============
this.$refs.组件名称.getSelectedValue()

prop:
area,预显示地址
-->
<template>
  <div>
    <el-cascader
      :options="list"
      @change="handleItemChange"
      @active-item-change="handleItemChange"
      :props="props"
      :change-on-select = "selectLastLevelMode"
      :value="selectedBindValue"
      class="selectAreaModule"
      :placeholder="area"
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
        default: true,
      },
      //初始化绑定值
      initValue: {
        type: Number,
        required: false,
        default: 0,
      },
      area: {
        type: String,
        default: ''
      }
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
      that.$options.methods.init.bind(that)();
    },
    methods: {
      init(){
        var that = this;
        if (that.initValue > 0) {
          var orgId = that.initValue;
          var loopFind = function (list,id) {
            for (var i =0;i<list.length;i++) {
              var item = list[i];
              if (item.id == id) {
                API.common.queryAreaList({pid:id},function (res) {
                  if (res.status == true) {
                    var item = list.find((n) => n.id == id);
                    if (res.data && res.data.length > 0) {
                      item.children = [];
                    }else{
                      item.children = null;
                    }
                  }
                }, (mock) => {
                  Message({
                    message: mock,
                    type: 'error'
                  });
              });
              }else {
                loopFind(item.children,id);
              }
            }
          };

          var loopDo = function (id,list) {
            API.common.queryAreaList({id:id},function (res) {
              if (res.status == true) {
                if (res.data && res.data.length > 0) {
                  var loopArea = function (pid) {
                    API.common.queryAreaList({pid:pid},function (res) {
                      if (res.status == true) {
                        if (res.data && res.data.length > 0) {
                          for (var i=0;i<res.data.length;i++) {
                            res.data[i].children = [];
                          }

                          var item = res.data.find((n) => n.id == id);
                          if (item) {
                            that.selectedBindValue.push(id);
                            item.children = list;
                          }
                          if (res.data[0].pid != 0) {
                            loopDo(res.data[0].pid,res.data);
                          }else{
                            that.selectedBindValue = that.selectedBindValue.reverse();
                            console.log("区域控件初始化绑定完成："+that.selectedBindValue.join(","));
                            that.list = res.data;

                            //判断空白区域
                            loopFind(that.list,orgId);
                          }
                        }
                      }
                    }, (mock) => {
                      Message({
                        message: mock,
                        type: 'error'
                      });
                  });
                  };
                  loopArea(res.data[0].pid);
                }
              }
            }, (mock) => {
              Message({
                message: mock,
                type: 'error'
              });
          });
          };
          loopDo(that.initValue,that.list);
        }else{
          that.$options.methods.queryList.bind(that)(0);
        }

      },
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
              var loopDo = function (list,id) {
                for (var i =0;i<list.length;i++) {
                  var item = list[i];
                  if (item.id == id) {
                    item.children = null;
                  }else {
                    if (item.children && item.children.length > 0) {
                      loopDo(item.children,id);
                    }
                  }
                }
              };
              loopDo(that.list,pid);
              that.selectedBindValue = that.selectedValue;

              setTimeout(function () {
                if ($(".selectAreaModule").hasClass("is-opened")) {
                  $(".selectAreaModule").trigger("click");
                }
              },100);
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
        console.log("区域控件选择完成："+val.join(","));
        this.$emit('change', val)
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
