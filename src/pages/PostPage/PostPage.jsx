import { Avatar, Card, Tooltip } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import PageTemplate from '../../components/PageTemplate/PageTemplate';

const PostPage = ({ match: { params }, location, history }) => {
  // console.log('match ', match)
  // console.log('location ', location)
  // console.log('history ', history)

  const [post, setPost] = useState({});
  const [author, setAuthor] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPost(params.id);
  }, []);

  const fetchPost = async (postId) => {
    setIsLoading(true);
    const response = await axios.get(
      `https://gorest.co.in/public/v1/posts/${postId}`
    );
    setPost(response.data.data);
    const responseAuthor = await axios.get(
      `https://gorest.co.in/public/v1/users/${response.data.data.user_id}`
    );
    setAuthor(responseAuthor.data.data);
    const responseComments = await axios.get(
      `https://gorest.co.in/public/v1/comments?post_id=${postId}`
    );
    setComments(responseComments.data.data);
    setIsLoading(false);
  };

  // console.log(post)
  // console.log(author)
  // console.log(comments)

  return (
    <PageTemplate>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Card
            title={post.title}
            extra={
              <Tooltip title={author.name} placement="left">
                <Avatar size={50}>
                  {author.name && author.name.split(' ')[0]}
                </Avatar>
              </Tooltip>
            }
            headStyle={{ fontSize: '25px' }}
            bodyStyle={{ fontSize: '20px' }}
            style={{ boxShadow: '5px 5px 7px gray' }}
          >
            <p>{post.body}</p>
          </Card>

          {comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </>
      )}
    </PageTemplate>
  );
};

export default withRouter(PostPage);

const Comment = ({ body, id, email, name }) => {
  return (
    <Card
      title={name}
      style={{
        width: '60%',
        margin: '30px auto',
      }}
    >
      <p>{body}</p>
    </Card>
  );
};
