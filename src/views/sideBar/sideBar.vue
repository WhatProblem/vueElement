<template>
  <div class="navbar">
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#304156"
      text-color="#fff" active-text-color="#ffd04b">
      <sidebar-item :routeList="routeList"></sidebar-item>
    </el-menu>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import sidebarItem from './sidebarItem.vue'
  export default {
    name: 'sideBar',
    components: {
      sidebarItem
    },
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      changeRouter(objName) {
        this.$router.push({
          name: objName
        })
      },
      changeRouter2() {
        this.$router.push({
          name: 'chartOption'
        })
      },
      backHome() {
        this.$router.push({
          name: 'home'
        })
      },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    computed: {
      ...mapGetters(['routeList']),
      routers() {
        console.log(this.$route.path)
        console.log(this.$router)
      }
    },
    watch: {
      $route(to, from) {
        // console.log(from.name)
        // console.log(to.name)
      }
    }
  }

</script>
<style lang="scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>