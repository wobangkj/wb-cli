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
  pwa: {
    manifest: {
      name: 'm-template',
      short_name: 'm-template',
      start_url: '.',
      display: 'standalone',
      theme_color: '#fff',
      background_color: '#fff',
      description: 'm-template',
      icons: [
        {
          src: 'https://placekitten.com/g/144/144',
          sizes: '144x144',
          type: 'image/png',
        },
      ],
      related_applications: [
        {
          platform: 'web',
          url: 'https://demo.com',
        },
        {
          platform: 'itunes',
          url: 'https://demo.com',
        },
        {
          platform: 'play',
          url: 'https://demo.com',
        },
      ],
    },
    hash: true,
  },
  plugins: ['umijs-plugin-vconsole', 'umijs-plugin-pwa'],
};
