/* eslint-disable */
import Taro, { Component } from '@tarojs/taro';
import { Canvas, View } from '@tarojs/components';
import runes from 'runes';
import PropTypes from 'prop-types';
import { HTTP_API } from '../services/const';
import { urlEncode } from '../utils';

export default class Index extends Component {
  static defaultProps = {
    posterData: {},
  };

  state = {
    canvasWidth: 750,
    windowWidth: 0,
    canvasHeight: 1334,
    clientDeviceRatio: 0,
    prevActImg: '',
    prevPosterImg: '',
    qrcodeBg: '',
    prevRollUpImg: '',
  };

  timer;

  componentDidReceiveProps(props) {
    const { posterData } = props;
    switch (posterData.type) {
      case 1:
        // 邀请团会员海报资源加载
        this.initAssetsHeader();
        break;
    }
  }

  componentDidMount() {
    const { posterData } = this.props;

    const sysinfo = Taro.getSystemInfoSync();
    this.setState(
      {
        clientDeviceRatio: sysinfo.pixelRatio,
        windowWidth: sysinfo.windowWidth,
        canvasHeight: posterData.type === 0 ? 1027 : posterData.type === 1 ? 1334 : 1257,
      },
      () => {
        switch (posterData.type) {
          case 1:
            // 邀请团会员海报资源加载
            this.initAssetsHeader();
            break;
        }
      }
    );
  }

  /**
   *
   * px转rpx
   * @param {number} val
   * @param {boolean} isHD
   * @returns
   * @memberof PosterCanvas
   */
  px2rpx(val, isHD) {
    const {
      posterData: { scale },
    } = this.props;
    const { windowWidth } = this.state;
    return (val / 2) * (isHD ? 1 : scale) * (windowWidth / 375);
  }

  /**
   * 团长静态资源预下载
   *
   * @memberof PosterCanvas
   */
  initAssetsHeader() {
    const { posterData } = this.props;

    // const { canvasWidth } = this.state;
    const ctx = Taro.createCanvasContext('canvasId', this);
    const ctxHd = Taro.createCanvasContext('canvasHDId', this);

    Taro.showLoading();
    ctx.save();
    // 下载用户头像资源
    const headImgProm = new Promise((resolve, reject) => {
      Taro.getImageInfo({
        src: posterData.headImg,
        success: res => {
          resolve(res);
        },
        fail: () => {
          Taro.atMessage({
            message: '用户头像资源加载失败',
            type: 'error',
          });
        },
      });
    });
    // 下载背景
    const bgImgProm = new Promise((resolve, reject) => {
      Taro.getImageInfo({
        src: posterData.bgImg,
        success: res => {
          resolve(res);
        },
        fail: () => {
          Taro.atMessage({
            message: '背景资源加载失败',
            type: 'error',
          });
        },
      });
    });

    //二维码图片资源加载;
    const qrcodeProm = new Promise((resolve, reject) => {
      Taro.getImageInfo({
        // src:
        //   HTTP_API.QRCODE_PREFIX +
        //   encodeURIComponent(HTTP_API.SETTING_PREFIX + urlEncode(posterData.userData)) +
        //   '&r' +
        //   Math.random(),
        src: posterData.qrcode,
        success: res => {
          resolve(res);
        },
        fail: () => {
          Taro.atMessage({
            message: '二维码图片资源下载失败',
            type: 'error',
          });
        },
      });
    });

    let allPromArr = [headImgProm, bgImgProm, qrcodeProm];

    Promise.all(allPromArr).then(
      res => {
        // 背景图片
        // const canvasHeight = (res[0].height * canvasWidth) / res[0].width;
        // ctx.drawImage(res[0].path, 0, 0, canvasWidth, canvasHeight);

        // 活动图片
        // ctx.drawImage(
        //   res[2].path,
        //   this.px2rpx(60),
        //   this.px2rpx(122),
        //   this.px2rpx(630),
        //   this.px2rpx(480)
        // );

        this.setState(
          {
            assetsImg: res,
            // canvasHeight,
          },
          () => {
            // this.createDaySignPoster(ctx, true);
            this.createHeaderPoster(ctxHd, true);
          }
        );
      },
      err => {
        Taro.hideLoading();
        Taro.atMessage({
          message: '网络繁忙，请稍后再试',
          type: 'error',
        });
      }
    );
  }

