import React from 'react';
import { Helmet } from 'react-helmet';

import { Section } from './styled-components';

const Posts = () => (
  <>
    <Helmet>
      <title>Online CV | Posts</title>
      <meta name="description" content="Online CV for developers" />
    </Helmet>
    <Section>
      <h1>Posts Page</h1>
    </Section>
  </>
);

export default Posts;
