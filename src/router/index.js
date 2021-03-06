import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/pages/Home';
import PostList from '@/pages/PostList';
import Login from '@/pages/Login';
import Category from '@/pages/Category';
import Laboratory from '@/pages/Laboratory';
import Tag from '@/pages/Tag';
import Edit from '@/pages/Edit';

import System from '@/pages/System';

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        paths: [
          {
            name: '首页',
            link: ''
          }
        ],
        requireAuth: true
      }
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
    {
      path: '/edit',
      name: 'Add',
      component: Edit,
      meta: {
        paths: [
          {
            name: '首页',
            link: '/'
          },
          {
            name: '新增文章',
            link: ''
          }
        ],
        requireAuth: true
      },
      children: [{
        path: ':id',
        name: 'Edit',
        component: Edit,
        meta: {
          paths: [
            {
              name: '首页',
              link: '/'
            },
            {
              name: '编辑文章',
              link: ''
            }
          ],
          requireAuth: true
        }
      }]
    },
    {
      path: '/category',
      name: 'Category',
      component: Category,
      meta: {
        paths: [
          {
            name: '首页',
            link: '/'
          },
          {
            name: '分类管理',
            link: ''
          }
        ],
        requireAuth: true
      }
    },
    {
      path: '/tag',
      name: 'Tag',
      component: Tag,
      meta: {
        paths: [
          {
            name: '首页',
            link: '/'
          },
          {
            name: '标签管理',
            link: ''
          }
        ],
        requireAuth: true
      }
    },
    {
      path: '/laboratory',
      name: 'Laboratory',
      component: Laboratory,
      meta: {
        paths: [
          {
            name: '首页',
            link: '/'
          },
          {
            name: '实验室',
            link: ''
          }
        ],
        requireAuth: true
      }
    },
    {
      path: '/system',
      name: 'System',
      component: System,
      meta: {
        paths: [
          {
            name: '首页',
            link: '/'
          },
          {
            name: '系统配置',
            link: ''
          }
        ],
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = localStorage.getItem('SONG_EAGLE_TOKEN');
    if (token && token !== 'null') {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
