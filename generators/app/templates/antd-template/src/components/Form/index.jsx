import { PlusOutlined } from '@ant-design/icons';
import { message, Select, Upload, AutoComplete } from 'antd';
import React, { useState } from 'react';
import lodash from 'lodash';
import { prefix } from '@/utils/request';

/**
 * 数组下拉框
 * @param {*} props
 */
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
 * 文件上传 根据传入fileList类型进行解析
 * 支持逗号分隔和数组两种形式
 * @param {*} props
 */
const UploadFile = (props) => {
  let files = [];
  if (props.fileList) {
    if (typeof props.fileList === 'string') {
      // 逗号分隔文件列表
      files = props.fileList.split(',').map((item, index) => ({
        url: `${prefix}${item}`,
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
          url: `${prefix}${url}`,
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
      withCredentials
      headers={{
        token: window.sessionStorage.getItem('_TOKEN'),
      }}
      listType="picture-card"
      beforeUpload={beforeUpload}
      action={`${prefix}upload`}
    >
      {fileList.length === 0 ? (
        <div>
          <PlusOutlined />
          上传
        </div>
      ) : null}
    </Upload>
  );
};

/**
 * 搜索输入框
 */
const CompleteInput = (props) => {
  const [value, setValue] = useState(props.value);
  const [option, setOption] = useState([]);

  /**
   * 搜索返回结果
   * @param {*} searchText
   */
  const handleSearch = async (searchText) => {
    // 接口请求
    if (searchText) {
      const adminId = sessionStorage.getItem('_USERID');
      const role = parseInt(sessionStorage.getItem('_ROLE'), 10); // 0超管 1其它
      const payload = { name: searchText, current: 1, pageSize: 99999999 };

      if (role >= 1) {
        payload.adminId = adminId;
      }

      const res = await props.request(payload);
      if (res.status === 200) {
        setOption(
          res.data.map((item) => {
            // eslint-disable-next-line no-param-reassign
            item.value = item.name;
            return item;
          }),
        );
      }
    } else {
      setOption([]);
    }
  };

  /**
   * 设置值且赋值给表单
   * @param {*} data 当前值
   * @param {*} item 当前选中的item
   */
  const handleSelect = (data) => {
    props.form.setFieldsValue({
      [props.name]: data,
    });
  };

  /**
   * 设置搜索值
   * @param {*} data 当前值
   */
  const handleChange = (data) => {
    setValue(data);
  };

  return (
    <AutoComplete
      value={value}
      options={option}
      onSelect={handleSelect}
      onChange={handleChange}
      onSearch={lodash.debounce(handleSearch, 150)}
      placeholder="请输入"
    />
  );
};

export { SelectItem, UploadFile, CompleteInput };
