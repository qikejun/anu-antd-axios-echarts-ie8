import React from "react";
import { Link } from 'react-router'
import { getMenu } from "../../common/api"
import styles from "./navigation.scss"

class Navigation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            menu:[]
        }
    }

    async componentWillMount () {
        let data = await getMenu();
        this.setState({menu:data.data});
    }

    render (){
        return (
            <div className={styles.Navigation}>   
                <div className="container">
                    <ul>
                    {this.state.menu.map(item => (
                        <li><Link to={item.src} onlyActiveOnIndex={true} activeClassName={styles.current}>{item.name}</Link></li>
                    ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Navigation;