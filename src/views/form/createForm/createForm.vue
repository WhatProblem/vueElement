<template>
  <div class="createForm">
    <el-row>
      <el-col :span="18">
        <el-row>
          <el-col :span="3">
            <el-button @click="getFocus" type="primary">主要按钮</el-button>
          </el-col>
          <el-col :span="21">
            <el-input ref="autoInputFocus" autofocus placeholder="请输入内容" v-model="input5" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-container>
          <el-header>
            <el-button type="primary" icon="el-icon-plus">添加英雄</el-button>
            <el-button type="primary">修改英雄<i class="el-icon-edit el-icon--right"></i></el-button>
          </el-header>
          <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
                <el-form-item>
                  <el-col :span="11">
                    <el-form-item label="角色名称" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="喜欢等级" prop="region">
                      <el-select v-model="ruleForm.region" placeholder="请选择等级">
                        <el-option label="0" value="shanghai"></el-option>
                        <el-option label="1" value="beijing"></el-option>
                        <el-option label="2" value="shanghai"></el-option>
                        <el-option label="3" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="11">
                    <el-form-item label="战斗力" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="使用场次" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-main>
          </el-container>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'createForm',
    data() {
      return {
        input5: '',
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
        }
      }
    },
    mounted() {

    },
    methods: {
      /**
       * @description: 自动聚焦
      */
      getFocus() {
        this.$refs.autoInputFocus.$el.querySelector('input').focus();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    computed: {

    }
  }

</script>
<style lang="scss" scoped>
  .el-header,
  .el-footer {
    padding-left: 0;
    /*background-color: #B3C0D1;*/
    color: #333;
    text-align: left;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
    line-height: 160px;
  }
  
  body>.el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  
  .el-form-item--medium .el-form-item__content,
  .el-form-item--medium .el-form-item__label {
    margin-left: 0;
  }
</style>