<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-row>
      <el-col :span="8">
        <el-form-item label="视频名称" prop="filmName">
          <el-input v-model="ruleForm.filmName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="视频导演" prop="filmDirector">
          <el-input v-model="ruleForm.filmDirector"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="视频区域" prop="filmArea">
          <el-input v-model="ruleForm.filmArea"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="视频年代" prop="filmTime">
          <el-input v-model="ruleForm.filmTime"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="视频类型" prop="filmType">
          <el-select v-model="ruleForm.filmType" placeholder="请选择视频类型">
            <el-option label="科幻" value="0"></el-option>
            <el-option label="战争" value="1"></el-option>
            <el-option label="爱情" value="2"></el-option>
            <el-option label="古装" value="3"></el-option>
            <el-option label="动作" value="4"></el-option>
            <el-option label="玄幻" value="5"></el-option>
            <el-option label="喜剧" value="6"></el-option>
            <el-option label="动漫" value="7"></el-option>
            <el-option label="娱乐" value="8"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="视频评分" prop="filmScore">
          <el-input v-model="ruleForm.filmScore"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-form-item label="视频主演" prop="filmMajor">
          <el-input v-model="ruleForm.filmMajor"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-form-item label="视频描述" prop="filmDesc">
          <el-input type="textarea" :rows="2" v-model="ruleForm.filmDesc"></el-input>
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
    name: 'filmCreate',
    data() {
      return {
        ruleForm: {
          filmName: '', // 影片名称
          filmDirector: '', // 导演
          filmMajor: '', // 主演
          filmScore: '', // 评分
          filmArea: '', // 地区
          filmTime: '', // 年代
          filmType: '', // 类型
          filmDesc: '', // 描述介绍
          userName: '', // 用户名
          userId: '', // 用户Id
        },
        rules: {
          filmName: [
            { required: true, message: '请输入影片名称', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          filmDirector: [
            { required: true, message: '请输入影片导演', trigger: 'blur' },
          ],
          filmMajor: [
            { required: true, message: '请输入影片主演', trigger: 'blur' },
          ],
          filmScore: [
            { required: true, message: '请输入影片评分', trigger: 'blur' },
          ],
          filmArea: [
            { required: true, message: '请输入影片地区', trigger: 'blur' },
          ],
          filmTime: [
            { required: true, message: '请输入影片年代', trigger: 'blur' },
          ],
          filmType: [
            { required: true, message: '请输入影片类型', trigger: 'blur' },
          ],
          filmDesc: [
            { required: true, message: '请输入影片介绍', trigger: 'blur' },
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
      // 新增视频接口
      addFilm(param) {
        let self = this;
        this.$wsApi.post('addOrEditOrDeleteFilm', param, (res) => {
          if (res['data']['code'] === 200) {
            self.resetForm();
            self.$message({
              type: 'success',
              message: '影片创建成功'
            });
          }
        });
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let param = {
              film_name: this.ruleForm.filmName,
              film_director: this.ruleForm.filmDirector,
              film_area: this.ruleForm.filmArea,
              film_time: this.ruleForm.filmTime,
              film_type: this.ruleForm.filmType,
              film_score: this.ruleForm.filmScore,
              film_major: this.ruleForm.filmMajor,
              film_desc: this.ruleForm.filmDesc,
              user_name: this.ruleForm.userName,
              user_id: this.ruleForm.userId,
            }
            this.addFilm(param);
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