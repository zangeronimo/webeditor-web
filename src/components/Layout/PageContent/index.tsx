import { Container } from './styles';

type PageContentProps = {
  title?: string;
};

export const PageContent: React.FC<PageContentProps> = ({
  title = '',
  children,
}) => {
  return <Container title={title}>{children}</Container>;
};
