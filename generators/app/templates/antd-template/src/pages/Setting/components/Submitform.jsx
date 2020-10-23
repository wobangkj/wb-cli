/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Row, Col, Upload, Button } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const formLayout = {
  // labelCol: { span: 1 },
  wrapperCol: { span: 3 },
};
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
      <Row
        gutter={{
          xs: 24,
          sm: 16,
          md: 20,
        }}
      >
        <Col offset={6} span={14}>
          <FormItem
            rules={[{ required: true, message: '请输入账户名' }]}
            name="username"
            label="账户名"
          >
            <Input style={{ width: '300px' }} placeholder="请输入账户名" disabled value="admin" />
          </FormItem>
        </Col>
        <Col offset={6} span={14}>
          <FormItem
            name="require"
            label="原密码"
            rules={[{ required: true, message: '请输入旧密码' }]}
          >
            <Input style={{ width: '300px' }} placeholder="请输入旧密码" />
          </FormItem>
        </Col>
        <Col offset={6} span={14}>
          <FormItem
            name="password"
            label="新密码"
            rules={[{ required: true, message: '请输入新密码' }]}
          >
            <Input style={{ width: '300px' }} placeholder="请输入新密码" />
          </FormItem>
        </Col>
      </Row>
    );
  };
  const renderBotton = () => {
    return (
      <Row
        gutter={{
          xs: 24,
          sm: 16,
          md: 20,
        }}
      >
        <Col offset={10}>
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
      {...formLayout}
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
