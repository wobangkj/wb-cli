import PropsType from "prop-types";
import { Input, Tooltip } from 'antd';
import React from 'react';

/**
 * 输入框
 * @param {*} props
 */
const FormInput = ({
  disabled = false,
  type = 'text',
  readOnly = false,
  tips,
  name,
  form,
  value,
}) => {
  /**
   * 编辑
   * @param {*} val
   */
  function handleChange(val) {
    form.setFieldsValue({ [name]: val });
  }
  return (
    <Input
      suffix={
        tips ? (
          <Tooltip title={tips}>
            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        ) : null
      }
      type={type}
      disabled={disabled}
      readOnly={readOnly}
      placeholder="请输入"
      defaultValue={value}
      onChange={handleChange}
    />
  );
};


FormInput.prototype = {
  name: PropsType.string.isRequired,
  value: PropsType.number.isRequired,
  tips: PropsType.array.isRequired,
  disabled: PropsType.bool,
  type: PropsType.arrayOf('button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'),
  readOnly: PropsType.bool,
  form: PropsType.object.isRequired
}

export default FormInput;