  /**
   *
   * 生成团长朋友圈海报
   * @param {*} ctx
   * @param {boolean} isHD
   * @memberof PosterCanvas
   */
  createHeaderPoster(ctx, isHD) {
    const { posterData, onCallback } = this.props;
    const { assetsImg } = this.state;
    // 背景颜色

    ctx.rect(0, 0, this.px2rpx(750, isHD), this.px2rpx(1334, isHD));
    ctx.setFillStyle('#fff');
    ctx.fill();

    // 背景图片
    ctx.drawImage(
      assetsImg[1].path,
      this.px2rpx(0, isHD),
      this.px2rpx(0, isHD),
      this.px2rpx(750, isHD),
      this.px2rpx(1140, isHD)
    );

    // 用户圆角头像
    this.imageCircle(ctx, assetsImg[0].path, this.px2rpx(30, isHD), this.px2rpx(1175, isHD), {
      width: this.px2rpx(121, isHD),
      height: this.px2rpx(121, isHD),
    });

    // 日签内容

    ctx.setTextAlign('left');
    ctx.setFillStyle('#000000');
    ctx.setFontSize(this.px2rpx(36, isHD));
    ctx.fillText(posterData.nickname, this.px2rpx(183, isHD), this.px2rpx(1224, isHD));
    ctx.setFontSize(this.px2rpx(30, isHD));
    ctx.fillText('邀请您微信扫描二维码', this.px2rpx(183, isHD), this.px2rpx(1268, isHD));
    // 二维码
    ctx.drawImage(
      assetsImg[2].path,
      this.px2rpx(585, isHD),
      this.px2rpx(1166, isHD),
      this.px2rpx(133, isHD),
      this.px2rpx(133, isHD)
    );

    ctx.draw(false, () => {
      setTimeout(() => {
        Taro.canvasToTempFilePath(
          {
            x: 0,
            y: 0,
            width: this.px2rpx(750, isHD),
            height: this.px2rpx(1334, isHD),
            canvasId: 'canvasHDId',
            success: res => {
              onCallback('filePath', res.tempFilePath);
            },
            fail: err => {},
            complete: () => {
              Taro.hideLoading();
            },
          },
          this.$scope
        );
      }, 1000);
    });
  }

