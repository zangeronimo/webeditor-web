import { useEffect } from 'react';
import { useTitle } from '../../../hooks/title';
import { Container } from './styles';

export const Users: React.FC = () => {
  const { setTitle } = useTitle();
  useEffect(() => setTitle('Usuários'), [setTitle]);

  return (
    <Container>
      <div>
        <h2>Filtros</h2>
      </div>

      <div>
        <h3>Conteúdo Table</h3>
      </div>
    </Container>
  );
};
