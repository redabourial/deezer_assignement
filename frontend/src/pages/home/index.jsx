import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Alert, Button, Form, Input, Row } from "antd";

import { registerUser } from "/src/redux/usersSlice";
import { MailOutlined, UserOutlined } from "@ant-design/icons";

import "./styles.css";

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
      .catch(() => {});
  };

  return (
    <>
      <div className="container">
        <Row>
          <Form className="form" onFinish={onFinish}>
            <Form.Item
              name="name"
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
              <Alert message={error} type="error" className="errorMsg" />
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
        </Row>
      </div>
    </>
  );
}
