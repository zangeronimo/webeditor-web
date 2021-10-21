import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  align-items: center;
  height: 70px;
  padding: 0 1rem;

  @media only screen and (max-width: 600px) {
    height: 60px;
    padding: 0;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #33436a;
  span {
    color: #002243;
  }

  a {
    font-size: 2rem;
  }
`;

export const UserConfig = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media only screen and (max-width: 600px) {
    gap: 0.5rem;

    button {
      padding: 2px;
      background: none !important;
      border: none !important;
    }
  }
`;
