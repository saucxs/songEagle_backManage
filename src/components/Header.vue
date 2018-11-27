<template>
  <section class="header">
    <template v-for="(item, index) in $route.meta.paths">
      <router-link class="breadcrumb no-underline" :to="item.link" v-if="item.link !== ''">
        {{ item.name }}
      </router-link>
      <span class="no-link" v-else>{{ item.name }}</span>
      <span class="separator" v-show="index !== $route.meta.paths.length - 1">/</span>
    </template>
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

export default {
  created(){
    console.log(this.$route.meta.paths, '$route.meta.paths')
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
};
</script>


<style lang="scss" scoped>
.header {
  text-align: left;
  top: 0;
  left: 0;
  right: 0;
  height: 4em;
  line-height: 4em;
  padding-left: 1em;
  .no-link {
    color: #97a8be;
    cursor: text;
  }
  .separator {
    margin: 0 0.5em 0 0.3em;
  }
}
</style>

