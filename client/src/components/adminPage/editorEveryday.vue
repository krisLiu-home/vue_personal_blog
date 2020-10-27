<template>
  <div class="editorevery-content">
    <h1>每日一句</h1>
    <div class="home">
      <textarea name="" id="" cols="115" rows="10" class="content" v-model="content" placeholder="请输入每日一句"></textarea>

      <div class="btn">
        <button class="submit" @click="sendMsg">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        content: ''
      }
    },
    methods: {
      sendMsg() {
        if (this.content) {
          const content = this.content;
          request.post('/api/everyday', {
            data: {
              content
            }
          }).then(res => {
            const data = res.data.data;
            if (data) {
              alert('添加成功');
              this.content = '';
            } else {
              alert('添加失败');
            }
          }).catch(err => {
            alert('添加失败');
          })
        } else {
          alert('您没有输入任何内容');
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .editorevery-content {
    padding: 30px;
    height: 100%;
    box-sizing: border-box;

    h1 {
      text-align: center;
      margin-bottom: 20px;
    }

    .content {
      resize: vertical;
      padding: 13px;
      font-size: 18px;
      color: #5a5a5a;
      border: 1px solid #eea2a4;
      outline-color: #eea2a4;

      border-radius: 10px;
    }

    .btn {
      text-align: center;
      margin-top: 20px;

      button {
        border: 1px solid #eea2a4;
        background-color: #eea2a4;
        color: #ffffff;
        padding: 8px 30px;
        border-radius: 5px;
        transition: .3s all;
        margin: 20px auto 0px;
        display: block;

        &:hover {
          background-color: #ee7f82;
        }
      }
    }

  }
</style>