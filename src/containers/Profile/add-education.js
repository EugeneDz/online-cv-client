import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Spring } from 'react-spring';
import { Row, Col } from 'antd';

import { Section } from './styled-components';

class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Online CV | Add Education</title>
          <meta name="description" content="Online CV for developers" />
        </Helmet>
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
            </Section>
          )}
        </Spring>
      </>
    );
  }
}

export default AddEducation;
