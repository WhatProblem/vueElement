<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "./resetCSS/style.scss";
#app {
  width: 100%;
  height: 100%;
}
</style>
