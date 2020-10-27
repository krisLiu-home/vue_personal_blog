<template>
  <div class="everyday-content">
    <h1>每日一句列表</h1>
    <ul class="everyday-list">
      <li class="everyday-item" v-for="everyday in everydayList" :key="everyday.id">
        <div class="comment">{{ everyday.content }}</div>
        <div class="date">{{ everyday.createdAt }}</div>
        <button @click="deleteEveryday(everyday.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        everydayList: [],
      }
    },

    methods: {

      /**
       * 获取全部每日一句
       */
      getEveryday() {
        request.get('/api/everyday/all').then(res => {
          const data = res.data.data;
          this.everydayList = data;
        });
      },

      /**
       * 删除每日一句
       */
      deleteEveryday(commentId) {
        request.delete('/api/everyday/' + commentId).then(res => {
          const data = res.data.data;

          if (data > 0) {
            alert("删除成功");
            this.getEveryday();
          } else {
            alert("删除失败");
          }
        }).catch(err => {
          alert('删除失败');
        })
      }
    },



    created() {
      this.getEveryday();
    }
  }
</script>

<style lang="scss" scoped>
  .everyday-content {
    padding: 30px;
    height: 100%;
    box-sizing: border-box;

    h1 {
      text-align: center;
      margin-bottom: 20px;
    }

    .everyday-list {
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

      .everyday-item {
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
          width: 420px;
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