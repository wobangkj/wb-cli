import React from 'react';
import { Modal } from 'antd';

const UpdateForm = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title="修改"
      visible={modalVisible}
      footer={null}
      onCancel={() => onCancel()}
    >
      {props.children}
    </Modal>
  );
};

export default UpdateForm;
