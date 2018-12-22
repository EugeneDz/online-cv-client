import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Alert, Avatar, Icon, Table, Card, Divider, Button, Skeleton, Row, Col } from 'antd';
import { Spring } from 'react-spring';

import { setCurrentProfile } from 'store/actions/profile';

import withError from 'hoc/with-error';

import {
  API_URL,
  CURRENT_PROFILE,
  PROFILE_DELETE_EXPERIENCE,
  PROFILE_DELETE_EDUCATION
} from 'config';

import { Section } from './styled-components';

import educationColumns from './data/columns-education';
import experienceColumns from './data/columns-experience';

const { Group: ButtonGroup } = Button;

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      noprofile: ''
    };
  }

  componentDidMount = () => {
    this.fetchCurrentProfile();

    window.addEventListener('deleteExperienceRecord', this.deleteExperienceRecord);
    window.addEventListener('deleteEducationRecord', this.deleteEducationRecord);
  };

  componentWillUnmount = () => {
    window.removeEventListener('deleteExperienceRecord', this.deleteExperienceRecord);
    window.removeEventListener('deleteEducationRecord', this.deleteEducationRecord);
  };

  fetchCurrentProfile = async () => {
    const { token } = localStorage;
    const { setCurrentProfile: _setCurrentProfile, onError } = this.props;

    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: token
        }
      };
      const res = await fetch(`${API_URL}${CURRENT_PROFILE}`, options);
      const data = await res.json();
      const status = await res.status;

      // Add promise delay to prevent UI blinking when the response does to fast.
      await new Promise(resolve => setTimeout(resolve, 400));

      if (status === 404 && data.noprofile) {
        this.toggleLoading();
        this.setState({ noprofile: data.noprofile });
      } else {
        this.toggleLoading();
        _setCurrentProfile(data);
      }
    } catch (err) {
      onError();
      this.toggleLoading();

      // Log the error to an error reporting service
      console.log(err);
    }
  };

  deleteExperienceRecord = async ({ detail }) => {
    const { token } = localStorage;
    const { setCurrentProfile: _setCurrentProfile, onError } = this.props;
    this.toggleLoading();

    try {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: token
        }
      };
      const res = await fetch(`${API_URL}${PROFILE_DELETE_EXPERIENCE}${detail}`, options);
      const data = await res.json();
      const status = await res.status;

      // Add promise delay to prevent UI blinking when the response does to fast.
      await new Promise(resolve => setTimeout(resolve, 400));

      if (status === 404 && data.noprofile) {
        this.toggleLoading();
        this.setState({ noprofile: data.noprofile });
      } else {
        this.toggleLoading();
        _setCurrentProfile(data);
      }
    } catch (err) {
      onError();
      this.toggleLoading();

      // Log the error to an error reporting service
      console.log(err);
    }
  };

  deleteEducationRecord = async ({ detail }) => {
    const { token } = localStorage;
    const { setCurrentProfile: _setCurrentProfile, onError } = this.props;
    this.toggleLoading();

    try {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: token
        }
      };
      const res = await fetch(`${API_URL}${PROFILE_DELETE_EDUCATION}${detail}`, options);
      const data = await res.json();
      const status = await res.status;

      // Add promise delay to prevent UI blinking when the response does to fast.
      await new Promise(resolve => setTimeout(resolve, 400));

      if (status === 404 && data.noprofile) {
        this.toggleLoading();
        this.setState({ noprofile: data.noprofile });
      } else {
        this.toggleLoading();
        _setCurrentProfile(data);
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

  getExperienceList = experience =>
    experience.length
      ? experience.map(item => ({
          key: item._id,
          company: item.company,
          title: item.title,
          years: `${moment(item.from).format('YYYY-MM-DD')} / ${
            item.current ? 'current time' : moment(item.to).format('YYYY-MM-DD')
          }`
        }))
      : [];

  getEducationList = education =>
    education.length
      ? education.map(item => ({
          key: item._id,
          school: item.school,
          fieldofstudy: item.fieldofstudy,
          years: `${moment(item.from).format('YYYY-MM-DD')} / ${
            item.current ? 'current time' : moment(item.to).format('YYYY-MM-DD')
          }`
        }))
      : [];

  render() {
    const { noprofile, loading } = this.state;
    const { auth, profile } = this.props;

    return (
      <>
        <Helmet>
          <title>Online CV | Profile</title>
          <meta name="description" content="Online CV for developers" />
        </Helmet>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {spring => (
            <Section style={spring}>
              <header>
                <Row type="flex" justify="center">
                  <Col span={24}>
                    <h1>Profile</h1>
                  </Col>
                  <Col span={24}>
                    <p>Welcome {auth.user.name}</p>
                  </Col>
                </Row>
              </header>
              <Divider />
              {loading ? (
                <div>
                  <Skeleton avatar active paragraph={{ rows: 4 }} />
                </div>
              ) : (
                <div>
                  <Row>
                    <Col>
                      <Card
                        title={<Avatar src={auth.user.avatar} />}
                        extra={
                          <ButtonGroup>
                            <Button type="primary">
                              <Link to="/profile/edit">
                                <Icon type="edit" /> Edit Profile
                              </Link>
                            </Button>
                            <Button type="primary">
                              <Link to="/profile/add-experience">
                                <Icon type="plus-circle" /> Add Experience
                              </Link>
                            </Button>
                            <Button type="primary">
                              <Link to="/profile/add-education">
                                <Icon type="plus-circle" /> Add Education
                              </Link>
                            </Button>
                          </ButtonGroup>
                        }
                        style={{ width: '100%' }}
                      >
                        <Table
                          title={() => 'Experience'}
                          dataSource={this.getExperienceList(profile.experience || [])}
                          columns={experienceColumns}
                        />
                        <Table
                          title={() => 'Education'}
                          dataSource={this.getEducationList(profile.education || [])}
                          columns={educationColumns}
                        />
                      </Card>
                    </Col>
                  </Row>
                </div>
              )}
              {noprofile && (
                <div>
                  <Alert message={noprofile} type="info" showIcon />
                  <Divider orientation="right">
                    <Link to="/profile/create">
                      <Button type="primary" block>
                        Create Profile
                      </Button>
                    </Link>
                  </Divider>
                </div>
              )}
            </Section>
          )}
        </Spring>
      </>
    );
  }
}

const mapStateToProps = ({ auth, profile }) => ({
  profile,
  auth
});

export default connect(
  mapStateToProps,
  {
    setCurrentProfile
  }
)(withError(Profile));
