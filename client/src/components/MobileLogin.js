import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { AuthContext } from "./Auth.js";
import firebase from "firebase/app";
import app from "./firebase.js";
import "./MobileForm.css";
import logo from "./assets/logo.png";
import path from "./assets/path.png";

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
          <img
            src={logo}
            alt="logo.png"
          />
          <h1><b>TripPoint</b></h1>
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
            style={{borderColor:"black"}}
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
            style={{borderColor:"black"}}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox
                style={{ color: "black" }}
            >Remember me</Checkbox>
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
          style={{ margin: "0 auto", display: "block", borderColor: "white" }}
          danger
          icon={<GoogleOutlined />}
          className="login-google-button"
          onClick={loginWithGoogle}
        >
          Login with Google
        </Button>
        <img
          src={path}
          alt="path.png"
          style={{ display: "block", marginLeft: "auto", marginRight: "auto"}}
        />
      </div>

    </div>
  );
};

export default withRouter(Login);
