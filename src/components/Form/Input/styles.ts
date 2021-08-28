import styled, { css } from 'styled-components';
import Tooltip from '../../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--gray-600);
  border-radius: 10px;
  border: 2px solid var(--gray-600);
  color: var(--gray-300);
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }
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
  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--gray-300);
    &::placeholder {
      color: var(--gray-500);
    }
  }
  > svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
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
