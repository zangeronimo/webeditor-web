import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 30px;
  overflow: hidden;

  @media only screen and (max-width: 600px) {
    margin: 1rem 0;
  }
`;
