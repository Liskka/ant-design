import { Button, Table, Typography } from 'antd';
import axios from '../../axios/index';
import React, { useEffect, useState } from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import { withRouter } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

const TodosPage = ({ history, location }) => {
  const searchParams = new URLSearchParams(location.search);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const [todos, setTodos] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [isloading, setIsLoading] = useState(false);
  const [checkedTodosKeys, setCheckedTodosKeys] = useState([]);
  // console.log(todos);

  useEffect(() => {
    fetchTodos();
    // transformTodos();
  }, [currentPage]);

  const fetchTodos = async () => {
    setIsLoading(true);
    const response = await axios.get(`/todos?page=${currentPage}`);
    setTodos(response.data.data);
    setCheckedTodosKeys(
      response.data.data
        .filter((todo) => todo.status === 'completed')
        .map((todo) => todo.id)
    );
    setPagination(response.data.meta.pagination);
    setIsLoading(false);
    // console.log(response.data.data);
  };

  const columns = [
    {
      title: 'Task',
      dataIndex: 'title',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Deadline',
      dataIndex: 'due_on',
      render: (value) => getCustomDate(value),
    },
    {
      title: 'User ID',
      dataIndex: 'user_id',
    },
  ];

  const getCustomDate = (date) => {
    const currentDate = new Date(date); // Date 2011-05-09T06:08:45.178Z
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const min = ('0' + currentDate.getMinutes()).slice(-2);

    const today = `${year}-${month}-${day} ${hours}:${min}`;
    return today;
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   'selectedRows: ',
      //   selectedRows
      // );
    },
    getCheckboxProps: (record) => ({
      disabled: record.status === 'completed',
      // defaultChecked: record.status === 'completed',
    }),
    hideSelectAll: true,
    // defaultSelectedRowKeys: todos.filter((item) => item.status === 'completed'),
    // selectedRowKeys: todos.filter(
    //   (item) => item.status === 'completed'
    // ) /* .map((todo) => ({ ...todo, key: todo.id })) */,
    selectedRowKeys: checkedTodosKeys,
    onSelect: (record, selected, selectedRows, nativeEvent) => {
      // console.log(`record =`, record);
      // console.log(`selected =`, selected);
      // console.log(`selectedRows =`, selectedRows);
      // console.log(`nativeEvent =`, nativeEvent);
      setCheckedTodosKeys(selectedRows.map((todo) => todo.id));
    },
  };

  const patchTodos = async (e) => {
    e.preventDefault();
    const promises = checkedTodosKeys.map((id) => {
      // const todo = todos.find(todo => todo.id === id);
      return axios.patch('/todos/' + id, { status: 'completed' });
    });

    await Promise.all(promises);
    fetchTodos();
  };

  // console.log(new Date(todos[0]?.due_on));
  // const year = currentDate.getFullYear();
  // const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  // const day = ("0" + currentDate.getDate()).slice(-2);
  // const hours = ("0" + currentDate.getHours()).slice(-2);
  // const min = ("0" + currentDate.getMinutes()).slice(-2);

  // const today = `${year}-${month}-${day} ${hours}:${min}`;

  return (
    <PageTemplate>
      <Typography.Title>Todos Page</Typography.Title>

      <Button
        disabled={
          todos.filter((todo) => todo.status === 'completed').length >=
          checkedTodosKeys.length
        }
        onClick={(e) => patchTodos(e)}
      >
        Complete
      </Button>

      <Table
        rowSelection={{
          ...rowSelection,
        }}
        // selectedRowKeys={todos
        //   .filter((todo) => todo.status === 'completed')
        //   .map((todo) => todo.id)}
        columns={columns}
        dataSource={todos.map((todo) => ({ ...todo, key: todo.id }))}
        loading={isloading}
        pagination={{
          total: pagination.total,
          current: currentPage,
          pageSize: 10,
          position: ['bottomCenter'],
          showSizeChanger: false,
          showTitle: false,
        }}
        onChange={(newPagination) => {
          history.push({
            pathname: location.pathname,
            search: `page=${newPagination.current}`,
          });
        }}
      />
    </PageTemplate>
  );
};

export default withRouter(TodosPage);
