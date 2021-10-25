import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../components/Form/Button';
import { useTitle } from '../../../hooks/title';

export const Denied: React.FC = () => {
  const { setTitle } = useTitle();
  const history = useHistory();

  useEffect(() => setTitle('Acesso Negado'), [setTitle]);

  return (
    <>
      <h3>
        Bah! Está tentando acessar uma página sem permissão? Num vai rolar :P
      </h3>
      <Button onClick={() => history.push('/dashboard')}>
        Ir para a página inicial
      </Button>
    </>
  );
};
