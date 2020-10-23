import Taro from '@tarojs/taro';

const sysinfo = Taro.getSystemInfoSync();
// 最小dpr为2 最大dpr为3
Taro.setStorageSync('DPR', sysinfo.pixelRatio <= 2 ? '2' : '3');
Taro.setStorageSync('statusBarHeight', sysinfo.statusBarHeight);
Taro.setStorageSync('IPHONEX', sysinfo.model.search('iPhone X') !== -1 ? '--ix' : '');
