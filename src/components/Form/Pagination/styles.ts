import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div:last-of-type {
    display: flex;
    gap: 2px;
    span {
      display: flex;
      justify-content: center;
      width: 30px;
    }
  }
`;
