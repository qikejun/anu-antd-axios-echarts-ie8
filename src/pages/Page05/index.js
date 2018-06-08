const React = require( 'react');
const ReactDOM = require('react-dom');
import { browserHistory  } from 'react-router'
import Tab from './../../components/Tab'

import { Table, Icon ,Button } from 'antd';
function query(event){
  if (event.preventDefault){  
      event.preventDefault();  
  }  
  else{  
      event.returnValue=false;  
  } 
  const path = `/page01`
  browserHistory.push(path)
}
const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    // fixed:'left',//固定列样式有问题
    // render: (text) => <a href="javascript:void(0);" onClick={query}>{text}</a>,
    // filters:[],	//表头的筛选菜单项
    onFilter:(value,record)=>record.name.indexOf(value)!==-1,	//本地模式下，确定筛选的运行函数
    // filterMultiple:true,	//是否多选
    // filterDropdown:()=>{},	//可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互,
    // filterDropdownVisible:true,	//用于控制自定义筛选菜单是否可见
    // onFilterDropdownVisibleChange:()=>{},	//自定义筛选菜单可见变化时调用
    sorter:(a,b)=>a.name.length-b.name.length,	//排序函数，本地排序使用一个函数，需要服务端排序可设为 true
    // cloSpan:0,//表头列合并,设置为 0 时，不渲染
    width:'6%',//列宽度	String or Number
    // className:'',//列的 className
    //fixed:true,	//列是否固定，可选 true(等效于 left) 'left' 'right'
    // filteredValue:[key],	//筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组
    // sortOrder:''	//排序的受控属性，外界可用此控制列的排序，可设置为 'ascend' 'descend' false
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width:'6%',
    // fixed:'left'
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
    width:'10%',
  },
  { title: '列1', dataIndex: 'address', key: '1', width: '6%' },
  { title: '列2', dataIndex: 'address', key: '2', width: '6%' },
  { title: '列3', dataIndex: 'address', key: '3', width: '6%' },
  { title: '列4', dataIndex: 'address', key: '4', width: '6%' },
  { title: '列5', dataIndex: 'address', key: '5', width: '6%' },
  { title: '列6', dataIndex: 'address', key: '6', width: '6%' },
  { title: '列7', dataIndex: 'address', key: '7', width: '6%' },
  { title: '列8', dataIndex: 'address', key: '8', width: '6%' },
   {
    title: '操作',
    key: 'operation',
       width: '30%',
    // fixed:'right',
    render: (text, record) => (
      <span>
        <a href="#">操作一{record.name}</a>
        <span className="ant-divider"></span>
        <a href="#">操作二</a>
        <span className="ant-divider"></span>
        <a href="#" className="ant-dropdown-link">
          更多 <Icon type="down" />
        </a>
      </span>
    ),
  }];
  
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `李大嘴${i}`,
      age: 32,
      address: `西湖区湖底公园${i}号`,
    });
  }

  var Page5=React.createClass({
    getInitialState(){
      return {
                  loading:false,
                  total:"100"
              }
    },
    toggleLoading(){
      console.log()
      this.setState({
          loading:!this.state.loading
      })
    },
    showTotal(total) {
      return `共 ${this.state.total} 条`;
    },
    render(){
      let menu={
        verticalAlign: 'top',
        display:'inline-block',
      }
      let table={
        paddingLeft:'10px',
        paddingTop:'10px',
        verticalAlign: 'top',
        display:'inline-block',
        width:'960px'
      }
      //列表项是够可选择
      var rowSelection = {
        type:'checkbox',//radio
        // selectedRowKeys:['key'],
        //
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
      }
        return (
            <div>
                <div style={menu}><Tab /></div>
                <div style={table}>
                    <h3>columns</h3>
                    <Table columns={columns} dataSource={data}/>
                    <Table
                    rowSelection={rowSelection}
                    pagination={pagination}
                    size='small'//简化表格和分页样式
                    dataSource={data}
                    columns={columns}
                    // rowKey //表格行 key 的取值，可以是字符串或一个函数
                    // rowClassName //表格行的类名
                    // expandedRowRender //额外的展开行
                    // defaultExpandedRowKeys	//默认展开的行
                    // expandedRowKeys	//展开的行，控制属性
                    // onChange	//分页、排序、筛选变化时触发
                    // loading={this.state.loading}
                    // locale	//默认文案设置，目前包括排序、过滤、空数据文案
                    // indentSize	//展示树形数据时，每层缩进的宽度，以 px 为单位
                    // onRowClick	//处理行点击事件
                    // useFixedHeader	//是否固定表头
                    // bordered	//是否展示外边框和列边框
                    // showHeader	//是否显示表头
                    // footer	//表格底部自定义渲染函数
                    // title	//表格头部自定义渲染函数
                    // scroll={{ x: 1500, y: 300 }} //横向或纵向支持滚动，也可用于指定滚动区域的宽高度：{{ x: true, y: 300 }}
                />
                    <Button type="primary" onClick={this.toggleLoading}>切换 loading 状态</Button></div>
            </div>
        )
        let pagination={
        total: 100, //数据总数量
        pageSize: 10,  //显示几条一页
        hideOnSinglePage:true,//只有一页时是否隐藏分页器
        defaultCurrent:3,
        defaultPageSize: 10, //默认显示几条一页
        showQuickJumper:true,//是否可以快速跳转至某页
        pageSizeOptions:"'10', '20', '30'",
        showSizeChanger: true,  //是否显示可以设置几条一页的选项
        onShowSizeChange(current, pageSize) {  //当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        　　console.log(current, pageSize); //这边已经设置了self = this
        },
        onChange(current) {  //点击改变页数的选项时调用函数，current:将要跳转的页数
          console.log(current, 10);
        },
        showTotal: function () {  //设置显示一共几条数据
            return '共 ' + 100 + ' 条数据';
        }
      }
    }
  })
  // class Page5 extends React.Component{
  //   constructor(props){
  //       super(props);
  //       this.state= {
  //           loading:false
  //       }
  //   }
  //   //   getInitialState(){
  //   //       return {
  //   //           loading:false
  //   //       }
  //   //   }
  //     toggleLoading(){
  //         console.log(this.loading)
  //       this.loading=!this.loading
  //         // this.setState(state =>{
  //         //     loading:!this.loading
  //         // })
  //     }
  //     render(){
  //         return (
  //             <div>
  //             <Table columns={columns} dataSource={data}  loading={this.loading}/>
  //             <Button type="primary" onClick={this.toggleLoading}>切换 loading 状态</Button>
  //             </div>
  //           )
  //     }
  // }
  module.exports = Page5;