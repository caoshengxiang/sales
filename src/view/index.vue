<template>
    <div class="page-container">
      <page-container :footerStyle="footerStyle" :headerStyle="headerStyle" :asideStyle="asideStyle" :mainStyle="mainStyle">
        <div slot="header">
          <page-header></page-header>
        </div>
        <div slot="aside">
          <left-menu-bar></left-menu-bar>
        </div>
        <div slot="main">
          <router-view></router-view>
        </div>
      </page-container>
    </div>
</template>

<script>
  import leftMenuBar from '../components/leftMenuBar'
  import pageHeader from '../components/pageHeader'
  import pageContainer from '../components/container/container'
  export default {
    name: 'index',
    data () {
      return {
        footerStyle: {
          height: 0
        },
        headerStyle: {
          height: '52px',
          // backgroundColor: '#0BC3C4',
        },
        asideStyle: {
          width: '240px',
          borderTop: '6px solid #F0F3F6',
          overflowY: 'auto',
          backgroundColor: '#3A4651',
        },
        mainStyle: {
          borderTop: '6px solid #F0F3F6',
          borderLeft: '6px solid #F0F3F6',
          overflowY: 'auto',
        }
      }
    },
    components: {
      leftMenuBar,
      pageHeader,
      pageContainer,
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../styles/var";
  .page-container {
    width: 100%;
    min-width: $page-min-width;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }
</style>
