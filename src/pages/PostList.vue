<template>
  <section>
    <header-top></header-top>
    <section class="container-box">
      <!--<section class="post-list right-container">-->
      <back-menu></back-menu>
      <div class="right-box">
        <back-header></back-header>
        <post-table :post-list="postList" @delete-post='changePostTotal'></post-table>
        <pagination :page-size="pageSize"
                    :total="total"
                    :current-page="page"
                    @change-page="changePage">
        </pagination>
      </div>
    </section>
  </section>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import HeaderTop from '../components/HeaderTop';
import Menu from '../components/Menu';
import Header from '../components/Header';
import PostTable from '../components/PostTable';
import Pagination from '../components/Pagination';

export default {
  components: {
    HeaderTop,
    'back-menu': Menu,
    'back-header': Header,
    PostTable,
    Pagination
  },
  data () {
    return {
      postList: [],
      page: 1,
      pageSize: 10,
      total: 0
    };
  },
  created () {
    this.getPostTotalData();
    this.getPostListData();
  },
  methods: {
    ...mapActions([
      "getPostList",
      "getPostTotal"
    ]),
    getPostListData: async function () {
      let params = {
        page: this.page,
        pageSize:this.pageSize
      }
      let res = await this.getPostList(params);
      if (res.success === 1) {
        this.postList = res.posts;
      }
    },
    getPostTotalData: async function () {
      let res = await this.getPostTotal();
      if (res.success === 1) {
        this.total = res.total;
      }
    },
    changePage: function (newPage) {
      this.page = newPage;
      this.getPostListData();
    },
    changePostTotal: function () {
      this.getPostTotalData();
      this.getPostListData();
    }
  }
};
</script>

