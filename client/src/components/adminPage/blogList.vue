<template>
  <div class="blog-content">
    <h1>博客列表</h1>
    <ul class="blog-list">
      <li class="blog-item" v-for="blog in blogList" :key="blog.id">
        <div class="title">{{ blog.title }}</div>
        <button @click="deleteBlog(blog.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        blogList: [],
      }
    },

    computed: {

    },

    methods: {
      // 获取博客
      getBlog() {
        request.get('/api/blog/all').then(resp => {
          const data = resp.data.data; // 获取所有博客数组
          this.blogList = data.data;
        });
      },

      // 删除博客
      deleteBlog(blogId) {
        request.delete('/api/blog/' + blogId).then(resp => {
          const data = resp.data.data;
          if (data > 0) {
            alert("删除成功");
            this.getBlog();
          } else {
            alert("删除失败")
          }

        }).catch(err => {
          alert('删除失败');
        })
      }
    },

    created() {
      this.getBlog();
    }
  }
</script>

<style lang="scss" scoped>
  .blog-content {
    padding: 30px;
    height: 100%;
    box-sizing: border-box;



    h1 {
      text-align: center;
      margin-bottom: 20px;
    }

    .blog-list {
      overflow: scroll;
      height: calc(100% - 43px);

      &::-webkit-scrollbar {
        background-color: #ffffff;
        width: 5px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #80c8f8;
      }

      list-style-type: none;

      .blog-item {
        margin-bottom: 10px;
        padding: 10px 50px 10px 20px;
        border-radius: 30px;

        &::after {
          content: '';
          display: block;
          clear: both;
        }

        &:hover {
          background-color: #eeeeee;
        }

        .title {
          float: left;
          font-size: 24px;
          font-weight: bold;
          transition: all .3s;
          color: #5a5a5a;

          &:hover {
            transform: translateX(30px);
            color: #80c8f8;
          }
        }

        button {
          float: right;
          border: 1px solid #80c8f8;
          outline-color: #80c8f8;
          padding: 5px 16px;
          color: #80c8f8;
          border-radius: 6px;
          transition: all .3s;

          &:hover {
            background-color: #80c8f8;
            color: #ffffff;
          }
        }
      }
    }


  }
</style>