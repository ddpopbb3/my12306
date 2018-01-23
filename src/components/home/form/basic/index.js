import { Form, Input, Popover, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
import React from 'react';
const FormItem = Form.Item;
const Option = Select.Option;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];


class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      captchaVisible: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
    this.checkCaptcha = this.checkCaptcha.bind(this);
    this.fetchCaptcha = this.fetchCaptcha.bind(this);
    this.hideCaptcha = this.hideCaptcha.bind(this);
    this.showCaptcha = this.showCaptcha.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value
    });
  }
  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkCaptcha(rule, value, callback) {
    if (this.state.captcha !== value) {
      callback('Captcha is not valid!');
    } else {
      callback();
    }
  }
  fetchCaptcha() {
    fetch("/api/captcha").then((response) => {
      return response.json();
    }).then((captcha) => {
      this.setState({
        captcha: captcha,
        captchaVisible: true
      })
    })
  }
  hideCaptcha() {
    this.setState({
      captchaVisible: false
    })
  }
  showCaptcha() {
    this.setState({
      captchaVisible: true
    })
  }
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {
        force: true
      });
    }
    callback();
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 14,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select className="icp-selector">
        <Option value="86">+86</Option>
      </Select>
    );
    const content = (
    <div style={ { width: "100%" } }>
      { this.state.captcha }
    </div>
    );
    return (
      <div>
        <h4 style={ { textAlign: "center" } }>Form Basic</h4>
        <Form onSubmit={ this.handleSubmit }>
          <FormItem {...formItemLayout} label="E-mail" hasFeedback>
            { getFieldDecorator('email', {
                rules: [{
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                }, {
                  required: true,
                  message: 'Please input your E-mail!',
                }],
              })(
                <Input />
              ) }
          </FormItem>
          <FormItem {...formItemLayout} label="Password" hasFeedback>
            { getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: 'Please input your password!',
                }, {
                  validator: this.checkConfirm,
                }],
              })(
                <Input type="password" />
              ) }
          </FormItem>
          <FormItem {...formItemLayout} label="Confirm Password" hasFeedback>
            { getFieldDecorator('confirm', {
                rules: [{
                  required: true,
                  message: 'Please confirm your password!',
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input type="password" onBlur={ this.handleConfirmBlur } />
              ) }
          </FormItem>
          <FormItem {...formItemLayout} label={ (
            <span>Nickname&nbsp;<Tooltip title="What do you want other to call you?"></Tooltip></span>
          ) } hasFeedback>
            { getFieldDecorator('nickname', {
                rules: [{
                  required: true,
                  message: 'Please input your nickname!'
                }],
              })(
                <Input />
              ) }
          </FormItem>
          <FormItem {...formItemLayout} label="Habitual Residence">
            { getFieldDecorator('residence', {
                initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                rules: [{
                  type: 'array',
                  required: true,
                  message: 'Please select your habitual residence!'
                }],
              })(
                <Cascader options={ residences } />
              ) }
          </FormItem>
          <FormItem {...formItemLayout} label="Phone Number">
            { getFieldDecorator('phone', {
                rules: [{
                  required: true,
                  message: 'Please input your phone number!'
                }],
              })(
                <Input addonBefore={ prefixSelector } />
              ) }
          </FormItem>
          <FormItem {...formItemLayout} label="Captcha" extra="We must make sure that your are a human.">
            <Row gutter={ 8 }>
              <Col span={ 12 }>
              { getFieldDecorator('captcha', {
                  rules: [{
                    required: true,
                    message: 'Please input the captcha you got!'
                  }, {
                    validator: this.checkCaptcha,
                  }],
                })(
                  <Input size="large" onBlur={ this.hideCaptcha } onFocus={ this.showCaptcha } />
                ) }
              </Col>
              <Col span={ 12 }>
              <Popover content={ content } trigger="click" placement="right" visible={ this.state.captcha && this.state.captchaVisible }>
                <Button size="large" onClick={ this.fetchCaptcha }>Get captcha</Button>
              </Popover>
              </Col>
            </Row>
          </FormItem>
          <FormItem {...tailFormItemLayout} style={ { marginBottom: 8 } }>
            { getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>I have read the <a>agreement</a></Checkbox>
              ) }
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">Register</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);


class FormBasic extends React.Component {

  render() {
    return (
      <WrappedRegistrationForm />
    );
  }
}

export default FormBasic;
