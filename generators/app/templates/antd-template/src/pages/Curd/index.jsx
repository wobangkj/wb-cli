import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Upload, Modal, Select } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { queryRule, updateRule, addRule, removeRule } from './service';
/**
 * 添加节点
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');
  const res = await addRule(fields);
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
  const res = await updateRule({
    name: fields.name,
    desc: fields.desc,
    key: fields.key,
  });
  if (res.status === 200) {
    hide();
    message.success('修改成功');
    return true;
  }
  hide();
  message.error('修改失败请重试！');
  return false;
};

/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = (record, actionRef) => {
  Modal.confirm({
    title: '您确定执行此操作吗',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk: async () => {
      const hide = message.loading('正在删除');
      const res = await removeRule(record.id);
      if (res.status === 200) {
        hide();
        message.success('删除成功，即将刷新');
        if (actionRef.current) {
          actionRef.current.reload();
        }
        return;
      }
      hide();
      message.error('删除失败，请重试');
    },
  });
};

const SelectItem = (props) => {
  const { Option } = Select;

  /**
   * 下拉切换
   * @param {*} value
   */
  function handleChange(value) {
    props.form.setFieldsValue({ [props.name]: value });
  }
  return (
    <Select placeholder="请选择" defaultValue={props.value} onChange={handleChange}>
      {props.data.map((item, index) => (
        <Option key={item} value={index}>
          {item}
        </Option>
      ))}
    </Select>
  );
};

/**
 * 文件上传
 * @param {*} props
 */
const UploadFile = (props) => {
  let files = [];
  if (props.fileList) {
    if (typeof props.fileList === 'string') {
      // 逗号分隔文件列表
      files = props.fileList.split(',').map((item, index) => ({
        // url: `/api/v1/${item}`,
        url: item,
        rawUrl: item,
        uid: index,
      }));
    } else if (Array.isArray(props.fileList)) {
      // 数组文件列表
      files = props.fileList.map((item, index) => {
        let { url } = item;
        if (item.response && item.response.data.value) {
          url = `${item.response.data.value}`;
        }
        return {
          // url: `/api/v1/${url}`,
          url,
          rawUrl: url,
          uid: index,
        };
      });
    }
  }

  const [fileList, setFileList] = useState(files);
  /**
   * 图片上传钩子
   *
   * @memberof ModalForm
   */
  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 3;
    if (!isLt2M) {
      message.error('图片大小不能超过2MB');
    }
    return isLt2M;
  };

  /**
   * 文件处理
   * @param {*} param0
   */
  // eslint-disable-next-line no-shadow
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    // 设置form值
    props.form.setFieldsValue({ [props.name]: fileList });
  };

  return (
    <Upload
      onChange={handleChange}
      fileList={fileList}
      listType="picture-card"
      beforeUpload={beforeUpload}
      action="/api/v1/file/upload"
    >
      <div>
        <PlusOutlined />
        上传
      </div>
    </Upload>
  );
};

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '规则名称',
      dataIndex: 'name',
      rules: [
        {
          required: true,
          message: '规则名称为必填项',
        },
      ],
    },
    {
      title: '规则图片',
      dataIndex: 'avatar',
      hideInSearch: true,
      hideInTable: true,
      renderFormItem: (_, record, form) => {
        // 处理文件上传
        return <UploadFile form={form} name="avatar" fileList={record.value} />;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '已开具',
          status: 'Default',
        },
        1: {
          text: '已作废',
          status: 'Default',
        },
      },
      renderFormItem: (_, record, form) => (
        <SelectItem
          form={form}
          name="status"
          defaultValue={record.value}
          data={['已开具', '已作废']}
        />
      ),
    },
    {
      title: '描述',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      hideInForm: true,
      renderText: (val) => `${val} 万`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
        2: {
          text: '已上线',
          status: 'Success',
        },
        3: {
          text: '异常',
          status: 'Error',
        },
      },
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }

        return defaultRender(item);
      },
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
              handleUpdateModalVisible(true);
              setFormValues(record);
            }}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button
            type="danger"
            onClick={async () => {
              handleRemove(record, actionRef);
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper title=" ">
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params) => queryRule(params)}
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
    </PageHeaderWrapper>
  );
};

export default TableList;
