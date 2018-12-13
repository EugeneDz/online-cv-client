import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Modal, Button, Divider, Input, Icon, Row, Col } from 'antd';
import { Spring } from 'react-spring';

import { setErrors, unsetErrors } from 'store/actions/errors';
import { setCurrentProfile } from 'store/actions/profile';

import { API_URL, CURRENT_PROFILE } from 'config';

import { Section, ErrorDescr } from './styled-components';

const { Group } = Input;

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      handle: ''
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
    const { handle } = this.state;
    e.preventDefault();

    const profile = {
      handle
    };

    await this.toggleLoading();
    await this.createProfile(profile);
  };

  createProfile = async profile => {
    const { setErrors: _setErrors, setCurrentProfile: _setCurrentProfile } = this.props;

    try {
      const options = {
        method: 'POST',
        headers: {
          Authorization: localStorage.token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      };
      const res = await fetch(`${API_URL}${CURRENT_PROFILE}`, options);
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
        _setCurrentProfile(data);

        await this.toggleLoading();
        push('/profile');
      }
    } catch (err) {
      this.onError();
      this.toggleLoading();

      // Log the error to an error reporting service
      console.log(err);
    }
  };

  render() {
    const { handle, loading } = this.state;
    const { errors } = this.props;

    return (
      <>
        <Helmet>
          <title>Online CV | Create Profile</title>
          <meta name="description" content="Online CV for developers" />
        </Helmet>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {section => (
            <Section style={section}>
              <header>
                <Row type="flex" justify="center">
                  <Col span={24}>
                    <h1 style={{ textAlign: 'center' }}>Create Profile</h1>
                  </Col>
                  <Col span={24}>
                    <p style={{ textAlign: 'center' }}>
                      Let&apos;s get some information to make your profile stand out
                    </p>
                  </Col>
                </Row>
              </header>
              <div>
                <Row gutter={16} type="flex" justify="center">
                  <Col xs={24} md={16}>
                    <Group>
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        name="handle"
                        value={handle}
                        placeholder="Profile handle"
                        size="large"
                        onChange={this.handleOnChange}
                      />

                      {errors.handle ? (
                        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                          {props => <ErrorDescr style={props}> {errors.handle} </ErrorDescr>}
                        </Spring>
                      ) : (
                        <small>
                          A unique handle for your profile URL. Your full name, company name,
                          nickname, etc
                        </small>
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
    setCurrentProfile
  }
)(CreateProfile);
