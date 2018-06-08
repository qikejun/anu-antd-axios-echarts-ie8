const React = require( 'react');
const {getForm,getList} = require( '../../common/api');
import {Pagination} from 'antd';
// 引入 ECharts 主模块
import echarts from 'echarts/echarts';
// 引入柱状图
import  'echarts/chart/bar';
// 引入提示框和标题组件
import 'echarts/component/tooltip';
import 'echarts/component/title';
// const React = require( 'react-router');
// import { browserHistory  } from 'react-router'
//父组件向子组件传值
class MyConyainer extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            text:'父组件向子组件传值',
            value:'父组件:'
        }
    }
    render(){
        return (<div>
            <div>{this.state.value}</div>
            <Child name={this.state.text}/></div>)
    }
}
class Child extends  React.Component{
    // constructor(props){
    //     super(props);
    //     // this.state={
    //     //     text:'父组件向子组件传值'
    //     // }
    // }
    render(){
        return (<span>{this.props.name}</span>)
    }
}
//子组件向父组件传值
class MyConyainer1 extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            text:'子组件向父组件传值',
            value:'父组件:',
            nodeChecked:true,
        }
    }
    onChildChanged(nodevalue){
        this.setState({
            nodeChecked:nodevalue
        })
    }
    render(){
        return (<div>
            <div>{this.state.value}</div>
            <div>{this.state.nodeChecked?'true':'false'}</div>
            <Child1 name={this.state.text} checked={this.state.nodeChecked} callbackParent={this.onChildChanged.bind(this)}/></div>)
    }
}
class Child1 extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            checked:this.props.checked
        }
    }
    change (){
        var newChecked=!this.state.checked;
        this.setState({
            checked:newChecked
        })
        this.props.callbackParent(newChecked);
    }
    render(){
        console.log(this.state.checked)
        //this的bind问题
        return (<div><span>{this.props.name}</span><input onClick={this.change.bind(this)} type="checkbox" checked={this.state.checked}/></div>)
    }
}

class Page04 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            pageSizeOptions:['5', '10', '30'],
            isShow:true,
            data:{}
        }
    }
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: { text: 'ECharts 示例' },
            tooltip: {},
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
    showTotal(total) {
        return `共 ${total} 条`;
      }
    onChange(page){
        //page改变后的页码
        console.log(page);
    }
    onShowSizeChange(current, pageSize){
        console.log(current,pageSize)
    }
    render() {
        return (
            <div>
                <MyConyainer/>
                <MyConyainer1/>
            <div id="main" style={{ width: 400, height: 400 }}></div>
            <Pagination  total={90}//总数
                         //pageSize={8}//每页条数(会影响每页多少条选择框的显示问题)
                         defaultPageSize={7}//初始时的每页条数
                         defaultCurrent={2}//默认当前页数
                         showSizeChanger={true}//是否可以改变默认条数
                         onShowSizeChange={this.onShowSizeChange}   //pageSize 变化的回调
                         pageSizeOptions={this.state.pageSizeOptions}
                         showQuickJumper={true}
                         showTotal={this.showTotal} //显示总数处理方法
                         onChange={this.onChange} //改变page回调
            />
            <Pagination size='small'  total={50} showSizeChanger showQuickJumper showTotal={this.showTotal} />
            </div>
            
        );
    }
}

module.exports = Page04;
// module.exports = () =>
// <div className="jumbotron">
// <h1>page01 container</h1>
// <form onSubmit={this.handleSubmit}>
//     <input type="text" placeholder="userName"/>
//     <input type="text" placeholder="reop"/>
//     <button type="submit">go page2</button>
// </form>
// </div>

