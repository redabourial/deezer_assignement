import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Card, Descriptions } from "antd";

import { fetchUser } from "/src/redux/usersSlice";

import "./styles.css";
import "animate.css";

export default function Profile() {
  const dispatch = useDispatch();

  const { userId } = useParams();

  const user = useSelector(({ users }) => users.data[userId]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user || loading) return;
    setLoading(true);
    dispatch(fetchUser(userId))
      .unwrap()
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <>{error.message}</>;
  }

  if (loading || !user) {
    return <>Loading...</>;
  }

  return (
    <div className="container animate__animated animate__faster animate__bounceIn">
      <Card title="User Info">
        <Descriptions
          layout="vertical"
          className="description"
          items={Object.entries(user)
            .sort(([k1], [k2]) => k1 - k2)
            .map(([key, value]) => ({
              key,
              label:
                key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
              children: value,
            }))}
        />
      </Card>
    </div>
  );
}
