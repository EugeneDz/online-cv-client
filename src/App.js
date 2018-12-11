import React, { lazy } from 'react';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.less';

import Navbar from 'views/layouts/Navbar';
import Sidebar from 'views/layouts/Sidebar';
import Footer from 'views/layouts/Footer';

import { waitingComponent, PrivateRoute } from 'utils';

import store from 'store';
import { setCurrentUser, unsetCurrentUser } from 'store/actions/auth';

const Dashboard = lazy(() => import('containers/Dashboard'));
const Profile = lazy(() => import('containers/Profile'));
const SignIn = lazy(() => import('containers/SignIn'));
const SignUp = lazy(() => import('containers/SignUp'));

const { Content } = Layout;

if (localStorage.token) {
  const decodedUser = jwtDecode(localStorage.token);
  store.dispatch(setCurrentUser(decodedUser));

  const currentTime = Date.now() / 1000;
  if (decodedUser.exp < currentTime) {
    store.dispatch(unsetCurrentUser());

    window.location.href = '/sign-in';
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout style={{ minHeight: '100%' }}>
        <Sidebar />
        <Layout>
          <Navbar />
          <Content>
            <PrivateRoute exact path="/" component={waitingComponent(Dashboard)} />
            <PrivateRoute exact path="/profile" component={waitingComponent(Profile)} />
            <Route exact path="/sign-in" component={waitingComponent(SignIn)} />
            <Route exact path="/sign-up" component={waitingComponent(SignUp)} />
            <Footer />
          </Content>
        </Layout>
      </Layout>
    </Router>
  </Provider>
);

export default App;
