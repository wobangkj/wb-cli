import Taro from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';
import Component from '@/common/component';
import Menu from '@/components/Menu';
import { HTTP_API } from '@/services/const';
import LoginModal from '@/components/LoginModal';
import { clientInfo } from '@/services/modules/user';
import '@/sass/pages/login.scss';

const SERVICE = [
  {
    icon: 'address-administration.png',
    title: '地址管理',
    status: 0,
  },
  {
    icon: 'custom-service.png',
    title: '我的客服',
    status: 1,
  },
  {
    icon: 'coupon.png',
    title: '优惠券',
    status: 2,
  },
  {
    icon: 'header.png',
    title: '团长中心',
    status: 3,
  },
];
export default class Index extends Component {
  config = {
    navigationBarTitleText: '我的',
    navigationBarBackgroundColor: '#FF8839',
    navigationBarTextStyle: 'white',
  };

  state = {
    isAuth: false,
    nav: [
      {
        icon: 'pending-payment.png',
        title: '待付款',
        status: 0,
        num: 0,
      },
      {
        icon: 'delivered.png',
        title: '待发货',
        status: 1,
        num: 0,
      },
      {
        icon: 'received.png',
        title: '待收货',
        status: 2,
        num: 0,
      },
      {
        icon: 'pending-evaluation.png',
        title: '待评价',
        status: 3,
        num: 0,
      },
      {
        icon: 'sale-refund.png',
        title: '售后/退款',
        status: 5,
        num: 0,
      },
    ],
    userDetail: {},
  };

  /**
   * 获取用户数据
   */
  async getSysInfo() {
    const res = await clientInfo({
      id: Taro.getStorageSync('user_id'),
    });
    if (res.data.status === 200) {
      const { nav } = this.state;
      const userDetail = res.data.data;

      Taro.setStorageSync('username', userDetail.name);

      userDetail.status.forEach(item => {
        nav.forEach(element => {
          if (item.status === element.status) {
            element.num = item.num;
          }
        });
      });
      this.setState({
        userDetail,
        nav,
      });
    }
  }

  componentDidShow() {
    if (Taro.getStorageSync('user_id')) {
      this.getSysInfo();
    }
  }

  /**
   * 订单跳转
   *
   * @param {number} status
   * @memberof Index
   */
  handleNav(status) {
    if (this.handleAuthModal()) return;
    Taro.navigateTo({
      url: `./order?status=${status}`,
    });
  }

  /**
   * 取消授权弹窗
   * @param {*} isAuth
   * @returns isAuth 有无授权
   */
  handleAuthModal(isAuth = true) {
    if (Taro.getStorageSync('user_id')) {
      isAuth = false;
    }
    this.setState({
      isAuth,
    });
    return isAuth;
  }

  /**
   * 服务管理
   *
   * @param {number} status
   * @memberof Index
   */
  handleService(status) {
    const { userDetail } = this.state;
    if (this.handleAuthModal()) return;

    switch (status) {
      case 0:
        // 地址管理
        Taro.chooseAddress();
        break;
      case 2:
        // 优惠券管理
        Taro.navigateTo({
          url: './coupon',
        });
        break;
      case 3:
        // 团长
        Taro.navigateTo({
          url: `/pages/captain/index?id=${userDetail.dis_id}`,
        });
        break;
      case 4:
        // 设置
        Taro.navigateTo({
          url: `./setting?id=${userDetail.id}`,
        });
        break;
      default:
        break;
    }
  }

  render() {
    const { userDetail, nav, isAuth } = this.state;
    return (
      <View className="wrapper">
        {isAuth ? (
          <LoginModal
            authModal={data => this.handleAuthModal(data)}
            callback={() => this.getSysInfo()}
          />
        ) : null}
        <Image className="bg" src={`${HTTP_API.ASSET_PREFIX}user-center-bg.png`} />
        <View className="user">
          <View className="user__detail">
            <View className="user__info" onClick={this.handleAuthModal}>
              <Image
                className="user__head"
                src={
                  userDetail.head_img ? userDetail.head_img : `${HTTP_API.ASSET_PREFIX}avatar.png`
                }
              />
              {userDetail.name ? <View>{userDetail.name}</View> : '点击头像授权'}
            </View>
            <Image
              className="user__setting"
              onClick={this.handleService.bind(this, 4)}
              src={`${HTTP_API.ASSET_PREFIX}setting.png`}
            />
          </View>
          <View className="nav">
            <View className="nav__title">我的订单</View>
            <View className="nav__box">
              {nav.map(item => (
                <View
                  onClick={this.handleNav.bind(this, item.status)}
                  key={item.title}
                  className="nav__item"
                >
                  {item.num > 0 && <View className="nav__number">{item.num}</View>}
                  <Image className="nav__pic" src={HTTP_API.ASSET_PREFIX + item.icon} />
                  {item.title}
                </View>
              ))}
            </View>
          </View>
          <View className="nav">
            <View className="nav__title">互动与服务</View>
            <View className="nav__box nav__box--service">
              <View
                onClick={this.handleService.bind(this, 0)}
                className="nav__item nav__item--no-flex"
              >
                <Image className="nav__pic" src={HTTP_API.ASSET_PREFIX + SERVICE[0].icon} />
                {SERVICE[0].title}
              </View>
              <View className="nav__item nav__item--no-flex">
                <Button openType="contact" className="nav__contact">
                  按钮
                </Button>
                <Image className="nav__pic" src={HTTP_API.ASSET_PREFIX + SERVICE[1].icon} />
                {SERVICE[1].title}
              </View>
              <View
                onClick={this.handleService.bind(this, 2)}
                className="nav__item nav__item--no-flex"
              >
                <Image className="nav__pic" src={HTTP_API.ASSET_PREFIX + SERVICE[2].icon} />
                {SERVICE[2].title}
              </View>
            </View>
          </View>
        </View>
        <Menu idx={1} />
      </View>
    );
  }
}
