import React from 'react';
import styled, { css } from 'styled-components';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  background: transparent;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 2px;
  color: ${(props) => (props.fontcolor ? props.fontcolor : 'black')};
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding: 0.1rem 0.3rem 0.2rem 0.4rem;

  &:hover {
    background-color: ${(props) => props.fontcolor};
    color: white;
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const BorderStyledButton = styled.button`
  ${buttonStyle}
  border: 2px solid;
  border-color: ${(props) => props.fontcolor};
`;

export const Button = (props) => {
  return <StyledButton {...props} />;
};

export const BorderButton = (props) => {
  return <BorderStyledButton {...props} />;
};
