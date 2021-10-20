import styled from 'styled-components';

export const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: auto;
  padding: 0.5rem 2rem;

  background: var(--gray-200);

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
