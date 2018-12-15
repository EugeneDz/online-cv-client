import React, { lazy } from 'react';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.less';

import Navbar from 'views/layouts/Navbar';
import Footer from 'views/layouts/Footer';

import { waitingComponent, PrivateRoute } from 'utils';

import store from 'store';
import { setCurrentUser, unsetCurrentUser } from 'store/actions/auth';
import { unsetCurrentProfile } from 'store/actions/profile';

const Dashboard = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return import('containers/Dashboard');
});

const Profile = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return import('containers/Profile');
});

const CreateProfile = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return import('containers/Profile/create');
});

const Posts = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return import('containers/Posts');
});

const SignIn = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return import('containers/SignIn');
});

const SignUp = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return import('containers/SignUp');
});

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
            <PrivateRoute exact path="/" component={waitingComponent(Dashboard)} />
            <PrivateRoute exact path="/profile" component={waitingComponent(Profile)} />
            <PrivateRoute
              exact
              path="/profile/create"
              component={waitingComponent(CreateProfile)}
            />
            <PrivateRoute exact path="/posts" component={waitingComponent(Posts)} />
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
