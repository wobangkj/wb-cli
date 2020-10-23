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
import { View, Image } from '@tarojs/components';
import LoginModal from '@/components/LoginModal';
import Component from '@/common/component';
// import { searchSv } from '@/services/modules/video';
import { HTTP_API } from '@/services/const';
import '@/sass/pages/templates/water-fall.scss';

export default class Index extends Component {
  config = {
    navigationBarTitleText: '短视频',
  };

  state = {
    prevLeftHeight: 0,
    data: [
      {
        id: 22,
        createtime: '2020-05-02 11:06:50',
        admin_id: 1,
        name: '咕咕咕',
        v_url: '1588388797038.mp4',
        img_url: 'https://sq.sqtg.club/api/v1/base-srv//static/file/1256419849022738432.jpg',
        height: 1,
        goods_id: 12,
        goods_name: '咕咕咕',
        sv_like_id: 0,
        like_num: 1,
        comment_num: 5,
      },
      {
        id: 21,
        createtime: '2020-05-02 09:37:36',
        admin_id: 1,
        name: '字符包用户去世欠的花呗要还吗',
        v_url: '1588383452077.mp4',
        img_url: 'https://sq.sqtg.club/api/v1/base-srv//static/file/1256397253090742272.jpg',
        height: 1.76,
        goods_id: 7,
        goods_name: '水果 500g',
        sv_like_id: 0,
        like_num: 0,
        comment_num: 22,
      },
      {
        id: 20,
        createtime: '2020-05-02 09:38:14',
        admin_id: 1,
        name: '开业庆典，给你放价，358元日式水貂毛睫毛0元享！',
        v_url: '1588383487440.mp4',
        img_url: 'https://sq.sqtg.club/api/v1/base-srv//static/file/1256397490324770816.jpg',
        height: 1.78,
        goods_id: 7,
        goods_name: '水果 500g',
        sv_like_id: 0,
        like_num: 3,
        comment_num: 48,
      },
      {
        id: 19,
        createtime: '2020-05-02 09:39:01',
        admin_id: 1,
        name: '沈腾接梗能力没话说',
        v_url: '1588383515402.mp4',
        img_url: 'https://sq.sqtg.club/api/v1/base-srv//static/file/1256397624555081728.jpg',
        height: 1.78,
        goods_id: 7,
        goods_name: '水果 500g',
        sv_like_id: 0,
        like_num: 1,
        comment_num: 1,
      },
      {
        id: 18,
        createtime: '2020-05-02 09:37:36',
        admin_id: 1,
        name: '字符包用户去世欠的花呗要还吗',
        v_url: '1588383452077.mp4',
        img_url: 'https://sq.sqtg.club/api/v1/base-srv//static/file/1256397253090742272.jpg',
        height: 1.76,
        goods_id: 7,
        goods_name: '水果 500g',
        sv_like_id: 0,
        like_num: 0,
        comment_num: 0,
      },
      {
        id: 17,
        createtime: '2020-05-02 09:37:36',
        admin_id: 1,
        name: '字符包用户去世欠的花呗要还吗',
        v_url: '1588383452077.mp4',
        img_url: 'https://sq.sqtg.club/api/v1/base-srv//static/file/1256397253090742272.jpg',
        height: 1.76,
        goods_id: 7,
        goods_name: '水果 500g',
        sv_like_id: 0,
        like_num: 0,
        comment_num: 0,
      },
      {
        id: 16,
        createtime: '2020-05-02 09:39:01',
        admin_id: 1,
        name: '沈腾接梗能力没话说',
        v_url: '1588383515402.mp4',
        img_url: 'https://sq.sqtg.club/api/v1/base-srv//static/file/1256397624555081728.jpg',
        height: 1.78,
        goods_id: 7,
        goods_name: '水果 500g',
        sv_like_id: 0,
        like_num: 0,
        comment_num: 0,
      },
      {
        id: 15,
        createtime: '2020-05-02 09:37:36',
        admin_id: 1,
        name: '字符包用户去世欠的花呗要还吗',
        v_url: '1588383452077.mp4',
        img_url: 'https://sq.sqtg.club/api/v1/base-srv//static/file/1256397253090742272.jpg',
        height: 1.76,
        goods_id: 7,
        goods_name: '水果 500g',
        sv_like_id: 0,
        like_num: 0,
        comment_num: 0,
      },
      {
        id: 13,
        createtime: '2020-05-02 09:38:14',
        admin_id: 1,
        name: '开业庆典，给你放价，358元日式水貂毛睫毛0元享！',
        v_url: '1588383487440.mp4',
        img_url: 'https://sq.sqtg.club/api/v1/base-srv//static/file/1256397490324770816.jpg',
        height: 1.78,
        goods_id: 7,
        goods_name: '水果 500g',
        sv_like_id: 0,
        like_num: 0,
        comment_num: 2,
      },
      {
        id: 12,
        createtime: '2020-05-02 09:37:36',
        admin_id: 1,
        name: '字符包用户去世欠的花呗要还吗',
        v_url: '1588383452077.mp4',
        img_url: 'https://sq.sqtg.club/api/v1/base-srv/static/file/1256397253090742272.jpg',
        height: 1.76,
        goods_id: 7,
        goods_name: '水果 500g',
        sv_like_id: 0,
        like_num: 0,
        comment_num: 0,
      },
    ],
    isAuth: false,
    // clientPage: 1,
    prevRightHeight: 0,
  };

