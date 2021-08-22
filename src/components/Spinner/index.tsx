import { Container } from './styles';

export const Spinner: React.FC = () => {
  return (
    <Container>
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </Container>
  );
};
