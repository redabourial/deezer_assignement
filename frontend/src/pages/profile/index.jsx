import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import axios from "axios";

import { Descriptions } from 'antd';

import { addUser } from "/src/redux/usersSlice";
import "./styles.css";

export default function Profile() {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { userId } = useParams();

    const user = useSelector((state) => state.users.data[userId]);

    useEffect(() => {
        if (!user) {
            setLoading(true);
            axios.get(`${api.root}/users/${userId}/`)
                .then((resp) => dispatch(addUser(resp.data)))
                .catch(() => setError("User not found"))
                .finally(() => setLoading(false))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (error) {
        return <>{error}</>
    }

    if (loading) {
        return <>Loading...</>
    }

    if (!user) {
        return <>{error}</>
    }

    return <div className="container">
        <Descriptions
            className="description"
            title="User Info"
            items={
                Object.entries(user)
                    .sort(([k1], [k2]) => k1 - k2)
                    .map(([key, value]) => (
                        {
                            key,
                            label: key.charAt(0).toUpperCase() + key.slice(1),
                            children: value,
                        }
                    ))
            }
        />
    </div>
}
