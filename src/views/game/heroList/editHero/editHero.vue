<template>
  <div class="editHero">
    <el-dialog title="修改英雄信息" :visible.sync="dialogFormVisible" :center="false" width="60%">
      <el-row>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm" size="medium">
          <el-row>
            <el-col :span="12">
              <el-form-item label="角色名称" prop="gameRole">
                <el-input v-model="ruleForm.gameRole"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
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
            <el-col :span="12">
              <el-form-item label="战斗力" prop="gamePower">
                <el-input v-model="ruleForm.gamePower"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用场次" prop="gameTotal">
                <el-input v-model="ruleForm.gameTotal"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="英雄描述" prop="gameDesc">
                <el-input type="textarea" :rows="2" maxlength="200" v-model="ruleForm.gameDesc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="账户名称" prop="gameUser">
                <el-input disabled v-model="ruleForm.gameUser"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账户ID" prop="userId">
                <el-input disabled v-model="ruleForm.userId"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirmSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'editHero',
    props: {
      editProps: {
        type: Object
      }
    },
    data() {
      return {
        dialogFormVisible: false,
        gameId: '', // 英雄人物id
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
    methods: {
      // 调取修改接口
      updateHeroList(param) {
        let self = this;
        this.$wsApi.post('updateGameRole', param, (res) => {
          if (res['data']['code'] === 200) {
            self.$message({
              type: 'success',
              message: '英雄新修改成功!'
            });
            self.dialogFormVisible = false;
            let backEditObj = param;
            self.$emit('backEditObj', backEditObj);
          }
        })
      },
      // 取消编辑
      cancel() {
        this.dialogFormVisible = false;
      },
      // 确认修改
      confirmSubmit() {
        let param = {
          game_role: this.ruleForm.gameRole,
          game_fav: this.ruleForm.gameFav,
          game_total: this.ruleForm.gameTotal,
          game_power: this.ruleForm.gamePower,
          game_desc: this.ruleForm.gameDesc,
          game_id: this.gameId,
          user_id: this.ruleForm.userId,
        };
        this.updateHeroList(param);
      },
      fillForm(val) {
        console.log(val);
        this.ruleForm.gameRole = val.game_role;
        this.ruleForm.gameFav = val.game_fav;
        this.ruleForm.gamePower = val.game_power;
        this.ruleForm.gameTotal = val.game_total;
        this.ruleForm.gameUser = val.userName;
        this.ruleForm.userId = val.user_id;
        this.ruleForm.gameDesc = val.game_desc;
      }
    },
    watch: {
      editProps(val) {
        console.log(val);
        this.fillForm(val);
        this.gameId = val.game_id;
      }
    }
  }

</script>
<style lang="scss" scoped>
  .el-select {
    width: 100%;
  }
</style>