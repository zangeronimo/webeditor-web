import styled, { css } from 'styled-components';

type ContainerProps = {
  justify: string;
};

export const Container = styled.th<ContainerProps>`
  div {
    display: flex;
    gap: 0.5rem;
    white-space: nowrap;

    ${props =>
      props.justify &&
      css`
        justify-content: ${props.justify};
      `}
  }

  button {
    display: flex;
    flex-direction: column;
    border: 0;
    background: transparent;
    margin: 0;
    padding: 0;
    border: 1px solid #ccc;

    svg + svg {
      border-top: 1px solid #ccc;
    }
  }
`;
