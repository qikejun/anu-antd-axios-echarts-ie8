
const React = require( 'react');
const ReactDOM = require('react-dom');

import { Form, Input, Select, Checkbox, Radio ,DatePicker ,Rate ,Button } from 'antd';
const FormItem = Form.Item;
const CreateForm = Form.create;
const Option = Select.Option;
const RadioGroup = Radio.Group;


let Page2= React.createClass({
    getInitialState(){
        return {
            startValue: null,
            endValue: null,
            endOpen: false,
          };
    },
    disabledStartDate(startValue) {
        if (!startValue || !this.state.endValue) {
          return false;
        }
        return startValue.getTime() >= this.state.endValue.getTime();
      },
      disabledEndDate(endValue) {
        if (!endValue || !this.state.startValue) {
          return false;
        }
        return endValue.getTime() <= this.state.startValue.getTime();
      },
      onChange(field, value) {
        console.log(field, 'change', value);
        this.setState({
          [field]: value,
        });
      },
      onStartChange(value) {
        this.onChange('startValue', value);
      },
      onEndChange(value) {
        this.onChange('endValue', value);
      },
      handleStartToggle({ open }) {
        if (!open) {
          this.setState({ endOpen: true });
        }
      },
      handleEndToggle({ open }) {
        this.setState({ endOpen: open });
      },
    handleSelectChange(value) {
        console.log(value);
        console.log(`selected ${value}`);
    },
    userExists(rule,value,callBack){
        if(!value){
            callBack('为必填字段！！');
        }else{
            setTimeout(()=>{
                if(value==='12345'){
                    callBack([new Error('抱歉，该用户')])
                }else {
                    this.props.form.validateFields(['name'], { force: true });
                }
            })
        }
        callBack();
    },
    descFn(rule,value,callBack){
        console.log(rule,value);
        if(!value){
            callBack('为必填字段！！');
        }else{
            if(value.length<50){
                let count=50-value.length;
                this.props.form.validateFields(['desc'], { force: true });
                callBack('还可以输入'+count+'个字符！！')
            }else {
                // this.props.form.validateFields(['desc'], { force: true });
            }
        }
        callBack();
    },
    selectFn(){

    },
    handleSubmit(e) {
        // if (e.preventDefault){
        //     e.preventDefault();
        // }
        // else{
        //     e.returnValue=false;
        // }
        // this.props.form.validateFields((errors, values) => {
        //     if (!!errors) {
        //         console.log('Errors in form!!!');
        //         return;
        //     }
        //     console.log('Submit!!!');
        //     console.log(values);
        // });
        console.log(this.props.form.getFieldsValue());
    },
    handleReset(e) {
        if (e.preventDefault){
            e.preventDefault();
        }
        else{
            e.returnValue=false;
        }
        this.props.form.resetFields();
    },
    render(){
        const {getFieldProps,getFieldError,isFieldValidating} =this.props.form;
        let nameProps =getFieldProps('name',{
            // rules:[
            //     {required: true,min:5,message:'用户名至少5个字符'},
            //     {validator:this.userExists},
            // ]
        })
        let descProps =getFieldProps('desc',{
            rules:[
                {validator:''},
            ]
        })
        // let selectProps =getFieldProps('select',{
        //     // rules:[
        //     //     {validator:this.selectFn},
        //     // ]
        // })
        const formItemLayout = {
            labelCol: {span: 7},
            wrapperCol: { span: 12}
        }
        return (
            <Form horizontal >
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                    // hasFeedback
                    // help={isFieldValidating('name')?'校验中。。。':(getFieldError('name') || []).join(',')}
                >
                    <Input id="name" placeholder="实时校验，输入123456 看看" />
                </FormItem>

                <FormItem
                    label="文本域"
                    {...formItemLayout}
                    // hasFeedback
                    // help={isFieldValidating('name')?this.descScount.bind(this):''}
                >
                    <Input {...descProps} type="textarea" id="desc" rows="3" />
                </FormItem>

                <FormItem
                    id="select"
                    label="认识"
                    {...formItemLayout}
                >
                    <Select defaultValue="lucy" style={{ width: 200 }} onChange={this.handleSelectChange}>
                        <Option value="jack">jack</Option>
                        <Option value="lucy">lucy</Option>
                        <Option value="disabled" disabled>disabled</Option>
                        <Option value="yiminghe">yiminghe</Option>
                    </Select>
                </FormItem>
                <FormItem
                id="select"
                label="开始结束日期开始结束日期开始结束日期开始结束日期"
                {...formItemLayout}
                >
                    <DatePicker
                    disabledDate={this.disabledStartDate}
                    value={this.state.startValue}
                    placeholder="开始日期"
                    onChange={this.onStartChange}
                    toggleOpen={this.handleStartToggle}
                    />
                    <DatePicker
                        id='end-date'
                    disabledDate={this.disabledEndDate}
                    value={this.state.endValue}
                    placeholder="结束日期"
                    onChange={this.onEndChange}
                    open={this.state.endOpen}
                    toggleOpen={this.handleEndToggle}
                    />
                </FormItem>

                <FormItem
                    label="Checkbox 多选框"
                    {...formItemLayout}
                >
                    <Checkbox className="ant-checkbox-vertical">选项一</Checkbox>
                    <Checkbox className="ant-checkbox-vertical">选项二</Checkbox>
                    <Checkbox className="ant-checkbox-vertical" disabled>选项三（不可选）</Checkbox>
                </FormItem>

                <FormItem
                    label="Checkbox 多选框"
                    {...formItemLayout}
                >
                    <Checkbox className="ant-checkbox-inline">选项一</Checkbox>
                    <Checkbox className="ant-checkbox-inline">选项二</Checkbox>
                    <Checkbox className="ant-checkbox-inline">选项三</Checkbox>
                </FormItem>

                <FormItem
                    label="Radio 单选框"
                    {...formItemLayout}
                >
                    <RadioGroup defaultValue="b">
                        <Radio value="a">A</Radio>
                        <Radio value="b">B</Radio>
                        <Radio value="c">C</Radio>
                        <Radio value="d">D</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                    <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="ghost" onClick={this.handleReset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
})
Page2 =CreateForm()(Page2);
module.exports = Page2;
