import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Alert, Button, Card, Form, Input } from "antd";

import { registerUser } from "/src/redux/usersSlice";
import { MailOutlined, UserOutlined } from "@ant-design/icons";

import "./styles.css";
import 'animate.css';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const error = useSelector(({ users }) => users.error);
  const loading = useSelector(({ users }) => users.loading);

  const onFinish = (data) => {
    if (loading) return;
    dispatch(registerUser(data))
      .unwrap()
      .then((newUser) => navigate(`/users/${newUser.pk}`))
      .catch(() => { });
  };

  return (
    <div className="container animate__animated animate__jackInTheBox">
      <Card title={"Registration form"} className="card">
        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          {error ? (
            <Alert
              message={
                <>
                  {error.split(",").map((e, i) => (
                    <div key={i}>{`${e}.`}</div>
                  ))}
                </>
              }
              type="error"
              className="errorMsg animate__animated animate__pulse"
            />
          ) : null}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
