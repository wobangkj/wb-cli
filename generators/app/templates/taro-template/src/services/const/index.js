import Taro from '@tarojs/taro';

// 多倍图
const DPR = Taro.getStorageSync('DPR');

// 弹窗显示的状态码
const BUSINESS_STATUS = {
  404: '服务更新中，请稍后再试',
  400: '系统繁忙',
};

// 隐藏弹窗显示的状态码
const HIDE_BUSINESS_STATUS = [200, 204];

// 允许上传日志状态码
// export const ERROR_STATUS = [222, 500];

const ROOT_PRO_API = 'http://121.41.92.23/'; // 生产地址
const ROOT_API = 'http://121.41.92.23/api/v1/'; // 开发测试地址
// export const ROOT_API = 'https://shop.wobangkj.com/api/v1/'; // 开发测试地址
// export const ROOT_API = 'http://192.168.31.174:8013/'; // 开发测试地址

const HTTP_API = {
  API: `${ROOT_API}base-srv/`,
  QRCODE_PREFIX: `${ROOT_API}base-srv/wx/prcode?url=`,
  UPLOAD_PREFIX: `${ROOT_API}base-srv/file/upload`,
  ASSET_PREFIX: `${ROOT_PRO_API}weapp/images/${DPR}x/`, // 多倍图图标
  GENERAL_PREFIX: `${ROOT_PRO_API}weapp/general/`, // 通用图片 即非多倍图图标
};

const APPID = 'wxecc14c4a19d44725';

export { DPR, BUSINESS_STATUS, HIDE_BUSINESS_STATUS, ROOT_PRO_API, ROOT_API, APPID, HTTP_API };
