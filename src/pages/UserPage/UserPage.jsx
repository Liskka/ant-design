import React, { useEffect, useState } from 'react';
import axios from '../../axios/index';
import { withRouter } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import Card from 'antd/lib/card/Card';
import { EditOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Spin, notification } from 'antd';

const UserPage = ({location, history, match: {params}}) => {

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const userInfo = await axios.get(`https://gorest.co.in/public/v1/users/${params.id}`);
      setUser(userInfo.data.data);
    } catch (error) {
      openNotification(error.message);
      history.push('/users')
    } finally {
      setIsLoading(false);
    }
  }
  const openNotification = (errText) => {
    notification.open({
      message: 'User with this id does not exist',
      description: `Request status: failed. ${errText}`,
      icon: (
        <WarningOutlined
          style={{
            color: 'red',
          }}
        />
      ),
    });
  };

  const goToEditing = () => {
    history.push(location.pathname + '/edit');
  }

  return (
    <PageTemplate>
      {
        isLoading 
          ? <div style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '50px',
            }}>
              <Spin size="large" />
            </div>
          : 
            <>{
              !!Object.keys(user).length &&
                <Card
                  title={`User: ${user.name}`}
                  extra={
                    <Button 
                      type="primary" 
                      icon={<EditOutlined />} 
                      size="large" 
                      onClick={goToEditing}
                    >
                      Edit
                    </Button>
                  }
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
                </Card>
            }</>
      }
    </PageTemplate>
  )
}

export default withRouter(UserPage)