<template>
  <div class="heroSort">
    <el-row>
      <div>英雄分类</div>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-tabs type="card" tab-position="left" style="height: 200px;" @tab-click="handleClick">
        <el-tab-pane label="熟练度一">
          <el-table size="mini" :data="tableData3" height="250" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="熟练度二">熟练度二</el-tab-pane>
        <el-tab-pane label="熟练度三">熟练度三</el-tab-pane>
        <el-tab-pane label="熟练度四">熟练度四</el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'heroSort',
    data() {
      return {
        input5: '',
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }

</script>
<style lang="scss" scoped>

</style>