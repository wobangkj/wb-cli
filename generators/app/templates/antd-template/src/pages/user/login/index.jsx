import { Alert } from 'antd';
import React from 'react';
import { connect } from 'umi';
import LoginForm from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Submit } = LoginForm;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;

  const handleSubmit = (values) => {
    const { dispatch } = props;
    // 存储登录账户名前台展示
    sessionStorage.setItem('_USERNAME', values.username);
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };

  return (
    <div className={styles.main}>
      <LoginForm activeKey="account" onSubmit={handleSubmit}>
        <Tab key="account" tab="账户密码登录">
          {status === 'error' && !submitting && <LoginMessage content="账户或密码错误" />}

          <UserName
            name="username"
            placeholder="请输入用户名！"
            rules={[
              {
                required: true,
                message: '请输入用户名！',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="请输入密码！"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <Submit loading={submitting}>登录</Submit>
      </LoginForm>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
