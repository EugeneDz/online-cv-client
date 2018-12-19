import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { waitingComponent, PrivateRoute } from 'utils';

const Dashboard = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return import('containers/Dashboard');
});

const Profile = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return import('containers/Profile');
});

const EditProfile = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return import('containers/Profile/edit');
});

const AddExperience = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return import('containers/Profile/add-experience');
});

const AddEducation = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return import('containers/Profile/add-education');
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

const Routes = () => (
  <>
    <Route exact path="/" component={waitingComponent(Dashboard)} />
    <PrivateRoute exact path="/profile" component={waitingComponent(Profile)} />
    <PrivateRoute exact path="/profile/edit" component={waitingComponent(EditProfile)} />
    <PrivateRoute
      exact
      path="/profile/add-experience"
      component={waitingComponent(AddExperience)}
    />
    <PrivateRoute exact path="/profile/add-education" component={waitingComponent(AddEducation)} />
    <PrivateRoute exact path="/posts" component={waitingComponent(Posts)} />
    <Route exact path="/sign-in" component={waitingComponent(SignIn)} />
    <Route exact path="/sign-up" component={waitingComponent(SignUp)} />
  </>
);

export default Routes;
