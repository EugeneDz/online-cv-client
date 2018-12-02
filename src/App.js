import React, { lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.less';

import Navbar from 'views/layouts/Navbar';

import { waitingComponent } from 'utils';

import store from 'store';

const Dashboard = lazy(() => import('containers/Dashboard'));

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout style={{ minHeight: '100%' }}>
        <Navbar />
        <Layout>
          <Route exact path="/" component={waitingComponent(Dashboard)} />
        </Layout>
      </Layout>
    </Router>
  </Provider>
);

export default App;
