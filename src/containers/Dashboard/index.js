import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Skeleton, Modal, Card, Avatar, Tag, Button, Icon, Divider, Row, Col } from 'antd';
import { Spring } from 'react-spring';

import { API_URL, PROFILE_GET_ALL } from 'config';

import { Section } from './styled-components';

const { Group: ButtonGroup } = Button;

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      noprofiles: '',
      profiles: []
    };
  }

  componentDidMount = () => {
    this.fetchProfiles();
  };

  fetchProfiles = async () => {
    try {
      const options = {
        method: 'GET'
      };
      const res = await fetch(`${API_URL}${PROFILE_GET_ALL}`, options);
      const data = await res.json();
      const status = await res.status;

      // Add promise delay to prevent UI blinking when the response does to fast.
      await new Promise(resolve => setTimeout(resolve, 400));

      if (status === 404 && data.profile) {
        this.toggleLoading();
        this.setState({ noprofiles: data.profile });
      } else {
        this.toggleLoading();
        this.setState({ profiles: data });
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

  render() {
    const { noprofiles, profiles, loading } = this.state;
    return (
      <>
        <Helmet>
          <title>Online CV | Dashboard</title>
          <meta name="description" content="Online CV for developers" />
        </Helmet>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {spring => (
            <Section style={spring}>
              <Row>
                <Col span={24}>
                  <h1>Developer Profiles</h1>
                  <p>
                    Browse profiles or <Link to="/profile"> create your own </Link>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Divider orientation="right" />
                </Col>
              </Row>
              {loading ? (
                <Skeleton avatar active paragraph={{ rows: 4 }} />
              ) : (
                <>
                  {noprofiles && (
                    <p>
                      {noprofiles}
                      <Link to="/profile">
                        <Divider type="vertical" />
                        Create your own
                      </Link>
                    </p>
                  )}
                  {profiles.length > 0 &&
                    profiles.map(profile => (
                      <Row key={profile._id}>
                        <Col span={24}>
                          <Card
                            title={<Avatar size={64} src={profile.user.avatar} />}
                            extra={
                              <ButtonGroup>
                                <Button type="primary">
                                  <Link to={`/profile/${profile.user._id}`}>
                                    <Icon type="user" /> View Profile
                                  </Link>
                                </Button>
                              </ButtonGroup>
                            }
                            style={{ width: '100%' }}
                          >
                            <Row>
                              <Col span={24}>
                                {profile.user.name}
                                <Divider type="vertical" />
                                {profile.status}
                              </Col>
                              <Col span={24}>
                                <Divider orientation="right" />
                              </Col>
                              {profile.bio && (
                                <Col span={24}>
                                  <p>{profile.bio}</p>
                                </Col>
                              )}
                            </Row>
                            <Row>
                              <Col span={24}>
                                <Divider orientation="right" />
                              </Col>
                              <Col span={24}>
                                {profile.skills.map(skill => (
                                  <Tag key={skill} color="geekblue">
                                    {skill}
                                  </Tag>
                                ))}
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      </Row>
                    ))}
                </>
              )}
            </Section>
          )}
        </Spring>
      </>
    );
  }
}

export default Dashboard;
