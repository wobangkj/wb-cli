/* eslint-disable no-nested-ternary */
import { PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import PropsType from "prop-types";
import React, { useState, } from 'react';
import { prefix, } from '@/utils/request';

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

UploadFile.prototype = {
  name: PropsType.string.isRequired,
  fileList: PropsType.oneOfType(PropsType.arrayOf(PropsType.object), PropsType.string),
  isArray: PropsType.bool,
  isAbs: PropsType.bool,
  isMul: PropsType.bool,
  form: PropsType.object.isRequired
}

export default UploadFile;
