import { Form,  Input, Button, Checkbox } from 'antd';
import  {Link} from 'react-router';

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
    phoneNumberExists(rule, value, callback) {
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
        const phoneNumberProps = getFieldProps('phoneNumber', {
            rules: [
                { required: true,message: '输入绑定手机号'},
                { validator: this.phoneNumberExists }
            ],
            validateTrigger:'onBlur',
        });
        const passwordProps = getFieldProps('password', {
            rules: [
                { required: true,message: '请输入密码'},
                { validator: this.passwordExists }
            ],
        });
        return (
            <Form horizontal onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem label="手机号"
                          {...formItemLayout}
                          hasFeedback
                          help={isFieldValidating('phoneNumber') ? '校验中...' : (getFieldError('phoneNumber') || []).join(', ')}
                >
                    <Input placeholder="请输入手机号"
                           {...phoneNumberProps}/>
                </FormItem>
                <FormItem label="密码"
                          {...formItemLayout}
                          hasFeedback
                          help={isFieldValidating('password') ? '校验中...' : (getFieldError('password') || []).join(', ')}
                >
                    <Input placeholder="请输入验证码"
                           {...passwordProps}/>
                    <Button type="primary" htmlType="button" className="login-form-button">
                        发送验证码
                    </Button>
                </FormItem>
                <FormItem>
                    <Checkbox {...getFieldProps('agreement')}>记住我</Checkbox>
                </FormItem>
                <FormItem>
                    <a className="login-form-forgot" href="">忘记密码</a>
                    <Link to="/F">忘记密码</Link>
                    <Link to="/Register">立即注册</Link>
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
