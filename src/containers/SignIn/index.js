import React from 'react';
import { Helmet } from 'react-helmet';

const SignIn = () => (
  <>
    <Helmet>
      <title>Online CV | Sign In</title>
      <meta name="description" content="Online CV for developers" />
    </Helmet>
    <section style={{ minHeight: '100vh', background: '#fff', padding: 24, margin: 24 }}>
      <h1>Sign In</h1>
    </section>
  </>
);

export default SignIn;
