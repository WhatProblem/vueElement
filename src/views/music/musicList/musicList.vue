<template>
  <div class="musicList">
    <el-row :gutter="20">
      <el-col :span="14">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="12"></el-tab-pane>
          <el-tab-pane label="纯音乐" name="0"></el-tab-pane>
          <el-tab-pane label="流行音乐" name="1"></el-tab-pane>
          <el-tab-pane label="经典音乐" name="2"></el-tab-pane>
          <el-tab-pane label="安静" name="3"></el-tab-pane>
          <el-tab-pane label="寂寞" name="4"></el-tab-pane>
          <el-tab-pane label="火热DJ" name="5"></el-tab-pane>
          <el-tab-pane label="伤感" name="6"></el-tab-pane>
          <el-tab-pane label="舞曲" name="7"></el-tab-pane>
          <el-tab-pane label="儿童乐曲" name="8"></el-tab-pane>
          <el-tab-pane label="激情" name="9"></el-tab-pane>
          <el-tab-pane label="80后" name="10"></el-tab-pane>
          <el-tab-pane label="开心" name="11"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="10">
        <el-input placeholder="请输入内容" v-model="searchKey" @keyup.enter.native="searchMusic" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchMusic"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="musicData" style="width: 100%" size="small" v-loading="loading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column label="序号" :index="typeIndex" type="index">
        </el-table-column>
        <el-table-column label="歌曲名称">
          <template slot-scope="scope">
            <span>{{ scope.row.music_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="歌手名称">
          <template slot-scope="scope">
            <span>{{ scope.row.music_singer }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年代">
          <template slot-scope="scope">
            <span>{{ scope.row.music_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地区">
          <template slot-scope="scope">
            <span>{{ scope.row.music_area }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评分">
          <template slot-scope="scope">
            <span>{{ scope.row.music_score }}</span>
          </template>
        </el-table-column>
        <el-table-column label="歌曲介绍" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>歌曲介绍: {{ scope.row.music_desc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.music_desc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="是否收藏" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.music_favorite === '0'?'未收藏':'已收藏' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否加锁" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.music_lock === '0'?'未加锁':'已加锁' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="播放历史">
          <template slot-scope="scope">
            <span>{{ scope.row.music_hitory === '1'? '已播放' : '未播放' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限用户">
          <template slot-scope="scope">
            <span>{{ scope.row.user_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-col :span="8">总：{{musicTotals}}</el-col>
      <el-col :span="16" align="right">
        <el-pagination background :current-page="page" @current-change="curPage" :page-size="5" :pager-count="5" layout="prev, pager, next"
          :total="musicTotals">
        </el-pagination>
      </el-col>
    </el-row>
    <editMusic-modal ref="musicModal" :editMusicProps="editMusicProps"></editMusic-modal>
  </div>
</template>
<script>
  import editMusicModal from './editMusicModal/editMusicModal.vue';
  export default {
    name: 'musicList',
    components: {
      editMusicModal
    },
    data() {
      return {
        activeName: '12',
        searchKey: '',
        musicData: [], // 歌曲数据
        musicTotals: null, // 歌曲总数
        musicTypeValue: '', // 查询类型值
        editMusicProps: {}, // 编辑内容的属性值
        page: 1, // 序号递增
        loading: true, // 控制加载圈
        searchFlag: true, // false: 搜索
      };
    },
    mounted() {
      this.musicTypeValue = '12';
      let param = {
        music_type: 'music_type',
        music_type_value: this.musicTypeValue,
        pages_total: '5',
        pages_index: '1',
      }
      this.getAllKindMusic(param);
    },
    methods: {
      /**
       * @description: 调取查询接口获取各种类型数据
       * @param {music_type} 查询类型
       * @param {music_type_value} 查询类型值
       * @param {pages_total} 每页展示总数
       * @param {pages_index} 当前页码
      */
      getAllKindMusic(param) {
        let self = this;
        this.$wsApi.get('selectTypeMusic', param, (res) => {
          if (res['data']['code'] === 200) {
            self.musicData = res['data']['data']['data'];
            self.musicTotals = res['data']['data']['totals'];
            self.loading = false;
          }
        });
      },

      /**
       * @description: 调取查询接口删除数据
       * @param {music_id} 视频id
       * @param {user_id} 用户id
      */
      deleteMusic(index, param) {
        let self = this;
        this.$wsApi.post('addOrEditOrDelMusic', param, (res) => {
          if (res['data']['code'] === 200) {
            self.$message({
              type: 'success',
              message: '歌曲删除成功'
            });
            self.musicData.splice(index, 1);
            self.musicTotals = self.musicTotals - 1;
          }
        });
      },

      /**
       * @description: 模糊查询歌曲名称，描述，区域，年代
       * @param {music_name} 歌曲名称
       * @param {music_desc} 歌曲描述
       * @param {music_area} 歌曲区域
       * @param {music_time} 歌曲年代
       * @function {music_value} 输入关键词
       * @function {pages_total} 每页总数
       * @function {pages_index} 当前页
       * @function {music_type} 类型值
       */
      getSearchMusic(param) {
        let self = this;
        this.$wsApi.get('searchMusic', param, (res) => {
          if (res['data']['code'] === 200) {
            self.musicData = res['data']['data']['data'];
            self.musicTotals = res['data']['data']['totals'];
          }
        })
      },

      //  搜索功能
      searchMusic() {
        this.searchFlag = false; // 搜索
        let param = {
          music_value: this.searchKey,
          pages_total: '5', // 每页展示数量
          pages_index: '1', // 当前页
          music_type: this.musicTypeValue, // 类型值
        }
        this.getSearchMusic(param);
      },
      /**
       * @description: 分页
      */
      curPage(val) {
        if (this.searchFlag) { // 正常分类分页
          let param = {
            music_type: 'music_type',
            music_type_value: this.musicTypeValue,
            pages_total: '5',
            pages_index: val,
          }
          this.getAllKindMusic(param);
        } else { // 搜索部分分页
          let param = {
            music_value: this.searchKey,
            pages_total: '5', // 每页展示数量
            pages_index: val, // 当前页
            music_type: this.musicTypeValue, // 类型值
          }
          this.getSearchMusic(param);
        }
        this.page = val;
      },
      // 控制序号
      typeIndex(index) {
        return index + (this.page - 1) * 5 + 1;
      },
      /**
       * @description: 点击当前歌曲类型
      */
      handleClick(tab, event) {
        this.searchFlag = true; // 按类型查标志
        this.musicTypeValue = tab.name;
        let param = {
          music_type: 'music_type',
          music_type_value: this.musicTypeValue,
          pages_total: '5',
          pages_index: '1',
        }
        this.getAllKindMusic(param);
      },
      /**
       * @description: 编辑弹框
      */
      handleEdit(index, row) {
        this.$refs.musicModal.dialogFormVisible = true;
        this.editMusicProps = row;
      },
      /**
       * @description: 删除数据
      */
      handleDelete(index, row) {
        let param = {
          music_id: row.music_id,
          user_id: row.user_id
        }
        let self = this;
        this.$confirm('确认删除该条数据?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          self.deleteMusic(index, param);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }

</script>
<style lang="scss" scoped>

</style>