  /**
   * 文本换行，支持回车换行
   *
   * @param {*} ctx
   * @param {string} text
   * @param {number} left
   * @param {number} top
   * @param {{ isWrap?: true; wrapperWidth; lineHeight }} opt
   * @memberof PosterCanvas
   */
  textWrap(ctx, text, left, top, opt) {
    ctx.save();
    // 默认过滤换行回车符号
    let str = text.replace(/[\r,\r\n,\n]/g, opt.isWrap ? '#' : '');
    let strPara = 0,
      res = [],
      prevNum = 0;
    for (let i = 0, textLen = 0; i < str.length; i++) {
      // 手动换行
      if (str[i] === '#') {
        res.push(runes.substr(str, prevNum + 1, i - prevNum));
        // 当前累加文字长度重置0
        textLen = 0;
        // 存储最后一次换行索引
        prevNum = i;
        // 累加换行次数
        // ++strPara;
      } else {
        textLen += ctx.measureText(str[i]).width;
        // 当文字长度大于换行长度时
        if (textLen >= opt.wrapperWidth) {
          res.push(runes.substr(str, prevNum + 1, i - prevNum));
          // 当前累加文字长度重置0
          textLen = 0;
          // 存储最后一次换行索引
          prevNum = i;
          // 累加换行次数
          // ++strPara;
        }
      }
    }
    //插入最后一行
    res.push(runes.substr(str, prevNum));

    for (let i = 0; i < res.length; i++) {
      // 写入文字
      ctx.fillText(res[i].replace(/#/g, ''), left, top + i * opt.lineHeight);
    }
    ctx.restore();
  }

  /** */

  /**
   * 文字竖向排列
   * @param {*} ctx
   * @param {*} text
   * @param {*} x
   * @param {*} y
   * @param {*} lineHeight
   * @param {*} maxHeight
   */
  wrapVerticalText(ctx, text, x, y, lineHeight, maxHeight) {
    if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
      return;
    }
    // 字符分隔为数组
    var arrText = text.replace(/[\r,\r\n,\n]/g, ',');
    const index = arrText.indexOf(',');
    var line = '';
    for (var n = 0; n < arrText.length; n++) {
      if (n == index) {
        arrText.replace(',', '');
        x = x - 40;
        y = 62;
      } else if (y < maxHeight) {
        line = arrText[n];
        y += lineHeight;
        ctx.fillText(line, x, y);
      } else {
        ctx.fillText(line, x, y);
        y = 62;
        x = x - 40;
      }
    }
  }

  /**
   * 图片圆形
   *
   * @param {*} ctx
   * @param {*} src
   * @param {number} left
   * @param {number} top
   * @param {{ width; height }} opt
   * @memberof PosterCanvas
   */
  imageCircle(ctx, src, left, top, opt) {
    ctx.save();
    ctx.beginPath();
    ctx.setFillStyle('#fff');
    // x,y分别加上圆半径一半
    ctx.arc(left + opt.width / 2, top + opt.width / 2, opt.width / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.clip();
    ctx.drawImage(src, left, top, opt.width, opt.height);
    ctx.closePath();
    ctx.restore();
  }

  /**
   *
   * @param {CanvasContext} ctx canvas上下文
   * @param {number} x 圆角矩形选区的左上角 x坐标
   * @param {number} y 圆角矩形选区的左上角 y坐标
   * @param {number} w 圆角矩形选区的宽度
   * @param {number} h 圆角矩形选区的高度
   * @param {number} r 圆角的半径
   * @param {string} color 背景颜色
   * @param {number} lineWidth 线宽
   * @param {boolean} isStroke 是否stroke绘制
   */
  roundRect(ctx, x, y, w, h, r, color, lineWidth, isStroke) {
    ctx.save();
    // 开始绘制
    ctx.beginPath();
    // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
    // 这里是使用 fill 还是 stroke都可以，二选一即可
    isStroke ? ctx.setStrokeStyle(color) : ctx.setFillStyle(color);

    // 左上角
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);

    // border-top
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.lineTo(x + w, y + r);
    // 右上角
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);

    // border-right
    ctx.lineTo(x + w, y + h - r);
    ctx.lineTo(x + w - r, y + h);
    // 右下角
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);

    // border-bottom
    ctx.lineTo(x + r, y + h);
    ctx.lineTo(x, y + h - r);
    // 左下角
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);

    // border-left
    ctx.lineTo(x, y + r);
    ctx.lineTo(x + r, y);

    // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
    ctx.setLineWidth(lineWidth);

    isStroke ? ctx.stroke() : ctx.fill();

    ctx.closePath();
    // 剪切
    ctx.clip();
    ctx.restore();
  }
  render() {
    const {
      posterData: { scale },
    } = this.props;
    const { canvasWidth, canvasHeight } = this.state;
    return (
      <View>
        <Canvas
          style={`position:absolute;top:-10000px;width: ${canvasWidth *
            scale}rpx; height: ${canvasHeight * scale}rpx`}
          canvasId="canvasId"
        />
        <Canvas
          style={`position:absolute;top:-10000px;width: ${canvasWidth}rpx; height: ${canvasHeight}rpx`}
          canvasId="canvasHDId"
        />
      </View>
    );
  }
}
Index.defaultProps = {
  posterData: PropTypes.object.isRequired,
  onCallback: PropTypes.func,
};
