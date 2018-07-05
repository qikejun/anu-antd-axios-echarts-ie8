import { Form,  Input, Button, Checkbox ,Col,Icon } from 'antd';
import { Link } from 'react-router';

const FormItem = Form.Item;

class Login extends React.Component {
    handleSubmit (e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    userExists(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                if (value === 'anu') {
                    callback([new Error('抱歉，没有该用户。')]);
                } else {
                    callback();
                }
            }, 800);
        }
    }
    passwordExists(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                if (value === '123456') {
                    callback([new Error('密码错误。')]);
                } else {
                    callback();
                }
            }, 800);
        }
    }
    render() {
        const { getFieldProps, getFieldError, isFieldValidating  } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        const nameProps = getFieldProps('userName', {
            rules: [
                { message: '请输入用户名'},
                { validator: this.userExists }
            ],
        });
        const passwordProps = getFieldProps('password', {
            rules: [
                { message: '请输入密码'},
                { validator: this.passwordExists }
            ],
        });
        return (
            <Form horizontal onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem label="用户名"
                          {...formItemLayout}
                          hasFeedback
                          help={isFieldValidating('userName') ? '校验中...' : (getFieldError('userName') || []).join(', ')}
                >
                    <Input placeholder="请输入账户名"
                           {...nameProps}/>
                </FormItem>
                <FormItem label="密码"
                    {...formItemLayout}
                    hasFeedback
                    help={isFieldValidating('password') ? '校验中...' : (getFieldError('password') || []).join(', ')}
                >
                    <Input placeholder="请输入密码"
                           {...passwordProps}/>
                </FormItem>
                <FormItem>
                    <Col span="7">
                    </Col>
                    <Col span="6">
                        <Link to="/ForgetPassword">忘记密码</Link>
                    </Col>
                    <Col span="6">
                        <Link to="/Register">立即注册</Link>
                    </Col>
                </FormItem>
                <FormItem>
                    <Col span="7">
                        <Icon type="user" />
                    </Col>
                    <Col span="6">
                        <Checkbox {...getFieldProps('agreement')}>记住我</Checkbox>
                    </Col>
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

Login = Form.create()(Login);
module.exports = Login;
