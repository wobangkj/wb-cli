import { CloudDownloadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React, { useState, useEffect } from 'react';
import { ContentUtils } from 'braft-utils';
import { prefix, host } from '@/utils/request';
import BraftEditor from 'braft-editor';

/**
 * 富文本
 * @param {boolean} isAffix 是否开启附件上传 默认关闭
 * @param {boolean} isFullUrl 是否开启绝对路径 默认关闭
 */
const Editor = (props) => {
  const [introduce, setIntroduce] = useState(props.value ? BraftEditor.createEditorState(props.value) : null);
  const serverURL = `${prefix}upload`; // 上传文件路径

  useEffect(() => {
    props.form.setFieldsValue({ [props.name]: introduce });
  }, [props.value]);

  /**
   * 富文本文件上传
   *
   * @memberof Index
   */
  const braftEditorUploadFn = (param) => {
    const xhr = new XMLHttpRequest();

    const fd = new FormData();

    const successFn = () => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址

      param.success({
        url: `${props.isFullUrl ? host : ''}${prefix}${JSON.parse(xhr.responseText).data.path}`,
      });
    };

    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress((event.loaded / event.total) * 100);
    };

    const errorFn = () => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.',
      });
    };

    xhr.upload.addEventListener('progress', progressFn, false);
    xhr.addEventListener('load', successFn, false);
    xhr.addEventListener('error', errorFn, false);
    xhr.addEventListener('abort', errorFn, false);
    fd.append('file', param.file);
    xhr.open('POST', serverURL, true);
    xhr.setRequestHeader('token', window.sessionStorage.getItem('_TOKEN'));
    xhr.send(fd);
  };

  /**
   * 附件上传
   * @param {*} param
   */
  const handleUpload = (param) => {
    if (!param.file) {
      return false;
    }

    let hide = message.loading({
      content: `正在上传中，已完成1%`,
      duration: 0,
      key: 'load',
    });

    const xhr = new XMLHttpRequest();

    const fd = new FormData();

    const successFn = () => {
      // 假设服务端直接返回文件上传后的地址

      hide();
      const res = JSON.parse(xhr.responseText);
      setIntroduce(
        ContentUtils.insertHTML(
          introduce,
          `<a target='_blank' href='${prefix}${res.data.path}'>${res.name}</a>`,
        ),
      );
    };

    const progressFn = (event) => {
      hide = message.loading({
        content: `正在上传中，已完成${window.parseInt((event.loaded / event.total) * 100, 10)}%`,
        duration: 0,
        key: 'load',
      });
    };

    const errorFn = () => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.',
      });
    };

    xhr.upload.addEventListener('progress', progressFn, false);
    xhr.addEventListener('load', successFn, false);
    xhr.addEventListener('error', errorFn, false);
    xhr.addEventListener('abort', errorFn, false);
    fd.append('file', param.file);
    xhr.open('POST', serverURL, true);
    xhr.setRequestHeader('token', window.sessionStorage.getItem('_TOKEN'));
    xhr.send(fd);

    return true;
  };

  const extendControls = [
    {
      key: 'antd-uploader',
      type: 'component',
      component: (
        <Upload showUploadList={false} customRequest={handleUpload}>
          <Button type="button" className="control-item button upload-button" data-title="插入附件">
            附件
            <CloudDownloadOutlined />
          </Button>
        </Upload>
      ),
    },
  ];

  /**
   *
   * @param {*} param0
   */
  // eslint-disable-next-line no-shadow
  const handleChange = (value) => {
    // setFileList(fileList);
    // 设置form值
    setIntroduce(value);
    props.form.setFieldsValue({ [props.name]: value });
  };

  return (
    <BraftEditor
      value={introduce}
      onChange={handleChange}
      style={{ border: '1px solid #d9d9d9' }}
      extendControls={props.isAffix ? extendControls : []}
      media={{
        uploadFn: braftEditorUploadFn,
      }}
    />
  );
};

export default Editor;
