import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '作诗小论坛',
  },
  extraPostCSSPlugins: [require('tailwindcss')],
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '赏诗',
      path: '/home',
      component: './home',
    },
    {
      name: '注册',
      path: '/register',
      component: './login/Register',
      layout: false,
    },
    {
      name: '登录',
      path: '/login',
      component: './login',
      layout: false,
    },
    {
      name: '帖子页',
      path: '/post/:postId',
      component: './post',
      hideInMenu: true,
    },
    {
      name: '关注',
      path: '/follow',
      component: './follow',
    },
    {
      name: '个人',
      path: '/person',
      component: './person',
    },
    {
      name: '个人信息',
      path: '/person/:userId',
      component: './person/Person',
      hideInMenu: true,
    },
    {
      name: '设置',
      path: '/setting',
      component: './setting',
    },
  ],
  npmClient: 'pnpm',
  tailwindcss: {},
});
