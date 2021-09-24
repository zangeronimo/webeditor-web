import { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { Button } from '../../../components/Form/Button';
import { useTitle } from '../../../hooks/title';
import { useToast } from '../../../hooks/toast';
import { getUser, User } from '../../../services/system/user.service';
import { Container } from './styles';

export const Users: React.FC = () => {
  const { setTitle } = useTitle();
  const [users, setUsers] = useState<User[]>([]);

  const { addToast } = useToast();

  useEffect(() => setTitle('Usuários'), [setTitle]);

  useEffect(() => {
    getUser()
      .then(result => setUsers(result.data))
      .catch(() => {
        addToast({
          title: 'Algo deu errado',
          description: 'Não foi possível completar sua requisição.',
          type: 'error',
        });
      });
  }, [addToast]);

  return (
    <Container>
      <div>
        <h2>Filtros</h2>
      </div>
      <div className="table-responsive">
        <table className="table table-dark table-striped table-hover table-borderless align-middle">
          <thead>
            <tr>
              <th scope="col">Guid</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Company</th>
              <th scope="col">Tools</th>
            </tr>
          </thead>
          {users && (
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.company.name}</td>
                  <td>
                    <Button className="btn btn-outline-primary">
                      <FaPencilAlt />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </Container>
  );
};
