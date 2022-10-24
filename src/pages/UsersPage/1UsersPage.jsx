// import React, { useEffect, useState } from 'react';
// import { Typography } from 'antd';
// import { Table } from 'antd';
// import PageTemplate from '../../components/PageTemplate/PageTemplate';
// import axios from '../../axios/index';
// import { withRouter } from 'react-router-dom';
// import Loader from '../../components/Loader/Loader';
// import qs from 'qs';

// const UsersPage = ({ match, location, history }) => {
//   // const usersURL = 'https://gorest.co.in/public/v1/users';
//   const page = parseInt(qs.parse(location.search.slice(1)).page, 10) || 1;
//   const [users, setUsers] = useState([]);
//   const [total, setTotal] = useState(0);
//   // const [page, setPage] = useState(pageFromUrl || 1);
//   const [isLoading, setIsLoading] = useState(false);
//   // console.log('match ', match, 'location ', location);
//   console.log('page ', page);
//   // console.log('page ', page);

//   useEffect(() => {
//     if (page > 0) {
//       fetchUsers(page);
//     } else {
//       history.push({ search: '?page=1' });
//     }
//   }, [page]);

//   const fetchUsers = async (page, gender, status) => {
//     setIsLoading(true);
//     const tenUsers = await axios.get(
//       `/users?page=${page > 0 ? page : 1}${
//         gender?.length === 1 ? '&gender=' + gender[0] : ''
//       }${status?.length === 1 ? '&status=' + status[0] : ''}`
//     );
//     setUsers(tenUsers.data.data);
//     setTotal(tenUsers.data.meta.pagination.total);
//     setIsLoading(false);
//   };

//   const usersKey = users.map((user) => ({
//     ...user,
//     key: user.id,
//   }));

//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//     },
//     {
//       title: 'email',
//       dataIndex: 'email',
//     },
//     {
//       title: 'Gender',
//       dataIndex: 'gender',
//       filters: [
//         {
//           text: 'male',
//           value: 'male',
//         },
//         {
//           text: 'female',
//           value: 'female',
//         },
//       ],
//       onFilter: (value, record) => record.gender.indexOf(value) === 0,
//       // onFilter: (value, record) => {
//       //   console.log('value ', value);
//       //   // fetchUsers(page);
//       // },
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       filters: [
//         {
//           text: 'active',
//           value: 'active',
//         },
//         {
//           text: 'inactive',
//           value: 'inactive',
//         },
//       ],
//       onFilter: (value, record) => record.status.indexOf(value) === 0,
//     },
//   ];

//   const pagination = {
//     current: page,
//     total,
//     pageSize: 10,
//     position: ['bottomCenter'],
//     showSizeChanger: false,
//   };

//   console.log(
//     'qs',
//     qs.stringify(
//       {
//         page: 2,
//         status: ['active'],
//         gender: ['male', 'female'],
//       },
//       { arrayFormat: 'comma', encode: false }
//     )
//   );

//   const onChange = (pagination, filters, sorter, extra) => {
//     console.log('params', pagination, filters, sorter, extra);
//     // setPage(pagination.current);
//     const qsObject = { page: 1 };
//     if (!!filters.status) {
//       qsObject.status = filters.status;
//     }
//     if (!!filters.gender) {
//       qsObject.gender = filters.gender;
//     }
//     console.log('qsObject ', qsObject);
//     console.log(
//       'qs1 ',
//       qs.parse(location.search.slice(1), {
//         arrayFormat: 'comma',
//         encode: false,
//       })
//     );
//     extra.action === 'filter' &&
//       // fetchUsers(page, filters.gender, filters.status);
//       history.push({
//         pathname: location.pathname,
//         search: qs.stringify(qsObject, { arrayFormat: 'comma', encode: false }),
//       });
//     extra.action === 'paginate' &&
//       history.push({
//         pathname: location.pathname,
//         // search: `page=${pagination.current}`,
//         search: qs.stringify(
//           { ...qsObject, page: pagination.current },
//           { arrayFormat: 'comma', encode: false }
//         ),
//       });
//   };

//   const sumbitRow = (record, rowIndex) => {
//     return {
//       onClick: () => history.push(match.path + `/${record.id}`),
//     };
//   };

//   return (
//     <PageTemplate>
//       <Typography.Title>Users Page</Typography.Title>

//       {isLoading ? (
//         <Loader />
//       ) : (
//         <Table
//           columns={columns}
//           dataSource={usersKey}
//           onChange={onChange}
//           pagination={pagination}
//           onRow={sumbitRow}
//         />
//       )}
//     </PageTemplate>
//   );
// };

// export default withRouter(UsersPage);
