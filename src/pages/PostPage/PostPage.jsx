import { Card, Pagination, Space, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from '../../axios/index';
import PageTemplate from '../../components/PageTemplate/PageTemplate';

const PostPage = () => {

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (page = 1) => {
    setIsLoading(true);
    const response = await axios.get(`https://gorest.co.in/public/v1/posts?page=${page}`);
    setPosts(response.data.data);
    setPagination(response.data.meta.pagination)
    setIsLoading(false);
  }
  console.log(pagination)
  // console.log(posts);

  const selectPage = (page) => {
    fetchPosts(page);
  }

  return (
    <PageTemplate>
      <Typography.Title>PostPage</Typography.Title>

      {
        isLoading
        ? <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '50px',
          }}><Spin size="large" /></div>
        : <>
            <Space
              direction="vertical"
              size="middle"
              style={{
                display: 'flex',
              }}
            >
              {posts.map(post => (
                <CardComment key={post.id} cardInfo={post} />
              ))}
            </Space>
            <Pagination 
              // defaultCurrent={1} 
              current={pagination.page}
              total={pagination.total} 
              showSizeChanger={false} 
              pageSize={10} 
              onChange={(page, pageSize) => selectPage(page)}
              style={{display: 'flex', justifyContent: 'center', margin: '30px auto 0'}}
            />
          </>
      }
    </PageTemplate>
  )
}

export default PostPage

const CardComment = ({cardInfo}) => {
  return (
    <Card 
      title={cardInfo.title} 
      style={{boxShadow: '5px 5px 7px gray'}}
    >
      <p>{cardInfo.body}</p>
    </Card>
  )
}