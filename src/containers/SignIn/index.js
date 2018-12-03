import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Button, Divider, Input, Icon, Row, Col } from 'antd';

const { Group } = Input;

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      email: '',
      password: '',
      errors: {}
    };
  }

  handleOnChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value
    });

  handleOnSubmit = e => {
    const { email, password } = this.state;
    e.preventDefault();

    const user = {
      email,
      password
    };

    console.log(user);
  };

  render() {
    const { email, password, errors, loading } = this.state;

    return (
      <>
        <Helmet>
          <title>Online CV | Sign Ip</title>
          <meta name="description" content="Online CV for developers" />
        </Helmet>
        <section style={{ minHeight: '100vh', background: '#fff', padding: 24, margin: 24 }}>
          <header>
            <Row>
              <Col span={24}>
                <h1 style={{ textAlign: 'center' }}>Sign Ip</h1>
              </Col>
            </Row>
          </header>
          <form onSubmit={this.handleOnSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={this.handleOnChange}
                />
              </Col>
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
                  {errors.password && <span> {errors.password} </span>}
                </Group>
              </Col>
            </Row>
            <Divider orientation="right">
              <Button type="primary" loading={loading} block>
                Sign In
              </Button>
            </Divider>
          </form>
        </section>
      </>
    );
  }
}

export default SignIn;
