<template>
  <div class="my-header">
    <h1 class="logo">
      <a href="/">键盘钢琴家</a>
    </h1>
    <div class="nav">
      <div class="item">
        <i class="iconfont icon-zhuye"></i>
        <router-link to="/">主页</router-link>
      </div>
      <div class="item">
        <i class="iconfont icon-guidang"></i>
        <router-link to="/website">归档</router-link>
      </div>
      <div class="item">
        <i class="iconfont icon-shu"></i>
        <router-link to="/articlelist">技术</router-link>
      </div>
      <!-- <div class="item">
        <i class="iconfont icon-wenzhang"></i>
        <router-link to="/personalresume">简历</router-link>
      </div> -->
      <div class="item">
        <i class="iconfont icon-shenghuo"></i>
        <router-link to="/life">生活</router-link>
      </div>
      <div class="item">
        <i class="iconfont icon-guanyu1"></i>
        <router-link to="/about">关于</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss">
  .my-header {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;

    .logo a {
      font-weight: 600;
      font-size: 16px;
      color: #eeeeee;
    }

    .nav {
      color: #eeeeee;
      display: flex;
      justify-content: space-between;

      .item {
        margin-right: 15px;
        position: relative;

        &:hover::after {
          width: 100%;
        }

        &:hover a{ 
          color: #ffffff;
        }

        &::after {
          content: '';
          position: absolute;
          bottom: 0px;
          display: block;
          width: 0;
          height: 4px;
          background-color: #80c8f8;
          transition: width .3s;
        }
      }

      a {
        display: inline-block;
        color: #eeeeee;
      }

    }
  }
</style>