import React, { useState, useEffect } from '@/pages/setting/components/node_modules/react';
import { Form, Input, Row, Col, Button } from '@/pages/setting/components/node_modules/antd';

const FormItem = Form.Item;
const IntroForm = (props) => {
  const [formVals, setFormVals] = useState({
    username: props.values.username,
  });
  const [status, setStatus] = useState(false);
  const { onSubmit: handleUpdate } = props;
  useEffect(() => {
    if (status === true) {
      handleUpdate(formVals);
      setStatus(false);
    }
  }, [status]);
  const [form] = Form.useForm();
  const renderContent = () => {
    return (
      <Row>
        <Col span={24}>
          <FormItem
            rules={[{ required: true, message: '请输入账户名' }]}
            name="username"
            label="账户名"
          >
            <Input style={{ width: '350px' }} placeholder="请输入账户名" disabled value="admin" />
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem
            name="password"
            label="原密码"
            rules={[{ required: true, message: '请输入旧密码' }]}
          >
            <Input style={{ width: '350px' }} placeholder="请输入旧密码" />
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem
            name="password"
            label="新密码"
            rules={[{ required: true, message: '请输入新密码' }]}
          >
            <Input style={{ width: '350px' }} placeholder="请输入新密码" />
          </FormItem>
        </Col>
      </Row>
    );
  };
  const renderBotton = () => {
    return (
      <Row>
        <Col offset={3}>
          <FormItem>
            <Button
              type="primary"
              style={{ marginRight: 10 }}
              onClick={async () => {
                const fieldsValue = await form.validateFields();
                setFormVals({ ...formVals, ...fieldsValue });
                if (status === false) {
                  setStatus(true);
                }
              }}
            >
              保存
            </Button>
          </FormItem>
        </Col>
      </Row>
    );
  };
  return (
    <Form
      form={form}
      initialValues={{
        username: formVals.username,
      }}
    >
      {renderContent()}
      {renderBotton()}
    </Form>
  );
};

export default IntroForm;
