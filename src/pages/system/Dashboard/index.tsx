import { useEffect } from 'react';
import { Modal } from '../../../components/Modal';
import { useTitle } from '../../../hooks/title';

export const Dashboard: React.FC = () => {
  const { setTitle } = useTitle();

  useEffect(() => setTitle('Dashboard'), [setTitle]);

  return (
    <>
      <p>Bem-vindo</p>
      <p>Área para informações úteis, gráficos, informativos, etc...</p>

      <div>
        <Modal title="aeeee1" button="Open Modal 1">
          <p>Deseja realmente exluir?</p>
        </Modal>
      </div>
      <div>
        <Modal title="aeeee2" button="Open Modal 2" />
      </div>
      <div>
        <Modal title="aeeee3" button="Open Modal 3" />
      </div>
      <div>
        <Modal title="aeeee4" button="Open Modal 4" />
      </div>
      <div>
        <Modal title="aeeee5" button="Open Modal 5" />
      </div>
    </>
  );
};