  async componentDidMount() {
    // this.getData();
    const { data } = this.state;
    const newdata = this.handleDataAdapter(data);
    this.setState({
      data: newdata.data,
      prevLeftHeight: newdata.prevLeftHeight,
      vHeight: Math.max(newdata.prevLeftHeight, newdata.prevRightHeight),
    });
  }

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
    // const { clientPage } = this.state;
    // let { data } = this.state;
    // const adminId = Taro.getStorageSync('admin_id');
    // const req = {
    //   admin_id: adminId,
    //   clientPage: isPush ? clientPage + 1 : clientPage,
    //   everyPage: 10,
    //   ...filter,
    // };
    // const res = await searchSv(req);
    // if (res.data.data.length !== 0) {
    //   const newdata = this.handleDataAdapter(res.data.data);
    //   data = isPush ? data.concat(newdata.data) : newdata.data;
    //   this.setState({
    //     data,
    //     clientPage: res.data.pager.client_page,
    //     prevLeftHeight: newdata.prevLeftHeight,
    //     vHeight: Math.max(newdata.prevLeftHeight, newdata.prevRightHeight),
    //   });
    // }
  }

  /**
   * 数据数据二次处理 默认宽度320px
   * 实现前提首先需要后端提供一个原始图片的宽高比例，从而实现
   * 图片不失真 图片高度计算公式：前台默认宽度 * (原始图片高度/原始图片宽度)
   * 计算左边竖直前一个的图片高度 并设置当前列表的y坐标值
   * 下一个竖直列表项的高度为前面竖直列表项之和 右边同理
   * 例子：第一个列表高度为500，第三个视频的纵坐标top值即为500
   */
  handleDataAdapter(data) {
    let { prevLeftHeight, prevRightHeight } = this.state;
    data.forEach((item, index) => {
      item.height *= 320; // 高度计算公式：前台默认宽度 * (原始图片高度/原始图片宽度)
      if (index % 2 === 0) {
        item.style = {
          left: 0,
          top: `${prevLeftHeight}rpx`,
        };
        prevLeftHeight += item.height + 150;
      } else {
        item.style = {
          right: 0,
          top: `${prevRightHeight}rpx`,
        };
        prevRightHeight += item.height + 150;
      }
    });
    // 底部tab高度适配
    data[data.length - 1].style.paddingBottom = '100rpx';
    data[data.length - 2].style.paddingBottom = '100rpx';
    return {
      data,
      prevLeftHeight,
      prevRightHeight,
    };
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
   * 视频详情
   * @param {*} index
   */
  handleLink(index) {
    if (this.handleAuthModal()) return;
    Taro.navigateTo({
      url: `./detail?playIdx=${index}`,
    });
  }

  render() {
    const { data, vHeight, isAuth } = this.state;
    return (
      <View className="wrapper" style={{ height: `${vHeight}rpx` }}>
        {isAuth ? <LoginModal authModal={e => this.handleAuthModal(e)} /> : null}
        <View className="video">
          {data.map((item, index) => (
            <View
              onClick={this.handleLink.bind(this, index)}
              style={{ ...item.style }}
              key={item.id}
              className="v__item"
            >
              <View className="v__preview">
                <Image
                  style={{ height: `${item.height}rpx` }}
                  className="v__pic"
                  src={item.img_url}
                />
                <Image className="v__play" src={`${HTTP_API.ASSET_PREFIX}play.png`} />
              </View>
              <View className="v__desc">
                <View className="v__title">{item.name}</View>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
