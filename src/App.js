import React, { lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.less';

import Navbar from 'views/layouts/Navbar';
import Sidebar from 'views/layouts/Sidebar';
import Footer from 'views/layouts/Footer';

import { waitingComponent } from 'utils';

import store from 'store';

const Dashboard = lazy(() => import('containers/Dashboard'));
const { Content } = Layout;

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout style={{ minHeight: '100%' }}>
        <Sidebar />
        <Layout>
          <Navbar />
          <Content>
            <Route exact path="/" component={waitingComponent(Dashboard)} />
            <Footer />
          </Content>
        </Layout>
      </Layout>
    </Router>
  </Provider>
);

export default App;
