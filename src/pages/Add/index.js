// const React = require( 'react');
import React from 'react'
// import {browserHistory} from "react-router";
import moment from 'moment'
import { Form, Input, Select, DatePicker, Radio, Col, Button, InputNumber, Checkbox } from 'antd';
import { sendForm } from '../../common/api.js'
import {browserHistory} from "react-router";
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleSelectChange(value) {
    console.log(`selected ${value}`);
  }

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  checkId(rule, value, callback) {
    var reg = /^(\d[0-9]{1,1})$/;
    if (!reg.test(value)) {
      callback(new Error('必须为10-99之间的整数'));
    } else {
      callback()
    }
  }
  async sendFn(values){
      let data = await sendForm(values);
      alert(data.success)
      // let path = `/page01`;
      // browserHistory.push(path);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      if (values.endDate) {
        values.endDate = moment(values.endDate).format('YYYY-MM-DD')
      }
      if (values.startDate) {
        values.startDate = moment(values.startDate).format('YYYY-MM-DD')
      }
      console.log('Submit!!!');
      console.log(values);
        this.sendFn(values)

      // if (data) {
      //   console.log(data)
      // }
    });
  }

  render() {
    const { getFieldProps } = this.props.form
    return (
      <div>
        <Form horizontal>
          <FormItem
            id="control-input"
            label="name"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 3 }}
          >
            <Input {...getFieldProps('name', {
              rules: [{
                required: true,
                message: '必填',
                type: 'string'
              }]
            })} placeholder="请输入姓名" />
          </FormItem>

          <FormItem
            id="control-input-number"
            label="ID"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 3 }}
          >
            <Input {...getFieldProps('id', {
              rules: [{
                required: true,
                message: '必填',
              }, {
                validator: this.checkId.bind(this),
              }]
            })} placeholder="请输入数字" />
          </FormItem>

          <FormItem
            label="备注"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 6 }}
          >
            <Input {...getFieldProps('desc', {
              rules: [
                { required: true, message: '真的不打算写点什么吗？' }
              ],
            })} type="textarea" rows="3" />
          </FormItem>

          <FormItem
            id="select"
            label="状态"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          >
            <Select {...getFieldProps('status', {
              rules: [{
                required: true,
                message: '必填项'
              }]
            })} size="large" style={{ width: 200 }}>
              <Option value="0">已完成</Option>
              <Option value="1">已发布</Option>
              <Option value="2">已取消</Option>
            </Select>
          </FormItem>

          <FormItem
            label="商品"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          >
            <Select {...getFieldProps('goods', {
              rules: [{
                required: true,
                message: '必填'
              }]
            })} multiple placeholder="请选择商品" style={{ width: 200 }}>
              <Option value="0">商品1</Option>
              <Option value="1">商品2</Option>
              <Option value="2">商品3</Option>
              <Option value="3">商品4</Option>
            </Select>
          </FormItem>

          <FormItem
            label="Radio 单选框"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <RadioGroup defaultValue="b" {...getFieldProps('radio', {
              rules: [{
                required: true,
                message: '必填'
              }]
            })}>
              <Radio value="a">A</Radio>
              <Radio value="b">B</Radio>
              <Radio value="c">C</Radio>
              <Radio value="d">D</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            label="DatePicker 日期选择框"
            labelCol={{ span: 6 }}
            required
          >
            <Col span="3">
              <FormItem>
                <DatePicker {...getFieldProps('startDate')} />
              </FormItem>
            </Col>
            <Col span="1">
              <p className="ant-form-split">-</p>
            </Col>
            <Col span="3">
              <FormItem>
                <DatePicker {...getFieldProps('endDate')} />
              </FormItem>
            </Col>
          </FormItem>
          <FormItem
            wrapperCol={{ span: 12, offset: 7 }}
          >
            <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
            &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
Add = Form.create()(Add);
export default Add;