<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-row>
      <el-col :span="8">
        <el-form-item label="音乐名称" prop="musicName">
          <el-input v-model="ruleForm.musicName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="歌手" prop="musicSinger">
          <el-input v-model="ruleForm.musicSinger"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="音乐区域" prop="musicArea">
          <el-input v-model="ruleForm.musicArea"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="音乐年代" prop="musicTime">
          <el-input v-model="ruleForm.musicTime"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="音乐类型" prop="musicType">
          <el-select v-model="ruleForm.musicType" placeholder="请选择音乐类型">
            <el-option label="纯音乐" value="0"></el-option>
            <el-option label="流行音乐" value="1"></el-option>
            <el-option label="经典音乐" value="2"></el-option>
            <el-option label="安静" value="3"></el-option>
            <el-option label="寂寞" value="4"></el-option>
            <el-option label="火热DJ" value="5"></el-option>
            <el-option label="伤感" value="6"></el-option>
            <el-option label="舞曲" value="7"></el-option>
            <el-option label="儿童乐曲" value="8"></el-option>
            <el-option label="激情" value="9"></el-option>
            <el-option label="80后" value="10"></el-option>
            <el-option label="开心" value="11"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="音乐评分" prop="musicScore">
          <el-input v-model="ruleForm.musicScore"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-form-item label="音乐描述" prop="musicDesc">
          <el-input type="textarea" :rows="2" v-model="ruleForm.musicDesc"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="用户Id" prop="userId">
          <el-input v-model="ruleForm.userId"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">提交</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    name: 'musicCreate',
    data() {
      return {
        ruleForm: {
          musicName: '', // 音乐名称
          musicSinger: '', // 歌手
          musicScore: '', // 评分
          musicArea: '', // 地区
          musicTime: '', // 年代
          musicType: '', // 类型
          musicDesc: '', // 描述介绍
          userName: '', // 用户名
          userId: '', // 用户Id
        },
        rules: {
          musicName: [
            { required: true, message: '请输入音乐名称', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          musicSinger: [
            { required: true, message: '请输入音乐歌手', trigger: 'blur' },
          ],
          musicScore: [
            { required: true, message: '请输入音乐评分', trigger: 'blur' },
          ],
          musicArea: [
            { required: true, message: '请输入音乐地区', trigger: 'blur' },
          ],
          musicTime: [
            { required: true, message: '请输入音乐年代', trigger: 'blur' },
          ],
          musicType: [
            { required: true, message: '请输入音乐类型', trigger: 'blur' },
          ],
          musicDesc: [
            { required: true, message: '请输入音乐介绍', trigger: 'blur' },
          ],
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          userId: [
            { required: true, message: '请输入用户Id', trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      // 新增音乐接口
      addMusic(param) {
        let self = this;
        this.$wsApi.post('addOrEditOrDelMusic', param, (res) => {
          if (res['data']['code'] === 200) {
            self.resetForm();
            self.$message({
              type: 'success',
              message: '音乐创建成功'
            });
          }
        });
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let param = {
              music_name: this.ruleForm.musicName,
              music_singer: this.ruleForm.musicSinger,
              music_area: this.ruleForm.musicArea,
              music_time: this.ruleForm.musicTime,
              music_type: this.ruleForm.musicType,
              music_score: this.ruleForm.musicScore,
              music_desc: this.ruleForm.musicDesc,
              user_name: this.ruleForm.userName,
              user_id: this.ruleForm.userId,
            }
            this.addMusic(param);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.ruleForm.resetFields();
      }
    }
  }

</script>
<style lang="scss" scoped>
  .el-select {
    width: 100%;
  }
</style>