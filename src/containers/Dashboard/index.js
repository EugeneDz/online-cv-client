import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Card, Avatar, Tag, Button, Icon, Divider, Row, Col } from 'antd';
import { Spring } from 'react-spring';

import { Section } from './styled-components';

const { Group: ButtonGroup } = Button;

const Dashboard = () => (
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
                Browse profiles or <Link to="/profile">create your own</Link>
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Divider orientation="right" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Card
                title={<Avatar size={64} src="" />}
                extra={
                  <ButtonGroup>
                    <Button type="primary">
                      <Link to={`/profile/${''}`}>
                        <Icon type="user" /> View Profile
                      </Link>
                    </Button>
                  </ButtonGroup>
                }
                style={{ width: '100%' }}
              >
                <Row>
                  <Col>Name, Status</Col>
                </Row>
                <Row>
                  <Col>
                    <Tag color="geekblue">Skills</Tag>
                    <Tag color="geekblue">Skills</Tag>
                    <Tag color="geekblue">Skills</Tag>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Section>
      )}
    </Spring>
  </>
);

export default Dashboard;
