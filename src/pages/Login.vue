<template>
  <section class="login">
    <header class="login-header">
      <div class="box-wrapper">
        <h1>{{systemName}}</h1>
      </div>
    </header>
    <div class="login-section">
      <div class="login-form">
        <h2>{{systemName}}</h2>
        <div class="form-group">
          <input type="text" class="username" v-model="userName"  placeholder="用户名">
        </div>
        <div class="form-group">
          <input type="password" class="passowrd" v-model="password"  @keyup.enter="login" placeholder="密码">
        </div>
        <div class="form-group">
          <button class="btnLogin" ref="login" @click="submit">登陆</button>
        </div>
        <p class="error">{{ errMsg }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data () {
    return {
      userName: '',
      password: '',
      errMsg: ''
    };
  },
  computed: {
    ...mapGetters([
      'systemName'
    ])
  },
  methods: {
    ...mapActions([
      "login"
    ]),
    submit: async function () {
      if (this.userName === '') {
        this.errMsg = '用户名不能为空';
        return false;
      }
      if (this.password === '') {
        this.errMsg = '密码不能为空';
        return false;
      }
      let params = {
        userName: this.userName,
        password: this.password
      }
      let res = await this.login(params);
      if (res.success === 1) {
        this.errMsg = '';
        localStorage.setItem('SONG_EAGLE_TOKEN', res.token);
        this.$router.push({ path: '/postlist' });
      } else {
        this.errMsg = res.message;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app';
.login {
  position: relative;
  min-height: 100%;
  .login-header {
    min-width: 1200px;
    background: #efefef;
    .box-wrapper{
      width: 1190px;
      height: 90px;
      line-height: 90px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      h1{
        list-style-type: none;
        font-family: PingFangSC-Regular;
        color: #5579ee;
        font-size: 26px;
        margin: 0;
        letter-spacing: 6px;
      }
    }
  }
  .login-section {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 1200px;
    height: 600px;
    background: #00000e url("../assets/image/bg.jpg") no-repeat center 0;
  }
  h2 {
    font-size: 2.5em;
    color: #fff;
    text-align: center;
    margin-bottom: 1em;
  }
  .login-form {
    width: 36em;
    padding: 3em;
    z-index: 101;
    background: rgba(77, 77, 77, 0.6);
    border: 1px solid rgba(77, 77, 77, 0.6);
    border-radius: 0.2em;
    transform: translateX(-50%);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

  }
  .form-group {
    margin-bottom: 1.5em;
    input, button {
      width: 100%;
      font-size: 1em;
      line-height: 2;
      margin: 0;
      padding: 0.6em 1em;
      border: 1px solid #ddd;
      border-radius: 4em;
      box-sizing: border-box;

      &:focus {
        border-color: $base-color;
      }
    }
    .btnLogin {
      color: #fff;
      cursor: pointer;
      border-color: $base-color;
      background-color: $base-color;
    }
  }
  .error {
    position: absolute;
    left: 50%;
    bottom: 1em;
    transform: translateX(-50%);
    font-size: 1em;
    color: red;
    text-align: center;
  }
}
</style>


