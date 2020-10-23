/**
 * 本页面为模板文件 实际开发时直接复制本页面内容新建文件即可
 * 可删除多余注释
 *
 *
 * 第三方插件引入请遵循以下规范：
 * 首先引入第三方插件或组件
 * 其次引入自有组件或插件
 * 最后引入样式文件，图片字体资源等
 *
 */
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import Component from '@/common/component';
import WxTouchEvent from 'wx-touch-event';
import dayjs from 'dayjs';
// import { searchClientCoupon } from '@/services/modules/coupon';
import '@/sass/pages/templates/list.scss';

const TouchEvent = new WxTouchEvent();

const TAB = [
  {
    title: '待使用',
    status: 0,
  },
  {
    title: '已过期',
    status: 2,
  },
];
export default class Index extends Component {
  config = {
    navigationBarTitleText: '优惠券',
  };

  state = {
    tabIdx: 0,
    data: [
      {
        id: 26,
        createtime: '2020-05-02 14:18:01',
        admin_id: 1,
        client_id: 33,
        coupon_id: 8,
        end_time: '2020-05-05 12:00:00',
        status: 0,
        client_name: '李悠悠',
        coupon_name: '测试优惠券',
        coupon_price: 0.01,
        coupon_min_price: 0.03,
      },
      {
        id: 25,
        createtime: '2020-05-02 14:18:01',
        admin_id: 1,
        client_id: 33,
        coupon_id: 9,
        end_time: '2020-05-05 12:00:00',
        status: 0,
        client_name: '李悠悠',
        coupon_name: '测试优惠券02',
        coupon_price: 0.02,
        coupon_min_price: 0.03,
      },
      {
        id: 14,
        createtime: '2020-05-01 08:51:34',
        admin_id: 1,
        client_id: 17,
        coupon_id: 6,
        end_time: '2020-05-12 12:00:00',
        status: 0,
        client_name: 'Simple Yin',
        coupon_name: '报优鸟',
        coupon_price: 11,
        coupon_min_price: 11,
      },
      {
        id: 6,
        createtime: '2020-04-29 11:44:56',
        admin_id: 1,
        client_id: 15,
        coupon_id: 5,
        end_time: '2020-05-04 12:00:00',
        status: 1,
        client_name: '张淳珠',
        coupon_name: '测试优惠券',
        coupon_price: 2000,
        coupon_min_price: 2001,
      },
      {
        id: 5,
        createtime: '2020-04-29 11:44:56',
        admin_id: 1,
        client_id: 15,
        coupon_id: 6,
        end_time: '2020-05-10 12:00:00',
        status: 0,
        client_name: '张淳珠',
        coupon_name: '报优鸟',
        coupon_price: 11,
        coupon_min_price: 11,
      },
      {
        id: 3,
        createtime: '2020-04-29 11:19:38',
        admin_id: 1,
        client_id: 13,
        coupon_id: 6,
        end_time: '2020-05-10 12:00:00',
        status: 0,
        client_name: 'AA薅羊毛小公举-省钱机器人',
        coupon_name: '报优鸟',
        coupon_price: 11,
        coupon_min_price: 11,
      },
      {
        id: 2,
        createtime: '2020-04-29 11:05:31',
        admin_id: 1,
        client_id: 11,
        coupon_id: 5,
        end_time: '2020-05-04 12:00:00',
        status: 2,
        client_name: '心宇宙',
        coupon_name: '测试优惠券',
        coupon_price: 2000,
        coupon_min_price: 2001,
      },
      {
        id: 1,
        createtime: '2020-04-29 11:05:31',
        admin_id: 1,
        client_id: 11,
        coupon_id: 6,
        end_time: '2020-05-10 12:00:00',
        status: 0,
        client_name: '心宇宙',
        coupon_name: '报优鸟',
        coupon_price: 11,
        coupon_min_price: 11,
      },
    ],
    // clientPage: 1,
  };

  componentDidMount() {
    // this.getData();
    // 多点触控
    TouchEvent.bind({
      // 初始化后绑定事件
      swipe: e => {
        // 上下换
        console.log(e);
      },
      doubleTap: e => {
        // 双击
        console.log(e);
      },
      tap: e => {
        // 单击
        console.log(e);
      },
      longTap: e => {
        // 长按
        console.log(e);
      },
      rotate: e => {
        // 旋转
        console.log(e);
      },
      pinch: e => {
        // 挤压
        console.log(e);
      },
    });
  }

  /**
   * 下拉加载
   */
  onReachBottom() {
    this.getData({}, { isPush: true });
  }

  /**
   * 获取列表
   * @param {*} filter 筛选参数
   * @param {} condition = {
      isPush: false,
      isSearch: false,
    }
   */
  // eslint-disable-next-line no-unused-vars
  async getData(filter = {}, { isPush, isSearch } = { isPush: false, isSearch: false }) {
    // const { clientPage, tabIdx, data } = this.state;
    // const adminId = Taro.getStorageSync('admin_id');
    // const clientId = Taro.getStorageSync('user_id');
    // const req = {
    //   admin_id: adminId,
    //   status: TAB[tabIdx].status,
    //   client_id: clientId,
    //   clientPage: isPush ? clientPage + 1 : clientPage,
    //   everyPage: 10,
    //   ...filter,
    // };
    // const res = await searchClientCoupon(req);
    // if (res.data.status === 200) {
    //   const newdata = this.handleDataAdapter(res.data.data);
    //   this.setState({
    //     data: isPush ? data.concat(newdata) : newdata,
    //     clientPage: res.data.pager.client_page,
    //   });
    // }
  }

  /**
   * 数据二次处理
   * @param {*} data
   */
  handleDataAdapter(data) {
    return data.map(item => {
      item.createtime = dayjs(item.createtime).format('YYYY/MM/DD');
      item.end_time = dayjs(item.end_time).format('YYYY/MM/DD');
      return item;
    });
  }

  /**
   * tab切换
   * @param {number} tabIdx
   */
  handleTab(tabIdx) {
    this.setState({
      tabIdx,
    });
    this.getData({
      status: TAB[tabIdx].status,
    });
  }

  render() {
    const { tabIdx, data } = this.state;
    return (
      <View
        className="wrapper"
        onTouchStart={e => TouchEvent.start(e)}
        onTouchMove={e => TouchEvent.move(e)}
        onTouchEnd={e => TouchEvent.end(e)}
        onTouchCancel={e => TouchEvent.cancel(e)}
      >
        <View className="tab">
          {TAB.map((item, index) => (
            <View
              key={item.title}
              onClick={this.handleTab.bind(this, index)}
              className={`tab__item ${tabIdx === index ? 'tab__item--active' : ''}`}
            >
              {item.title}
            </View>
          ))}
        </View>
        <View className={`coupon ${tabIdx === 0 ? '' : 'coupon--expired'}`}>
          {data.map(item => (
            <View key={item.id} className="coupon__item">
              <View className="coupon__info">
                <View className="coupon__discount">
                  <View className="coupon__unit">￥</View>
                  {item.coupon_price}
                </View>
                <View className="coupon__condition">满{item.coupon_min_price}元可用</View>
              </View>
              <View className="coupon__detail">
                <View className="coupon__name">{item.coupon_name}</View>
                <View className="coupon__date">
                  {item.createtime}-{item.end_time}
                </View>
                {tabIdx === 0 ? (
                  <View className="coupon__btn">去使用</View>
                ) : (
                  <View className="coupon__date">优惠券已过期或已失效</View>
                )}
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
