import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { AuthContext } from "./Auth.js";
import firebase from "firebase/app";
import app from "./firebase.js";
import "./MobileForm.css";
<<<<<<< HEAD
import logo from "./assets/logo.png";
import path from "./assets/path.png";
=======
>>>>>>> vincent

const Login = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  const handleLogin = (values) => {
    try {
      app.auth().signInWithEmailAndPassword(values.email, values.password);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    app.auth().signInWithRedirect(provider);
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="form">
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: false }}
        onFinish={handleLogin}
      >
        <div className="header">
<<<<<<< HEAD
          <img
            src={logo}
            alt="logo.png"
          />
          <h1><b>TripPoint</b></h1>
=======
          <h1>Login</h1>
>>>>>>> vincent
        </div>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
<<<<<<< HEAD
            style={{borderColor:"black"}}
=======
>>>>>>> vincent
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
<<<<<<< HEAD
            style={{borderColor:"black"}}
=======
>>>>>>> vincent
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
<<<<<<< HEAD
            <Checkbox
                style={{ color: "black" }}
            >Remember me</Checkbox>
=======
            <Checkbox>Remember me</Checkbox>
>>>>>>> vincent
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <div className="login-button-group">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>

            <Button
              style={{ marginLeft: "10px" }}
              type="primary"
              href="/signup"
            >
              Sign Up
            </Button>
          </div>
        </Form.Item>
      </Form>
      <div style={{ width: "100%" }}>
        <Button
          type="primary"
<<<<<<< HEAD
          style={{ margin: "0 auto", display: "block", borderColor: "white" }}
=======
          style={{ margin: "0 auto", display: "block" }}
>>>>>>> vincent
          danger
          icon={<GoogleOutlined />}
          className="login-google-button"
          onClick={loginWithGoogle}
        >
          Login with Google
        </Button>
<<<<<<< HEAD
        <img
          src={path}
          alt="path.png"
          style={{ display: "block", marginLeft: "auto", marginRight: "auto"}}
        />
      </div>

=======
      </div>
>>>>>>> vincent
    </div>
  );
};

export default withRouter(Login);
