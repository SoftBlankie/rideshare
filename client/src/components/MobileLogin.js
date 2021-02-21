import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthContext } from "./Auth.js";
import firebase from "firebase/app";
import app from "./firebase.js";

const Login = ({ history }) => {
  const handleLogin = (values) => {
    try {
      app
        .auth()
        .signInWithEmailAndPassword(values.email, values.password);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
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
        onClick={loginWithGoogle}>
        Login with Google
      </Button>
		</div>
  );
};

export default withRouter(Login);
