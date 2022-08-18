import React from 'react'
import { Menu as MenuAntd } from 'antd';
import { Link, withRouter } from 'react-router-dom';

const Menu = ({location}) => {

  const defaultKey = location.pathname;

  return (
    <MenuAntd mode="horizontal" defaultSelectedKeys={[defaultKey]} theme='dark'>
      <MenuAntd.Item key='/'>
        <Link to="/">Home</Link>
      </MenuAntd.Item>
      <MenuAntd.Item key='/users'>
        <Link to="/users">Users</Link>
      </MenuAntd.Item>
    </MenuAntd>
  )
}

export default withRouter(Menu)