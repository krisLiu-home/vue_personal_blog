<template>
  <div class="home">
    <input type="text" class="inp title" v-model="title" id="blog-title" placeholder="请输入标题">
    <input type="text" class="inp tags" v-model="tags" id="blog-tags" placeholder="请输入标签，以逗号分割">
    <div id="demo1"></div>
    <button class="submit" @click="sendBlog">提交</button>
    <button type="button" class="btn" @click="getEditorData">获取当前内容</button>
    <h3>内容预览</h3>
    <textarea name="" id="" cols="140" rows="20" readonly v-model="editorData"></textarea>
  </div>
</template>

<script>
  export default {

  }
</script>

<style>

</style>