import styled from 'styled-components';

import backgroundImage from '../../../assets/background-login.png';

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
`;

export const Content = styled.div`
  background-color: var(--gray-900);
  padding: 1rem;
  border-radius: 5px;
`;
