import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import Logo from 'components/Logo';

const { Sider } = Layout;

class Sidebar extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => this.setState({ collapsed });

  render() {
    const { collapsed } = this.state;

    return (
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <Logo />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Link to="/">
              <Icon type="contacts" />
              <span>Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/">
              <Icon type="message" />
              <span>Posts</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
