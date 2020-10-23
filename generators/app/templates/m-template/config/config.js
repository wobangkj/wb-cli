export default {
  // base: '/test/',
  publicPath: './',
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
