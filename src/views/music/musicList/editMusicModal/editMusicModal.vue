<template>
  <div class="editMusicModal">
    <el-dialog title="视频资料修改：" :visible.sync="dialogFormVisible" width="65%">
      <el-form :model="editPropsData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="音乐名称" prop="music_name">
              <el-input v-model="editPropsData.music_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="歌手" prop="music_singer">
              <el-input v-model="editPropsData.music_singer"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="音乐区域" prop="music_area">
              <el-input v-model="editPropsData.music_area"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="音乐年代" prop="music_time">
              <el-input v-model="editPropsData.music_time"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="音乐类型" prop="music_type">
              <el-select v-model="editPropsData.music_type" placeholder="请选择音乐类型">
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
          <el-col :span="12">
            <el-form-item label="音乐评分" prop="music_score">
              <el-input v-model="editPropsData.music_score"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="音乐描述" prop="music_desc">
              <el-input type="textarea" :rows="2" v-model="editPropsData.music_desc"></el-input>
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
    name: 'editMusicModal',
    props: {
      editMusicProps: {
        type: Object
      }
    },
    data() {
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        editPropsData: {}, // 弹框数据接收
        editPropsData: {
          music_name: '', // 歌曲名称
          music_singer: '', // 歌手
          music_area: '', // 地区
          music_time: '', // 年代
          music_type: '', // 类型
          music_score: '', // 评分
          music_desc: '', // 描述介绍
          user_name: '', // 用户名
          user_id: '', // 用户Id
        },
        rules: {
          music_name: [
            { required: true, message: '请输入歌曲名称', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          music_singer: [
            { required: true, message: '请输入歌手名称', trigger: 'blur' },
          ],
          music_score: [
            { required: true, message: '请输入歌曲评分', trigger: 'blur' },
          ],
          music_time: [
            { required: true, message: '请输入歌曲年代', trigger: 'blur' },
          ],
          music_area: [
            { required: true, message: '请输入歌曲地区', trigger: 'blur' },
          ],
          music_type: [
            { required: true, message: '请输入歌曲类型', trigger: 'blur' },
          ],
          music_desc: [
            { required: true, message: '请输入歌曲介绍', trigger: 'blur' },
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
      editMusic(param) {
        let self = this;
        this.$wsApi.post('addOrEditOrDelMusic', param, (res) => {
          if (res['data']['code'] === 200) {
            self.$message({
              type: 'success',
              message: '歌曲修改成功'
            });
            self.dialogFormVisible = false;
          }
        });
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let param = {
              music_id: this.editPropsData.music_id,
              music_name: this.editPropsData.music_name,
              music_area: this.editPropsData.music_area,
              music_time: this.editPropsData.music_time,
              music_type: this.editPropsData.music_type,
              music_score: this.editPropsData.music_score,
              music_singer: this.editPropsData.music_singer,
              music_desc: this.editPropsData.music_desc,
              user_name: this.editPropsData.user_name,
              user_id: this.editPropsData.user_id,
            }
            this.editMusic(param);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    watch: {
      editMusicProps(val) {
        this.editPropsData = val;
      }
    }
  }

</script>
<style lang="scss" scoped>

</style>