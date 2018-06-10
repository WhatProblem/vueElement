<template>
  <div class="heroList">
    <el-container>
      <el-header style="height: 43px;">
        <el-row>
          <div>
            <el-input placeholder="请输入内容" v-model="searchKey" class="input-with-select" @keyup.enter.native="searchList()">
              <el-button slot="append" icon="el-icon-search" @click="searchList()"></el-button>
            </el-input>
          </div>
        </el-row>
      </el-header>
      <el-main>
        <el-tabs @tab-click="handleTabs" tab-position="left" type="border-card">
          <el-tab-pane v-for="(item, index) in levelOptions" :label="item.title" :key="item.title">
            <tab-list v-if="curClick==index" ref="tabLists" :tabListPops="tabListPops"></tab-list>
          </el-tab-pane>
        </el-tabs>
        <el-row>
          <el-col :span="2">
            <div class="totals"><span>总：</span><span>{{totalList}}</span></div>
          </el-col>
          <el-col :span="8" :offset="14">
            <el-pagination :page-size="10" :pager-count="5" @current-change="curPage" :current-page.sync="currentPageNum" layout="prev, pager, next"
              :total="totalList">
            </el-pagination>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import tabList from '@/views/game/heroList/tabList/tabList';
  export default {
    components: {
      tabList
    },
    name: 'heroList',
    data() {
      return {
        levelOptions: [
          { title: '所有数据', level: 0 },
          { title: '熟练度 - 1级', level: 1 },
          { title: '熟练度 - 2级', level: 2 },
          { title: '熟练度 - 3级', level: 3 },
          { title: '熟练度 - 4级', level: 4 },
        ],
        curClick: '', // 当前点击下标
        tabListPops: [], // 表格数据
        tableData: [], // 删除数据操作
        totalList: null, // 数据总数
        currentPageNum: 1, // 当前页
        searchKey: '', // 搜索关键字
        searchFlag: false, // 搜索标志，true：搜索过
      }
    },
    mounted() {
      this.curClick = '0';
      let param = {
        user_id: '1',
        pages_total: '10', // 每页总数
        pages_index: '1', // 当前页下标
      };
      this.getData(param);
    },
    methods: {
      // 选中tabs触发
      handleTabs(tab, event) {
        this.searchFlag = false;
        this.curClick = tab.index;
        if (this.curClick === '0') {
          let param = {
            user_id: '1',
            pages_total: '10', // 每页总数
            pages_index: '1', // 当前页下标
          };
          this.getData(param);
        } else {
          let param = {
            game_fav: this.curClick - 1,
            user_id: '1',
            pages_total: '10', // 每页总数
            pages_index: '1', // 当前页下标
          };
          this.getKindHeroList(param);
        }
        this.currentPageNum = 1;
      },
      getKindHeroList(param) {
        let self = this;
        this.$refs.tabLists[0].loading = true;
        this.$wsApi.get('getDataAndTotals', param, (res) => {
          if (res['data']['code'] === 200) {
            self.tabListPops = res['data']['data']['data'];
            self.$refs.tabLists[0].loading = false;
            self.totalList = res['data']['data']['totals'];
          }
        });
      },

      // 获取所有数据
      getData(param) {
        let self = this;
        this.$refs.tabLists[0].loading = true;
        this.$wsApi.get('allGameRoleList', param, (res) => {
          if (res['data']['code'] === 200) {
            self.tabListPops = res['data']['data']['data'];
            self.$refs.tabLists[0].loading = false;
            self.totalList = res['data']['data']['totals'];
          }
        });
      },
      /**
       * @description: 分页操作
       */
      curPage(val) {
        if (this.searchFlag) {
          let param = {
            user_id: 1,
            game_role: this.searchKey,
            pages_total: '10', // 每页总数
            pages_index: val, // 当前页下标
          };
          this.getSearchData(param);
        } else {
          if (this.curClick === '0') {
            let param = {
              user_id: '1',
              pages_total: '10', // 每页总数
              pages_index: val, // 当前页下标
            };
            this.getData(param);
          } else {
            let param = {
              game_fav: this.curClick - 1,
              user_id: '1',
              pages_total: '10', // 每页总数
              pages_index: val, // 当前页下标
            };
            this.getKindHeroList(param);
          }
          this.$refs.tabLists[0].page = val;
        }
      },
      // 搜索模块
      searchList() {
        this.searchFlag = true; // 搜索
        this.$refs.tabLists[0].loading = true;
        let param = {
          user_id: 1,
          game_role: this.searchKey,
          pages_total: '10', // 每页总数
          pages_index: '1', // 当前页下标
        };
        this.getSearchData(param);
      },
      // 搜索模块接口
      getSearchData(param) {
        let self = this;
        this.$wsApi.post('searchGameRole', param, (res) => {
          if (res['data']['code'] === 200) {
            self.totalList = res['data']['data']['totals'];
            self.tabListPops = res['data']['data']['data'];
            self.$refs.tabLists[0].loading = false;
          }
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .el-header {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 45px;
    padding-left: 0px;
    padding-right: 0px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    /*line-height: 200px;*/
  }
  
  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    padding-top: 0px;
    padding-left: 0px;
    padding-right: 0px;
    /*line-height: 160px;*/
  }
  
  .el-tabs {
    height: 100%;
  }
  
  .el-pagination {
    text-align: right;
  }
  
  body>.el-container {
    margin-bottom: 20px;
  }
  /*.el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }*/
</style>