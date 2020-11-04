import Taro from '@tarojs/taro';
import { getToken } from '../services/modules/user';
  
  
  /**
   * 获取用户token
   */
  export const getUserToken = async () => {
    const res = await getToken({
      id: Taro.getStorageSync('user_id'),
    });
    if (res.data.status === 200) {
      Taro.setStorageSync('token', res.data.token);
    }
  };