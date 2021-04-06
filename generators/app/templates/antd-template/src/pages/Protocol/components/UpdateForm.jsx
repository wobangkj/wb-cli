import React from '@/pages/protocol/components/node_modules/react';
import { Modal } from '@/pages/protocol/components/node_modules/antd';

const UpdateForm = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      width={1000}
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
