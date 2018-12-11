import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Layout, Menu, Avatar, Icon } from 'antd';

import { unsetCurrentUser } from '../../../store/actions/auth';

const { Header } = Layout;
const { SubMenu } = Menu;

const Navbar = ({
  unsetCurrentUser: _unsetCurrentUser,
  auth: { isAuthenticated, user },
  history
}) => {
  const userTitle = () => (
    <span className="submenu-title-wrapper">
      <Avatar src={user.avatar} /> {user.name}
    </span>
  );

  const logout = () => {
    localStorage.clear();
    _unsetCurrentUser();
    history.push('/sign-in');
  };

  return (
    <Header style={{ background: '#fff', padding: 0 }}>
      {isAuthenticated ? (
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ lineHeight: '64px', textAlign: 'right' }}
        >
          <SubMenu key="sub1" title={userTitle()}>
            <Menu.Item key="setting:1">
              <Link to="/profile">
                <Icon type="idcard" /> Profile
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:2" onClick={logout}>
              <Icon type="logout" /> Logout
            </Menu.Item>
          </SubMenu>
        </Menu>
      ) : (
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px', textAlign: 'right' }}
        >
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
