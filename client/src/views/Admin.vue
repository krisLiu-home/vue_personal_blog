<template>
  <div class="admin">
    <header class="header">
      <h1>博客管理系统</h1>
    </header>
    <div class="content">
      <el-row>
        <el-col :span="4" class="content-left">
          <ul>
            <li><a href="/admin/bloglist">博客列表</a></li>
            <li><a href="/admin/commentlist">评论列表</a></li>
            <li><a href="/admin/everydaylist">每日一句列表</a></li>
            <li><a href="/admin/editoreveryday">每日一句</a></li>
            <li><a href="/admin/editorblog">写博客</a></li>
          </ul>
        </el-col>
        <el-col :span="18" class="content-right">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped lang="scss">
  .admin {
    box-sizing: border-box;
    padding: 30px 30px;

    .header {
      margin-bottom: 30px;
      text-align: center;
      color: #1f2d3d;
    }

    .content {
      .content-left {
        background-color: #ffffff;
        opacity: .8;
        border-radius: 10px;
        height: calc(100vh - 140px);

        ul {
          list-style-type: none;
          padding: 40px 20px;

          li {
            text-align: center;
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 35px;

            transition: .5s background-color;

            a {
              color: #5a5a5a;
            }

            &:hover {
              background-color: #80c8f8;

              a {
                color: #ffffff;
              }
            }
          }


        }
      }

      .content-right {
        margin-left: 50px;
        background-color: #ffffff;
        opacity: .8;
        border-radius: 10px;
        height: calc(100vh - 140px);
      }
    }
  }
</style>