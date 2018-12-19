import styled from 'styled-components';
import { Row as AntRow, Menu as AntMenu } from 'antd';

export const Row = styled(AntRow)`
  max-width: 1024px;
  margin: 0 auto;
`;

export const Menu = styled(AntMenu)`
  line-height: 64px;
  text-align: right;
`;
