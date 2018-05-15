<template>
  <div id="app" v-cloak>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" rel="stylesheet/scss">
#app {
}
[v-cloak] {
  display: none !important;
}
</style>
