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
        <el-upload class="avatar-uploader" action="http://localhost:3000/test/uploadImg" :show-file-list="false" :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'documentation',
    data() {
      return {
        clipboardText: 'https://github.com/WhatProblem/vueElement', // 本人GitHub地址
        imageUrl: '',
      }
    },
    mounted() {

    },
    methods: {
      handleSuccess(e) {
        console.log(e)
      },

      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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