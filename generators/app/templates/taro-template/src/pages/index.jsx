import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import Component from '@/common/component';
import Menu from '@/components/Menu';
import { HTTP_API } from '@/services/const';
import '@/sass/pages/index.scss';

export default class Index extends Component {
  state = {
    list: [
      {
        title: '表单模板',
        content: '包含校验，富文本,海报，多图上传等',
        url: 'form',
        icon: 'coupon.png',
      },
      {
        title: '列表模板',
        content: '包含Tab切换，多点触控等',
        url: 'list',
        icon: 'coupon.png',
      },
      {
        title: '瀑布流',
        content: '绝对定位实现版本',
        url: 'waterfall',
        icon: 'coupon.png',
      },
    ],
  };

  /**
   *
   * 导航跳转
   * @memberof Index
   */
  handleNav = e => {
    const { url } = e.currentTarget.dataset;
    Taro.navigateTo({
      url: `/pages/templates/${url}`,
    });
  };

  render() {
    const { list } = this.state;

    return (
      <View className="wrapper">
        <View className="page-title">业务模板</View>
        <View className="module-list">
          {list.map(item => (
            <View
              className="module-list__item"
              key={item.title}
              data-url={item.url}
              onClick={this.handleNav}
            >
              <View className="module-list__icon">
                <Image src={HTTP_API.ASSET_PREFIX + item.icon} className="img" mode="widthFix" />
              </View>
              <View className="module-list__info">
                <View className="title">{item.title}</View>
                <View className="content">{item.content}</View>
              </View>
              <View className="module-list__arrow">
                <Image src={`${HTTP_API.ASSET_PREFIX}right.png`} className="module-list__right" />
              </View>
            </View>
          ))}
        </View>
        <Menu idx={0} />
      </View>
    );
  }
}
