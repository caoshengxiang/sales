<template>
    <div>
      <div>
        <page-header></page-header>
      </div>
     <div>
       <div>
         <left-menu-bar></left-menu-bar>
       </div>
       <div>
         <router-view></router-view>
       </div>
     </div>
    </div>
</template>

<script>
  import leftMenuBar from '../components/leftMenuBar'
  import pageHeader from '../components/pageHeader'
  export default {
    name: 'index',
    data () {
      return {}
    },
    components: {
      leftMenuBar,
      pageHeader
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
