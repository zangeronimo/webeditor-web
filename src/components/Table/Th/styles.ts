import styled from 'styled-components';

export const Container = styled.th`
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
