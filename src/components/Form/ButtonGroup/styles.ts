import styled, { css } from 'styled-components';

type ContainerProps = {
  between: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  ${props =>
    props.between &&
    css`
      justify-content: space-between;
    `}
`;
