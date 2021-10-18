import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 1rem;
  height: 3rem;

  border-radius: 8px;
  font-size: 1.2rem;

  & > svg {
    margin-right: 0.5rem;
  }
`;
