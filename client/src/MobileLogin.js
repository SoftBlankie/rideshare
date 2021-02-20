import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./firebase.js";
import { AuthContext } from "./Auth.js";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const LoginWithGoogle = () => {
    const provider = new app.auth().GoogleAuthProvider();
    app.auth().signInWithRedirect(provider);
  }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
		<div>
			<Form
				name="login"
				className="login-form"
				initialValues={{ remember: true }}
				onFinish={handleLogin}
			>
				<Form.Item
					name="email"
					label="E-mail"
					rules={[
						{
							type: 'email',
							message: 'The input is not valid E-mail!',
						},
						{
							required: true,
							message: 'Please input your E-mail!',
						},
					]}
				>
					<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: 'Please input your Password!' }]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Password"
					/>
				</Form.Item>
				<Form.Item>
					<Form.Item name="remember" valuePropName="checked" noStyle>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<a className="login-form-forgot" href="">
						Forgot password
					</a>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" className="login-form-button">
						Log in
					</Button>
					Or <a href="/signup">register now!</a>
				</Form.Item>
			</Form>
      <Button
        className='login-google-button'
        shape='round'
        type='primary'
        size='large'
        onClick={loginWithGoogle}>
        Login with Google
      </Button>
		</div>
  );
};

export default withRouter(Login);
