import React, { useEffect, useState } from 'react';
import { List } from 'antd-mobile';
import { queryList, query } from '@/services/api';
import LoadMoreListView from '@alitajs/list-view';
import { GENERAL_PREFIX } from '@/services/index';

import styles from './index.less';

const { Item } = List;
const { Brief } = Item;

const ListPage = () => {
  const [name, handleSetName] = useState('');
  useEffect(() => {
    const fetchList = async () => {
      const res = await query();
      handleSetName(res.text);
    };
    fetchList();
  }, []);
  const renderRow = (rowData, sectionID, rowID) => (
    <Item
      arrow="horizontal"
      thumb={<img src={`${GENERAL_PREFIX}logo.png`} alt="" className={styles.listIcon} />}
      multipleLine
      onClick={() => { }}
    >
      {rowData.title} <Brief>{rowID}</Brief>
    </Item>
  );
  return (
    <>
      Model Name:{name}
      <LoadMoreListView
        requestFunc={queryList}
        renderRow={renderRow}
        requestParams={{
          abc: '123',
          token: 'alita',
          pageSize: 10,
          offset: 1,
        }}
      />
    </>
  );
};

export default ListPage;
