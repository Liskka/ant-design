import React, { useEffect, useState } from 'react'
import { Spin, Typography } from 'antd';
import { Table } from 'antd';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import axios from '../../axios/index';
import { withRouter } from 'react-router-dom';

const UsersPage = ({match, location, history}) => {

  const usersURL = 'https://gorest.co.in/public/v1/users';
    const [users, setUsers] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const fetchUsers = async (page) => {
        setIsLoading(true);
        const allUsers = await axios.get(usersURL + `${page !== 1 ? `?page=${page}` : ''}`);
        setUsers(allUsers.data.data);
        setPaginationInfo(allUsers.data.meta.pagination);
        setIsLoading(false);
    };

  const usersKey = users.map(user => ({
    ...user, key: user.id
  }));

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [
        {
          text: 'male',
          value: 'male',
        },
        {
          text: 'female',
          value: 'female',
        }
      ],
      onFilter: (value, record) => record.gender.indexOf(value) === 0,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        {
          text: 'active',
          value: 'active',
        },
        {
          text: 'inactive',
          value: 'inactive',
        }
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    }
  ];

  const pagination = {
    current: paginationInfo.page,
    total: paginationInfo.total,
    defaultPageSize: paginationInfo.limit,
    position: ['bottomCenter'],
    showSizeChanger: false,
  }


  const onChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
    setPage(pagination.current);
  };

  const sumbitRow = (record, rowIndex) => {
    return {
      onClick: () => history.push(match.path + `/${record.id}`)
    }
  }

  return (
    <PageTemplate>
      <Typography.Title>UsersPage</Typography.Title>

      {
        isLoading
        ? <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '50px',
          }}><Spin size="large" /></div>
        : <Table columns={columns} dataSource={usersKey} onChange={onChange} pagination={pagination} onRow={sumbitRow} />
      }

    </PageTemplate>
  )
}

export default withRouter(UsersPage)