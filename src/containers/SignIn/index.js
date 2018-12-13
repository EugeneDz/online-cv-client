import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { Modal, Button, Divider, Input, Icon, Row, Col } from 'antd';
import { Spring } from 'react-spring';

import { setErrors, unsetErrors } from 'store/actions/errors';
import { setCurrentUser } from 'store/actions/auth';

import { API_URL, USERS_LOGIN } from 'config';

import { Section, ErrorDescr } from './styled-components';

const { Group } = Input;

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      email: '',
      password: ''
    };
  }

  componentWillUnmount = () => {
    const { unsetErrors: _unsetErrors } = this.props;

    _unsetErrors();
  };

  toggleLoading = () => {
    const { loading } = this.state;

    this.setState({ loading: !loading });
  };

  onError = () =>
    Modal.error({
      title: 'Oops, it seems an error occurred!',
      content: 'We are working on solving the issue.'
    });

  handleOnChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value
    });

  handleOnSubmit = async e => {
    const { email, password } = this.state;
    e.preventDefault();

    const user = {
      email,
      password
    };

    await this.toggleLoading();
    await this.loginUser(user);
  };

  loginUser = async user => {
    const { setErrors: _setErrors, setCurrentUser: _setCurrentUser } = this.props;

    try {
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      };
      const res = await fetch(`${API_URL}${USERS_LOGIN}`, options);
      const data = await res.json();
      const status = await res.status;

      // Add promise delay to prevent UI blinking when the response does to fast.
      await new Promise(resolve => setTimeout(resolve, 400));

      if (status === 400) {
        _setErrors(data);
        await this.toggleLoading();
      } else {
        const {
          history: { push }
        } = this.props;
        const decodedUser = jwtDecode(data.token);

        localStorage.setItem('token', data.token);
        _setCurrentUser(decodedUser);

        await this.toggleLoading();
        push('/');
      }
    } catch (err) {
      this.onError();
      this.toggleLoading();

      // Log the error to an error reporting service
      console.log(err);
    }
  };

  render() {
    const { email, password, loading } = this.state;
    const { errors } = this.props;

    return (
      <>
        <Helmet>
          <title>Online CV | Sign Ip</title>
          <meta name="description" content="Online CV for developers" />
        </Helmet>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {section => (
            <Section style={section}>
              <header>
                <Row type="flex" justify="center">
                  <Col span={24}>
                    <h1 style={{ textAlign: 'center' }}>Sign In</h1>
                  </Col>
                  <Col span={24}>
                    <p style={{ textAlign: 'center' }}>Sign in to your account</p>
                  </Col>
                </Row>
              </header>
              <div>
                <Row gutter={16} type="flex" justify="center">
                  <Col xs={24} md={16}>
                    <Group>
                      <Input
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        name="email"
                        value={email}
                        placeholder="Email"
                        size="large"
                        onChange={this.handleOnChange}
                      />
                      {errors.email && (
                        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                          {props => <ErrorDescr style={props}> {errors.email} </ErrorDescr>}
                        </Spring>
                      )}
                    </Group>
                  </Col>
                  <Col xs={24} md={16} style={{ marginTop: 24 }}>
                    <Group>
                      <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        name="password"
                        type="password"
                        value={password}
                        placeholder="Password"
                        size="large"
                        onChange={this.handleOnChange}
                      />
                      {errors.password && (
                        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                          {props => <ErrorDescr style={props}> {errors.password} </ErrorDescr>}
                        </Spring>
                      )}
                    </Group>
                  </Col>
                </Row>
                <Row gutter={16} type="flex" justify="center">
                  <Col xs={24} md={16}>
                    <Divider orientation="right">
                      <Button
                        type="primary"
                        size="large"
                        loading={loading}
                        block
                        onClick={this.handleOnSubmit}
                      >
                        Submit
                      </Button>
                    </Divider>
                  </Col>
                </Row>
              </div>
            </Section>
          )}
        </Spring>
      </>
    );
  }
}

const mapStateToProps = ({ errors, auth }) => ({
  errors,
  auth
});

export default connect(
  mapStateToProps,
  {
    setErrors,
    unsetErrors,
    setCurrentUser
  }
)(SignIn);
