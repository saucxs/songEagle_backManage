<template>
  <section>
    <header-top></header-top>
    <section class="container-box">
      <back-menu></back-menu>
      <div class="right-box">
        <back-header></back-header>
        <div>首页计划做一些图表</div>
      </div>
    </section>
  </section>
</template>

<script>
import HeaderTop from '../components/HeaderTop';
import Menu from '../components/Menu';
import Header from '../components/Header';

export default {
  components: {
    HeaderTop,
    'back-menu': Menu,
    'back-header': Header
  }
};
</script>

