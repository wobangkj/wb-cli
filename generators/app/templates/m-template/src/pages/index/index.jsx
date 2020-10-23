import React, { useEffect, useState } from 'react';
import { query } from '@/services/api';
import styles from './index.less';

const IndexPage = () => {
  const [name, handleSetName] = useState('');
  // 这里发起了初始化请求
  useEffect(() => {
    const fetchQuery = async () => {
      const res = await query();
      console.log(res);
      handleSetName(res.text);
    };
    fetchQuery();
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  return <div className={styles.center}>Hello {name}</div>;
};

export default IndexPage;
