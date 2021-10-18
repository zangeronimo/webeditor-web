import styled from 'styled-components';

import backgroundImage from '../../../assets/background_login.webp';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${backgroundImage}) no-repeat fixed;
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 600px) {
    margin: 0 1rem;
  }
  @media only screen and (max-width: 800px) {
    max-width: 400px;
  }
`;

export const Content = styled.div`
  background-color: var(--gray-400);
  padding: 1rem;
  border-radius: 5px;

  button {
    @media only screen and (max-width: 600px) {
      flex: 1;
    }
  }
`;
