import React, { useEffect, useState } from 'react';
import { setPageNavBar } from 'alita';
import { Icon } from 'antd-mobile';
import { query } from '@/services/api';

import styles from './index.less';

const SettingsPage = ({ location }) => {
  const [name, handleSetName] = useState('');
  const onLeftClick = () => {
    console.log('click left');
  };
  useEffect(() => {
    setPageNavBar({
      pagePath: location.pathname,
      navBar: {
        onLeftClick,
        rightContent: [
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ],
      },
    });
    console.log(location);
    const fetchQuery = async () => {
      const res = await query();
      handleSetName(res.text);
    };
    fetchQuery();
  }, []);
  return <div className={styles.center}>Hello {name}</div>;
};

export default SettingsPage;
