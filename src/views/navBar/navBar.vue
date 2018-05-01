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
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
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
          <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'navbar',
    data() {
      return {
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
      }
    },
    mounted() {

    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
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