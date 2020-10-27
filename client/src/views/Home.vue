<template>
  <div class="main">
    <div class="avatar">
    </div>
    <div class="contact">
      <p class="info">欢迎来到刘浩男的个人主页</p>
      <p class="info">你是我一生中只会遇见一次的惊喜！</p>
      <div class="icon">
        <a href="https://github.com/krisLiu-home"><i class="iconfont icon-github"></i></a>
        <a>
          <i class="iconfont icon-weixin"></i>
          <div class="chat-info">
            <img src="../assets/img/qrcode.jpg" alt="CJhaonan666">
          </div>
        </a>
        <a href="https://www.yuque.com/kris"><i class="iconfont icon-yuquemianlogo"></i></a>
        <a href="https://space.bilibili.com/384143676"><i class="iconfont icon-bilibili"></i></a>
        <a href="https://music.163.com/#/user/home?id=1384254477"><i class="iconfont icon-wangyiyunyinle"></i></a>
        <a href="mailto:cjhaonan@163.com"><i class="iconfont icon-jinlingyingcaiwangtubiao31"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  .main {
    margin: 0 auto;
    padding-bottom: 130px;

    .avatar {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      margin: 0 auto;
      overflow: hidden;
      background-image: url('../assets/img/avatar.jpg');
      background-position: center;
      background-size: cover;
      box-shadow: inset 0 0 10px #000,
        0 0 10px rgba(255, 255, 255, 0.8),
        0 0 15px rgba(255, 255, 255, 0.8),
        0 0 20px rgba(255, 255, 255, 0.8);
      transition: all .8s;
      transform: rotate(20deg);

      &:hover {
        transform: rotate(380deg);
      }
    }

    .contact {
      width: 490px;
      padding: 20px;
      margin: 20px auto 0;
      text-align: center;
      background-color: rgba(0, 0, 0, .5);
      border-radius: 10px;
      color: #eeeeee;
      font-weight: 600;

      .info {
        margin-bottom: 20px;
      }

      .icon a {
        display: inline-block;
        position: relative;

        i {
          font-size: 28px;
          font-weight: 100;
          display: inline-block;
          margin: 0 10px;

          &.icon-github {
            color: #000;
          }

          &.icon-weixin {
            color: #02BB29;
          }

          &.icon-bilibili {
            color: #FFD5E5;
          }

          &.icon-yuquemianlogo {
            color: #2CC35A;
          }

          &.icon-wangyiyunyinle {
            color: #E72D2C;
          }

          &.icon-jinlingyingcaiwangtubiao31 {
            color: #FFBF00;
          }
        }

        .chat-info {
          position: absolute;
          opacity: 0;
          padding: 10px;
          top: 67px;
          left: -40px;
          background-color: rgba(0, 0, 0, .4);
          border-radius: 10px;
          transition: all .3s;
          img {
            width: 101px;
            height: 101px;
          }

          &::after {
            content: '';
            display: block;
            width: 0;
            height: 0;
            border-width: 15px;
            border-style: solid;
            border-color: transparent transparent rgba(0, 0, 0, .4) transparent;
            position: absolute;
            top: -30px;
            left: 46px;
          }
        }

        &:hover .chat-info{
          opacity: 1;
        }
      }
    }
  }
</style>