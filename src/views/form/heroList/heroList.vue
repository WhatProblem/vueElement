<template>
  <div class="editForm">
    <el-container>
      <el-header>
        <el-row>
          <el-button @click="getData" type="primary">获取所有数据</el-button>
          <el-button type="primary">添加英雄数据</el-button>
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
    </el-container>
  </div>
</template>
<script>
  export default {
    name: 'editForm',
    data() {
      return {
        options: [
          { title: '所有数据', id: 0 },
          { title: '熟练度 - 1级', id: 1 },
          { title: '熟练度 - 2级', id: 2 },
          { title: '熟练度 - 3级', id: 3 },
          { title: '熟练度 - 4级', id: 4 },
        ],
        tableData: []
      }
    },
    mounted() {
      // this.getData();
    },
    methods: {

      // 获取所有数据
      getData() {
        let self = this;
        this.$wsApi.get('allGameRoleList', { user_id: 1 }, (res) => {
          if (res['data']['code'] === 200) {
            self.tableData = res['data']['data'];
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
            self.tableData = res['data']['data'];
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
    text-align: left;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: left;
    line-height: 39px;
    font-size: 16px;
    overflow: hidden;
  }
  
  .el-aside ul li {
    width: 100%;
    height: 39px;
    cursor: pointer;
    padding-left: 20px;
    border-bottom: 1px solid dodgerblue;
  }
  
  .el-aside ul li:hover {
    color: dodgerblue;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
    height: 450px;
    overflow: hidden;
    overflow-y: scroll;
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