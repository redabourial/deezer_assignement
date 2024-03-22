import React, { useEffect, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useParams, } from 'react-router-dom';

import { Descriptions, } from 'antd';

import { fetchUser, } from '/src/redux/usersSlice';

import './styles.css';

export default function Profile () {
  const dispatch = useDispatch();

  const { userId, } = useParams();

  const user = useSelector(({ users, },) => users.data[userId],);
  const error = useSelector(({ users, },) => users.error,);
  const loading = useSelector(({ users, },) => users.loading,);

  useEffect(() => {
    if (!user && !loading) {
      dispatch(fetchUser(userId,),);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [],);

  if (error) {
    return <>{error}</>;
  }

  if (loading) {
    return <>Loading...</>;
  }

  if (!user) {
    return <>{error}</>;
  }

  return <div className="container">
    <Descriptions
      className="description"
      title="User Info"
      items={
        Object.entries(user,)
          .sort(([k1,], [k2,],) => k1 - k2,)
          .map(([key, value,],) => (
            {
              key,
              label: key.charAt(0,).toUpperCase() + key.slice(1,),
              children: value,
            }
          ),)
      }
    />
  </div>;
}
