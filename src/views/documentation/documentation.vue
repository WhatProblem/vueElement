<template>
  <div class="documentation">
    <a href="https://github.com/whatproblem/vueElement" target="_blank" class="gitTips">
      <el-button type="primary" icon="el-icon-ws-Git">Github Repository</el-button>
    </a>
    <el-input placeholder="请输入内容" v-model="clipboardText">
      <el-button v-clipboard="clipboardText" @success="handleSuccess" slot="append" icon="el-icon-ws-clippycb"></el-button>
    </el-input>
  </div>
</template>
<script>
  export default {
    name: 'documentation',
    data() {
      return {
        clipboardText: 'https://github.com/WhatProblem/vueElement'
      }
    },
    mounted() {

    },
    methods: {
      handleSuccess(e) {
        console.log(e)
      }
    }
  }

</script>
<style lang="scss" scoped>
.el-input{
  width: 40%;
  margin-top: 15px;
}
</style>