<template>
  <div class="exportExcel">
    <el-table :data="tableDatas" style="width: 100%">
      <el-table-column prop="date" label="序号" type="index" width="60">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
    <el-pagination 
    :page-count="2" 
    :page-size="4" 
    @current-change="curPage" 
    @prev-click="prevPage" 
    @next-click="nextPage" 
    layout="prev, pager, next" 
    :total="totalLen">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'exportExcel',
  data() {
    return {
      tableData: [
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-05',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      tableDatas: [], // 表格
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.tableDatas = this.tableData.slice(0, 4);
    },
    curPage(val) {
      if (val === 1) {
        this.tableDatas = this.tableData.slice(0, 4);
      } else if (val === 2) {
        this.tableDatas = this.tableData.slice(4);
      }
      this.tableDatas = this.tableData.slice(0, 4);
    },
    prevPage(val) {
      this.tableDatas = this.tableData.slice(0, 4);
    },
    nextPage(val) {
      this.tableDatas = this.tableData.slice(4);
    }
  },
  computed: {
    totalLen() {
      return this.tableData.length;
    }
  }
}

</script>
<style lang="scss" scoped>

</style>