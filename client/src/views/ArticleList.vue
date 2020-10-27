<template>
  <div class="article-list">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="content-left">
          <article class="article">
            <section class="section" v-for="article in articleList" :key="article.id">
              <div class="title">
                <h3>
                  <a :href="article.link">{{ article.title }}</a>
                </h3>
              </div>
              <div class="info">
                <i class="iconfont icon-rili"></i>
                <span class="article-publish">
                  {{ article.publishDate }}&nbsp;|&nbsp;
                </span>
                <i class="iconfont icon-biaoqian"></i>
                <span class="tags">
                  {{ article.tags }}&nbsp;|&nbsp;
                </span>
                <i class="iconfont icon-liulan1"></i>
                <span class="views">
                  {{ article.views }}
                </span>
              </div>
              <div class="article-content">
                {{ article.content }}
              </div>

            </section>

            <div class="turn-page">
              <ul>
                <li @click="changePage(pageNum, index)" v-for="(pageNum, index) in renderPage()"
                  :class="{active: pageNum === nowPage}" :key="pageNum">
                  {{ pageNum }}
                </li>
              </ul>
            </div>
          </article>

        </div>
      </el-col>
      <el-col :span="8">
        <Aside />
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import Aside from '@/components/aside.vue'
  export default {
    data() {
      return {

        articleList: [], // 文章
        nowPage: 1, //当前页
        count: null, // 总数
        pageSize: 5, // 页容量
        allPage: 10, // 总页数
      }

    },
    components: {
      Aside,
    },

    methods: {
      // 点击切换页数
      changePage(pageNum, index) {
        if (pageNum === '下一页' && this.nowPage < this.allPage) {
          this.nowPage++;
          this.getPage(this.nowPage, this.pageSize);
        } else if (pageNum === '上一页' && this.nowPage > 1) {
          this.nowPage--;
          this.getPage(this.nowPage, this.pageSize);
        } else if (typeof pageNum === 'number') {
          this.nowPage = pageNum;
          this.getPage(this.nowPage, this.pageSize);
        }
      },

      // 渲染翻页插件
      renderPage() {
        const result = [];
        const nowPage = this.nowPage;
        const allPage = this.allPage;
        const pageSize = this.pageSize;

        result.push('上一页');
        result.push(1);

        for (let i = nowPage - 2; i <= nowPage + 2; i++) {
          if (i > 1 && i < allPage) {
            result.push(i);
          }
        }

        if (allPage > 1) {
          result.push(allPage);
        }
        result.push('下一页');
        return result;
      },



      // 获取文章数据
      getPage(page, pageSize) {
        axios.get('/api/blog', {
          params: {
            page: page,
            limit: pageSize,
          }
        }).then(res => {
          const data = res.data.data;
          this.count = data.total;
          this.allPage = Math.ceil(this.count / this.pageSize);
          this.articleList = data.data.map(article => {
            const date = new Date(article.createdAt);
            const reg = /,/g
            const tags = article.tags.replace(reg, " ");

            let content = article.content;
            const regTag = /<[a-zA-Z1-9]+.*?>|<\/[a-zA-Z0-9]*?>/g;
            const regSpace = /&nbsp;/g
            content = content.replace(regTag, "").replace(regSpace, "").substr(0, 100);
            if (content.length >= 100) {
              content += '...';
            }

            return {
              id: article.id,
              title: article.title,
              content,
              publishDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
              tags,
              views: article.views,
              link: `/blog/${article.id}`,
            }
          });
        }).catch(err => {
          console.log("请求失败", err);
        });
      }




    },
    created() {
      this.getPage(this.nowPage, this.pageSize);
    }
  }
</script>

<style lang="scss">
  .section {
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 8px;
    margin-bottom: 30px;
    padding: 60px 40px 45px;
    opacity: 0.8;
    color: #3b4351;

    .title {
      margin-bottom: 20px;
      font-size: 24px;

      a {
        color: #1f2d3d;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 680px;
        display: inline-block;
      }
    }

    .info {
      margin-bottom: 10px;
      font-size: 13px;
      color: #858585;

      .icon-liulan1:before {
        font-size: 12px;
      }

    }

    .article-content {
      color: #4c4948;
      padding: 10px;
      height: 4em;
    }

  }

  .turn-page ul {
    display: flex;
    justify-content: center;
    margin: 20px 0;

    li {
      padding: 10px;
      box-shadow: 0px 4px 8px 6px rgba(7, 17, 27, .06);
      margin: 0 10px;
      background-color: #ffffff;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 550;
      list-style-type: none;

      &.active {
        color: #337ab7;
      }

      &:hover {
        color: #337ab7;
      }
    }
  }
</style>