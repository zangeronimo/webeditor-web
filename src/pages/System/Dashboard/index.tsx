import { useEffect } from 'react';
import { useTitle } from '../../../hooks/title';

export const Dashboard: React.FC = () => {
  const { setTitle } = useTitle();

  useEffect(() => setTitle('Dashboard'), [setTitle]);

  return (
    <>
      <p>Bem-vindo</p>
      <p>Área para informações úteis, gráficos, informativos, etc...</p>
    </>
  );
};
