/* eslint-disable */
/**
 * 配置复制于https://github.com/NervJS/taro-ui/blob/dev/src/common/component.js
 * 全局页面继承于本组件，方便后期配置全局变量，函数或者默认onShareAppMessage页面分享逻辑
 * 可按需求自行配置添加
 */
import Taro, { Component } from '@tarojs/taro';

const objectToString = style => {
  if (style && typeof style === 'object') {
    let styleStr = '';
    Object.keys(style).forEach(key => {
      const lowerCaseKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      styleStr += `${lowerCaseKey}:${style[key]};`;
    });
    return styleStr;
  } else if (style && typeof style === 'string') {
    return style;
  }
  return '';
};

export default class Index extends Component {
  static options = {
    addGlobalClass: true,
  };

  /**
   * 合并 style
   * @param {Object|String} style1
   * @param {Object|String} style2
   * @returns {String}
   */
  mergeStyle(style1, style2) {
    if (style1 && typeof style1 === 'object' && style2 && typeof style2 === 'object') {
      return Object.assign({}, style1, style2);
    }
    return objectToString(style1) + objectToString(style2);
  }

  onShareAppMessage() {
    return {
      title: '标题',
      path: '/pages/index',
      imageUrl: 'https://demo.com/foo.png',
    };
  }
}
