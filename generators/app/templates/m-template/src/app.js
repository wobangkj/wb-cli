import { ASSET_PREFIX } from '@/services/index';

// 请求中间件 就是发起请求和响应之后需要统一操作数据就写这
// https://github.com/umijs/umi-request#example-1
// const middleware = async (ctx, next) => {
//   console.log('a1');
//   await next();
//   console.log('a2');
// };


export const request = {
  prefix: '', // 统一的请求头
  // middlewares: [middleware],
  errorHandler: (error) => {
    // 集中处理错误
    console.log(error);
  },
};

const titleList = [
  {
    pagePath: '/',
    title: '首页',
  },
  {
    pagePath: '/list',
    title: '列表',
  },
  {
    pagePath: '/settings',
    title: '设置',
  },
];
const navList = [];
const navBar = {
  navList,
  fixed: true,
  onLeftClick: () => {
    // router.goBack();
  },
};
const tabList = [
  {
    pagePath: '/',
    text: '首页',
    iconPath: `${ASSET_PREFIX  }home.png`,
    selectedIconPath: `${ASSET_PREFIX  }home-active.png`,
    title: '首页',
    iconSize: '',
    badge: '',
  },
  {
    pagePath: '/list',
    text: '列表',
    iconPath: `${ASSET_PREFIX  }list.png`,
    selectedIconPath: `${ASSET_PREFIX  }list-active.png`,
    title: '列表',
    iconSize: '',
    badge: '',
  },
  {
    pagePath: '/settings',
    text: '设置',
    iconPath: `${ASSET_PREFIX  }setting.png`,
    selectedIconPath: `${ASSET_PREFIX  }setting-active.png`,
    title: '设置',
    iconSize: '',
    badge: '',
  },
];

const tabBar = {
  color: `#999999`,
  selectedColor: '#00A0FF',
  borderStyle: 'white',
  position: 'bottom',
  list: tabList,
};

export const mobileLayout = {
  documentTitle: '默认标题',
  navBar,
  tabBar,
  titleList,
};
