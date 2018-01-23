import { Select } from 'antd';
import React from 'react';
const Option = Select.Option;
const OptGroup = Select.OptGroup;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const comboboxWithDifferentSize = <div>
                                    <h5>Large Size</h5>
                                    <Select size="large" defaultValue="lucy" style={ { width: 200 } } onChange={ handleChange }>
                                      <Option value="jack">Jack</Option>
                                      <Option value="lucy">Lucy</Option>
                                      <Option value="disabled" disabled>Disabled</Option>
                                      <Option value="yiminghe">Yiminghe</Option>
                                    </Select>
                                    <h5>Normal Size</h5>
                                    <Select defaultValue="lucy" style={ { width: 200 } } onChange={ handleChange }>
                                      <Option value="jack">Jack</Option>
                                      <Option value="lucy">Lucy</Option>
                                      <Option value="disabled" disabled>Disabled</Option>
                                      <Option value="yiminghe">Yiminghe</Option>
                                    </Select>
                                    <h5>Small Size</h5>
                                    <Select size="small" defaultValue="lucy" style={ { width: 200 } } onChange={ handleChange }>
                                      <Option value="jack">Jack</Option>
                                      <Option value="lucy">Lucy</Option>
                                      <Option value="disabled" disabled>Disabled</Option>
                                      <Option value="yiminghe">Yiminghe</Option>
                                    </Select>
                                  </div>

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={ i.toString(36) + i }>
                  { i.toString(36) + i }
                </Option>);
}

const tagsSelect = <Select tags style={ { width: '100%' } } searchPlaceholder="标签模式" onChange={ handleChange }>
                     { children }
                   </Select>;
const groupsSelect = <Select defaultValue="lucy" style={ { width: 200 } } onChange={ handleChange }>
                       <OptGroup label="Manager">
                         <Option value="jack">Jack</Option>
                         <Option value="lucy">Lucy</Option>
                       </OptGroup>
                       <OptGroup label="Engineer">
                         <Option value="Yiminghe">yiminghe</Option>
                       </OptGroup>
                     </Select>;

const multiSelects = <Select multiple style={ { width: '100%' } } placeholder="Please select" defaultValue={ ['a10', 'c12'] } onChange={ handleChange }>
                       { children }
                     </Select>

class ComboboxSample extends React.Component {

  render() {
    return (<div>
              <h4>Combobox Basic</h4>
              { comboboxWithDifferentSize }
              <br />
              <h4>Combobox with Tags</h4>
              { tagsSelect }
              <br />
              <h4>Combobox with Group</h4>
              { groupsSelect }
              <br />
              <h4>Combobox with multiselect</h4>
              { multiSelects }
            </div>
    );
  }
}

export default ComboboxSample;
