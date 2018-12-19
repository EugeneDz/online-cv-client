import React from 'react';
import { Link } from 'react-router-dom';

import Title from './styled-components';

const Logo = () => (
  <Link to="/">
    <Title>Online CV</Title>
  </Link>
);

export default Logo;
