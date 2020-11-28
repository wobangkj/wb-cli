/* eslint-disable react/no-typos */
import React, { useEffect } from 'react';
import { useLocation } from 'umi';
import { Modal } from 'antd-mobile';
import PropTypes from 'prop-types';
import { getOpenId, getUserInfo } from '@/services/Applet_Configuration';
// import {
//   wxPay,
//   wxInfo,
//   // aliPay
// } from '@/services/shop';
import { APPID, ROOT_PRO } from '@/services/index';
// import { isWxWeb } from '@/utils';
import styles from './index.less';

/**
 *
 * successRedirect  {string} 成功跳转地址 诸如付款成功跳转到我的订单等
 * codeRedirect {string} 授权微信code地址，诸如立即付款需要微信授权code 通
 * 过这个code可以获取openid
 * cancelCb {boolean} 取消回调，回来处理隐藏显示
 */
const Index = ({ codeRedirect, cancelCb = function () {}, isAuth }) => {
  const params = useLocation();

  // const [isAuth] = useState(true);

  const getData = async () => {
    const { result } = await getOpenId({
      appid: APPID,
      code: params.query.code,
    });
    const res = await getUserInfo({
      access_token: result.access_token,
      openid: result.openid,
    });
    // const result = {
    //   openid: '12313123',
    // };
    // const res = {
    //   result: {
    //     nickname: '测试',
    //     headimgurl: 'https://zyyz.ctpaas.com/general/icon.png',
    //   },
    // };
    try {
      sessionStorage.setItem('_OPENID', result.openid);
      sessionStorage.setItem('_NAME', res.result.nickname);
      sessionStorage.setItem('_HEADURL', res.result.headimgurl);
      cancelCb(res.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.query.code) {
      // 有授权code
      getData();
    }
  }, [params.query.code]);

  const handleCancel = () => {
    cancelCb();
  };

  return (
    <Modal
      visible={isAuth}
      transparent
      title="微信授权登录"
      className={styles.body}
      maskClosable={false}
      // onClose={this.onClose('modal1')}
      footer={[]}
      // afterClose={() => { alert('afterClose'); }}
    >
      <div className={styles.modal}>
        <div onClick={handleCancel} className={styles.btn}>
          取消
        </div>
        <a
          style={{ color: '#b28850', borderLeft: '1px solid #ddd' }}
          className={styles.btn}
          target="_self"
          // href={`http://localhost${codeRedirect}?code=081R1O0w3BWEmV23fP0w3VTgDs3R1O0T&state=STATE`}

          href={`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${encodeURIComponent(
            `${ROOT_PRO}${codeRedirect}`,
          )}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1`}
        >
          立即登录
        </a>
      </div>
    </Modal>
  );
};

Index.PropTypes = {
  price: PropTypes.number.isRequired,
  successRedirect: PropTypes.string,
  codeRedirect: PropTypes.string,
  wxWebPay: PropTypes.bool,
  type: PropTypes.number,
};

export default Index;
