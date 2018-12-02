import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const Navbar = () => (
  <Header style={{ background: '#fff', padding: 0 }}>
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
  </Header>
);

export default Navbar;
