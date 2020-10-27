<template>
  <div class="comments">
    <h3>留言板</h3>
    <p>目前有<span>{{ userComments.length }}</span>条留言</p>

    <h4 class="comment-title">评论一下吧</h4>
    <!-- 发布文章评论 -->
    <div class="comment-from">
      <input type="hidden" id="parent" value="-1" name="parent">
      <input class="inp-user-info" v-model="username" type="text" name="name" placeholder="昵称(必填)">
      <input class="inp-user-info" v-model="useremail" type="text" name="email" placeholder="电子邮箱(必填)">
      <input class="inp-user-info" v-model="userwebsite" type="text" name="website" placeholder="网址 http://">

      <textarea v-model="usercomment" placeholder="你是我一生只会遇见一次的惊喜..." name="comment" id="comment" rows="8" cols="85"
        class="comment"></textarea>

      <button @click="sendComment('parent')" class="btn">发表评论 biu biu~~</button>
    </div>

    <div class="commment-list">

      <div class="comment-item clearfix" v-for="(comment, index) in getParentComment" :key="comment.id">
        <!-- 评论者头像 -->
        <img v-if="comment.user_name === 'kris'" src="../assets/img/avatar.jpg" alt="">
        <img v-else src="../assets/img/avatar.png" alt="">
        <!-- 评论信息 -->
        <div class="comment-info">
          <!-- 评论者 info -->
          <div class="user-info">
            <span class="name">{{ comment.user_name }}</span>
          </div>
          <!-- comment meta -->
          <div class="meta">
            <span class="date">{{ comment.createdAt }}</span>
            <span @click="isShowCommentForm(null, index)" class="at">回复</span>
          </div>
          <!-- 评论 -->
          <div class="comment-content">
            {{ comment.comment }}
          </div>
          <!-- 回复内容 -->
          <div class="reply-list">
            <div class="reply-item clearfix" v-for="replyComment in replyComments(comment.id)" :key="replyComment.id">
              <img v-if="replyComment.user_name === 'kris'" src="../assets/img/avatar.jpg" alt="">

              <img v-else src="../assets/img/avatar1.png" alt="">
              <div class="reply-comment-info">
                <div class="user-info">
                  <span class="name">{{ replyComment.user_name }}</span>
                </div>
                <div class="meta">
                  <span class="date">{{ replyComment.createdAt }}</span>
                  <span @click="isShowCommentForm(replyComment.user_name, index)" class="at">回复</span>
                </div>
                <div class="comment-content">
                  <span>@{{ replyComment.reply_name || comment.user_name }}</span> , {{ replyComment.comment }}
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- 回复评论的框 -->
        <div class="left comment-from" v-show="replyShow[index]">
          <input type="hidden" v-model="replyname">
          <input type="hidden" class="reply" :value="comment.id" name="parent">
          <input class="inp-user-info" v-model="username" type="text" name="name" placeholder="昵称(必填)">
          <input class="inp-user-info" v-model="useremail" type="text" name="email" placeholder="电子邮箱(必填)">
          <input class="inp-user-info" v-model="userwebsite" type="text" name="website" placeholder="网址 http://">

          <textarea v-model="usercomment" placeholder="你是我一生只会遇见一次的惊喜..." name="comment" id="comment" rows="8" cols="85"
            class="comment"></textarea>

          <button @click="sendComment('reply', index)" class="btn">发表评论 biu biu~~</button>
        </div>

      </div>

      <div v-if="userComments.length === 0" class="uncomment">
        目前还没有人评论，快来做第一个评论的人吧！ (*≧ω≦)ﾉ
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        replyShow: [],
        username: "", // 用户名
        useremail: "", // 用户邮箱
        replyname: "", // 回复用户名 如果时主评论则为null
        userwebsite: "", // 用户网站
        usercomment: "", // 用户评论内容
        userComments: [], // 获取本篇文章的全部评论
        commentTotal: 0,
      }
    },

    computed: {
      /**
       * 获取主评论
       */
      getParentComment() {
        return this.userComments.filter(comment => {
          return comment.parent === -1;
        });
      },


    },

    methods: {

      requestComment() {
        // 请求评论数据
        let blogId = null
        const local = location.pathname;
        if (local === '/about') {
          blogId = -1;
        } else {
          blogId = parseInt(local.split('/')[2]);
        }

        axios.get('/api/comment/' + blogId).then(res => {
          if (res.status === 200) {
            const comment = res.data.data;
            this.userComments = comment.data;
            this.commentTotal = comment.total;

            // 将replyShow与主评论的数量相匹配 并填充为 false
            this.replyShow.length = this.userComments.filter(item => {
              return item.parent === -1;
            }).length;
            this.replyShow.fill(false);

          }
        }).catch(err => {
          console.log(err);
        });
      },


      /**
       * 提交评论
       * @param {*} commentType 
       * @param {*} index 
       */
      sendComment(commentType, index) {
        let parent = null; // 用户在该文章中回复的第几条评论 
        if (commentType === 'parent') { // 如果commentType为parent 则是评论的文章而不是回复
          parent = document.getElementById('parent').value;
        } else {
          parent = document.getElementsByClassName('reply')[index].value;
        }
        if (this.username && this.useremail) {

          if (this.username === 'kris' || this.username === 'Kirs' || this.username === '刘浩男') {
            alert('该名称已被使用，请更换');
            return;
          }

          const user_name = this.username;
          const email = this.useremail;
          const comment = this.usercomment;
          const website = this.userwebsite;
          const reply_name = this.replyname;
          // 获取博客的id
          let local = location.pathname;
          let blog_id = null;
          if (local === '/about') {
            blog_id = -1;
          } else {
            blog_id = parseInt(local.split('/')[2]);
          };

          // 发送评论
          axios.post('/api/comment', {
            data: {
              parent,
              blog_id,
              user_name,
              email,
              comment,
              website,
              reply_name,
            }
          }).then(res => {
            const data = res.data;
            if (data.code === 200) {
              alert('评论成功');
              this.username = "";
              this.useremail = "";
              this.website = "";
              this.usercomment = "";
              this.requestComment();

            } else {
              alert("发表评论失败")
            }
          }).catch(err => {
            console.log(err);
          })

        } else {
          alert('请填写完整的昵称与邮箱');
        }
      },

      /**
       * 获取回复评论的留言
       * @param {*} parentId 
       */
      replyComments(parentId) {
        return this.userComments.filter(comment => {
          return comment.parent === parentId;
        }).reverse().map(comment => {
          const createdAt = comment.createdAt.split('T')[0];
          return {
            blog_id: comment.blog_id,
            comment: comment.comment,
            id: comment.id,
            parent: comment.parent,
            reply_name: comment.reply_name,
            user_name: comment.user_name,
            website: comment.website,
            createdAt
          }
        });
      },

      /**
       * 是否显示回复的表单  当点击回复时显示
       * @param {*} replyname 
       * @param {*} index 
       */
      isShowCommentForm(replyname, index) {
        for (let i = 0; i < this.replyShow.length; i++) {
          this.replyShow[i] = false;
        }

        this.replyShow[index] = true;
        this.replyname = replyname; // 将回复的谁的那个名字付给data中的数据 然后发送到数据库
      }

    },


    created() {
      this.requestComment();
    }

  }
