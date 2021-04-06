import { Radio } from 'antd';
import PropsType from "prop-types";
import React from 'react';



/**
 * 单选按钮
 * @param {*} props
 */
const FormRadio = ({ disabled = false, name, form, value, data }) => {
  /**
   * 编辑
   * @param {*} val
   */
  function handleChange(val) {
    form.setFieldsValue({ [name]: val });
  }
  return (
    <Radio.Group
      disabled={disabled}
      placeholder="请选择"
      onChange={handleChange}
      defaultValue={value}
    >
      {data.map((item) => (
        <Radio key={item.value} value={item.value}>
          {item.label}
        </Radio>
      ))}
    </Radio.Group>
  );
};


FormRadio.prototype = {
  name: PropsType.string.isRequired,
  value: PropsType.number.isRequired,
  data: PropsType.arrayOf(PropsType.object),
  disabled: PropsType.bool,
  form: PropsType.object.isRequired
}

export default FormRadio;
