<template>
  <div class="website">
    <h2>归档</h2>
    <p class="total">
      共&nbsp;<span>{{ total }}</span>&nbsp;篇文章
    </p>
    <div class="article-list">
      <div class="article-year">
        <!-- <div class="year">
          2020
        </div> -->
        <ul>
          <li class="article-item" v-for="article in articleList" :key="article.id">
            <i class="iconfont icon-ux13991947949968002"></i>
            <div class="date">{{ article.createdAt }}</div>
            <div class="title"><a :href="article.link">{{ article.title }}</a></div>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        total: 0,
        articleList: [],
      }
    },

    components: {

    },

    computed: {

    },

    methods: {

    },

    created() {
      axios.get('/api/blog/all').then(res => {
        const data = res.data.data;
        data.data.forEach(item => {
          item.link = '/blog/' + item.id;
        });
        this.articleList = data.data;
        this.total = data.total;
      }).catch(err => {
        console.log(err);
      })
    }
  }
</script>


<style lang="scss" scoped>
  .website {
    width: 960px;
    margin: 0 auto;
    background-color: #ffffff;
    opacity: .8;
    border-radius: 8px;
    padding: 30px;
    box-sizing: border-box;

    h2 {
      text-align: center;
      margin-bottom: 30px;
      color: #1f2d3d;
    }

    p {
      color: #4c4948;
      font-size: 18px;

      span {
        font-size: 20px;

      }
    }

    .article-list {
      margin-top: 40px;
      margin-left: 35px;

      .article-year {

        .year {
          margin-bottom: 20px;
          font-weight: 700;
          font-size: 20px;
          color: #555555;
        }

        ul {
          border-left: 2px solid #80c8f8;

          .article-item {
            font-size: 14px;
            list-style-type: none;
            position: relative;
            margin-bottom: 15px;
            line-height: 1.5;
            padding-left: 35px;

            &::before {
              content: '';
              display: block;
              width: 9px;
              height: 9px;
              border-radius: 50%;
              background: #80c8f8;
              position: absolute;
              top: 0px;
              left: -5px;
            }

            color: #555555;

            i {
              margin-right: 5px;
              vertical-align: 2px;
            }

            .date {
              display: inline-block;
              margin-right: 15px;
              margin-bottom: 5px;
              
            }

            .title {

              a {
                color: #555555;
                font-size: 18px;
                font-weight: 700;
                display: inline-block;
                transition: .5s all;

                &:hover {
                  color: #80c8f8;
                  transform: translateX(15px);
                }
              }
            }
          }
        }
      }
    }
  }
</style>