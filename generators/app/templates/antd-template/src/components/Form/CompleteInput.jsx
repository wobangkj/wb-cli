import { AutoComplete } from 'antd';
import PropsType from "prop-types";
import React, { useState } from 'react';

/*
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
      const payload = { name: searchText, current: 1, pageSize: 10 };

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

CompleteInput.prototype = {
  name: PropsType.string.isRequired,
  value: PropsType.number.isRequired,
  request: PropsType.func.isRequired,
  form: PropsType.object.isRequired
}

export default CompleteInput;
