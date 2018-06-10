<template>
  <div class="tabList">
    <div>
      <el-table :data="tableDatas" style="width: 100%" size="mini" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column type="index" :index="typeIndex" label="序号" width="60" align="center">
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
    </div>
    <edit-hero ref="editHeros" :editProps="editProps" @backEditObj="backEditObj"></edit-hero>
  </div>
</template>
<script>
  import editHero from '@/views/game/heroList/editHero/editHero'
  export default {
    name: 'tableList',
    components: {
      editHero
    },
    props: {
      tabListPops: {
        type: Array
      }
    },
    data() {
      return {
        tableDatas: [], // 表格数据
        loading: true, // 加载圈
        page: 1, // 分页当前页
        editProps: {}, // 弹框数据
      }
    },
    mounted() {

    },
    methods: {
      // 编辑数据返回处理表格
      backEditObj(val) {
        console.log(val);
        this.tableDatas.forEach((item, index) => {
          if (item.game_id === val.game_id) {
            item.game_role = val.game_role;
            item.game_fav = val.game_fav;
            item.game_power = val.game_power;
            item.game_total = val.game_total;
            item.game_desc = val.game_desc;
          }
        });
      },
      // 表格序号
      typeIndex(index) {
        return index + (this.page - 1) * 10 + 1;
      },
      // 编辑
      handleEdit(index, row) {
        // console.log(row);
        this.$refs.editHeros.dialogFormVisible = true;
        this.editProps = row;
      },
      // 删除单条数据接口
      deleteHero(param) {
        let self = this;
        this.$wsApi.get('deleteGameRole', param, (res) => {
          if (res['data']['code'] === 200) {
            // console.log(res);
            return true;
          } else {
            return false;
          }
        })
      },
      handleDelete(index, row) {
        // console.log(index, row);
        let param = {
          game_id: row.game_id,
          user_id: row.user_id
        };
        let self = this;

        this.$confirm('确认删除此条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          new Promise((resolve, reject) => {
            self.deleteHero(param);
            resolve();
          }).then(() => {
            self.tableDatas.splice(index, 1);
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    },
    watch: {
      tabListPops(val) {
        if (val && val.length !== 0) {
          this.tableDatas = val;
        }
      }
    }
  }

</script>
<style lang="scss" scoped>

</style>