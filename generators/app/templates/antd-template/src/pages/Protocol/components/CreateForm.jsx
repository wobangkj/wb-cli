import React from '@/pages/protocol/components/node_modules/react';
import { Modal } from '@/pages/protocol/components/node_modules/antd';

const CreateForm = (props) => {
  const { modalVisible, onCancel } = props;
  return (
    <Modal
      width={1000}
      destroyOnClose
      title="新增"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;
