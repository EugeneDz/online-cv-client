import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Alert, Modal, Divider, Button, Skeleton } from 'antd';
import { Spring } from 'react-spring';

import { setCurrentProfile } from 'store/actions/profile';

import { API_URL, CURRENT_PROFILE } from 'config';

import { Section } from './styled-components';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: ''
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
        this.setState({ error: data.noprofile });
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
    const { error, loading } = this.state;

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
                <h1>Profile Page</h1>
              </header>
              {loading && (
                <div>
                  <Skeleton avatar active paragraph={{ rows: 4 }} />
                </div>
              )}
              {error && (
                <div>
                  <Alert message={error} type="info" showIcon />
                  <Divider orientation="right">
                    <Button type="primary" block>
                      Create Profile
                    </Button>
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

const mapStateToProps = ({ profile }) => ({
  profile
});

export default connect(
  mapStateToProps,
  {
    setCurrentProfile
  }
)(Profile);
