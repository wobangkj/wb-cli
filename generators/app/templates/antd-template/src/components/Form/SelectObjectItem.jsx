
import { Select } from 'antd';
import PropsType from "prop-types";
import React from 'react';

/**
 * 对象数组下拉框
 * @param {*} props
 */
const SelectObjectItem = (props) => {
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
      {props.data.map((item) => (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};


SelectObjectItem.prototype = {
  name: PropsType.string.isRequired,
  value: PropsType.oneOfType(PropsType.string, PropsType.number),
  data: PropsType.array.isRequired,
  form: PropsType.object.isRequired
}

export default SelectObjectItem;
