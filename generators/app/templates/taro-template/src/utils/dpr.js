import Taro from '@tarojs/taro';
const sysinfo = Taro.getSystemInfoSync();
const isIphonex = () => {
    if (typeof window !== 'undefined' && window) {
        return (
            /ios/gi.test(sysinfo.platform) && sysinfo.screenHeight >= 780
        );
    }
    return false;
};
// 最小dpr为2 最大dpr为3
Taro.setStorageSync('DPR', sysinfo.pixelRatio <= 2 ? '2' : '3');
Taro.setStorageSync('statusBarHeight', sysinfo.statusBarHeight);
Taro.setStorageSync('IPHONEX', isIphonex() ? '--IX' : '');
