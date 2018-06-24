<template>
  <div class="documentation">
    <a href="https://github.com/whatproblem/vueElement" target="_blank" class="gitTips">
      <el-button type="primary" icon="el-icon-ws-Git">Github Repository</el-button>
    </a>
    <el-input placeholder="请输入内容" v-model="clipboardText">
      <el-button v-clipboard="clipboardText" @success="handleSuccess" slot="append" icon="el-icon-ws-clippycb"></el-button>
    </el-input>
    <el-row>
      <el-col>
        <el-upload 
          action="http://localhost:3000/film/uploadImg" 
          list-type="picture-card" 
          name="imageFile"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-col>
    </el-row>
    <div><img src="http://localhost:3000/film/loadImg?poster=banner&filmId=1" alt=""></div>
    <div><img src="http://localhost:3000/film/loadImg?poster=banner&filmId=2" alt=""></div>
    <div><img src="http://localhost:3000/film/loadImg?poster=detail&filmId=1" alt=""></div>
    <div><img src="http://localhost:3000/film/loadImg?poster=detail&filmId=2" alt=""></div>
  </div>
</template>
<script>
  export default {
    name: 'documentation',
    data() {
      return {
        clipboardText: 'https://github.com/WhatProblem/vueElement', // 本人GitHub地址
        imageUrl: '',
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    mounted() {

    },
    methods: {
      handleSuccess(e) {
        console.log(e)
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }

</script>
<style lang="scss" scoped>
  .el-input {
    width: 40%;
    margin-top: 15px;
  }
  
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>