import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { Divider, Button, Checkbox, Row, Col, Input, DatePicker, Icon } from 'antd';

import { setErrors, unsetErrors } from 'store/actions/errors';

import withError from 'hoc/with-error';

import { API_URL, PROFILE_ADD_EDUCATION } from 'config';

import { Section, NavWrap, ErrorDescr } from './styled-components';

const { Group, TextArea } = Input;

class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      school: '',
      fieldofstudy: '',
      from: {},
      to: {},
      current: false,
      description: ''
    };
  }

  componentWillUnmount = () => {
    const { unsetErrors: _unsetErrors } = this.props;

    _unsetErrors();
  };

  addEducation = async education => {
    const { setErrors: _setErrors, onError } = this.props;

    try {
      const options = {
        method: 'POST',
        headers: {
          Authorization: localStorage.token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(education)
      };
      const res = await fetch(`${API_URL}${PROFILE_ADD_EDUCATION}`, options);
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

        await this.toggleLoading();
        push('/profile');
      }
    } catch (err) {
      onError();
      this.toggleLoading();

      // Log the error to an error reporting service
      console.log(err);
    }
  };

  toggleLoading = () => {
    const { loading } = this.state;

    this.setState({ loading: !loading });
  };

  handleOnChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value
    });

  handleOnChangeDate = (key, stringDate) =>
    this.setState({
      [key]: stringDate
    });

  handleOnSubmit = async e => {
    const { school, fieldofstudy, from, to, current, description } = this.state;
    e.preventDefault();

    const education = {
      school,
      fieldofstudy,
      from: !isEmpty(from) ? moment(from).format('YYYY-MM-DD') : '',
      to: !isEmpty(to) ? moment(to).format('YYYY-MM-DD') : '',
      current,
      description
    };

    await this.toggleLoading();
    await this.addEducation(education);
  };

  render() {
    const { loading, school, fieldofstudy, current, description } = this.state;
    const { errors } = this.props;

    return (
      <>
        <Helmet>
          <title>Online CV | Add Education</title>
          <meta name="description" content="Online CV for developers" />
        </Helmet>
        <NavWrap>
          <Row type="flex" justify="left">
            <Col>
              <Button type="primary">
                <Link to="/profile">
                  <Icon type="left" /> Go back
                </Link>
              </Button>
            </Col>
          </Row>
        </NavWrap>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {spring => (
            <Section style={spring}>
              <header>
                <Row type="flex" justify="center">
                  <Col span={24}>
                    <h1 style={{ textAlign: 'center' }}>Add Your Education</h1>
                  </Col>
                  <Col span={24}>
                    <p style={{ textAlign: 'center' }}>
                      Add any school, bootcamp, etc that you have attended
                    </p>
                  </Col>
                </Row>
              </header>
              <Row gutter={16} type="flex" justify="center">
                <Col xs={24} md={16}>
                  <Group>
                    <Input
                      prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      name="school"
                      value={school}
                      placeholder="School or bootcamp"
                      size="large"
                      onChange={this.handleOnChange}
                    />
                    {errors.school && (
                      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                        {props => <ErrorDescr style={props}> {errors.school} </ErrorDescr>}
                      </Spring>
                    )}
                  </Group>
                </Col>
                <Col xs={24} md={16} style={{ marginTop: 24 }}>
                  <Group>
                    <Input
                      prefix={<Icon type="read" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      name="fieldofstudy"
                      value={fieldofstudy}
                      placeholder="Field of study"
                      size="large"
                      onChange={this.handleOnChange}
                    />
                    {errors.fieldofstudy && (
                      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                        {props => <ErrorDescr style={props}> {errors.fieldofstudy} </ErrorDescr>}
                      </Spring>
                    )}
                  </Group>
                </Col>
                <Col xs={24} md={16} style={{ marginTop: 24 }}>
                  <Group>
                    <DatePicker
                      size="large"
                      onChange={stringDate => this.handleOnChangeDate('from', stringDate)}
                      style={{ width: '100%' }}
                    />
                    {errors.from && (
                      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                        {props => <ErrorDescr style={props}> {errors.from} </ErrorDescr>}
                      </Spring>
                    )}
                  </Group>
                </Col>
                <Col xs={24} md={16} style={{ marginTop: 24 }}>
                  <Group>
                    <DatePicker
                      size="large"
                      onChange={stringDate => this.handleOnChangeDate('to', stringDate)}
                      style={{ width: '100%' }}
                    />
                    {errors.to && (
                      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                        {props => <ErrorDescr style={props}> {errors.to} </ErrorDescr>}
                      </Spring>
                    )}
                  </Group>
                </Col>
                <Col xs={24} md={16} style={{ marginTop: 24 }}>
                  <Group>
                    <Checkbox value={current} onChange={() => this.setState({ current: !current })}>
                      Current time
                    </Checkbox>
                  </Group>
                </Col>
                <Col xs={24} md={16} style={{ marginTop: 24 }}>
                  <Group>
                    <TextArea
                      name="description"
                      value={description}
                      placeholder="Program Desciption"
                      rows={6}
                      onChange={this.handleOnChange}
                    />
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
)(withError(AddEducation));
