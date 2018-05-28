<template>
  <div class="page-container">
    <page-container :footerStyle="footerStyle" :headerStyle="headerStyle" :asideStyle="asideStyle"
                    :mainStyle="mainStyle">
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
    <fe-element v-if="themeIndex === 0"></fe-element>
    <me-element v-if="themeIndex === 1"></me-element>
  </div>
</template>

<script>
  import leftMenuBar from '../components/leftMenuBar'
  import pageHeader from '../components/pageHeader'
  import pageContainer from '../components/container/container'
  import { mapState, mapMutations } from 'vuex'
  import feElement from '../components/feElement'
  import meElement from '../components/meElement'

  export default {
    name: 'index',
    data () {
      return {
        footerStyle: {
          height: 0,
        },
        headerStyle: {
          height: '52px',
          // backgroundColor: '#0BC3C4',
        },
        mainStyle: {
          borderTop: '6px solid #F0F3F6',
          borderLeft: '6px solid #F0F3F6',
          overflowY: 'auto',
        },
      }
    },
    computed: {
      ...mapState('constData', [
        'theme',
        'themeIndex',
      ]),
      asideStyle () {
        return {
          width: '220px',
          borderTop: '6px solid #F0F3F6',
          overflowY: 'auto',
          backgroundColor: this.theme[this.themeIndex].leftMenuBarBg, // 主题
        }
      },
    },
    components: {
      leftMenuBar,
      pageHeader,
      pageContainer,
      feElement,
      meElement,
    },
    methods: {
      ...mapMutations('constData', [
        'mut_themeIndex',
      ]),
    },
    created () {
      switch (this.$route.params.end) {
        case this.theme[0].end:
          this.mut_themeIndex(0)
          // this.asideStyle.backgroundColor = this.theme[0].leftMenuBarBg
          break
        case this.theme[1].end:
          this.mut_themeIndex(1)
        // this.asideStyle.backgroundColor = this.theme[1].leftMenuBarBg
      }
    },
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
