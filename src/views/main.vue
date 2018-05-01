<template>
  <div class="main">
    <el-container>
      <el-aside width="200px">
        <side-bar></side-bar>
      </el-aside>
      <el-container>
        <el-header>
          <nav-bar></nav-bar>
        </el-header>
        <el-main>
          <app-content></app-content>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import sideBar from '@/views/sideBar/sideBar'
  import navBar from '@/views/navBar/navBar'
  import appContent from '@/views/appContent/appContent'
  export default {
    components: {
      sideBar,
      navBar,
      appContent
    },
    name: 'main',
    data() {
      return {

      };
    },
    methods: {

    }
  }

</script>
<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
  }
  .el-header {
    width: 100%;
    background: #bbf6f9;
    position: fixed;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    /*width: 100%;*/
    height: 100%;
    background: #304156;
  }
  .el-main {
    margin-top: 85px;
  }
</style>