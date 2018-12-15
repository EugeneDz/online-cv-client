import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Avatar, Icon } from 'antd';

import { unsetCurrentUser } from 'store/actions/auth';

import { Menu } from './styled-components';

const { Header } = Layout;
const { SubMenu } = Menu;

const Navbar = ({
  unsetCurrentUser: _unsetCurrentUser,
  auth: { isAuthenticated, user },
  history
}) => {
  const userTitle = () => (
    <span className="submenu-title-wrapper">
      <Avatar src={user.avatar} /> {user.name} <Icon type="caret-down" />
    </span>
  );

  const logout = () => {
    localStorage.clear();
    _unsetCurrentUser();
    history.push('/sign-in');
  };

  return (
    <Header>
      {isAuthenticated ? (
        <Menu theme="dark" mode="horizontal">
          <SubMenu key="sub1" title={userTitle()}>
            <Menu.Item key="setting:1">
              <Link to="/profile">
                <Icon type="idcard" /> Profile
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:2">
              <Link to="/">
                <Icon type="contacts" /> Dashboard
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:3">
              <Link to="/posts">
                <Icon type="message" /> Posts
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:4" onClick={logout}>
              <Icon type="logout" /> Logout
            </Menu.Item>
          </SubMenu>
        </Menu>
      ) : (
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/sign-up">Sign Up</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/sign-in">Sign In</Link>
          </Menu.Item>
        </Menu>
      )}
    </Header>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(
  mapStateToProps,
  {
    unsetCurrentUser
  }
)(withRouter(Navbar));
