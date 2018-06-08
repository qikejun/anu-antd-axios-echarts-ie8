const React = require( 'react');
import {browserHistory} from "react-router";
import {getSearch} from "./../../common/api";
import PubSub from "pubsub-js";

import { Table ,Button } from 'antd';

class SearchTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedRowKeys: [],  // 勾选
            loading: false,
            tableData:[],
            total:0,
            pageSize:10,
            current:1
        }
    }
    deleteFn(){
        this.setState({ loading: true });
        // 模拟 ajax 请求，完成后清空
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    addFn(){
        let path = `/add`;
        browserHistory.push(path);
    }
    componentDidMount() {
    this.pubsub_token = PubSub.subscribe('loading', (topic, data)=> {
        // console.log(topic,data);
        // console.log(arguments);

        this.setState({
            tableData: data.rows,
            total: data.total
        });
    });
    }
    componentWillUnmount(){
        PubSub.unsubscribe(this.pubsub_token);
    }
    async pageChange(params){
        let data = await getSearch(params);
        this.setState({
            tableData: data.rows
        });
    }
    render(){
        let { loading, selectedRowKeys ,tableData,total ,pageSize,current } = this.state;
        let _this = this;
        let rowSelection = {
            selectedRowKeys,
            // type:'checkbox',//radio
            onChange: (selectedRowKeys,selectedRows)=>{
                console.log(
                    //选中项key数组按顺序
                    selectedRowKeys,
                    //选中项数据数组按顺序
                    selectedRows)
            },
            // getCheckboxProps:(record)=>{console.log(record)},
            onSelect:(record,selected,selectedRows)=>{console.log(
                //当前选中取消选中的这条数据
                record,
                //是否选中
                selected,
                //操作之后依然选中的项数组
                selectedRows)},//选中取消选中回调
            onSelectAll:(selected,selectedRows,changeRows)=>{console.log(selected,selectedRows,changeRows)}
        };
        let pagination={
            total: total, //数据总数量
            pageSize: pageSize,  //显示几条一页
            hideOnSinglePage:true,//只有一页时是否隐藏分页器
            // defaultCurrent:3,   //默认第几页
            // defaultPageSize: 10, //默认显示几条一页
            showQuickJumper:true,//是否可以快速跳转至某页
            // pageSizeOptions:"'10', '20', '30'",
            showSizeChanger: true,  //是否显示可以设置几条一页的选项
            onShowSizeChange(current, pageSize) {  //当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
                let params={
                    current:current,
                    pageSize:pageSize
                }
                _this.pageChange(params);
            },
            onChange(current) {  //点击改变页数的选项时调用函数，current:将要跳转的页数
                let params={
                    current:current,
                    pageSize:pageSize
                }
                _this.pageChange(params);
            },
            showTotal: function () {  //设置显示一共几条数据
                return '共 ' + total + ' 条数据';
            }
        };
        let columns = [
            {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            // fixed:'left',//固定列样式有问题
            // render: (text) => <a href="javascript:void(0);" onClick={query}>{text}</a>,
            // filters:[],	//表头的筛选菜单项
            // onFilter:(value,record)=>record.name.indexOf(value)!==-1,	//本地模式下，确定筛选的运行函数
            // filterMultiple:true,	//是否多选
            // filterDropdown:()=>{},	//可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互,
            // filterDropdownVisible:true,	//用于控制自定义筛选菜单是否可见
            // onFilterDropdownVisibleChange:()=>{},	//自定义筛选菜单可见变化时调用
            // sorter:(a,b)=>a.name.length-b.name.length,	//排序函数，本地排序使用一个函数，需要服务端排序可设为 true
            // cloSpan:0,//表头列合并,设置为 0 时，不渲染
            width:'10%',//列宽度	String or Number
            // className:'',//列的 className
            //fixed:true,	//列是否固定，可选 true(等效于 left) 'left' 'right'
            // filteredValue:[key],	//筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组
            // sortOrder:''	//排序的受控属性，外界可用此控制列的排序，可设置为 'ascend' 'descend' false
            },
            {
                title: 'ID',
                dataIndex: 'id',
                key:'id',
                width:'10%'
            },
            {
                title: '商品',
                dataIndex: 'goods',
                key:'goods',
                width:'10%'
            },
            {
                title: '新增日期',
                dataIndex: 'date',
                key:'date',
                width:'10%'
            },
            {
                title: '开始日期',
                dataIndex: 'start_data',
                key:'start_data',
                width:'10%'
            },
            {
                title: '截止日期',
                dataIndex: 'end_data',
                key:'end_data',
                width:'10%'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key:'status',
                width:'10%'
            },
            {
                title: '备注',
                dataIndex: 'desc',
                key:'desc',
                width:'20%'
            },
            {
                title: '操作',
                key: 'operation',
                width: '20%',
                // fixed:'right',
                render: (text, record) => (
                    <span>
                        <a href="#">详情</a>
                        <span className="ant-divider"></span>
                        <a href="#">编辑</a>
                        <span className="ant-divider"></span>
                        <a href="#" className="ant-dropdown-link">
                          删除
                        </a>
                    </span>
                ),
            }
        ];
        let hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <span style={{ marginRight: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
                    <Button style={{ marginRight: 8 }} type="primary" onClick={this.deleteFn}
                            disabled={!hasSelected} loading={loading}
                    >批量删除</Button>
                    <Button type="primary" onClick={this.addFn}>新增</Button>
                </div>
                <Table
                    loading={this.state.loading}//表格加载状态
                    columns={columns}
                    dataSource={tableData}
                    // rowSelection={rowSelection}
                    pagination={pagination}
                    scroll={{ x: true, y: false }} //横向或纵向支持滚动，也可用于指定滚动区域的宽高度：{{ x: true, y: 300 }}
                />
            </div>
        )
    }
}
module.exports=SearchTable;
