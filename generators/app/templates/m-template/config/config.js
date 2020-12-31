export default {
  // base: '/test/',
  publicPath: './', // 部署非根目录
  copy: ['config/dev.conf'],
  appType: 'h5',
  mobileLayout: true,
  proxy: {
    '/webapi': {
      target: 'https://demo.com/webapi/',
      changeOrigin: true,
      pathRewrite: { '^/webapi': '' },
    },
  },
  dynamicImport: {
    // @ 默认指到 src 目录
    loading: '@/components/Loading/index',
  },
  vconsole: {
    onReady: true,
  },
  plugins: ['umijs-plugin-vconsole'],
};
