import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View, Image } from '@tarojs/components';
import { HTTP_API } from '../services/const';
import '../sass/components/menu.scss';

const ix = Taro.getStorageSync('IPHONEX');

const MENU_LIST = [
  {
    name: '业务模板', // 菜单名称
    icon: 'home.png', // 菜单默认图标
    iconChoose: 'home-active.png', // 菜单激活图标
    url: '/pages/index', // 跳转路径
  },
  {
    name: '我的',
    icon: 'user-center.png',
    iconChoose: 'user-center-active.png',
    url: '/pages/login',
  },
];

export default class Menu extends Component {
  /**
   * 页面跳转
   *
   * @param {string} url
   * @memberof MyTab
   */
  handleNav(url) {
    Taro.reLaunch({
      url,
    });
  }

  render() {
    const { idx } = this.props;

    return (
      <View className={`menu menu${ix}`}>
        <View className={`menu__body menu__body${ix}`}>
          {MENU_LIST.map((item, index) => (
            <View
              className="menu__nav"
              data-id={index}
              key={item.url}
              onClick={this.handleNav.bind(this, item.url)}
            >
              <Image
                className="menu__icon"
                src={HTTP_API.ASSET_PREFIX + (idx === index ? item.iconChoose : item.icon)}
              />
              <View className={idx === index ? 'menu__nav--choose' : ''}>{item.name}</View>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

Menu.propTypes = {
  idx: PropTypes.number.isRequired,
};
