<template>
  <div class="aside">
    <div class="about-me">
      <div class="avatar">

      </div>
      <div class="info">
        <p class="name">Kris</p>
        <p>平安喜乐，万事胜意！</p>
      </div>
      <div class="other-link">

      </div>
      <a class="more" href="/about">More</a>
    </div>
    <div class="every-day">
      <span>一言</span>
      <p>{{ content.zh }}</p>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        // 每日一句
        content: {
          zh: ""
        },
      }
    },


    created() {
      // 请求每日一句数据
      axios.get('/api/everyday').then(res => {
        this.content.zh = res.data.data.content;
      }).catch(res => {
        console.log("请求失败", res);
      });
    }
  }
</script>

<style lang="scss">
  .about-me {
    background-color: #ffffff;
    opacity: .8;
    margin-bottom: 20px;
    border-radius: 5px;
    padding: 25px 19px 10px;

    .avatar {
      width: 101px;
      height: 101px;
      overflow: hidden;
      margin: 0 auto;
      background-image: url('../assets/img/avatar.jpg');
      background-position: center;
      background-size: cover;
      border-radius: 50%;
      box-shadow: inset 0px 0px 10px rgba(0, 0, 0, .1),
        0px 0px 10px rgba(255, 255, 255, .8);
      transition: .5s all;
      transform: rotate(20deg);

      &:hover {
        transform: rotate(380deg);
        box-shadow: 0px 0px 15px rgba(0, 0, 0, .9);
      }
    }

    .info {
      text-align: center;
      margin-top: 15px;

      p {
        margin: 10px;
        color: #858585;
        &.name {
          color: #4c4948;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }

    .other-link {

    }

    .more {
      display: block;
      text-align: center;
      padding: 8px 30px;
      background-color: #49b1f5;
      margin-top: 20px;
      color: #eeeeee;
      transition: .3s all;

      &:hover{
        background-color: #ff7242;
      }
    }


  }

  .every-day {
    padding: 19px 19px 10px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 1px 1px 10px #5f5f5f;
    margin-bottom: 20px;
    opacity: 0.8;
    color: #4c4948;

    span {
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: bold;
      color: #80c8f8;
      display: inline-block;

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 4px;
        background: #80c8f8;
        margin-top: 5px;
      }
    }

    p {
      margin-bottom: 10px;
      line-height: 1.5;
      font-size: 14px;
    }
  }
</style>