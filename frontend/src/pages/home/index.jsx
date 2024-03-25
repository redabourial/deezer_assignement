import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Alert, Button, Card, Form, Input } from "antd";

import { registerUser } from "/src/redux/usersSlice";
import { MailOutlined, UserOutlined } from "@ant-design/icons";

import "./styles.css";
import "animate.css";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const onFinish = (data) => {
    if (loading) return;
    setLoading(true);
    dispatch(registerUser(data))
      .unwrap()
      .then((newUser) => navigate(`/users/${newUser.pk}`))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container animate__animated animate__faster animate__jackInTheBox">
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
                message: "Please input your Email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          {error ? (
            <Alert
              message={
                <>
                  {error.message.split(",").map((e, i) => (
                    <div key={i}>{e}</div>
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
