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
// 第三方插件或组件
import Taro from '@tarojs/taro';
import { View, Form, Button, Input, Image } from '@tarojs/components';

// 自有组件或插件
import Component from '@/common/component';
import Verify from '@/utils/verify';
import Parse from '@/components/Parse';
import { AtMessage, AtImagePicker } from 'taro-ui';
import Poster from '@/components/Poster';
import { HTTP_API } from '@/services/const';
import { clientInfo } from '@/services/modules/user';
// 样式文件，图片字体资源等
import '@/sass/pages/templates/form.scss';

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
  };

  state = {
    introduce: '',
    files: [],
    isLoad: false, // 海报是否渲染
    filePath: '', // 海报生成后的图片地址
    posterData: {
      scale: 1, // 缩放大小
      type: 1, // 海报类型
      userData: {}, // 生成小程序二维码需要存储的参数
      nickname: '',
      headImg: '',
      bgImg: '',
    },
  };

  componentDidMount() {
    setTimeout(() => {
      // 模仿异步
      this.setState(
        {
          introduce: '<span>标题</span><p>生活不止眼前的苟且，还有诗和远方</p>',
          posterData: {
            scale: 1,
            type: 1,
            qrcode: `${HTTP_API.GENERAL_PREFIX}qrcode.png`,
            bgImg: `${HTTP_API.GENERAL_PREFIX}bg.png`,
            userData: {
              userId: 1,
            },
            nickname: '你好呀',
            headImg: `${HTTP_API.ASSET_PREFIX}avatar.png`,
          },
        },
        () => {
          // 只有当海报需要的数据存储进state时
          // 才允许海报渲染
          this.setState({
            isLoad: true,
          });
        }
      );
    }, 1000);
  }

  onPullDownRefresh() { }

  onReachBottom() { }

  /**
   *
   * 提交表单
   *
   * @param {any} e
   * @memberof Index
   */
  handleSubmit = e => {
    const { username, password } = e.target.value;
    new Verify()
      .required(username, '账户')
      .required(password, '密码')
      .success(async () => {
        const res = await clientInfo(e.target.value);
        if (res.data.status === 200) {
          console.log('登录成功');
        }
      });
  };

  /**
   *
   * 重置表单
   *
   * @param {any} e
   * @memberof Index
   */
  handleReset = e => {
    console.log(e);
  };

  /**
   * 批量图片上传 实现核心思路 使用递归函数
   *
   * @param {*} file
   * @param {*} type
   * @param {*} config
   */
  handleMultipleFilesUpload = (
    file = [],
    type,
    config = { files: [], MAX_LEN: 5, fileKey: '' }
  ) => {
    const fileExceeds = [];
    const { files, fileKey, MAX_LEN } = config;
    const filesFn = () => {
      // 批量上传图片初始化
      Taro.showLoading();

      let idx = files.length + 1;
      // 递归回调 模拟批量上传
      const callback = () => {
        const item = file.shift();
        const uploadTask = Taro.uploadFile({
          url: HTTP_API.UPLOAD_CLOUD_PREFIX,
          filePath: item.url,
          header: {
            token: Taro.getStorageSync('token'),
          },
          name: 'file',
          complete: res => {
            // 后台上传图片响应 格式可能不同
            // 根据需要修改
            const response = JSON.parse(res.data);
            if (response.status === 200) {
              files.push({
                url: response.path,
              });
            } else {
              Taro.showToast({ title: `第${idx}张上传失败`, icon: 'none' });
            }
            idx += 1;
            if (file.length !== 0) {
              callback();
            } else {
              Taro.hideLoading();
              this.setState({
                [fileKey]: files,
              });
            }
          },
        });
        uploadTask.progress(res => {
          Taro.showLoading({
            title: `第${idx}张${res.progress}%`,
          });
        });
      };
      callback();
    };
    if (file.length <= MAX_LEN) {
      if (type === 'add') {
        file = file.filter((item, index) => {
          if (item.file && item.file.size > 1000000) {
            fileExceeds.push(index + 1);
          }
          return item.file && item.file.size <= 1000000;
        });
        if (fileExceeds.length > 0) {
          Taro.showModal({
            title: '温馨提示',
            content: `图片第${fileExceeds.join('、')}张超过1MB大小`,
            success: () => {
              if (file.length > 0) {
                filesFn();
              }
            },
          });
        } else {
          filesFn();
        }
      } else {
        this.setState({
          [fileKey]: files,
        });
      }
    } else {
      Taro.showToast({
        title: `最多上传${MAX_LEN}张图片！`,
        icon: 'none',
        duration: 2000,
      });
    }
  };

  /**
   * 活动图片上传
   *
   * @param {[]} file
   * @param {string} type
   * @memberof Index
   */
  handleFilesChange = (key, file = [], type) => {
    const { files } = this.state;
    this.setState({
      files: this.handleMultipleFilesUpload(file, type, {
        files,
        MAX_LEN: 5,
        fileKey: key,
      }),
    });
  };

  /**
   * 子组件传参
   *
   * @param {*} key
   * @param {*} val
   * @memberof Index
   */
  handleParentState(key, val) {
    if (this.state[key] !== val) {
      this.setState({
        [key]: val,
      });
    }
  }

  /**
   * 多图保存 实现核心思路 使用递归函数
   */
  handleSaveImage(files) {
    const filesFn = () => {
      // 批量图片初始化
      let idx = files.length - 1;
      // 递归回调 模拟批量上传
      const callback = () => {
        const item = files[idx];
        Taro.downloadFile({
          url: HTTP_API.API + item,
          success: res => {
            Taro.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              complete: () => {
                idx -= 1;
                if (idx >= 0) {
                  callback();
                }
              },
            });
          },
        });
      };
      callback();
    };
    filesFn();
  }

  render() {
    const { introduce, files, posterData, filePath, isLoad } = this.state;

    return (
      <View className="template">
        <Form onSubmit={this.handleSubmit} onReset={this.handleReset}>
          <View className="template__item">
            <View className="template__name">账号</View>
            <Input
              name="username"
              className="template__input"
              placeholderClass="template__input--placeholder"
              placeholder="请输入姓名"
            />
          </View>
          <View className="template__item">
            <View className="template__name">密码</View>
            <Input
              name="password"
              className="template__input"
              placeholderClass="template__input--placeholder"
              placeholder="请输入密码"
            />
          </View>
          <View className="template__item template__item--block">
            上传凭证(最多3张)
            <AtImagePicker
              // mode="widthFix"
              multiple
              sizeType={['compressed']}
              files={files}
              onChange={this.handleFilesChange.bind(this, 'files')}
            />
          </View>
          <View className="template__item">
            <View className="template__name">富文本</View>
          </View>
          <View className="template__item">
            <Parse html={introduce} />
          </View>
          <View className="template__item">
            <View className="template__name">海报</View>
          </View>
          <View className="template__item">
            <AtMessage />
            <Image src={filePath} className="template__poster" />
            {isLoad && (
              <Poster
                onCallback={(key, val) => this.handleParentState(key, val)}
                posterData={posterData}
              />
            )}
          </View>
          <View className="template__item">
            <Button
              className="template__btn template__btn--primary"
              type="primary"
              formType="submit"
            >
              提交
            </Button>
            <Button className="template__btn" formType="reset">
              重置
            </Button>
          </View>
        </Form>
      </View>
    );
  }
}
