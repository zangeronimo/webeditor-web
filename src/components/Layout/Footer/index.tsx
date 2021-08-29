import { Container } from './styles';

export const Footer: React.FC = () => {
  return (
    <Container>
      <span>2021 - todos os direitos reservados</span>
      <div>
        by{' '}
        <a
          href="https://www.linkedin.com/in/zangeronimo/"
          target="_blank"
          rel="noreferrer"
        >
          /in/zangeronimo
        </a>
      </div>
    </Container>
  );
};
