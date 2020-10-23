import React, { Component } from 'react';
import { Link } from 'umi';
import { ASSET_PREFIX } from '../services';
import styles from './index.less';

const MENU = [
  {
    title: '首页',
    url: '/index',
  },
  {
    title: '关于我们',
    url: '/about',
  },
  {
    title: '服务产品',
    url: '/product',
  },
  {
    title: '行业资讯',
    url: '/news',
  },
  {
    title: '部分客户',
    url: '/customer',
  },
  {
    title: '联系我们',
    url: '/contact',
  },
];

class App extends Component {
  componentDidMount() {
    // console.log('mount');
  }

  render() {
    const {
      children,
      location: { pathname },
    } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            src={`${ASSET_PREFIX}logo.png`}
            className={styles.header__logo}
            alt=""
          />
          <div className={styles.menu}>
            {MENU.map(item => (
              <Link
                key={item.title}
                className={`${styles.nav} ${
                  item.url === pathname ? styles.active : ''
                }`}
                to={item.url}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.content}>{children}</div>
        <div className={styles.footer}>
          <div className={styles.menu}>
            {MENU.map(item => (
              <Link key={item.title} className={styles.nav} to={item.url}>
                {item.title}
              </Link>
            ))}
          </div>
          <div className={styles.cppyright}>
            <div className={styles.info}>
              <img
                className={styles.qrcode}
                src={`${ASSET_PREFIX}qrcode.png`}
                alt=""
              />
              关注沿湖咨询公众平台
            </div>
            <div className={styles.contact}>
              <p>地址：杭州市滨江区德信AI产业园B幢606室</p>
              <p>TEL：13588021484</p>
              <p>E-MALL：1353317826@qq.com</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
