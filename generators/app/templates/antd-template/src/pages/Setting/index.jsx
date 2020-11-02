/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import { Card, Form, message } from 'antd';
import React from 'react';
import Submitform from './components/Submitform';
import { editPass } from './service';

const TableList = () => {
  const [form] = Form.useForm();
  return (
    <Card style={{ height: '80vh' }}>
      <Submitform
        form={form}
        onSubmit={async value => {
          const res = await editPass(value);
          if (res.status === 200) {
            message.success('修改成功');
          } else {
            message.success(res.msg);
          }
        }}
        values={{ username: 'admin' }}
      />
    </Card>
  );
};

export default TableList;
