<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
    <a-button @click="getContent">查看内容</a-button>
  </div>
</template>

<script>
  import wangEditor from 'wangeditor'

  export default {
    name: "Publish",
    data() {
      return {
        editorContent: ''
      }
    },
    methods: {
      getContent: function () {
        console.log(this.editorContent)
      }
    },
    mounted() {
      var editor = new wangEditor(this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.create()
    }
  }
</script>

<style scoped>

</style>
