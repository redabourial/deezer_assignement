import React, { useState } from "react";
import { addUser } from "/src/redux/usersSlice";
import { useNavigate } from 'react-router-dom';

import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Alert } from 'antd';
import { useDispatch } from 'react-redux';

import axios from "axios";
import { flatten } from "lodash";
import './styles.css';

export const validateStatus = s => s < 500;

export default function Home({ loadingState = false }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(loadingState);
    const [error, setError] = useState(null)

    const onFinish = async (data) => {
        if (loading) return
        setLoading(true);
        setError(null)
        try {
            const startingTime = new Date();
            const resp = await axios.post(`${api.root}/users/`, data, { validateStatus });
            const timeToCreate = `${(new Date() - startingTime) / 1000} s`;
            const { status } = resp;
            if (resp.status >= 400 && status < 500) {
                const err = flatten(Object.values(resp.data));
                setError(err)
                return
            }
            const user = { ...resp.data, ["Time to create (frontend)"]: timeToCreate }
            dispatch(addUser(user))
            navigate(`/users/${user.pk}`)
        } catch (e) {
            setError(e)
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container" >
                <Row>
                    <Form
                        className="form"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Name!',
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
                        {
                            error ?
                                <Alert
                                    message={`Error : ${error}`}
                                    type="error"
                                    className="errorMsg"
                                />
                                : null
                        }
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="register-form-button">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Row>
            </div>
        </>
    );

}
