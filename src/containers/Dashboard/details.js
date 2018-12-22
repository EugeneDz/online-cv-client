import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import { Spring } from 'react-spring';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Skeleton, Avatar, Tag, Card, Button, Icon, Divider, Row, Col } from 'antd';

import withError from 'hoc/with-error';

import { API_URL, PROFILE_GET_BY_ID } from 'config';

import { Section, NavWrap, Jumbotron } from './styled-components';

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      noprofile: '',
      profile: {}
    };
  }

  componentDidMount = () => this.fetchProfile();

  fetchProfile = async () => {
    const { onError } = this.props;
    const {
      match: {
        params: { profile_id: id }
      }
    } = this.props;

    try {
      const options = {
        method: 'GET'
      };
      const res = await fetch(`${API_URL}${PROFILE_GET_BY_ID}${id}`, options);
      const data = await res.json();
      const status = await res.status;

      // Add promise delay to prevent UI blinking when the response does to fast.
      await new Promise(resolve => setTimeout(resolve, 400));

      if (status === 404 && data.profile) {
        this.toggleLoading();
        this.setState({ noprofile: data.profile });
      } else {
        this.toggleLoading();
        this.setState({ profile: data });
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

  render() {
    const { loading, profile, noprofile } = this.state;

    return (
      <>
        <Helmet>
          <title>Online CV | Profile Details Page</title>
          <meta name="description" content="Online CV for developers" />
        </Helmet>
        <NavWrap>
          <Row type="flex" justify="left">
            <Col>
              <Button type="primary">
                <Link to="/">
                  <Icon type="left" /> Go back
                </Link>
              </Button>
            </Col>
          </Row>
        </NavWrap>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {spring => (
            <Section style={spring}>
              {loading ? (
                <Skeleton avatar active paragraph={{ rows: 4 }} />
              ) : (
                <>
                  {noprofile && <p>{noprofile}</p>}
                  {!isEmpty(profile) && (
                    <>
                      <Jumbotron>
                        <Row type="flex" justify="center">
                          <Col>
                            <Avatar size={256} src={profile.user.avatar} />
                          </Col>
                        </Row>
                        <Row type="flex" justify="center">
                          <Col>
                            <h1>{profile.user.name}</h1>
                          </Col>
                        </Row>
                        <Row type="flex" justify="center">
                          <Col>
                            <h3>
                              {profile.status} at {!isEmpty(profile.company) && profile.company}
                            </h3>
                          </Col>
                        </Row>
                        {!isEmpty(profile.location) && (
                          <Row type="flex" justify="center">
                            <Col>
                              <h5>{profile.location}</h5>
                            </Col>
                          </Row>
                        )}
                        <Row>
                          <Col span={24}>
                            <Divider orientation="right" />
                          </Col>
                        </Row>
                        <Row type="flex" justify="center">
                          <Col>
                            {!isEmpty(profile.githubusername) && (
                              <a
                                target="_blunk"
                                href={`https://github.com/${profile.githubusername}`}
                              >
                                <Icon
                                  style={{ fontSize: '32px', padding: '0 8px' }}
                                  type="github"
                                />
                              </a>
                            )}
                            {!isEmpty(profile.social.facebook) && (
                              <a target="_blunk" href={profile.social.facebook}>
                                <Icon
                                  style={{ fontSize: '32px', padding: '0 8px' }}
                                  type="facebook"
                                />
                              </a>
                            )}
                            {!isEmpty(profile.social.linkedin) && (
                              <a target="_blunk" href={profile.social.linkedin}>
                                <Icon
                                  style={{ fontSize: '32px', padding: '0 8px' }}
                                  type="linkedin"
                                />
                              </a>
                            )}
                            {!isEmpty(profile.social.twitter) && (
                              <a target="_blunk" href={profile.social.twitter}>
                                <Icon
                                  style={{ fontSize: '32px', padding: '0 8px' }}
                                  type="twitter"
                                />
                              </a>
                            )}
                            {!isEmpty(profile.social.youtube) && (
                              <a target="_blunk" href={profile.social.youtube}>
                                <Icon
                                  style={{ fontSize: '32px', padding: '0 8px' }}
                                  type="youtube"
                                />
                              </a>
                            )}
                          </Col>
                        </Row>
                      </Jumbotron>
                      {!isEmpty(profile.bio) && (
                        <Card title={`${profile.user.name} Bio`} style={{ width: '100%' }}>
                          <p>{profile.bio}</p>
                          <Divider orientation="left">Skill Set</Divider>
                          {profile.skills.map(skill => (
                            <Tag key={skill} color="geekblue">
                              {skill}
                            </Tag>
                          ))}
                        </Card>
                      )}
                      {!isEmpty(profile.experience) && (
                        <Card title="Experience" style={{ width: '100%', marginTop: '40px' }}>
                          {profile.experience.map(item => (
                            <>
                              <Row key={item._id}>
                                <Col span={24}>
                                  <h3>{item.company}</h3>
                                  <p>{item.title}</p>
                                </Col>
                                <Col span={24}>
                                  <h6>
                                    {`${moment(item.from).format('YYYY-MM-DD')} / ${
                                      item.current
                                        ? 'current time'
                                        : moment(item.to).format('YYYY-MM-DD')
                                    }`}
                                  </h6>
                                </Col>
                                {!isEmpty(item.description) && (
                                  <Col span={24}>{item.description}</Col>
                                )}
                              </Row>
                              {profile.experience.length > 1 && <Divider />}
                            </>
                          ))}
                        </Card>
                      )}
                      {!isEmpty(profile.education) && (
                        <Card title="Education" style={{ width: '100%', marginTop: '40px' }}>
                          {profile.education.map(item => (
                            <>
                              <Row key={item._id}>
                                <Col span={24}>
                                  <h3>{item.school}</h3>
                                  <p>{item.fieldofstudy}</p>
                                </Col>
                                <Col span={24}>
                                  <h6>
                                    {`${moment(item.from).format('YYYY-MM-DD')} / ${
                                      item.current
                                        ? 'current time'
                                        : moment(item.to).format('YYYY-MM-DD')
                                    }`}
                                  </h6>
                                </Col>
                                {!isEmpty(item.description) && (
                                  <Col span={24}>{item.description}</Col>
                                )}
                              </Row>
                              {profile.experience.length > 1 && <Divider />}
                            </>
                          ))}
                        </Card>
                      )}
                    </>
                  )}
                </>
              )}
            </Section>
          )}
        </Spring>
      </>
    );
  }
}

export default withError(Details);
