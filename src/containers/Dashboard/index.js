import React from 'react';
import { Helmet } from 'react-helmet';

const Dashboard = () => (
  <>
    <Helmet>
      <title>Online CV | Dashboard</title>
      <meta name="description" content="Online CV for developers" />
    </Helmet>
    <section style={{ minHeight: '100vh', background: '#fff', padding: 24, margin: 24 }}>
      <h1>Dashboard Page</h1>
    </section>
  </>
);

export default Dashboard;
