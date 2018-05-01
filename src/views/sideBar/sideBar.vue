<template>
  <div class="navbar">
    <el-menu :default-active="$route.name" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#304156"
      text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="home" @click="backHome()">
        <i class="el-icon-info"></i>
        <span slot="title">home</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-setting"></i>
        <span slot="title">i18n</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">Documentation</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>Components</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(item, indexs) in componentRoute" :index="item.name" @click="changeRouter(item.name)" :key="indexs">{{item.title}}</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">
            <i class="el-icon-picture"></i>
            <span>Charts</span>
          </template>
          <el-menu-item index="1-4-1" @click="changeRouter2()">Mix Charts</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>Form</span>
        </template>
        <el-menu-item index="2-1">Create Form</el-menu-item>
        <el-menu-item index="2-2">Edit Form</el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-printer"></i>
          <span>Excel</span>
        </template>
        <el-menu-item index="7-1">Export Excel</el-menu-item>
        <el-menu-item index="7-2">Export Selected</el-menu-item>
        <el-menu-item index="7-2">Upload Excel</el-menu-item>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">
          <i class="el-icon-news"></i>
          <span>Zip</span>
        </template>
        <el-menu-item index="8-1">Export Zip</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-error"></i>
          <span>Error Pages</span>
        </template>
        <el-menu-item index="4-1">401</el-menu-item>
        <el-menu-item index="4-2">404</el-menu-item>
      </el-submenu>
    </el-menu>{{routers}}
  </div>
</template>
<script>
  export default {
    name: 'sideBar',
    data() {
      return {
        isCollapse: true,
        componentRoute: [
          { name: 'markdown', title: 'Markdown', index: '1-1' },
          { name: 'jsonEditor', title: 'JSON Editor', index: '1-2' },
          { name: 'splitPane', title: 'SplitPane', index: '1-3' },
          // { name: 'chartOption', title: '' }
        ],
        defaultRoute: this.$route
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