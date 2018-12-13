import React from 'react';
import { Helmet } from 'react-helmet';
import { Spring } from 'react-spring';

import { Section } from './styled-components';

const Posts = () => (
  <>
    <Helmet>
      <title>Online CV | Posts</title>
      <meta name="description" content="Online CV for developers" />
    </Helmet>
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {spring => (
        <Section style={spring}>
          <h1>Posts Page</h1>
        </Section>
      )}
    </Spring>
  </>
);

export default Posts;
