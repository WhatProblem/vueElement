<template>
  <div class="navbar">
    <template v-for="item in routeList">
      <router-link v-if="hasOneValidate(item.children)" :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
      </router-link>
      <el-submenu v-if="!hasOneValidate(item.children)" :index="item.name||item.path">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span>{{item.meta.title}}</span>
        </template>
        <template v-for="childItem in item.children">
          <router-link v-if="!childItem.children" :key="childItem.name" :to="item.path+'/'+childItem.path">
            <el-menu-item :index="item.path+'/'+childItem.path">{{childItem.meta.title}}</el-menu-item>
          </router-link>
          <el-submenu v-if="childItem.children" :index="childItem.name||childItem.path">
            <template slot="title">
              <i :class="childItem.meta.icon"></i>
              <span>{{childItem.name}}</span>
            </template>
            <template v-for="lastChild in childItem.children">
              <router-link :to="item.path+'/'+childItem.path+'/'+lastChild.path">
                <el-menu-item :index="item.path+'/'+childItem.path+'/'+lastChild.path">{{lastChild.meta.title}}</el-menu-item>
              </router-link>
            </template>
          </el-submenu>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
  export default {
    name: "sidebarItem",
    props: {
      routeList: {
        type: Array
      }
    },
    data() {
      return {
        isCollapse: true,
        defaultRoute: this.$route
      };
    },
    mounted() {
      // console.log(this.routeList);
    },
    methods: {
      /**@function
      * @description:只有一个导航图标验证
      */
      hasOneValidate(child) {
        if (child["length"] === 1) {
          return true;
        } else {
          return false;
        }
      },
      /**@function
      * @description:两级子路由验证
      */
      hasChildValidate(child) {
        // if (child.children) {
        // return true;
        // } else {
        // return false;
        // }
        let judgeChild = null;
        return (judgeChild = child.children ? true : false);
      }
    },
    computed: {
      routers() {
        // console.log(this.$route.path)
        // console.log(this.$router.options)
      }
    },
    watch: {
      $route(to, from) {
        // console.log(from.name)
        // console.log(to.name)
      }
    }
  };

</script>
<style lang="scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>