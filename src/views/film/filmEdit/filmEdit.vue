<template>
  <div class="exportSelected">
    <el-row :gutter="20">
      <el-col :span="14">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="9"></el-tab-pane>
          <el-tab-pane label="科幻" name="0"></el-tab-pane>
          <el-tab-pane label="战争" name="1"></el-tab-pane>
          <el-tab-pane label="爱情" name="2"></el-tab-pane>
          <el-tab-pane label="古装" name="3"></el-tab-pane>
          <el-tab-pane label="动作" name="4"></el-tab-pane>
          <el-tab-pane label="玄幻" name="5"></el-tab-pane>
          <el-tab-pane label="喜剧" name="6"></el-tab-pane>
          <el-tab-pane label="动漫" name="7"></el-tab-pane>
          <el-tab-pane label="娱乐" name="8"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="10">
        <el-input placeholder="请输入内容" v-model="searchKey" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="filmData" style="width: 100%" size="small" v-loading="loading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column label="序号" :index="typeIndex" type="index">
        </el-table-column>
        <el-table-column label="影片名称">
          <template slot-scope="scope">
            <span>{{ scope.row.film_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="主演" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>主演: {{ scope.row.film_major }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.film_major }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="导演">
          <template slot-scope="scope">
            <span>{{ scope.row.film_director }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年代">
          <template slot-scope="scope">
            <span>{{ scope.row.film_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地区">
          <template slot-scope="scope">
            <span>{{ scope.row.film_area }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评分">
          <template slot-scope="scope">
            <span>{{ scope.row.film_score }}</span>
          </template>
        </el-table-column>
        <el-table-column label="影片介绍" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>影片介绍: {{ scope.row.film_desc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.film_desc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="是否收藏" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.film_favorite === '1'?'未收藏':'已收藏' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="播放历史">
          <template slot-scope="scope">
            <span>{{ scope.row.film_hitory === '1'? '已播放' : '未播放' }}</span>
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
      <el-col :span="8">总：{{filmTotals}}</el-col>
      <el-col :span="16" align="right">
        <el-pagination background :current-page="page" @current-change="curPage" :page-size="5" :pager-count="5" layout="prev, pager, next"
          :total="filmTotals">
        </el-pagination>
      </el-col>
    </el-row>
    <editFilm-modal ref="filmModal" :editFilmProps="editFilmProps"></editFilm-modal>
  </div>
</template>
<script>
  import editFilmModal from './editFilmModal/editFilmModal.vue';
  export default {
    name: 'exportSelected',
    components: {
      editFilmModal
    },
    data() {
      return {
        activeName: '9',
        searchKey: '',
        filmData: [], // 影片数据
        filmTotals: null, // 影片总数
        filmTypeValue: '', // 查询类型值
        editFilmProps: {}, // 编辑内容的属性值
        page: 1, // 序号递增
        loading: true, // 控制加载圈
      };
    },
    mounted() {
      this.filmTypeValue = '9';
      let param = {
        film_type: 'film_type',
        film_type_value: this.filmTypeValue,
        pages_total: '5',
        pages_index: '1',
      }
      this.getAllKindFilm(param);
    },
    methods: {
      /**
       * @description: 调取查询接口获取各种类型数据
       * @param {film_type} 查询类型
       * @param {film_type_value} 查询类型值
       * @param {pages_total} 每页展示总数
       * @param {pages_index} 当前页码
      */
      getAllKindFilm(param) {
        let self = this;
        this.$wsApi.get('selectTypeFilm', param, (res) => {
          if (res['data']['code'] === 200) {
            self.filmData = res['data']['data']['data'];
            self.filmTotals = res['data']['data']['totals'];
            self.loading = false;
          }
        });
      },
      /**
       * @description: 调取查询接口删除数据
       * @param {film_id} 视频id
       * @param {user_id} 用户id
      */
      deleteFilm(index, param) {
        let self = this;
        this.$wsApi.post('addOrEditOrDeleteFilm', param, (res) => {
          if (res['data']['code'] === 200) {
            self.$message({
              type: 'success',
              message: '影片删除成功'
            });
            self.filmData.splice(index, 1);
            self.filmTotals = self.filmTotals - 1;
          }
        });
      },
      /**
       * @description: 分页
      */
      curPage(val) {
        let param = {
          film_type: 'film_type',
          film_type_value: this.filmTypeValue,
          pages_total: '5',
          pages_index: val,
        }
        this.getAllKindFilm(param);
        this.page = val;
      },
      // 控制序号
      typeIndex(index) {
        return index + (this.page - 1) * 5 + 1;
      },
      /**
       * @description: 点击当前影片类型
      */
      handleClick(tab, event) {
        this.filmTypeValue = tab.name;
        let param = {
          film_type: 'film_type',
          film_type_value: this.filmTypeValue,
          pages_total: '5',
          pages_index: '1',
        }
        this.getAllKindFilm(param);
      },
      /**
       * @description: 编辑弹框
      */
      handleEdit(index, row) {
        this.$refs.filmModal.dialogFormVisible = true;
        this.editFilmProps = row;
      },
      /**
       * @description: 删除数据
      */
      handleDelete(index, row) {
        let param = {
          film_id: row.film_id,
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
          self.deleteFilm(index, param);
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