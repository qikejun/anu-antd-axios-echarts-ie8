import {getSearch} from "../../common/api";

const React = require( 'react');
// const {getForm,getList} = require( '../../common/api');
// const React = require( 'react-router');

// import { browserHistory  } from 'react-router'
import Search from './../../components/Search';
import Table from './../../components/Table';
import add from './../Add';
import PubSub from "pubsub-js";

class Page01 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    //页面默认调用
    async componentDidMount () {
        let params={
            offset:1,
            limit:10
        };
        let data = await getSearch(params);
        // data.data.length=6;
        // this.setState({data:data.data});
        PubSub.publish('loading',data);
    }
    render(){
        return (
            <div className="jumbotron">
                <Search/>
                <Table/>
            </div>
        )
    }
 }

module.exports = Page01;


