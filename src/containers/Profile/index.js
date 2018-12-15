import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Avatar, Icon, Modal, Table, Card, Divider, Button, Skeleton, Row, Col } from 'antd';
import { Spring } from 'react-spring';

import { setCurrentProfile } from 'store/actions/profile';

import { API_URL, CURRENT_PROFILE } from 'config';

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

  componentDidMount = () => this.fetchCurrentProfile();

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
        this.setState({ noprofile: data.noprofile });
      } else {
        this.toggleLoading();
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

  render() {
    const { noprofile, loading } = this.state;
    const { auth } = this.props;

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
                <h1>Profile</h1>
                <div>Welcome {auth.user.name}</div>
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
                            <Link to="/profile/create">
                              <Button type="primary">
                                <Icon type="edit" /> Edit Profile
                              </Button>
                            </Link>
                            <Button type="primary">
                              <Icon type="plus-circle" /> Add Experience
                            </Button>
                            <Button type="primary">
                              <Icon type="plus-circle" /> Add Education
                            </Button>
                          </ButtonGroup>
                        }
                        style={{ width: '100%' }}
                      >
                        <Table
                          title={() => 'Experience'}
                          dataSource={[
                            {
                              key: '1',
                              company: 'Eleken',
                              title: 'Lead Developer',
                              years: '2008-09-01 - 2011-05-01'
                            }
                          ]}
                          columns={experienceColumns}
                        />
                        <Table
                          title={() => 'Education'}
                          dataSource={[]}
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
)(Profile);
