import styled, { css } from 'styled-components';

type ContainerProps = {
  title: string;
};

export const Container = styled.div<ContainerProps>`
  position: relative;
  margin: 2rem;
  padding: 1rem 2rem;
  border-radius: 0 8px 8px 8px;
  background: var(--gray-800);

  ${props =>
    props.title &&
    css`
      &::before {
        content: '${props.title}';
        position: absolute;
        top: -2.4rem;
        left: 0;
        border-radius: 10px 10px 0 0;
        border-bottom: 1px solid var(--gray-800);
        background: var(--gray-800);
        padding: 0 2rem;
        z-index: 2;
        font-size: 1.6rem;
      }
    `}
`;
