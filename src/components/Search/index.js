import { getSearch } from "../../common/api";

const React = require( 'react');
// const ReactDOM = require('react-dom');
import moment from'moment';
import {Row, Col, Form, Input, Select, Radio ,DatePicker ,Button } from 'antd';
const FormItem = Form.Item;
const CreateForm = Form.create;
const Option = Select.Option;
import PubSub from "pubsub-js";
// const RadioGroup = Radio.Group;

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state={
            /*
            * 控制查询条件显示几栏
            * 显示内容占据一定的宽度，
            * 查询条件显示
            * */
            columns:2,
            startValue: null,
            endValue: null,
            endOpen: false,
        }
    }
    //开始截止时间
    disabledStartDate(startValue) {
        if (!startValue || !this.state.endValue) {
            return false;
        }
        return startValue.getTime() >= this.state.endValue.getTime();
    }
    disabledEndDate(endValue) {
        if (!endValue || !this.state.startValue) {
            return false;
        }
        return endValue.getTime() <= this.state.startValue.getTime();
    }
    onStartChange(value) {
        this.onChange('startValue', value);
    }
    onEndChange(value) {
        this.onChange('endValue', value);
    }
    handleStartToggle({ open }) {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }
    handleEndToggle({ open }) {
        this.setState({ endOpen: open });
    }
    //按钮
    async handleSubmit(){
        let data=this.props.form.getFieldsValue();
        // moment(data.date,'YYYY-MM-DD HH:mm');
        data.date=moment(data.date).format('YYYY-MM-DD HH:mm:ss')  ;
        data.offset=1;
        data.limit=10;
        let params =await getSearch(data);
        console.log(params);
        PubSub.publish('loading',params);
    }
    handleReset(e) {
        if (e.preventDefault){
            e.preventDefault();
        }
        else{
            e.returnValue=false;
        }
       this.props.form.resetFields();
    }
    disabledDate(current) {
        return current && current.getTime() > Date.now();
    };
    render(){
        const {getFieldProps} =this.props.form;
        let size=24/this.state.columns;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        // const formItemBtnLayout = {
        //     labelCol: { span: 10 },
        //     wrapperCol: { span: 14 },
        // };
        return (
            <Form horizontal onSubmit={this.handleSubmit} style={{ marginTop: 16 }}>
                <Row gutter={16}>
                    <Col span={size}>
                        <FormItem
                            {...formItemLayout}
                            label="会员名称"
                        >
                            <Input {...getFieldProps('name',{validator:''})} placeholder="请输入会员名称" />
                        </FormItem>
                    </Col>
                    <Col span={size}>
                        <FormItem
                            {...formItemLayout}
                            label="会员ID"
                        >
                            <Input {...getFieldProps('id',{validator:''})} placeholder="请输入会员名称" />
                        </FormItem>
                    </Col>
                    <Col span={size}>
                        <FormItem
                            {...formItemLayout}
                            label="操作时间"
                        >
                            <DatePicker {...getFieldProps('date',{validator:''})} format="yyyy-MM-dd" disabledDate={this.disabledDate} />
                        </FormItem>
                    </Col>
                    <Col span={size}>
                        <FormItem
                            id="select"
                            label="状态"
                            {...formItemLayout}
                        >
                            <Select defaultValue="2" {...getFieldProps('statue',{validator:''})} >
                                <Option value="1">已发布</Option>
                                <Option value="2">已取消</Option>
                                <Option value="3" disabled>未处理</Option>
                                <Option value="4">已完成</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    {/*<Col span={size}>*/}
                        {/*<FormItem*/}
                            {/*label="开始截止日期"*/}
                            {/*{...formItemLayout}*/}
                        {/*>*/}
                            {/*<DatePicker*/}
                                {/*disabledDate={this.disabledStartDate}*/}
                                {/*value={this.state.startValue}*/}
                                {/*placeholder="开始日期"*/}
                                {/*onChange={this.onStartChange}*/}
                                {/*toggleOpen={this.handleStartToggle}*/}
                                {/*{...getFieldProps('start_date',{validator:''})}*/}
                            {/*/>*/}
                            {/*<DatePicker*/}
                                {/*disabledDate={this.disabledEndDate}*/}
                                {/*value={this.state.endValue}*/}
                                {/*placeholder="截止日期"*/}
                                {/*onChange={this.onEndChange}*/}
                                {/*open={this.state.endOpen}*/}
                                {/*toggleOpen={this.handleEndToggle}*/}
                                {/*{...getFieldProps('end_date',{validator:''})}*/}
                            {/*/>*/}
                        {/*</FormItem>*/}
                    {/*</Col>*/}
                </Row>
                <Row gutter={16} type="flex" justify='end'>
                    <FormItem >
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button>
                    </FormItem>
                </Row>
            </Form>
        )
    }
}
Search =CreateForm()(Search);
module.exports=Search;
