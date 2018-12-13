import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Modal, Button, Divider, Input, Icon, Row, Col } from 'antd';
import { Spring } from 'react-spring';

import { setErrors, unsetErrors } from 'store/actions/errors';

import { API_URL, USERS_REGISTER } from 'config';

import { Section, ErrorDescr } from './styled-components';

const { Group } = Input;

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      name: '',
      email: '',
      password: '',
      password2: ''
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

  onSuccess = () =>
    Modal.success({
      title: 'Registration Successful!',
      content: 'You will be redirected into a sign in page.',
      onOk: () => {
        const {
          history: { push }
        } = this.props;
        push('/sign-in');
      }
    });

  onError = () =>
    Modal.error({
      title: 'Oops, it seems an error occurred!',
      content: 'We are working on solving the issue.'
    });

  handleOnChange = ({ target: { name, value } }) => {
    const { errors } = this.props;
    const { setErrors: _setErrors } = this.props;

    if (errors[name]) {
      _setErrors({ ...errors, [name]: '' });
    }

    this.setState({ [name]: value });
  };

  handleOnSubmit = async e => {
    e.preventDefault();

    const { name, email, password, password2 } = this.state;
    const user = {
      name,
      email,
      password,
      password2
    };

    await this.toggleLoading();
    await this.registerUser(user);
    await this.toggleLoading();
  };

  registerUser = async user => {
    const { setErrors: _setErrors } = this.props;

    try {
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      };
      const res = await fetch(`${API_URL}${USERS_REGISTER}`, options);
      const data = await res.json();
      const status = await res.status;

      // Add promise delay to prevent UI blinking when the response does to fast.
      await new Promise(resolve => setTimeout(resolve, 400));

      if (status === 400) _setErrors(data);
      else this.onSuccess();
    } catch (err) {
      this.onError();

      // Log the error to an error reporting service
      console.log(err);
    }
  };

  render() {
    const { name, email, password, password2, loading } = this.state;
    const { errors } = this.props;

    return (
      <>
        <Helmet>
          <title>Online CV | Sign Up</title>
          <meta name="description" content="Online CV for developers" />
        </Helmet>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {spring => (
            <Section style={spring}>
              <header>
                <Row ype="flex" justify="center">
                  <Col span={24}>
                    <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
                  </Col>
                  <Col span={24}>
                    <p style={{ textAlign: 'center' }}>Create your account</p>
                  </Col>
                </Row>
              </header>
              <div>
                <Row gutter={16} type="flex" justify="center">
                  <Col xs={24} md={16}>
                    <Group>
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        name="name"
                        value={name}
                        placeholder="Name"
                        size="large"
                        onChange={this.handleOnChange}
                      />
                      {errors.name && (
                        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                          {props => <ErrorDescr style={props}> {errors.name} </ErrorDescr>}
                        </Spring>
                      )}
                    </Group>
                  </Col>
                  <Col xs={24} md={16} style={{ marginTop: 24 }}>
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
                  <Col xs={24} md={16} style={{ marginTop: 24 }}>
                    <Group>
                      <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        name="password2"
                        type="password"
                        value={password2}
                        placeholder="Confirm password"
                        size="large"
                        onChange={this.handleOnChange}
                      />
                      {errors.password2 && (
                        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                          {props => <ErrorDescr style={props}> {errors.password2} </ErrorDescr>}
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

const mapStateToProps = ({ errors }) => ({
  errors
});

export default connect(
  mapStateToProps,
  {
    setErrors,
    unsetErrors
  }
)(SignUp);
