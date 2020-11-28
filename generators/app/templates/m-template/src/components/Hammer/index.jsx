import React, { useEffect } from 'react';
// import Hammer from 'hammerjs';
import { Toast } from 'antd-mobile';
import styles from './index.less';

const Index = ({ children, onSwipeUp = () => {} }) => {
  // const [status, setStatus] = useState(0);

  useEffect(() => {
    const container = document.querySelector(`#root > div`);

    container.onscroll = () => {
      if (container.scrollHeight <= container.clientHeight + container.scrollTop) {
        Toast.loading('加载成功', 0.5);
        onSwipeUp();
      }
    };

    return () => {
      container.onscroll = null;
    };

    /**
     * 容器滚动事件
     * @param {*} ev
     */
    // const handleLog = (ev) => {
    //   if (container.scrollTop === 0) {
    //     if (ev.type === 'touchstart') {
    //       prevPageY = 0;
    //     } else if (ev.type === 'touchmove' && prevPageY === 0) {
    //       const clientPageY = ev.touches[0].pageY;
    //       if (clientPageY - prevPageY >= 100) {
    //         // setStatus(1);
    //       }
    //       if (prevPageY === 0) {
    //         prevPageY = clientPageY;
    //       }
    //     } else if (ev.type === 'touchend') {
    //       // setStatus(0);
    //       prevPageY = -1;
    //       Toast.info('刷新成功', 0.5);
    //       onSwipeDown();
    //     }
    //   }
    // };

    // container.addEventListener('touchstart', handleLog, false);
    // container.addEventListener('touchmove', handleLog, false);
    // container.addEventListener('touchend', handleLog, false);
  }, []);
  return (
    <div id="container" className={`${styles.wrap} `}>
      {/* <div className={`${styles.loading} ${status === 1 ? styles['loading--active'] : ''}`}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        松开立即刷新
      </div> */}

      {children}
    </div>
  );
};
export default Index;
