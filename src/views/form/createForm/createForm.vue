<template>
  <div class="createForm">
    <el-table 
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    @current-change="handleCurrentChange"
    @selection-change="handleSelectionChange"
    @row-click="selectRow"
      style="width: 100%">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="商品名称" width="180">
        <template slot-scope="scope">
          <i class="el-icon-ws-seeuser"></i>
          <span style="margin-left: 10px">{{ scope.row.testName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    name: 'createForm',
    data() {
      return {
        tableData: [
          {
            testName: '电影',
            date: '2016-05-02',
            name: '￥120',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            testName: '电影',
            date: '2016-05-04',
            name: '￥120',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            testName: '电影',
            date: '2016-05-01',
            name: '￥120',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            testName: '电影',
            date: '2016-05-03',
            name: '￥120',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    },
    mounted() {

    },
    methods: {
      /**
       * @description: 当选择项发生变化时会触发该事件
      */
      handleSelectionChange(val) {
        // console.log(val);
      },
      /**
       * @description: 当表格的当前行发生变化的时候会触发该事件
       */
      handleCurrentChange(val) {
        // console.log(val);
        this.$refs.singleTable.setCurrentRow(val);
      },
      /**
       * @description:当某一行被点击时会触发该事件
       * 
       */
      selectRow(val) {
        let rows = [];
        rows[0] = val;
        this.toggleSelection(rows)
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        // console.log(index, row);
      },
      /**@description: 用于多选表格，切换某一行的选中状态
       * 
       */
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.singleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.singleTable.clearSelection(row);
        }
      },
    }
  }

</script>
<style lang="scss" scoped>

</style>