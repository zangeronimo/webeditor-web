import { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../components/Form/Button';
import Input from '../../../components/Form/Input';
import { useTitle } from '../../../hooks/title';
import { useToast } from '../../../hooks/toast';
import {
  FilterUser,
  getUser,
  User,
} from '../../../services/system/user.service';
import { Container } from './styles';

export const Users: React.FC = () => {
  const { setTitle } = useTitle();
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState({} as FilterUser);

  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => setTitle('Usuários'), [setTitle]);

  useEffect(() => {
    getUser(filter)
      .then(result => setUsers(result.data))
      .catch(() => {
        addToast({
          title: 'Algo deu errado',
          description: 'Não foi possível completar sua requisição.',
          type: 'error',
        });
      });
  }, [addToast, filter]);

  return (
    <Container>
      <div>
        <h2>Filtros</h2>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-borderless align-middle">
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
                    <Button
                      className="btn btn-outline-primary"
                      onClick={() =>
                        history.push(`/webeditor/usuarios/form/${user.id}`)
                      }
                    >
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
