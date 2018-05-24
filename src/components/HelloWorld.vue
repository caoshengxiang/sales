<template>
  <div class="hello">
    <h1>{{ msg }} <span>,你好像迷路了！<a style="color: blue;cursor: pointer" @click="$router.go(-1)">原路返回</a></span></h1>
    <br>
    <br>
    <br>
    <br>
    <br>
    <h1>图标test</h1>
    <i class="sprites sprites-arrow-red"></i>
    <br>
    <!--<el-tree-->
      <!--:data="data6"-->
      <!--ref="tree"-->
      <!--node-key="id"-->
      <!--default-expand-all-->
      <!--draggable-->
      <!--:allow-drop="allowDrop"-->
      <!--:allow-drag="allowDrag">-->
    <!--</el-tree>-->

    <div>
      <input type="text" v-model="test">
    </div>
    <br>
    <br>
    <br>
    <AreaSelect ref="areaSe" :selectLastLevelMode="true"></AreaSelect>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        test: '',
        msg: 'Welcome to sales App',
        data6: [
          {
            id: 1,
            label: '一级 1',
            children: [
              {
                id: 4,
                label: '二级 1-1',
                children: [
                  {
                    id: 9,
                    label: '三级 1-1-1',
                  }, {
                    id: 10,
                    label: '三级 1-1-2',
                  }],
              }],
          }, {
            id: 2,
            label: '一级 2',
            children: [
              {
                id: 5,
                label: '二级 2-1',
              }, {
                id: 6,
                label: '二级 2-2',
              }],
          }, {
            id: 3,
            label: '一级 3',
            children: [
              {
                id: 7,
                label: '二级 3-1',
              }, {
                id: 8,
                label: '二级 3-2',
                children: [
                  {
                    id: 11,
                    label: '三级 3-2-1',
                  }, {
                    id: 12,
                    label: '三级 3-2-2',
                  }, {
                    id: 13,
                    label: '三级 3-2-3',
                  }],
              }],
          }],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
      }
    },
    methods: {
    },
    mounted () {
      // setTimeout(() => {
      //   this.$refs.tree.setCheckedKeys([3])
      //   this.$refs.tree.setCurrentKey(1)
      //   console.log('123123123123123', this.$refs.tree.getCurrentKey())
      //   console.log('3333', this.$refs.tree.getCheckedKeys())
      // }, 2000)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../styles/sprites.css";
  @import '../element_ui/element-variables';
  @import '../element_ui/element';
</style>
