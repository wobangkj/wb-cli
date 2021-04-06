import { message, Select, Upload, AutoComplete } from 'antd';
import PropsType from "prop-types";
import React from 'react';


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


SelectItem.prototype = {
  name: PropsType.string.isRequired,
  value: PropsType.number.isRequired,
  data: PropsType.array.isRequired,
  form: PropsType.object.isRequired
}

export default SelectItem;



