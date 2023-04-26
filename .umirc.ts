import {defineConfig} from '@umijs/max';

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
            redirect: '/poem',
        },
        {
            name: '琴韵引星河 | 赏诗',
            path: '/poem',
            component: './poem',
        },
        {
            name: '笔墨认知己 | 闲谈',
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
            name: '梦里谁人知 | 关注',
            path: '/follow',
            component: './follow',
        },
        {
            name: '诗意探梅花 | 识字',
            path: '/ocr',
            component: './ocr',
        },
        {
            name: '闲情遥相知 | 个人',
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
            name: '风物总是新 | 设置',
            path: '/setting',
            component: './setting',
        },
    ],
    npmClient: 'pnpm',
    tailwindcss: {},
});
