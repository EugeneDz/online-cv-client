import React from 'react';
import { Helmet } from 'react-helmet';
import { Spring } from 'react-spring';

import { Section } from './styled-components';

const Dashboard = () => (
  <>
    <Helmet>
      <title>Online CV | Dashboard</title>
      <meta name="description" content="Online CV for developers" />
    </Helmet>
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {spring => (
        <Section style={spring}>
          <h1>Dashboard Page</h1>
        </Section>
      )}
    </Spring>
  </>
);

export default Dashboard;
