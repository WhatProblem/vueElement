<template>
  <div class="editFilmModal">
    <el-dialog title="视频资料修改：" :visible.sync="dialogFormVisible" width="65%">
      <el-form :model="editPropsData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="视频名称" prop="film_name">
              <el-input v-model="editPropsData.film_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="视频导演" prop="film_director">
              <el-input v-model="editPropsData.film_director"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="视频区域" prop="film_area">
              <el-input v-model="editPropsData.film_area"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="视频年代" prop="film_time">
              <el-input v-model="editPropsData.film_time"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="视频类型" prop="film_type">
              <el-select v-model="editPropsData.film_type" placeholder="请选择视频类型">
                <el-option label="科幻" value="0"></el-option>
                <el-option label="战争" value="1"></el-option>
                <el-option label="爱情" value="2"></el-option>
                <el-option label="古装" value="3"></el-option>
                <el-option label="动作" value="4"></el-option>
                <el-option label="玄幻" value="5"></el-option>
                <el-option label="喜剧" value="6"></el-option>
                <el-option label="动漫" value="7"></el-option>
                <el-option label="娱乐" value="12"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="视频评分" prop="film_score">
              <el-input v-model="editPropsData.film_score"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="视频主演" prop="film_major">
              <el-input v-model="editPropsData.film_major"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="视频描述" prop="film_desc">
              <el-input type="textarea" :rows="2" v-model="editPropsData.film_desc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名称" prop="user_name">
              <el-input v-model="editPropsData.user_name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户Id" prop="user_id">
              <el-input v-model="editPropsData.user_id" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'editFilmModal',
    props: {
      editFilmProps: {
        type: Object
      }
    },
    data() {
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        editPropsData: {}, // 弹框数据接收
        editPropsData: {
          film_name: '', // 影片名称
          film_director: '', // 导演
          film_major: '', // 主演
          film_score: '', // 评分
          film_area: '', // 地区
          film_time: '', // 年代
          film_type: '', // 类型
          film_desc: '', // 描述介绍
          user_name: '', // 用户名
          user_id: '', // 用户Id
        },
        rules: {
          film_name: [
            { required: true, message: '请输入影片名称', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          film_director: [
            { required: true, message: '请输入影片导演', trigger: 'blur' },
          ],
          film_major: [
            { required: true, message: '请输入影片主演', trigger: 'blur' },
          ],
          film_score: [
            { required: true, message: '请输入影片评分', trigger: 'blur' },
          ],
          film_time: [
            { required: true, message: '请输入影片地区', trigger: 'blur' },
          ],
          filmTime: [
            { required: true, message: '请输入影片年代', trigger: 'blur' },
          ],
          film_type: [
            { required: true, message: '请输入影片类型', trigger: 'blur' },
          ],
          film_desc: [
            { required: true, message: '请输入影片介绍', trigger: 'blur' },
          ],
          user_name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          user_id: [
            { required: true, message: '请输入用户Id', trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
      // 编辑修改数据
      editFilm(param) {
        let self = this;
        this.$wsApi.post('addOrEditOrDeleteFilm', param, (res) => {
          if (res['data']['code'] === 200) {
            self.$message({
              type: 'success',
              message: '影片修改成功'
            });
            self.dialogFormVisible = false;
          }
        });
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let param = {
              film_id: this.editPropsData.film_id,
              film_name: this.editPropsData.film_name,
              film_director: this.editPropsData.film_director,
              film_area: this.editPropsData.film_area,
              film_time: this.editPropsData.film_time,
              film_type: this.editPropsData.film_type,
              film_score: this.editPropsData.film_score,
              film_major: this.editPropsData.film_major,
              film_desc: this.editPropsData.film_desc,
              user_name: this.editPropsData.user_name,
              user_id: this.editPropsData.user_id,
            }
            this.editFilm(param);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    watch: {
      editFilmProps(val) {
        this.editPropsData = val;
      }
    }
  }

</script>
<style lang="scss" scoped>

</style>