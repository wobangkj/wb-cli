import React from '@/pages/curd/components/node_modules/react';
import { Modal } from '@/pages/curd/components/node_modules/antd';

const CreateForm = (props) => {
  const { modalVisible, onCancel } = props;
  return (
    <Modal
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;
