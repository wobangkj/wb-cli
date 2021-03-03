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
  dynamicImport: {
    loading: '@/components/Loading/index',
  },
  publicPath: './', // 部署非根目录
  copy: ['config/dev.conf'],
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    // echarts: 'window.echarts',
    // 'ali-oss': 'window.OSS',
    moment: 'window.moment',
    antd: 'antd',
  },
  // 区分 development 和 production，使用不同的产物
  scripts:
    process.env.NODE_ENV === 'development'
      ? [
        'https://gw.alipayobjects.com/os/lib/react/16.12.0/umd/react.development.js',
        'https://gw.alipayobjects.com/os/lib/react-dom/16.12.0/umd/react-dom.development.js',
      ]
      : [
        'https://gw.alipayobjects.com/os/lib/react/16.12.0/umd/react.production.min.js',
        'https://gw.alipayobjects.com/os/lib/react-dom/16.12.0/umd/react-dom.production.min.js',
      ],
  title: "<%= title %>",
  hash: true,
  proxy: proxy['dev'],
  history: { type: 'hash' },
});
