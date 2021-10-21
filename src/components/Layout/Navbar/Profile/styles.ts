import styled from 'styled-components';

export const Container = styled.div`
  > div {
    background-color: var(--gray-400);
    padding: 0.5rem;
  }
  @media only screen and (max-width: 600px) {
    span {
      display: none;
    }
  }
`;

export const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 200px;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-top: 1rem;
  }

  p {
    text-align: center;
  }
`;

export const ShortName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  background-color: #002243;
  color: var(--gray-200);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-top: 1rem;
`;
