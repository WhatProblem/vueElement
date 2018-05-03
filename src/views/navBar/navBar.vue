<template>
  <div class="navbar">
    <el-row :gutter="20">
      <el-col :span="2">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" size="medium" icon="el-icon-menu"></el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in breadCrumbList" :key="item.path">
              <router-link v-if="!item.noLink" :to="{path: item.path}">{{item.meta.title}}</router-link>
              <span v-if="item.noLink">{{item.meta.title}}</span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple">

        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-dropdown>
            <span class="el-dropdown-link">
            admin<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
              <el-dropdown-item disabled>用户</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="24" class="tags">
        <div class="grid-content bg-purple-dark">
          <el-tag :key="tag.path" v-for="(tag, index) in tagsList" closable :disable-transitions="false" @close="handleClose(tag, index)"
            :class="currentTag == tag.path ? 'tagsBg' : ''">
            <router-link :to="tag.path">{{tag.title}}</router-link>
          </el-tag>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { mapMutations, mapState } from "vuex";
  export default {
    name: "navbar",
    data() {
      return {
        inputVisible: false,
        inputValue: "",
        breadCrumbList: null,
        currentTag: null
      };
    },
    mounted() {
      this.breadCrumbMatch();
      this.addTagsViews();
    },
    methods: {
      handleClose(tag, i) {
        this.$store.dispatch('deleTagsView', i)
      },
      /**@function
       * @description:面包屑展示部分
      */
      breadCrumbMatch() {
        let matched = this.$route.matched;
        // console.log(matched);
        let breadArr = [{ path: "/", meta: { title: "首页" } }];
        if (matched["length"] === 2 && matched[0]["path"] !== "" && matched[0]["name"] === undefined) {
          breadArr = breadArr.concat({
            path: matched[1]["path"],
            meta: {title: matched[1]["meta"]['title']},
            noLink: true
          })
        } else if (matched["length"] === 2 && matched[0]["path"] !== "" && matched[0]["name"] !== undefined) {
          breadArr = breadArr.concat({
            path: matched[0]["path"],
            meta: {title: matched[0]["meta"]['title']},
            noLink: true
          }).concat({
            path: matched[1]["path"],
            meta: {title: matched[1]["meta"]['title']},
            noLink: true
          })
        } else if (matched["length"] === 3) {
          breadArr = breadArr.concat({
            path: matched[0]["path"],
            meta: {title: matched[0]["meta"]['title']},
            noLink: false
          }).concat({
            path: matched[1]["path"],
            meta: {title: matched[1]["meta"]['title']},
            noLink: false
          }).concat({
            path: matched[2]["path"],
            meta: {title: matched[2]["meta"]['title']},
            noLink: false
          })
        } else {
          breadArr = breadArr
        }
        this.breadCrumbList = breadArr;
      },
      /**@function
       * @description: 添加tags
      */
      addTagsViews() {
        let views = {
          path: this.$route.path,
          title: this.$route.meta.title
        }
        this.$store.dispatch('addTagsView', views);
      }
    },
    computed: {
      ...mapState(['tagsList'])
    },
    watch: {
      $route() {
        this.breadCrumbMatch();
        this.addTagsViews()
      }
    }
  }

</script>
<style lang="scss" scoped>
  .el-row {
    position: fixed;
    width: 100%;
    height: 60px;
    line-height: 60px;
  }
  
  .el-col {
    height: 100%;
  }
  
  .el-breadcrumb {
    height: 60px;
    line-height: 60px;
  }
  
  .el-dropdown {
    cursor: pointer;
  }
  
  .tags {
    height: 45px;
    line-height: 45px;
    margin-left: -12px;
  }
</style>