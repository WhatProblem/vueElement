<template>
  <div class="login">
    <div class="loginContainer">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="submitForm()" @keyup.prevent="submitForm()">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { addUserInfo } from '../utils/authenticate'
  import Cookies from 'js-cookie'
  export default {
    data() {
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名！'));
        } else {
          if (this.ruleForm2.password !== '') {
            this.$refs.ruleForm2.validateField('password');
          }
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          username: 'admin',
          password: '123456'
        },
        rules2: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm() {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            let self = this;
            addUserInfo(this.ruleForm2).then(() => {
              self.$message('登录成功！');
              self.$router.push({
                path: '/home'
              });
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>
<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 100%;
    background-image: url("../../static/loginBg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .loginContainer {
      width: 300px;
      padding: 25px 40px 0 0;
      border-radius: 2%;
      background: dodgerblue;
      position: absolute;
      top: 40%;
      right: 5%;
      transform: translateY(-45%);
    }
  }
</style>