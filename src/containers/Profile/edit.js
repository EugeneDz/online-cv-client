import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Spin, Modal, Select, Button, Divider, Input, Icon, Row, Col } from 'antd';
import { Spring } from 'react-spring';
import { isEmpty } from 'lodash';

import { setErrors, unsetErrors } from 'store/actions/errors';
import { setCurrentProfile } from 'store/actions/profile';

import { API_URL, CURRENT_PROFILE } from 'config';
import statusList from './data/status-list';

import { Section, ErrorDescr } from './styled-components';

const { Group, TextArea } = Input;
const { Option } = Select;

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      profileLoading: true,
      handle: '',
      status: '',
      company: '',
      website: '',
      location: '',
      skills: '',
      githubusername: '',
      bio: '',
      youtube: '',
      twitter: '',
      facebook: '',
      linkedin: ''
    };
  }

  componentDidMount = () => {
    const { profile } = this.props;

    if (isEmpty(profile)) this.fetchCurrentProfile();
    else this.hydrateProfile(profile);
  };

  componentWillReceiveProps = nextProps => {
    const { profile } = nextProps;

    if (!isEmpty(profile)) this.hydrateProfile(profile);
  };

  componentWillUnmount = () => {
    const { unsetErrors: _unsetErrors } = this.props;

    _unsetErrors();
  };

  hydrateProfile = profile => {
    const hydrateProfile = {};

    if (!isEmpty(profile.handle)) hydrateProfile.handle = profile.handle;
    if (!isEmpty(profile.status)) hydrateProfile.status = profile.status;
    if (!isEmpty(profile.company)) hydrateProfile.company = profile.company;
    if (!isEmpty(profile.website)) hydrateProfile.website = profile.website;
    if (!isEmpty(profile.location)) hydrateProfile.location = profile.location;
    if (!isEmpty(profile.skills)) hydrateProfile.skills = profile.skills.join(',');
    if (!isEmpty(profile.githubusername)) hydrateProfile.githubusername = profile.githubusername;
    if (!isEmpty(profile.bio)) hydrateProfile.bio = profile.bio;
    if (!isEmpty(profile.social.youtube)) hydrateProfile.youtube = profile.social.youtube;
    if (!isEmpty(profile.social.twitter)) hydrateProfile.twitter = profile.social.twitter;
    if (!isEmpty(profile.social.facebook)) hydrateProfile.facebook = profile.social.facebook;
    if (!isEmpty(profile.social.linkedin)) hydrateProfile.linkedin = profile.social.linkedin;

    this.setState({ ...hydrateProfile, profileLoading: false });
  };

  fetchCurrentProfile = async () => {
    const { token } = localStorage;
    const { setCurrentProfile: _setCurrentProfile } = this.props;

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
      } else {
        this.setState({ profileLoading: false });
        _setCurrentProfile(data);
      }
    } catch (err) {
      this.onError();
      this.toggleLoading();

      // Log the error to an error reporting service
      console.log(err);
    }
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

  handleOnSelect = value =>
    this.setState({
      status: value
    });

  handleOnSubmit = async e => {
    const {
      handle,
      status,
      company,
      website,
      location,
      skills,
      githubusername,
      bio,
      youtube,
      twitter,
      facebook,
      linkedin
    } = this.state;
    e.preventDefault();

    const profile = {
      handle,
      status,
      company,
      website,
      location,
      skills,
      githubusername,
      bio,
      youtube,
      twitter,
      facebook,
      linkedin
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
    const {
      loading,
      profileLoading,
      handle,
      status,
      company,
      website,
      location,
      skills,
      githubusername,
      bio,
      youtube,
      twitter,
      facebook,
      linkedin
    } = this.state;
    const { errors } = this.props;

    return (
      <>
        <Helmet>
          <title>Online CV | Edit Profile</title>
          <meta name="description" content="Online CV for developers" />
        </Helmet>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {section => (
            <Section style={section}>
              <header>
                <Row type="flex" justify="center">
                  <Col span={24}>
                    <h1 style={{ textAlign: 'center' }}>Edit Profile</h1>
                  </Col>
                  <Col span={24}>
                    <p style={{ textAlign: 'center' }}>
                      Let&apos;s get some information to make your profile stand out
                    </p>
                  </Col>
                </Row>
              </header>
              {profileLoading ? (
                <Row gutter={16} type="flex" justify="center">
                  <Col xs={24} md={16}>
                    <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
                  </Col>
                </Row>
              ) : (
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
                            <sup>&#42;</sup> A unique handle for your profile URL. Your full name,
                            company name, nickname, etc
                          </small>
                        )}
                      </Group>
                    </Col>
                    <Col xs={24} md={16} style={{ marginTop: 24 }}>
                      <Group>
                        <Select
                          size="large"
                          style={{ width: '100%' }}
                          placeholder="Select your status"
                          optionFilterProp="children"
                          onChange={this.handleOnSelect}
                          value={status}
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {statusList.map(item => (
                            <Option value={item.value} key={item.id}>
                              {item.title}
                            </Option>
                          ))}
                        </Select>
                        {errors.status ? (
                          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                            {props => <ErrorDescr style={props}> {errors.status} </ErrorDescr>}
                          </Spring>
                        ) : (
                          <small>
                            <sup>&#42;</sup> Give us an idea of where you are at in your career
                          </small>
                        )}
                      </Group>
                    </Col>
                    <Col xs={24} md={16} style={{ marginTop: 24 }}>
                      <Group>
                        <Input
                          prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          name="company"
                          value={company}
                          placeholder="Company"
                          size="large"
                          onChange={this.handleOnChange}
                        />
                        {errors.company ? (
                          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                            {props => <ErrorDescr style={props}> {errors.company} </ErrorDescr>}
                          </Spring>
                        ) : (
                          <small>Could be your own company or one you work for</small>
                        )}
                      </Group>
                    </Col>
                    <Col xs={24} md={16} style={{ marginTop: 24 }}>
                      <Group>
                        <Input
                          prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          name="website"
                          value={website}
                          placeholder="Website"
                          size="large"
                          onChange={this.handleOnChange}
                        />
                        {errors.website ? (
                          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                            {props => <ErrorDescr style={props}> {errors.website} </ErrorDescr>}
                          </Spring>
                        ) : (
                          <small>Could be your own or a company website</small>
                        )}
                      </Group>
                    </Col>
                    <Col xs={24} md={16} style={{ marginTop: 24 }}>
                      <Group>
                        <Input
                          prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          name="location"
                          value={location}
                          placeholder="Location"
                          size="large"
                          onChange={this.handleOnChange}
                        />
                        {errors.location ? (
                          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                            {props => <ErrorDescr style={props}> {errors.location} </ErrorDescr>}
                          </Spring>
                        ) : (
                          <small>City &amp; state suggested</small>
                        )}
                      </Group>
                    </Col>
                    <Col xs={24} md={16} style={{ marginTop: 24 }}>
                      <Group>
                        <Input
                          prefix={<Icon type="check-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          name="skills"
                          value={skills}
                          placeholder="Skills"
                          size="large"
                          onChange={this.handleOnChange}
                        />
                        {errors.skills ? (
                          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                            {props => <ErrorDescr style={props}> {errors.skills} </ErrorDescr>}
                          </Spring>
                        ) : (
                          <small>
                            <sup>&#42;</sup> Please use comma separated values (eg.
                            HTML,CSS,JavaScript,PHP)
                          </small>
                        )}
                      </Group>
                    </Col>
                    <Col xs={24} md={16} style={{ marginTop: 24 }}>
                      <Group>
                        <Input
                          prefix={<Icon type="github" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          name="githubusername"
                          value={githubusername}
                          placeholder="Github username"
                          size="large"
                          onChange={this.handleOnChange}
                        />
                        {errors.github ? (
                          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                            {props => <ErrorDescr style={props}> {errors.github} </ErrorDescr>}
                          </Spring>
                        ) : (
                          <small>
                            If you want your latest repos and a Github link, include your username
                          </small>
                        )}
                      </Group>
                    </Col>
                    <Col xs={24} md={16} style={{ marginTop: 24 }}>
                      <Group>
                        <TextArea
                          name="bio"
                          value={bio}
                          placeholder="A short bio of yourself"
                          rows={6}
                          onChange={this.handleOnChange}
                        />
                      </Group>
                    </Col>
                  </Row>
                  <Row gutter={16} type="flex" justify="center">
                    <Col xs={24} md={16}>
                      <Divider orientation="left">Social Network Links</Divider>
                    </Col>
                  </Row>
                  <Row gutter={16} type="flex" justify="center">
                    <Col xs={24} md={16} style={{ marginTop: 24 }}>
                      <Group>
                        <Input
                          prefix={<Icon type="youtube" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          name="youtube"
                          value={youtube}
                          placeholder="YouTube"
                          size="large"
                          onChange={this.handleOnChange}
                        />
                        {errors.youtube && (
                          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                            {props => <ErrorDescr style={props}> {errors.youtube} </ErrorDescr>}
                          </Spring>
                        )}
                      </Group>
                    </Col>
                    <Col xs={24} md={16} style={{ marginTop: 24 }}>
                      <Group>
                        <Input
                          prefix={<Icon type="twitter" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          name="twitter"
                          value={twitter}
                          placeholder="Twitter"
                          size="large"
                          onChange={this.handleOnChange}
                        />
                        {errors.twitter && (
                          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                            {props => <ErrorDescr style={props}> {errors.twitter} </ErrorDescr>}
                          </Spring>
                        )}
                      </Group>
                    </Col>
                    <Col xs={24} md={16} style={{ marginTop: 24 }}>
                      <Group>
                        <Input
                          prefix={<Icon type="facebook" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          name="facebook"
                          value={facebook}
                          placeholder="Facebook"
                          size="large"
                          onChange={this.handleOnChange}
                        />
                        {errors.facebook && (
                          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                            {props => <ErrorDescr style={props}> {errors.facebook} </ErrorDescr>}
                          </Spring>
                        )}
                      </Group>
                    </Col>
                    <Col xs={24} md={16} style={{ marginTop: 24 }}>
                      <Group>
                        <Input
                          prefix={<Icon type="linkedin" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          name="linkedin"
                          value={linkedin}
                          placeholder="LinkedIn"
                          size="large"
                          onChange={this.handleOnChange}
                        />
                        {errors.linkedin && (
                          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                            {props => <ErrorDescr style={props}> {errors.linkedin} </ErrorDescr>}
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
              )}
            </Section>
          )}
        </Spring>
      </>
    );
  }
}

const mapStateToProps = ({ errors, auth, profile }) => ({
  errors,
  auth,
  profile
});

export default connect(
  mapStateToProps,
  {
    setErrors,
    unsetErrors,
    setCurrentProfile
  }
)(EditProfile);
