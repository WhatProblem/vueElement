<template>
  <div class="markdown-editor">
    <div id="main">
      <div id="main">
        <mavon-editor v-model="value" />
      </div>
    </div>
  </div>
</template>

<script>
  // import SimpleMDE from 'simplemde';
  // import marked from 'marked';

  export default {
    name: 'markdown-editor',
    data () {
      return {
        value: '请输入内容'
      }
    },
    mounted() {
      
    },
    methods: {

    },
    watch: {

    },
  };

</script>

<style>

</style>