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

  const [file, setFile] = useState(files);
  /**
   * 图片上传钩子
   *
   * @memberof ModalForm
   */
  const beforeUpload = (f) => {
    const isLt2M = f.size / 1024 / 1024 < 3;
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
    setFile(fileList);
    // 设置form值
    props.form.setFieldsValue({ [props.name]: fileList });
  };

  return (
    <Upload
      onChange={handleChange}
      fileList={file}
      withCredentials
      headers={{
        token: window.sessionStorage.getItem('_TOKEN'),
      }}
      listType="picture-card"
      beforeUpload={beforeUpload}
      action={`${prefix}upload`}
    >
      {file.length === 0 ? (
        <div>
          <PlusOutlined />
          上传
        </div>
      ) : null}
    </Upload>
  );
};

/**
 * 需要处理防抖节流问题，解决思路是将handleSearch 函数
 * 提取到页面最顶层，使用lodash等解决，代码示例
 *  函数组件外面
 *  const handleSearch = lodash.debounce(async (searchText, setOptions) => {
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
    }, 1000);
  函数组件
    const CompleteInput = (props) => {
        ...
        <AutoComplete
          value={value}
          options={option}
          onSelect={handleSelect}
          onChange={handleChange}
          onSearch={(e) => handleSearch(e, setOption)}
          placeholder="请输入"
        />
      }
 * 搜索输入框
 * 
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
      onSearch={handleSearch}
      placeholder="请输入"
    />
  );
};

export { SelectItem, UploadFile, CompleteInput };
