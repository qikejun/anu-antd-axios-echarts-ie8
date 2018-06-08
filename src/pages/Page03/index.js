const React = require( 'react');
import styles from "./index.scss";
import './index1.css';
import { getList } from "../../common/api";
import {Steps,Button, Form, Input, Row, Col} from 'antd';
import classNames from 'classnames';
const Step = Steps.Step;
const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
    return false;
}

class Page03 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          data:[]
        }
    }
    async componentWillMount () {
      let data = await getList();
      data.data.length=6;
      this.setState({data:data.data});
  }
    handleSubmit() {
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            console.log(values);
        });
    }

    getPassStrenth(value, type) {
        if (value) {
            let strength;
            // 密码强度的校验规则自定义，这里只是做个简单的示例
            if (value.length < 6) {
                strength = 'L';
            } else if (value.length <= 9) {
                strength = 'M';
            } else {
                strength = 'H';
            }
            if (type === 'pass') {
                this.setState({ passBarShow: true, passStrength: strength });
            } else {
                this.setState({ rePassBarShow: true, rePassStrength: strength });
            }
        } else {
            if (type === 'pass') {
                this.setState({ passBarShow: false });
            } else {
                this.setState({ rePassBarShow: false });
            }
        }
    }
    checkPass(rule, value, callback) {
        const form = this.props.form;
        this.getPassStrenth(value, 'pass');
        if(value.indexOf('&')!==-1){
            callback('密码不能有特殊字符');
        }
        if (form.getFieldValue('pass')) {
            form.validateFields(['rePass'], { force: true });
        }

        callback();
    }

    checkPass2(rule, value, callback) {
        const form = this.props.form;
        this.getPassStrenth(value, 'rePass');
        if (value && value !== form.getFieldValue('pass')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }

    renderPassStrengthBar(type) {
        const strength = type === 'pass' ? this.state.passStrength : this.state.rePassStrength;
        const classSet = classNames({
            'ant-pwd-strength': true,
            'ant-pwd-strength-low': strength === 'L',
            'ant-pwd-strength-medium': strength === 'M',
            'ant-pwd-strength-high': strength === 'H',
        });
        const level = {
            L: '低',
            M: '中',
            H: '高',
        };
        return (
            <div>
                <ul className={classSet}>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-1"></li>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-2"></li>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-3"></li>
                    <span className="ant-form-text">
            {level[strength]}
          </span>
                </ul>
            </div>
        );
    }
    render () {
        const { getFieldProps } = this.props.form;

        const passProps = getFieldProps('pass', {
            rules: [
                { required: true, whitespace: true, message: '请填写密码' },
                { validator: this.checkPass.bind(this) },
            ],
            onChange: (e) => {
                console.log('你的密码就是这样被盗的：', e.target.value);
            },
        });
        const rePassProps = getFieldProps('rePass', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码',
            }, {
                validator: this.checkPass2.bind(this),
            }],
        });
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
      var is=true;
        return (
            <div>
            <Steps current={3} status="error">
            <Step title="已完成" description="这里是多信息的描述" />
            <Step title="进行中" description="这里是多信息的描述" />
            <Step title="待运行" description="这里是多信息的描述" />
            <Step title="待运行" description="这里是多信息的描述" />
          </Steps>
                <ul>
                  {
                    this.state.data.map(item => (
                      // <li className={`${styles.item} ${styles.box}`}>
                      //动态控制添加class
                      <li className={(is?styles.item:"")+" "+styles.box}>
                        <img alt="example" width="100" src="http://css.eavic.com//mock-images/portal/index/super-market-pic.gif" />
                        <div className={styles.box}>图片名称{item.name}{this.props.location.query.abc}</div>
                      </li>
                    ))
                  }
                </ul>
                <Form horizontal>
                    <Row>
                        <Col span="18">
                            <FormItem
                                {...formItemLayout}
                                label="密码"
                            >
                                <Input {...passProps} type="password"
                                       onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                       autoComplete="off" id="pass"
                                />
                            </FormItem>
                        </Col>
                        <Col span="6">
                            {this.state.passBarShow ? this.renderPassStrengthBar('pass') : null}
                        </Col>
                    </Row>

                    <Row>
                        <Col span="18">
                            <FormItem
                                {...formItemLayout}
                                label="确认密码"
                            >
                                <Input {...rePassProps} type="password"
                                       onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                       autoComplete="off" id="rePass"
                                />
                            </FormItem>
                        </Col>
                        <Col span="6">
                            {this.state.rePassBarShow ? this.renderPassStrengthBar('rePass') : null}
                        </Col>
                    </Row>
                    <Row>
                        <Col span="18">
                            <Col span="18" offset="6">
                                <Button type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
                            </Col>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
Page03 = createForm()(Page03);
export default Page03;