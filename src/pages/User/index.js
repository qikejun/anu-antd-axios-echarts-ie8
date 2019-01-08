import { Carousel } from 'antd';
import styles from './index.scss'

class Index extends  React.Component {
    render() {
        const settings = {
            dots: true,
            autoplay:true
        };
        {/*<div><img src={require("./mock/img/bg.jpg")} alt=""/></div>*/}
        {/*<div><img src={require("./mock/img/bg1.jpg")} alt=""/></div>*/}
        {/*<div><img src={require("./mock/img/bg2.jpg")} alt=""/></div>*/}
        {/*<div><img src={require("./mock/img/bg3.jpg")} alt=""/></div>*/}
        return (
            <div className={styles["carousel-box"]}>
                <Carousel autoplay {...settings}>
                    <div><img src={"./mock/img/bg.jpg"} alt=""/></div>
                    <div><img src={"./mock/img/bg1.jpg"} alt=""/></div>
                    <div><img src={"./mock/img/bg2.jpg"} alt=""/></div>
                    <div><img src={"./mock/img/bg3.jpg"} alt=""/></div>
                </Carousel>
            </div>
        )
    }
}
module.exports = Index;