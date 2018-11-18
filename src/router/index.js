import Vue from 'vue'
import Router from 'vue-router'
import PostList from '@/pages/PostList';
import Login from '@/pages/Login';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login,
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/postlist',
      name: 'PostList',
      component: PostList,
      meta: {
        paths: [
          {
            name: '首页',
            link: '/'
          },
          {
            name: '文章列表',
            link: ''
          }
        ],
        requireAuth: true
      }
    },
  ]
})
