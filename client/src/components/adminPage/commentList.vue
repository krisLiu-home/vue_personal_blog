<template>
  <div class="comment-content">
    <h1>评论列表</h1>
    <ul class="comment-list">
      <li class="comment-item" v-for="comment in commentList" :key="comment.id">
        <div class="title">{{ comment.user_name }}</div>
        <div class="comment">{{ comment.comment }}</div>
        <div class="date">{{ comment.createdAt }}</div>
        <button @click="deleteComment(comment.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        commentList: [],
      }
    },

    methods: {
      deleteComment(commentId) {
        request.delete('/api/comment/' + commentId).then(resp => {
          const data = resp.data.data;
          if (data > 0) {
            alert("删除成功");
            this.getComments();
          } else {
            alert("删除失败");
          }
        })
      },
      getComments() {
        request.get('/api/comment').then(resp => {
          const data = resp.data.data
          this.commentList = data;
        })
      }
    },

    created() {
      this.getComments();
    }
  }
</script>

<style lang="scss" scoped>
  .comment-content {
    padding: 30px;
    height: 100%;
    box-sizing: border-box;



    h1 {
      text-align: center;
      margin-bottom: 20px;
    }

    .comment-list {
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

      .comment-item {
        margin-bottom: 10px;
        padding: 10px 50px 10px 20px;
        border-radius: 30px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        &:hover {
          background-color: #eeeeee;
        }

        .comment,
        .date {
          color: #1f2d3d;
          transition: all .3s;
          width: 230px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          &:hover {
            transform: translateX(30px);
            color: #80c8f8;
          }
        }

        .title {
          font-size: 24px;
          font-weight: bold;
          color: #5a5a5a;
          width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

        }

        button {
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