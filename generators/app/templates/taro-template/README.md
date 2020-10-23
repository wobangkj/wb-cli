[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

# 小程序模板源代码

> 依赖于[Taro](https://taro-ui.aotu.io/#/docs/introduction)框架，强力保证开发效率。

## 体验
请使用微信扫一扫以下体验码

![QRCode](https://test.wobangkj.com/api/common-service/static/file/3f4b351dab9a4ac3bfcdbf0ed4adf9d1.jpeg)


## 安装
安装依赖

``` bash

npm install/cnpm install
```

## 使用
运行微信小程序开发环境

``` bash
npm run dev:weapp
```

## 打包
打包微信小程序开发环境

``` bash
npm run build:weapp

```

## Help

#目录结构

```bash
.
├── README.md
├── config                  # prod/dev build config 文件
├── dist                    # 代码发布上线
├── scripts                 # prettier配置
├── package.json
├── src                     # taro 核心业务
│   ├── assets              # 静态资源
│   │   ├── images          # 图片资源
│   ├── components          # 页面组件
│   ├── pages               # 页面
│   ├── sass                # 样式文件
│   │   ├── base            # 基础样式
│   │   ├── components      # 样式组件
│   │   ├── pages           # 单独页面样式
│   ├── app.tsx             # App Root Component
│   ├── services            # 接入后端服务的基础 API
│   │   ├── config          # API全局配置
│   │   ├── const           # API常量，用于修改接口地址
│   │   ├── skeleton        # 骨架屏
│   │       ├── components  # 骨架屏组件
│   │       ├── sass        # 骨架屏基础样式
└── └── utils               # 通用函数
```

## 项目使用第三方库的相关链接

> [TaroUI组件库](https://taro-ui.aotu.io/#/docs/introduction)

> javascript常用工具库[lodash](https://github.com/Ewocker/vue-lodash#readme)

> 时间日期工具库[Day.js](https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md)

> 状态管理库[dva](https://dvajs.com/guide/)

## 参考链接

> 移动端设备统计[(material)](https://material.io),[(mydevice)](https://www.mydevice.io/#compare-devices)

## 多人协调

### 开发工具
首选[visualstudio](https://code.visualstudio.com),其它可使用[webstorm](https://www.jetbrains.com/webstorm/)等。

### 代码风格
以visualstudio为例，注释安装[Document This](https://marketplace.visualstudio.com/items?itemName=joelday.docthis)插件，可快速生成注释文档，代码格式化安装[prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)插件。

首先全局安装[commitizen](https://github.com/commitizen/cz-cli)

> `npm/cnpm install -g commitizen`

安装好了确保`git cz`可以正确执行。

> 提交代码请不要使用，不要使用，不要使用默认提交方式，重要的事说三遍

> `git commit -m 'message'`

> 直接提交通不过，请使用集成的命令提交代码。

> `git cz`


## 版本生成

涉及重大修改，且测试通过的情况下才执行此步骤，文件生成地址为`CHANGELOG.md`

> `npm run release`

## 其他

### 圈复杂度

圈复杂度(Cyclomatic complexity)是一种代码复杂度的衡量标准，检测圈复杂度推荐安装vscode的插件[codemetrics](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-codemetrics)，因为Taro转换React风格成小程序支持的代码，导致生成的语法比较混杂，所以检测的代码生成的圈复杂度比较高，可以不用过于关注。

> 打开vscode插件安装中心 `Mac Shift+Command+X Windows Ctrl + Shift + X`

> 搜索框输入 `codemetrics`，回车选择第一个安装即可


