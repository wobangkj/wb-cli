import React, { useEffect, useState } from 'react';
import { Modal, Toast } from 'antd-mobile';
// import Gmap from '@/components/Gmap';
const loc = JSON.parse(localStorage.getItem('loc'));

const { alert } = Modal;

const IndexPage = (props) => {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    if (!loc.lat) {
      Toast.info('系统检测您暂无打开授权，请打开设备定位功能！', 3, null, false);
    }
    const iframe = document.getElementById('test').contentWindow;
    document.getElementById('test').onload = function () {
      iframe.postMessage('hello', 'https://m.amap.com/picker/');
    };

    // sessionStorage.setItem('location', '30,120');
    // sessionStorage.setItem(
    //   'address',
    //   JSON.stringify({
    //     name: '12312',
    //     location: '30,120',
    //   }),
    // );

    window.addEventListener(
      'message',
      (e) => {
        if (!e.data.name) return;
        const alertInstance = alert('温馨提示', `您选择了:${e.data.name}`, [
          { text: '取消', style: 'default' },
          {
            text: '确认',
            onPress: async () => {
              // console.log(e.data.location);
              sessionStorage.setItem('location', JSON.stringify(e.data.location));
              alertInstance.close();
              sessionStorage.setItem('address', JSON.stringify(e.data));
              // eslint-disable-next-line no-unused-expressions
              props.onChange && props.onChange(e.data);
            },
          },
        ]);
      },
      false,
    );

    const metas = window.parent.document.querySelector('meta[name=viewport]').content;
    // console.log(metas);
    const arr = metas.split(',');
    arr.forEach((arrItem) => {
      if (arrItem.substr(0, 13) === 'initial-scale') {
        setScale(1 / arrItem.split('=')[1]);
        console.log(arrItem.split('=')[1]);
      }
    });
  }, []);

  return (
    // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
    <iframe
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 5,
        width: `${100 / scale}%`,
        height: `${100 / scale}vh`,
        background: '#fff',
        border: 'none',
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}
      title="iframe"
      id="test"
      src={`https://m.amap.com/picker/?center=${loc.lng},${loc.lat}&key=608d75903d29ad471362f8c58c550daf`}
    />
  );
};

export default IndexPage;
