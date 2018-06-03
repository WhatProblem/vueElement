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
    <div class="formHero">
      <el-row>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
          <el-form-item>
            <el-col :span="11">
              <el-form-item label="角色名称" prop="gameRole">
                <el-input v-model="ruleForm.gameRole"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="喜欢等级" prop="gameFav">
                <el-select v-model="ruleForm.gameFav" placeholder="请选择等级">
                  <el-option label="0" value="0"></el-option>
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                  <el-option label="3" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-form-item label="战斗力" prop="gamePower">
                <el-input v-model="ruleForm.gamePower"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="使用场次" prop="gameTotal">
                <el-input v-model="ruleForm.gameTotal"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-col>
          </el-form-item>
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
            console.log(self.ruleForm);
            let param = {
              game_role: self.ruleForm.gameRole,
              game_fav: self.ruleForm.gameFav,
              game_total: self.ruleForm.gameTotal,
              game_power: self.ruleForm.gamePower,
              user_id: 1
            };
            self.$wsApi.post('addGameRole', param, (res) => {
              if (res) {
                console.log(res);
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
  .formHero {
    margin-top: 50px;
  }
</style>