import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.less';

import Home from './containers/Home';
import Dashboard from './containers/Dashboard';

import Navbar from './views/layouts/Navbar';

const App = () => (
  <Router>
    <Layout style={{ minHeight: '100%' }}>
      <Navbar />
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/dahsboard" component={Dashboard} />
      </Layout>
    </Layout>
  </Router>
);

export default App;