</script>

<style lang="scss">
  .comments {
    text-align: left;
    margin-top: 40px;

    h3 {
      font-size: 28px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 20px;
    }

    p {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 30px;

      span {
        font-size: 24px;
      }
    }

    .comment-title {
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: 600;
    }

    .comment-from {
      margin-bottom: 50px;
      text-align: center;

      &.left {
        float: left;
      }

      .inp-user-info {
        width: 190px;
        height: 30px;
        font-size: 14px;
        color: #7b8a8b;
        margin-bottom: 15px;
        margin-right: 10px;
        border-radius: 5px;
        border: 1px solid #eea2a4;
        outline-color: #eea2a4;
        padding: 5px 10px;
      }

      .comment {
        resize: vertical;
        color: #7b8a8b;
        border: 1px solid #eea2a4;
        border-radius: 5px;
        outline-color: #eea2a4;
        font-size: 14px;
        padding: 10px 20px;
        background-image: url('../assets/img/comment-bg.png');
        background-repeat: no-repeat;
        background-position: right;
        background-size: contain;
        transition: all .5s;

        &:focus {
          background-position-y: 200px;
        }
      }

      .btn {
        border: 1px solid #eea2a4;
        background-color: #eea2a4;
        color: #ffffff;
        padding: 5px 10px;
        border-radius: 5px;
        transition: .3s all;
        margin: 20px auto 0px;
        display: block;

        &:hover {
          background-color: #ee7f82;
        }
      }


    }

    .comment-item {
      border-bottom: 1px dashed #f5f5f5;
      margin-bottom: 30px;
      padding-bottom: 20px;

      img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        float: left;
        margin-right: 20px;
      }

      .comment-info {
        float: left;
        width: 600px;
        margin-bottom: 20px;

        .user-info {
          width: 600px;

          .name {
            font-size: 12px;
            color: #4c4948;
            margin-right: 10px;
            font-weight: 700;

            &:hover {
              color: #d7191a;
            }
          }

          span {
            font-size: 12px;
            color: #b3b3b3;
          }
        }

        .meta {
          font-size: 13px;
          color: #b3b3b3;

          .at {
            display: inline-block;
            padding: 4px 16px;
            font-size: 14px;
            color: #ee7f82;
            border: 1px solid #ee7f82;
            border-radius: 10px;
            margin-left: 525px;
            transition: .3s all;
            cursor: url('../assets/img/link.jpg'), auto;

            &:hover {
              background-color: #ee7f82;
              color: #ffffff;
            }
          }


        }

        .comment-content {
          color: #4c4948;
          font-size: 14px;
          padding-top: 8px;
        }

        .reply-list {
          border-left: 1px dashed #f5f5f5;
          padding-left: 10px;
        }

        .reply-item {
          margin-top: 30px;

          .reply-comment-info {
            float: left;
            width: 518px;
          }

          .user-info .name {
            color: #eea2a4;
            font-weight: normal;

            &:hover {
              color: #9b3e41;
            }
          }

          .meta .at {
            margin-left: 379px;
          }

          .comment-content span {
            color: #eea2a4;

            &:hover {
              color: #9b3e41;
            }
          }
        }


      }


    }

    .uncomment {
      text-align: center;
      padding: 30px 0px;
      color: #777777;
    }




  }
</style>