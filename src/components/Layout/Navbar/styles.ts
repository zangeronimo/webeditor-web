import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  align-items: center;
  height: 70px;
  margin-bottom: 3.8rem;
  padding: 0 1rem;
  background: var(--gray-800);
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;

  a {
    font-size: 1.6rem;
  }
`;

export const UserConfig = styled.div`
  margin-left: auto;
`;
