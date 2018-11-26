<template>
  <header class="header">
    <div class="header-box">
      <div class="inline-block">
        <a class="header-logo">
          {{systemName}}
        </a>
      </div>
      <div class="inline-block">
        <span class="sign-out" title="退出登录" @click="signOut">
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
        dialogTitle: '',
        loadingFlag: false,
        changePawwordVisiable: false,
        changePasswordForm: {
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        }
      }
    },
    // beforeRouteEnter: (to, from, next) => {
    //   next(vm => {
    //     vm.getUserInfo();
    //   });
    // },
    computed: {
      ...mapGetters([
        "systemName"
      ])
    },
    methods: {
      ...mapActions([

      ]),
      signOut() {
        this.logout().then(res => {
          if(res.errno == 0){
            this.$router.push({ path: '/weekly/login' });
            this.$store.commit("USER_INFO", {});
          }else{
            this.$message.error(res.errmsg|| '服务器开小差');
          }
        })
      },
      changPassword() {
        this.changePawwordVisiable = true;
        this.dialogTitle = '修改密码'
      },
      handleClose(){
        this.clearAll();
        this.changePawwordVisiable = false;
      },
      clearAll(){
        this.changePasswordForm.oldPassword = '';
        this.changePasswordForm.newPassword = '';
        this.changePasswordForm.confirmNewPassword = '';
      },
      confirmChangePassword() {
        if(!this.changePasswordForm.oldPassword){
          this.$message.warning( '请输入原密码');
        }else if(!this.changePasswordForm.newPassword){
          this.$message.warning( '请输入新密码');
        }else if(!this.changePasswordForm.confirmNewPassword){
          this.$message.warning( '请输入确认新密码');
        }else{
          if (this.changePasswordForm.newPassword != this.changePasswordForm.confirmNewPassword) {
            this.$message.warning( '新密码和确认密码不一致');
          } else {
            var passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
            if (passwordReg.test(this.changePasswordForm.newPassword)) {
              let params = {
                usernum: this.userInfo.usernum,
                oldpassword: this.changePasswordForm.oldPassword,
                newpassword: this.changePasswordForm.newPassword
              }
              this.loadingFlag = true;
              this.changePassword(params).then(res => {
                if (res.errno === 0) {
                  this.clearAll();
                  this.changePawwordVisiable = false;
                  this.$message.success( '密码修改成功');
                } else {
                  this.$message.error(res.errmsg);
                }
                this.loadingFlag = false;
              }).catch()
            } else {
              this.$message.warning('密码需满足至少6-16位,必须含有数字和字母');
            }
          }
        }
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
    /*background: #3a79ff;*/
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
    position: absolute;
    top: 0;
    right: 2em;
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
