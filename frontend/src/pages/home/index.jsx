import React from "react";

import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

import './styles.css';

export function Home() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        
    };

    return (
        <div className="container" >
            <Form
                className="form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
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
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-form-button">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );

}
