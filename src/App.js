import React from 'react';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.less';

import Routes from 'routes';
import Navbar from 'views/layouts/Navbar';
import Footer from 'views/layouts/Footer';

import store from 'store';
import { setCurrentUser, unsetCurrentUser } from 'store/actions/auth';
import { unsetCurrentProfile } from 'store/actions/profile';

const { Content } = Layout;

if (localStorage.token) {
  const decodedUser = jwtDecode(localStorage.token);
  store.dispatch(setCurrentUser(decodedUser));

  const currentTime = Date.now() / 1000;
  if (decodedUser.exp < currentTime) {
    localStorage.clear();
    store.dispatch(unsetCurrentUser());
    store.dispatch(unsetCurrentProfile());

    window.location.href = '/sign-in';
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout style={{ minHeight: '100%' }}>
        <Layout>
          <Navbar />
          <Content>
            <Routes />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Router>
  </Provider>
);

export default App;
