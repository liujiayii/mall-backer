<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
    <a-button @click="getContent">查看内容</a-button>
    <a-button @click="addContent">添加内容</a-button>
    <a-button @click="clearContent">清空内容</a-button>
  </div>
</template>

<script>
  import wangEditor from 'wangeditor'
  import {emoji} from "./emoji";

  let editor = null

  export default {
    name: "List",
    data() {
      return {
        editorContent: ''
      }
    },
    methods: {
      getContent: function () {
        console.log(this.editorContent)
      },
      addContent() {
        editor.txt.append('<p>用 JS 设置的内容</p>')
      },
      clearContent() {
        editor.txt.clear()
      }
    },
    mounted() {
      editor = new wangEditor(this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.customConfig.emotions = [...emoji]
      editor.create()
    }
  }
</script>

<style scoped>

</style>
