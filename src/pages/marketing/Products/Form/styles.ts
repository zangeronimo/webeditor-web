import styled from 'styled-components';

export const Container = styled.div``;

export const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  padding: 1rem 0;

  gap: 1rem;
`;

export const Image = styled.div`
  img {
    width: 350px;
    border-radius: 1rem;
  }
`;
