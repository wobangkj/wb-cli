import Taro, { Component } from '@tarojs/taro';
import dayjs from 'dayjs';
import { getUserToken } from '@/utils/token';
import './utils/dpr'; // 多倍图
import Index from './pages/index';
import './sass/app.scss';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: [
      'pages/index',
      'pages/templates/water-fall',
      'pages/templates/form',
      'pages/templates/list',
      'pages/login',
    ],
    // 分包机制 需要使用时取消注释并建立相应文件夹即可
    // subPackages: [
    //   {
    //     root: "subPackages/day-sign",
    //     pages: ["pages/index", "pages/edit"]
    //   }
    // ],
    // 访问某一个页面路径下载分包配置
    // preloadRule: {
    //   "pages/index": {
    //     network: "all",
    //     packages: ["subPackages/day-sign"]
    //   }
    // },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
  };

  componentDidShow() {
    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate(res => {
      // 请求完新版本信息的回调
      console.info('版本更新信息', res.hasUpdate);
    });
    updateManager.onUpdateReady(() => {
      updateManager.applyUpdate();
    });
    updateManager.onUpdateFailed(() => {
      console.error('版本下载失败');
      // 新的版本下载失败
    });

    // token 过期时间 默认24小过期 为避免误差token设置22有效值
    if (
      !dayjs(Taro.getStorageSync('TOKEN_EXPIRED')).isValid() ||
      dayjs(Taro.getStorageSync('TOKEN_EXPIRED')).isBefore(dayjs(), 'd')
    ) {
      console.info('TOKEN已过期');
      Taro.setStorageSync('TOKEN_EXPIRED', dayjs().add(2, 'h'));
      getUserToken();
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById('app'));
