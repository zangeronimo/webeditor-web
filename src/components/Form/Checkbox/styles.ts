import styled, { css } from 'styled-components';
import Tooltip from '../../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  background: var(--gray-300);
  border: 2px solid var(--gray-400);
  border-radius: 10px;
  color: var(--gray-700);
  padding: 0 0.5rem;
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
      color: #ff9000;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  label {
    font-size: 0.75rem;
  }

  div.input {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
  }

  input {
    background: transparent;
    border: 0;
    color: var(--gray-700);
  }
`;

export const Error = styled(Tooltip)`
  position: absolute;
  top: 0.8rem;
  right: 1rem;
  height: 1.25rem;
  margin-left: 1rem;
  svg {
    width: 20px;
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
