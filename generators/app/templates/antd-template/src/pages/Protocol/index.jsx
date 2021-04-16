import { Button, message, Card } from 'antd';
import React, { useState, useRef } from 'react';
// import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Editor from '@/components/Editor';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { searchProtocol, updateProtocol, createProtocol } from './service.js';

/**
 *
 *
 * @memberof Index
 * @param {Array} data 图片逗号连接图片
 *
 */
const handleRawImg = (data) => {
  const res = data.map((item) => {
    if (item.response && item.response.data.path) {
      return `${item.response.data.path}`;
    }
    return item.rawUrl;
  });
  return res.length === 0 ? '' : res.join(',');
};

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');
  // eslint-disable-next-line no-param-reassign
  fields.content = fields.content.toHTML();
  if (Array.isArray(fields.image)) {
    // eslint-disable-next-line no-param-reassign
    fields.image = handleRawImg(fields.image);
  }

  const res = await createProtocol(fields);
  if (res.status === 200) {
    hide();
    message.success('添加成功');
    return true;
  }
  hide();
  message.error('添加失败请重试！');
  return false;
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('正在修改');
  // eslint-disable-next-line no-param-reassign
  fields.content = fields.content.toHTML();
  if (Array.isArray(fields.image)) {
    // eslint-disable-next-line no-param-reassign
    fields.image = handleRawImg(fields.image);
  }
  const res = await updateProtocol(fields);
  if (res.status === 200) {
    hide();
    message.success('修改成功');
    return true;
  }
  hide();
  message.error('修改失败请重试！');
  return false;
};

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: '用户协议',
      hideInSearch: true,
      render: () => '用户协议',
    },
    {
      title: '内容',
      dataIndex: 'content',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '必填项',
        },
      ],
      hideInTable: true,
      renderFormItem: (_, record, form) => (
        <Editor form={form} name="content" value={record.value} />
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              console.log(record);
              handleUpdateModalVisible(true);
              setFormValues(record);
            }}
          >
            编辑
          </Button>
        </>
      ),
    },
  ];

  return (
    <Card>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        options={false}
        search={false}
        toolBarRender={() => []}
        request={(params) => {
          return searchProtocol(params);
        }}
        columns={columns}
      />

      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
      <UpdateForm
        modalVisible={updateModalVisible}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setFormValues({});
        }}
      >
        <ProTable
          onSubmit={async (value) => {
            const success = await handleUpdate({ id: formValues.id, ...value });

            if (success) {
              handleUpdateModalVisible(false);
              setFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          form={{ initialValues: formValues }}
          columns={columns}
          rowSelection={{}}
        />
      </UpdateForm>
    </Card>
  );
};

export default TableList;
