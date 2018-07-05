import "../scss/common";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory ,browserHistory } from 'react-router';
import {Navigation} from "./components";
import Index from './pages/User/Index';
import Login from './pages/User/Login';
import Register from './pages/User/Register';
import ForgetPassword from './pages/User/ForgetPassword';
import Page01 from './pages/Page01';
import Page02 from './pages/Page02';
import Page03 from './pages/Page03';
import Page04 from './pages/Page04';
import Page05 from './pages/Page05';
import Add from './pages/Add';

class App extends React.Component{
    render() {
        return (
            <div>
                <Navigation />
                <div className="container">
                {this.props.children}
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    // <Router history={hashHistory}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="/Index" />
            {/* 这块的注释一定要加外层大口号会有bug */}
            {/* <IndexRoute component={Page01}/> */}
            <Route path="page01" component={Page01} />
            <Route path="page02" component={Page02} />
            <Route path="page03" component={Page03} />
            <Route path="page04" component={Page04} />
            <Route path="page05" component={Page05} />
            <Route path="Index" component={Index} />
            <Route path="Login" component={Login} />
            <Route path="Register" component={Register} />
            <Route path="ForgetPassword" component={ForgetPassword} />
            <Route path="add" component={Add} />
        </Route>
    </Router>,
    document.getElementById("app")
)