import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Modal, Button, Divider, Input, Icon, Row, Col } from 'antd';

import { setErrors, unsetErrors } from 'store/actions/errors';

import { API_URL, USERS_REGISTER } from 'config';

import { ErrorDescr } from './styled-components';

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
        <section style={{ minHeight: '100vh', background: '#fff', padding: 24, margin: 24 }}>
          <header>
            <Row>
              <Col span={24}>
                <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
              </Col>
            </Row>
          </header>
          <div>
            <Row gutter={16}>
              <Col span={12}>
                <Group>
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    name="name"
                    value={name}
                    placeholder="Name"
                    onChange={this.handleOnChange}
                  />
                  {errors.name && <ErrorDescr>{errors.name}</ErrorDescr>}
                </Group>
              </Col>
              <Col span={12}>
                <Group>
                  <Input
                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={this.handleOnChange}
                  />
                  {errors.email && <ErrorDescr> {errors.email} </ErrorDescr>}
                </Group>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={12}>
                <Group>
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    name="password"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={this.handleOnChange}
                  />
                  {errors.password && <ErrorDescr> {errors.password} </ErrorDescr>}
                </Group>
              </Col>
              <Col span={12}>
                <Group>
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    name="password2"
                    type="password"
                    value={password2}
                    placeholder="Confirm password"
                    onChange={this.handleOnChange}
                  />
                  {errors.password2 && <ErrorDescr> {errors.password2} </ErrorDescr>}
                </Group>
              </Col>
            </Row>
            <Divider orientation="right">
              <Button type="primary" loading={loading} block onClick={this.handleOnSubmit}>
                Submit
              </Button>
            </Divider>
          </div>
        </section>
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
