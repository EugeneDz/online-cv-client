import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Button, Divider, Input, Icon, Row, Col } from 'antd';

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
      password2: '',
      errors: {}
    };
  }

  toggleLoading = () => {
    const { loading } = this.state;

    this.setState({ loading: !loading });
  };

  handleOnChange = ({ target: { name, value } }) => {
    const { errors } = this.state;

    this.setState({
      [name]: value,
      errors: { ...errors, [name]: '' }
    });
  };

  handleOnSubmit = async e => {
    const { name, email, password, password2 } = this.state;
    e.preventDefault();
    this.toggleLoading();

    const user = {
      name,
      email,
      password,
      password2
    };

    try {
      const res = await fetch(`${API_URL}${USERS_REGISTER}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const json = await res.json();
      const status = await res.status;

      if (status === 400) this.setState({ errors: json });
      else console.log(json);

      this.toggleLoading();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { name, email, password, password2, errors, loading } = this.state;

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
          <form onSubmit={this.handleOnSubmit}>
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
          </form>
        </section>
      </>
    );
  }
}

export default SignUp;
