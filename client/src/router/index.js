import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import WebSite from '../views/WebSite.vue'
import PersonalResume from '../views/PersonalResume.vue'
import defaultPage from '../layout/default.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import BlogList from '../components/adminPage/blogList.vue'
import CommentList from '../components/adminPage/commentList.vue'
import EditorBlog from '../components/adminPage/editorBlog.vue'
import EditorEveryDay from '../components/adminPage/editorEveryday.vue'
import EveryDayList from '../components/adminPage/everydayList.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: defaultPage,
  children: [{
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/website',
      name: 'WebSite',
      component: WebSite
    },
    {
      path: '/articlelist',
      name: 'ArticleList',
      component: () => import( /* webpackChunkName: "articlelist" */ '../views/ArticleList.vue'),
    },
    {
      path: '/personalresume',
      name: 'PersonalResume',
      component: PersonalResume
    },
    {
      path: '/life',
      name: 'Life',
      component: () => import('../views/Life.vue'),
    },
    {
      path: '/blog/:id',
      name: 'Blog',
      component: () => import('../views/Detail.vue'),
    },
  ]
}, {
  path: '/login',
  name: 'Login',
  component: Login,
}, {
  path: '/admin',
  name: 'Admin',
  component: Admin,

  beforeEnter: async(to, from, next) => {
    await store.dispatch('loginUser/whoAmI');

    if (store.state.loginUser.data) {
      next();
    } else {
      next('/login');
    }
  },

  children: [{
      path: '/admin/bloglist',
      name: 'BlogList',
      component: BlogList,
    },
    {
      path: '/admin/commentlist',
      name: 'CommentList',
      component: CommentList
    },
    {
      path: '/admin/editorblog',
      name: 'EditorBlog',
      component: EditorBlog
    },
    {
      path: '/admin/editoreveryday',
      name: 'EditorEveryDay',
      component: EditorEveryDay
    },
    {
      path: '/admin/everydaylist',
      name: 'EveryDayList',
      component: EveryDayList
    }
  ]
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router