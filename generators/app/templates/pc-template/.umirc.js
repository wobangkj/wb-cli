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
        'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.development.js',
        'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.development.js',
        // 'https://cdn.staticfile.org/echarts/4.0.4/echarts.js',
        // 'https://cdn.staticfile.org/ali-oss/6.10.0/aliyun-oss-sdk.js',
        'https://cdn.staticfile.org/moment.js/2.29.1/moment.js',
        'https://cdn.staticfile.org/antd/4.8.0/antd.js',
      ]
      : [
        'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.production.min.js',
        'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.production.min.js',
        // 'https://cdn.staticfile.org/echarts/4.0.4/echarts.min.js',
        // 'https://cdn.staticfile.org/ali-oss/6.10.0/aliyun-oss-sdk.min.js',
        'https://cdn.staticfile.org/moment.js/2.29.1/moment.min.js',
        'https://cdn.staticfile.org/antd/4.8.0/antd.min.js',
      ],
  title: "<%= title %>",
  hash: true,
  proxy: proxy['dev'],
  history: { type: 'hash' },
});
