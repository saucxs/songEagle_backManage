import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
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
    }
  ]
})
