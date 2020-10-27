<template>
  <div class="login_in">
    <h1>登录</h1>
    <div class="post user_login">
      <label for="phone">账号：</label>
      <input v-model="loginId" type="text" id="phone" placeholder="请输入管理员账号">
    </div>
    <div class="post user_pass">
      <label for="pwd">密码：</label>
      <input v-model="loginPwd" type="password" id="pwd" placeholder="请输入密码">
    </div>
    <div class="post login">
      <button id="btn" @click="login" @keyup.enter="login">登录</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginId: "",
        loginPwd: "",
      }
    },

    methods: {
      async login() {
        

        if (this.loginId && this.loginPwd) {

          // axios.post('/api/admin/login', {
          //   method: 'POST',
          //   data: {
          //     loginId: this.loginId,
          //     loginPwd: this.loginPwd,
          //   }
          // }).then(res => {
          //   if (res.status === 200) {
          //     const data = res.data.data;
          //     if (!data) {
          //       alert('用户名或密码错误');
          //       return;
          //     }

          //     this.$router.push('')
          //   }
          // }).catch(err => {
          //   console.log(err);
          // })

          await this.$store.dispatch('loginUser/login', {
            loginId: this.loginId,
            loginPwd: this.loginPwd,
          });


          if (this.$store.state.loginUser.data) {
            this.$router.push('/admin');
          } else {
            alert('账号或密码错误');
          }

        } else {
          alert('请输入账号或密码');
        }

      }
    }
  }
</script>

<style scoped lang="scss">
  .login_in {
    width: 300px;
    height: 300px;
    background-color: #ffffff;
    opacity: .8;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #4c4948;

    h1 {
      text-align: center;
      margin-bottom: 40px;
      color: #80c8f8;
    }

    .post {
      text-align: center;

      input {
        width: 180px;
        height: 40px;
        padding: 0px 10px;
        border-radius: 5px;
        outline-color: #80c8f8;
        border: 1px solid #80c8f8;
        margin-bottom: 30px;

      }

      button {
        padding: 8px 40px;
        background-color: #ffffff;
        color: #80c8f8;
        border: none;
        outline-color: #80c8f8;
        border: 1px solid #80c8f8;
        border-radius: 5px;


        &:hover {
          background-color: #80c8f8;
          color: #ffffff;
        }

      }


    }

  }
</style>