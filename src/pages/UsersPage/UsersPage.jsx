import React, { useEffect, useState } from 'react'
import { Typography } from 'antd';
import { Table } from 'antd';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import axios from 'axios';

const UsersPage = () => {

  const usersURL = 'https://gorest.co.in/public/v1/users';
    const [users, setUsers] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState([]);
    const [page, setPage] = useState(1);
    // console.log('users = ', users);
    // console.log('paginationInfo = ', paginationInfo);

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const fetchUsers = async (page) => {
        const allUsers = await axios.get(usersURL + `${page !== 1 ? `?page=${page}` : ''}`);
        setUsers(allUsers.data.data);
        setPaginationInfo(allUsers.data.meta.pagination);
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

  return (
    <PageTemplate>
      <Typography.Title>UsersPage</Typography.Title>

      <Table columns={columns} dataSource={usersKey} onChange={onChange} pagination={pagination} /* filters={filters} *//>

    </PageTemplate>
  )
}

export default UsersPage