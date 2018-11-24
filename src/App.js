import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.less';

import Home from './containers/Home';
import Dashboard from './containers/Dashboard';

import Navbar from './views/layouts/Navbar';

import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout style={{ minHeight: '100%' }}>
        <Navbar />
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/dahsboard" component={Dashboard} />
        </Layout>
      </Layout>
    </Router>
  </Provider>
);

export default App;
