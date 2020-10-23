import React from 'react';
import { GENERAL_PREFIX } from '@/services';
import styles from './index.less';

const Index = () => (
  <div className={styles.loading}>
    <img className={styles.img} src={`${GENERAL_PREFIX}loading.gif`} alt="loading" />
  </div>
);
export default Index;
