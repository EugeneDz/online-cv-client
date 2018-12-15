import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Spring } from 'react-spring';
import { Row, Col } from 'antd';

import { Section } from './styled-components';

class AddExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Online CV | Add Experience</title>
          <meta name="description" content="Online CV for developers" />
        </Helmet>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {spring => (
            <Section style={spring}>
              <header>
                <Row type="flex" justify="center">
                  <Col span={24}>
                    <h1 style={{ textAlign: 'center' }}>Add Your Experience</h1>
                  </Col>
                  <Col span={24}>
                    <p style={{ textAlign: 'center' }}>
                      Add any developer/programming positions that you have had in the past
                    </p>
                  </Col>
                </Row>
              </header>
            </Section>
          )}
        </Spring>
      </>
    );
  }
}

export default AddExperience;
