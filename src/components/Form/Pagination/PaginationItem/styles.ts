import styled from 'styled-components';

export const Container = styled.button`
  border: 1px solid #ccc;
  width: 30px;
  background: transparend;

  &:disabled {
    border: 1px solid var(--blue-500);
    color: var(--blue-500);
  }

  &:hover {
    border: 1px solid var(--blue-500);
  }
`;
