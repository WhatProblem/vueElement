<template>
  <div class="heroList">
    <!--<el-container>
      <el-header>
        <el-row>
          <el-button @click="getData" type="primary">获取所有数据</el-button>
          <el-button type="primary" @click="getTotals">添加英雄数据</el-button>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <ul>
            <li v-for="(item, index) in options" :key="item.id" @click="getKindFav(item, index)">{{item.title}}</li>
          </ul>
        </el-aside>
        <el-main>
          <el-table :data="tableData" style="width: 100%" height="400" size="mini">
            <el-table-column type="index" label="序号" width="60" align="center">
            </el-table-column>
            <el-table-column label="英雄名称" width="140" align="left">
              <template slot-scope="scope">
                <i class="el-icon-ws-seeuser"></i>
                <span style="margin-left: 10px">{{ scope.row.game_role }}</span>
              </template>
            </el-table-column>
            <el-table-column label="英雄战斗力" width="140" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.game_power }}</span>
              </template>
            </el-table-column>
            <el-table-column label="英雄使用场次" width="140" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.game_total }}</span>
              </template>
            </el-table-column>
            <el-table-column label="英雄喜欢程度" width="140" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.game_fav }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>-->
    <el-container>
      <el-header>
        <el-row>
          <el-button @click="getData" type="primary">获取所有数据</el-button>
          <el-button type="primary" @click="getTotals">添加英雄数据</el-button>
        </el-row>
      </el-header>
      <el-main>
        <el-tabs @tab-click="handleTabs" tab-position="left" type="border-card" style="height: 200px;">
          <el-tab-pane v-for="(item, index) in levelOptions" :label="item.title" :key="item.title">
            <tab-list v-if="curClick==index" :tabListPops="tabListPops"></tab-list>
          </el-tab-pane>
          <!--<el-tab-pane label="常用等级 - 2"><tab-list></tab-list></el-tab-pane>
          <el-tab-pane label="常用等级 - 3"><tab-list></tab-list></el-tab-pane>
          <el-tab-pane label="常用等级 - 4"><tab-list></tab-list></el-tab-pane>-->
        </el-tabs>
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
        tabListPops: '', // 表格数据
        tableData: [],
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      // 选中tabs触发
      handleTabs(tab, event) {
        console.log(tab);
        this.curClick = tab.index;
      },
      getTotals() {
        let self = this;
        let param = {
          game_fav: '3',
          user_id: '1',
          pagesTotal: '10', // 每页总数
          pagesIndex: '1', // 当前页下标
        };
        this.$wsApi.get('getDataAndTotals', param, (res) => {
          if (res['data']['code'] === 200) {
            console.log(res);
          }
        });
      },

      // 获取所有数据
      getData() {
        let self = this;
        this.$wsApi.get('allGameRoleList', { user_id: 1 }, (res) => {
          if (res['data']['code'] === 200) {
            self.tabListPops = res['data']['data']['data'];
            console.log(self.tabListPops);
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
      }
    }
  }

</script>
<style lang="scss" scoped>
  .el-header,
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body>.el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>