import { defineConfig } from 'umi';
import proxy from './config/proxy';
export default defineConfig({
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          redirect: '/index',
        },
        { exact: true, path: '/index', component: 'index' },
        { exact: true, path: '/user', component: 'user/index' },
        {
          component: '404',
        },
      ],
    },
  ],
  favicon: '/images/favicon.png',
  title: 'pc-template',
  hash: true,
  proxy: proxy['dev'],
  history: { type: 'hash' },
});
