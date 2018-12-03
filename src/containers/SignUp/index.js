import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Button, Divider, Input, Icon, Row, Col } from 'antd';

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

  handleOnChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value
    });

  handleOnSubmit = e => {
    const { name, email, password, password2 } = this.state;
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      password2
    };

    console.log(user);
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
                  {errors.name && <span> {errors.name} </span>}
                </Group>
              </Col>
              <Col span={12}>
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={this.handleOnChange}
                />
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={12}>
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  name="password"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.handleOnChange}
                />
              </Col>
              <Col span={12}>
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  name="password2"
                  type="password"
                  value={password2}
                  placeholder="Confirm password"
                  onChange={this.handleOnChange}
                />
              </Col>
            </Row>
            <Divider orientation="right">
              <Button type="primary" loading={loading} block>
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
