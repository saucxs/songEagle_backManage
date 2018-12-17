<template>
  <header class="header">
    <div class="header-box">
      <div class="inline-block">
        <a class="header-logo">
          {{systemName}}
        </a>
      </div>
      <div class="inline-block">
        <span class="sign-out" title="退出登录" @click="signOutAction">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-signout"></use>
          </svg>
        </span>
        <!--<div class="header-user-name">user</div>-->
      </div>
    </div>
  </header>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'Header',
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters([
        "systemName"
      ])
    },
    methods: {
      ...mapActions([
        "signOut"
      ]),
      signOutAction: function () {
        this.$msgBox.showMsgBox({
          title: '退出登录',
          content: '确认退出系统？'
        }).then(async () => {
          let res = await this.signOut();
          if (res.success === 1) {
            localStorage.removeItem('SONG_EAGLE_TOKEN');
            this.$router.push({ path: '/login' });
          } else {
            this.$message.showMessage({
              type: 'error',
              content: res.message
            });
          }
        }).catch(() => {
          return false;
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
.header {
    color: #fff;
    font-size: 16px;
    background: #3a79ff;
    height: 46px;
    line-height: 46px;
    font-weight: 700;
   .header-box{
    width: 1360px;
    margin: 0 auto;
    background: #3a79ff;
    display: flex;
     .header-logo{
       font-family: PingFangSC-Regular;
       font-size: 20px;
       margin: 0;
       cursor: pointer;
    }
     .header-logo:hover{
       color: #fff;
     }
  }
  .header-user-name {
    cursor: pointer;
    color: #fff;
  }
  .sign-out {
    cursor: pointer;
    .icon {
      margin-top: 0.5em;
      width: 2em;
      height: 2em;
      color: #fa5555;
    }
  }

  }
</style>
