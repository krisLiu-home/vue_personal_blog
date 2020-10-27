<template>
  <div class="layout-default">
    <el-container>
      <el-header height="">
        <BlogHeader />
      </el-header>
      <el-main>
        <router-view class="animate__animated animate__zoomInDown"></router-view>
      </el-main>
      <el-footer height="">
        <BlogFooter />
      </el-footer>
    </el-container>

  </div>
</template>

<script>
  import BlogHeader from '@/components/header/index.vue'
  import BlogFooter from '@/components/footer/index.vue';
  export default {
    components: {
      BlogHeader,
      BlogFooter
    }
  }
</script>

<style lang="scss">
  .el-header,
  .el-main,
  .el-footer {
    width: 1190px;
    margin: 0px auto;
    padding: 0;
    overflow: hidden;
  }

  .el-main {
    margin: 40px auto;
  }
</style>