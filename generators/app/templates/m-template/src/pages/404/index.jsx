import React from 'react';
import { Link } from 'umi';
import { ASSET_PREFIX } from '@/services';
import styles from './index.less';

const IndexPage = () => (
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  <div className={styles.center}>
    <img className={styles.develop} alt="" src={`${ASSET_PREFIX}develop.png`} />
    您来到了未开垦的地区
    <Link className={styles.link} to="/">
      返回首页
    </Link>
  </div>
);

export default IndexPage;
