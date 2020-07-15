import React from 'react';
import styled from 'styled-components';

type TemplateProps = {};

export const Template: React.FC<TemplateProps> = (props) => {
  return <Wrapper>{props.children}</Wrapper>;
};

const Wrapper = styled.div`
  padding: 25px;
  height: 100vh;
  overflow: auto;
  flex-grow: 1;
`;
