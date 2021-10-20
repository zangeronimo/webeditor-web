import { useTitle } from '../../../hooks/title';
import { Container, Title } from './styles';

export const PageContent: React.FC = ({ children }) => {
  const { title } = useTitle();

  return (
    <>
      <Title>{title}</Title>
      <Container>{children}</Container>
    </>
  );
};
