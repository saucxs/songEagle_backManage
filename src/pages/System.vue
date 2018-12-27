<template>
  <section class="common-section system">
    <!--<section class="laboratory right-container">-->
    <header-top></header-top>
    <section class="container-box">
      <back-menu></back-menu>
      <div class="right-box">
        <back-header></back-header>
        <div class="system-header">
          <h2><span>系统基础配置</span></h2>
        </div>
        <div class="base-config">
          <p class="form-group">
            <span class="form-label">系统名称：</span>
            <input type="text" class="title form-item" maxlength="90" v-model="systemData.systemName" placeholder="文章标题">
          </p>
          <p><span>系统地址：</span><span>{{systemData.systemUrl}}</span></p>
          <p><span>关键词(keywords)：</span><span>{{systemData.keywords}}</span></p>
          <p><span>描述(description)：</span><span>{{systemData.description}}</span></p>
          <p><span>作者：</span><span>{{systemData.author}}</span></p>
          <p><span>作者笔名：</span><span>{{systemData.nickName}}</span></p>
          <p><span>copyright：</span><span>{{systemData.copyright}}</span></p>
          <p><span>baidu统计：</span><span>{{systemData.baidu_tongji}}</span></p>
          <p><span>baidu推送：</span><span>{{systemData.baidu_tuisong}}</span></p>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import HeaderTop from '../components/HeaderTop';
import Menu from '../components/Menu';
import Header from '../components/Header';
import DBDialog from '../components/DB-Dialog';
import Upload from '../components/Upload';

export default {
  components: {
    HeaderTop,
    'back-menu': Menu,
    'back-header': Header,
    'db-dialog': DBDialog,
    'db-upload': Upload
  },
  data () {
    return {
      systemData: {},
      isShowDialog: false,
      dialogTitle: '',
      imgFile: null,
      laboratory: {},
      newLaboratory: {
        id: 0,
        name: '',
        link: '',
        github: '',
        poster: '',
        description: ''
      }
    };
  },
  created () {
    this.getSystemData();
  },
  methods: {
    ...mapActions([
      'getSystem'
    ]),
    getSystemData: async function () {
      let res = await this.getSystem();
      if (res.success === 1) {
        this.systemData = res.data;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app';
.system {
  .system-header {
    position: relative;
    line-height: 2.8em;
    h2 > span {
      display: inline-block;
      height: 100%;
      border-bottom: 1px solid $base-color;
    }
  }
  & .base-config{
      padding: 10px 20px;
    p{
        margin: 14px 0px;
        font-size: 14px;
      }
  }
}
</style>


