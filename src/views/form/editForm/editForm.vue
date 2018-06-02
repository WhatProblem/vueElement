<template>
  <div class="editForm">
    <el-row>
      <el-button @click="getData" type="primary">获取数据</el-button>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'editForm',
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      getData() {
        this.$wsApi.get('http://localhost:3000/allGameRoleList', { user_id: 1 }, (res) => {
          console.log(res);
        });
      }
    }
  }

</script>
<style lang="scss" scoped>

</style>