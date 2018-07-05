import { Carousel } from 'antd';
import styles from './index.scss'

class Index extends  React.Component {
    render() {
        const settings = {
            dots: true,
            autoplay:true
        };

        return (
            <div className={styles["carousel-box"]}>
                <Carousel autoplay {...settings}>
                    <div><img src="./../../../mock/images/bg.jpg" alt=""/></div>
                    <div><img src="./../../../mock/images/bg1.jpg" alt=""/></div>
                    <div><img src="./../../../mock/images/bg2.jpg" alt=""/></div>
                    <div><img src="./../../../mock/images/bg3.jpg" alt=""/></div>
                </Carousel>
            </div>
        )
    }
}
module.exports = Index;