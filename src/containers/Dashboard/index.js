import React from 'react';
import { Helmet } from 'react-helmet';

import { Section } from './styled-components';

const Dashboard = () => (
  <>
    <Helmet>
      <title>Online CV | Dashboard</title>
      <meta name="description" content="Online CV for developers" />
    </Helmet>
    <Section>
      <h1>Dashboard Page</h1>
    </Section>
  </>
);

export default Dashboard;
