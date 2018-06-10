<template>
  <div class="tabList">
    <el-table 
      :data="tableDatas" 
      style="width: 100%" 
      size="mini"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
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
  </div>
</template>
<script>
  export default {
    name: 'tableList',
    props: {
      tabListPops: {
        type: Array
      }
    },
    data() {
      return {
        tableDatas: [], // 表格数据
        loading: true, // 加载圈
      }
    },
    mounted() {
    
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