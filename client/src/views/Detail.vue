<template>
  <div class="article-detail">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="blog-content-left">
          <!-- 博客内容 -->
          <div class="blog">
            <!-- 标题 -->
            <h1 class="blog-title">
              {{ title }}
            </h1>

            <!-- 文章meta -->
            <div class="blog-meta">
              <i class="iconfont icon-naozhong"></i>
              {{ ctime }} |
              <i class="iconfont icon-zan"></i>
              {{ like }}赞 |
              <i class="iconfont icon-liulan1"></i>
              {{ views }}
            </div>
            <hr>
            <!-- 文章内容 -->
            <div v-html="content" class="blog-content">

            </div>

            <!-- 版权声明 -->
            <div class="copy clearfix">
              <p>本站所有文章在CC BY-NC-SA 4.0 协议下授权 这意味着您可以自由地转载、修改</p>
              <p>但您<span>必须</span>遵守本站规定：</p>
              <p>转载时<span>必须</span>给出适当署名，并提供本站原文链接</p>
              <p>您<span>不得</span>将本站内容用于商业目的</p>
              <div class="tags">
                <i class="iconfont icon-biaoqian"></i>
                <span v-for="tag in getTags" :key="tag">
                  {{ tag }}
                </span>

              </div>
              <div class="like" :class="{active: isLike}">
                <a @click="changeLike">喜欢一下吧</a>
                <i class="iconfont icon-xin"></i>
              </div>
            </div>

          </div>

          <!-- 评论 -->
          <Comment />
        </div>
      </el-col>
      <el-col :span="8">
        <Aside />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Comment from '../components/comment.vue';
  import Aside from '../components/aside.vue';
  export default {
    data() {
      return {
        title: "",
        tags: "",
        ctime: "",
        content: "",
        views: "",
        like: "",
        isLike: false,
      }
    },
    components: {
      Comment,
      Aside,
    },
    computed: {
      getTags() {
        return this.tags.split(',');
      }
    },
    methods: {
      changeLike() {
        this.isLike = !this.isLike;
      }
    },
    created() {
      const local = location.pathname;
      if (local) {
        axios.get('/api' + local).then(res => {
          console.log(res);
          if (res.status === 200) {
            const data = res.data.data;
            const date = data.createdAt.split('T')[0];
            this.title = data.title;
            this.content = data.content;
            this.tags = data.tags;
            this.views = data.views;
            this.like = data.like;
            this.ctime = date;
          }
        })
      };
    }


  }
</script>

<style lang="scss">
  .blog-content-left {
    color: #212529;
    font-size: 15px;
    background-color: #ffffff;
    padding: 25px;
    border-radius: 5px;
    box-shadow: 4px 6px 8px rgba(7, 17, 27, .06);
    transition: .3s all;
    opacity: .8;

    .blog {
      .blog-title {
        font-size: 28px;
        color: #212529;
        font-weight: 700;
        margin-bottom: 20px;
        color: #1f2d3d;
      }

      .blog-meta {
        color: #858585;
        font-size: 14px;

        .iconfont {
          font-size: 13px;
        }
      }

      hr {
        margin: 20px 0;
      }

      .blog-content {
        color: #4c4948;

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {

          margin: 30px 0;

          &::before {
            opacity: 0.5;
            content: "##";
            margin-right: 0.3rem;
          }
        }

        blockquote {
          padding: 10px;
          border-radius: 5px;
          margin: 20px 0;
          background-color: #eeeeee;
        }

        p {
          margin: 20px 0;
        }

        img {
          height: auto;
          max-height: 50rem;
          margin: 0 auto;
          display: block;
          max-width: 100%;
          margin-left: auto;
          margin-right: auto;
        }

        a {
          color: #80c8f8;

          &:hover {
            text-decoration: underline;
            color: #49b1f5;
          }
        }
      }

      .copy {
        text-align: center;
        color: #b3b3b3;
        padding: 30px 0px 20px;
        margin-top: 20px;
        border-top: 1px dashed #dddddd;
        border-bottom: 1px dashed #dddddd;
        font-size: 14px;

        p {
          margin: 10px 0;

          span {
            font-weight: 700;
            color: #4c4948;
          }
        }

        .tags {
          text-align: left;
          margin-top: 35px;
          float: left;

          i {
            margin-right: 5px;
          }

          span {
            &:hover {
              color: #eea2a4;
            }
          }
        }

        .like {
          float: right;
          margin-top: 10px;
          cursor: pointer;

          &.active {
            color: #eea2a4;
          }

          &:hover {

            a {
              text-decoration: underline;
            }
          }

          i {
            font-size: 40px;
            vertical-align: sub;
            margin-left: 5px;
          }
        }


      }
    }
  }
</style>