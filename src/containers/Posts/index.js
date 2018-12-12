import React from 'react';
import { Helmet } from 'react-helmet';

const Posts = () => (
  <>
    <Helmet>
      <title>Online CV | Posts</title>
      <meta name="description" content="Online CV for developers" />
    </Helmet>
    <section style={{ minHeight: '100vh', background: '#fff', padding: 24, margin: 24 }}>
      <h1>Posts Page</h1>
    </section>
  </>
);

export default Posts;
