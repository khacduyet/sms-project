import * as React from 'react';
import styled from 'styled-components/native';
const ImageContainer = styled.View`
  margin-top: 6px;
  margin-right: 6px;
  margin-bottom: 10px;
  margin-left: 6px;
  padding-top: 2px;
  padding-right: 2px;
  padding-bottom: 2px;
  padding-left: 2px;
  background-color: #fff;
  border-top-right-radius: 21px;
  border-top-left-radius: 21px;
  border-bottom-right-radius: ${props => props.user ? 21 + "px" : 0 + "px"};
  border-bottom-left-radius: ${props => props.user ? 0 + "px": 21 + "px"};
  border-color: #ddd;
`;
// border-width: 1;
export default ImageContainer;


