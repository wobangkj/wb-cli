import Taro from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View, Button } from '@tarojs/components';
import { loginWx, creatClient } from '../services/modules/user';
import { APPID } from '../services/const';

import '../sass/components/login-modal.scss';

export default class Index extends Taro.Component {
  // static defaultProps = {
  //   isAuth: false,
  //   callback: () => {},
  // };

  /**
   * 小程序登录 发送 res.code 到后台换取 openId, sessionKey, unionId
   */
  handleGetUserInfo = async () => {
    const { callback, authModal } = this.props;

    let res = await Taro.login();
    const auth = await loginWx({
      appid: APPID,
      code: res.code,
    });

    const userId = auth.data.id;
    const adminId = auth.data.admin_id;
    const openId = auth.data.data.openid;
    Taro.setStorageSync('user_id', userId);
    Taro.setStorageSync('admin_id', adminId);
    Taro.setStorageSync('token', auth.data.token);
    Taro.setStorageSync('openid', openId);

    res = await Taro.getUserInfo();

    if (userId === 0) {
      // 新用户
      Taro.setStorageSync('head_img', res.userInfo.avatarUrl);
      Taro.setStorageSync('username', res.userInfo.nickName);
      const result = await creatClient({
        admin_id: adminId,
        name: res.userInfo.nickName,
        openid: openId,
        head_img: res.userInfo.avatarUrl,
      });
      if (result.data.status === 201) {
        Taro.setStorageSync('user_id', result.data.id);
        Taro.showToast({
          title: '授权成功',
        });
        // eslint-disable-next-line no-unused-expressions
        callback && callback();
        // eslint-disable-next-line no-unused-expressions
        authModal && authModal(false);
      }
    } else {
      // 老用户
      // eslint-disable-next-line no-unused-expressions
      callback && callback();
      // eslint-disable-next-line no-unused-expressions
      authModal && authModal(false);
    }
  };

  /**
   * 取消弹窗
   */
  handleModal() {
    const { authModal } = this.props;
    // eslint-disable-next-line no-unused-expressions
    authModal && authModal(false);
  }

  render() {
    return (
      <View className="wrapper">
        <View className="modal">
          <View className="modal__body">
            <View className="modal__title">微信授权登录</View>
            <View className="modal__cont">
              <View>为了给您提供更优质的服务</View>
              <View>需要您提供微信基本信息授权</View>
            </View>
            <View className="modal__opera">
              <View onClick={this.handleModal} className="modal__btn">
                不同意
              </View>
              <Button
                onGetUserInfo={this.handleGetUserInfo}
                openType="getUserInfo"
                className="modal__btn modal__btn--active"
              >
                同意
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

Index.propTypes = {
  isAuth: PropTypes.boolean,
  callback: () => {},
};
