import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  padding: 1rem;
  margin: 0 1rem;
  border-radius: 8px;
  background: var(--gray-200);

  @media only screen and (max-width: 600px) {
    border-radius: 0;
    margin: 0;
    padding: 0.5rem;
  }
`;

export const Title = styled.h1`
  margin: 1rem 1rem 0 1rem;
  padding: 0;

  @media only screen and (max-width: 600px) {
    margin: 0.5rem;
  }
`;
