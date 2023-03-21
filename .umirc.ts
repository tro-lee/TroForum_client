import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'TroTro的论坛',
  },
  extraPostCSSPlugins: [require('tailwindcss')],
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '主题广场',
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
      name: '个人中心',
      path: '/setting',
      component: './setting',
    },
  ],
  npmClient: 'pnpm',
  tailwindcss: {},
});
