/* eslint-disable no-useless-escape */
/* eslint-disable no-nested-ternary */
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import PropsType from "prop-types";
import React, { useState, useEffect } from 'react';
import ossSign from 'aliyun-oss-sign';
import { accessId, accessKey, aliossHost } from '@/utils/request';

const handleMatchFullUrl = (data) =>
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
    data,
  );


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

UploadAliossFile.prototype = {
  name: PropsType.string.isRequired,
  fileList: PropsType.oneOfType(PropsType.arrayOf(PropsType.object), PropsType.string),
  isArray: PropsType.bool,
  isAbs: PropsType.bool,
  isMul: PropsType.bool,
  form: PropsType.object.isRequired
}

export default UploadAliossFile;
