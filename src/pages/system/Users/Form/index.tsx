import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTitle } from '../../../../hooks/title';
import { getUserById, User } from '../../../../services/system/user.service';

import { Container } from './styles';

export const Form: React.FC = () => {
  const [user, setUser] = useState({} as User);

  const { setTitle } = useTitle();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      getUserById(id).then(result => setUser(result.data));
    }
  }, [id]);

  useEffect(() => setTitle('Usuários'), [setTitle]);

  return (
    <Container>
      <span>teste {user?.name}</span>
    </Container>
  );
};
