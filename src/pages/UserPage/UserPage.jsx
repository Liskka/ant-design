import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import Card from 'antd/lib/card/Card';
import { EditOutlined } from '@ant-design/icons';

const UserPage = () => {

  const [user, setUser] = useState({});

  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const userInfo = await axios.get(`https://gorest.co.in/public/v1/users/${params.id}`);
    setUser(userInfo.data.data);
  }
  // console.log('user = ', user)

  return (
    <PageTemplate>
      <Card
        title={`User: ${user.name}`}
        extra={<a href="#"><EditOutlined style={{fontSize: 30}} /></a>}
        headStyle={{fontSize: 20}}
        style={{
          width: 500,
        }}
      >
        {
          Object.entries(user).map(user => {
            return <p key={user[0]}><b>{(user[0])}:</b> {user[1]}</p>
          })
        }
        {/* <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p> */}
      </Card>
    </PageTemplate>
  )
}

export default UserPage