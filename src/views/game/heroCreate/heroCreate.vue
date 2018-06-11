<template>
  <div class="createForm">
    <div class="formHero">
      <el-row>
        <el-col :span="16">
          <el-alert title="添加英雄:" type="success" :closable="false" show-icon>
          </el-alert>
        </el-col>
      </el-row>
      <el-row>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
          <el-row>
            <el-col :span="8">
              <el-form-item label="角色名称" prop="gameRole">
                <el-input v-model="ruleForm.gameRole"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="喜欢等级" prop="gameFav">
                <el-select v-model="ruleForm.gameFav" placeholder="请选择等级">
                  <el-option label="0" value="0"></el-option>
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                  <el-option label="3" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="战斗力" prop="gamePower">
                <el-input v-model="ruleForm.gamePower"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="使用场次" prop="gameTotal">
                <el-input v-model="ruleForm.gameTotal"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="英雄描述" prop="gameDesc">
                <el-input type="textarea" :rows="2" maxlength="200" v-model="ruleForm.gameDesc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="账户名称" prop="gameUser">
                <el-input v-model="ruleForm.gameUser"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="账户ID" prop="userId">
                <el-input v-model="ruleForm.userId"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item>
              <el-col :span="11">
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'createForm',
    data() {
      return {
        input5: '',
        ruleForm: {
          gameRole: '',
          gameFav: '',
          gamePower: '',
          gameTotal: '',
          gameUser: '',
          userId: '',
          gameDesc: '',
          delivery: false,
        },
        rules: {
          gameRole: [
            { required: true, message: '请输入游戏人物名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          gameFav: [
            { required: true, message: '请选择喜欢程度', trigger: 'change' }
          ],
          gamePower: [
            { required: true, message: '请输入战斗力', trigger: 'blur' },
          ],
          gameTotal: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          gameUser: [
            { required: true, message: '请输入账户名称', trigger: 'blur' },
          ],
          userId: [
            { required: true, message: '请输入账户名称', trigger: 'blur' },
          ],
          gameDesc: [
            { required: true, message: '请输入账户名称', trigger: 'blur' },
          ]
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
        let self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              game_role: self.ruleForm.gameRole,
              game_fav: self.ruleForm.gameFav,
              game_total: self.ruleForm.gameTotal,
              game_power: self.ruleForm.gamePower,
              game_desc: self.ruleForm.gameDesc,
              user_name: self.ruleForm.userName,
              user_id: self.ruleForm.userId,
            };
            self.$wsApi.post('addGameRole', param, (res) => {
              if (res['data']['code'] === 200) {
                self.$message({
                  type: 'success',
                  message: '添加英雄成功!'
                });
                self.resetForm(formName)
              } else {
                self.$message({
                  type: 'success',
                  message: '添加英雄失败!'
                });
              }
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
    },
    computed: {

    }
  }

</script>
<style lang="scss" scoped>
  .createForm {
    margin-top: 40px;
  }
  
  .el-select {
    width: 100%;
  }
  
  .addTitle {
    margin-top: -50px;
    height: 45px;
    line-height: 45px;
    color: #666;
    padding-left: 30px;
  }
</style>