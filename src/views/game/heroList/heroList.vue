<template>
  <div class="heroList">
    <el-container>
      <el-header>
        <el-row>
          <el-button @click="getData" type="primary">获取所有数据</el-button>
          <el-button type="primary" @click="getKindHeroList">添加英雄数据</el-button>
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
            <el-pagination 
            :page-size="10" 
            :pager-count="5" 
            @current-change="curPage"
            layout="prev, pager, next" 
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
      }
    },
    mounted() {
      this.curClick = 0;
      let param = {
        user_id: '1',
        pagesTotal: '10', // 每页总数
        pagesIndex: '1', // 当前页下标
      };
      this.getData(param);
    },
    methods: {
      // 选中tabs触发
      handleTabs(tab, event) {
        this.curClick = tab.index;
        if (this.curClick === '0') {
          let param = {
            user_id: '1',
            pagesTotal: '10', // 每页总数
            pagesIndex: '1', // 当前页下标
          };
          this.getData(param);
        } else {
          let param = {
            game_fav: this.curClick - 1,
            user_id: '1',
            pagesTotal: '10', // 每页总数
            pagesIndex: '1', // 当前页下标
          };
          this.getKindHeroList(param);
        }
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
      handleEdit(index, row) {
        console.log(index, row);
      },
      // 删除单条数据接口
      deleteHero(param) {
        let self = this;
        this.$wsApi.get('deleteGameRole', param, (res) => {
          if (res['data']['code'] === 200) {
            console.log(res);
            return true;
          } else {
            return false;
          }
        })
      },
      handleDelete(index, row) {
        console.log(index, row);
        let param = {
          game_id: row.game_id,
          user_id: row.user_id
        };
        let self = this;
        new Promise((resolve, reject) => {
          self.deleteHero(param);
          resolve();
        }).then(() => {
          self.tableData.splice(index, 1);
        })
      },
      // 获取不同喜欢等级的数据
      getDiffFav(param) {
        let self = this;
        this.$wsApi.get('difFavDegree', param, (res) => {
          if (res['data']['code'] === 200) {
            self.tabListPops = res['data']['data']['data'];
          }
        });
      },
      // 不同喜欢程度的数据
      getKindFav(item, index) {
        let userId = 1;
        if (index > 0) {
          let gameFav = index - 1;
          let param = {
            user_id: userId,
            game_fav: gameFav
          };
          this.getDiffFav(param);
        } else {
          this.getData();
        }
      },
      /**
       * @description: 分页操作
       */
      curPage(val) {
        console.log(val);
        if (this.curClick === '0') {
          let param = {
            user_id: '1',
            pagesTotal: '10', // 每页总数
            pagesIndex: val, // 当前页下标
          };
          this.getData(param);
        } else {
          let param = {
            game_fav: this.curClick - 1,
            user_id: '1',
            pagesTotal: '10', // 每页总数
            pagesIndex: val, // 当前页下标
          };
          this.getKindHeroList(param);
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 45px;
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