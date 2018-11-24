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
      style={{ lineHeight: '64px', textAlign: 'left' }}
    >
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/dahsboard">Dashboard</Link>
      </Menu.Item>
    </Menu>
  </Header>
);

export default Navbar;
