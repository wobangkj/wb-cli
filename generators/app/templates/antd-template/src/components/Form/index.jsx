/* eslint-disable no-useless-escape */
/* eslint-disable no-nested-ternary */
import { PlusOutlined } from '@ant-design/icons';
import { message, Select, Upload, AutoComplete } from 'antd';
import React, { useState, useEffect } from 'react';
import ossSign from 'aliyun-oss-sign';
// import lodash from 'lodash';
import { prefix, accessId, accessKey, aliossHost } from '@/utils/request';

const handleMatchFullUrl = (data) =>
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
    data,
  );
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
 * @param {boolean} isArray 是否数组格式
 * @param {boolean} isMul 是否多文件上传
 * @param {boolean} isAbs 是否绝对地址显示，即图片显示不需要添加/api/v1等前缀，默认否
 * @param {*} props
 */
const UploadFile = (props) => {
  let files = [];

  if (props.fileList) {
    const isArray = Array.isArray(props.fileList) || props.isArray;
    if (isArray) {
      // 数组文件列表
      files = props.fileList.map((item, index) => {
        let { url } = item;
        if (item.response && item.response.data.value) {
          url = `${item.response.data.value}`;
        }
        return {
          url: `${props.isAbs ? '' : prefix}${url}`,
          rawUrl: url,
          uid: index,
        };
      });
    } else {
      // 逗号分隔文件列表
      files = props.fileList.split(',').map((item, index) => ({
        url: `${props.isAbs ? '' : prefix}${item}`,
        rawUrl: item,
        uid: index,
      }));
    }
  }

  const [file, setFile] = useState(files);

  /**
   *
   *
   * @memberof Index
   * @param {Array} data 图片逗号连接图片
   *
   */
  const handleRawImg = (data, isArray) => {
    const res = data.map((item) => {
      if (item.response && item.response.data.value) {
        return `${item.response.data.value}`;
      }
      return item.rawUrl;
    });
    if (isArray) {
      return res.length === 0 ? [] : res;
    }
    return res.length === 0 ? '' : res.join(',');
  };

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
    props.form.setFieldsValue({ [props.name]: handleRawImg(fileList, props.isArray) });
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
      {props.isMul ? (
        <div>
          <PlusOutlined />
          上传
        </div>
      ) : file.length === 0 ? (
        <div>
          <PlusOutlined />
          上传
        </div>
      ) : null}
    </Upload>
  );
};

/**
 * 阿里云oss文件上传 根据传入fileList类型进行解析
 * @param {boolean} isArray 是否数组格式
 * @param {boolean} isMul 是否多文件上传
 * @param {boolean} isAbs 是否绝对地址显示，即图片显示不需要添加alios主机地址等前缀，默认否
 * 支持逗号分隔和数组两种形式
 * @param {*} props
 */
const UploadAliossFile = (props) => {
  const [file, setFile] = useState([]);

  useEffect(() => {
    if (props.fileList) {
      let files = [];
      const isArray = Array.isArray(props.fileList) || props.isArray;
      if (isArray) {
        // 数组文件列表
        files = props.fileList.map((item, index) => {
          let { url } = item;
          if (item.response && item.response.data.value) {
            url = `${props.isAbs ? '' : aliossHost}${item.response.data.value}`;
          }
          return {
            url: `${url}`,
            rawUrl: url,
            uid: index,
          };
        });
      } else {
        // 逗号分隔文件列表
        files = props.fileList.split(',').map((item, index) => {
          const isAbs = handleMatchFullUrl(item) || props.isAbs;
          return {
            url: `${isAbs ? '' : aliossHost}${item}`,
            rawUrl: item,
            uid: index,
          };
        });
      }
      setFile(files);
    }
  }, []);

  /**
   *
   *
   * @memberof Index
   * @param {Array} data 图片逗号连接图片
   *
   */
  const handleRawImg = (data, isArray) => {
    const res = data.map((item) => {
      if (item.rawUrl) {
        return item.rawUrl;
      }
      return item.url;
    });
    if (isArray) {
      return res.length === 0 ? [] : res;
    }
    return res.length === 0 ? '' : res.join(',');
  };

  /**
   * oss秘钥
   * @param {*} f
   */
  const getExtraData = (f) => {
    const res = ossSign({
      accessId,
      accessKey,
      // 超时时间 单位：毫秒
      expiration: 300000000000, // 最大上传文件大小 单位：字节(b)
      contentLength: 20971521231,
    });

    return {
      key: f.url,
      OSSAccessKeyId: accessId,
      Signature: res.signature,
      policy: res.policy,
    };
  };

  /**
   * 文件命名
   * @memberof ModalForm
   */
  const handleTransformFile = (f) => {
    const suffix = f.name.slice(f.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    // eslint-disable-next-line no-param-reassign
    f.url = filename;
    // this.setState({
    //   filename,
    // });
    return f;
  };

  /**
   * 文件处理
   * @param {*} param0
   */
  // eslint-disable-next-line no-shadow
  const handleChange = ({ fileList }) => {
    setFile(fileList);
    console.log(handleRawImg(fileList, props.isArray));
    // 设置form值
    props.form.setFieldsValue({ [props.name]: handleRawImg(fileList, props.isArray) });
  };

  return (
    <Upload
      onChange={handleChange}
      fileList={file}
      name="file"
      listType="picture-card"
      transformFile={handleTransformFile}
      action={aliossHost}
      data={getExtraData}
    >
      {props.isMul ? (
        <div>
          <PlusOutlined />
          上传
        </div>
      ) : file.length === 0 ? (
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

export { SelectItem, UploadFile, CompleteInput, UploadAliossFile };
