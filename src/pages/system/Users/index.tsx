import { useEffect, useState } from 'react';
import { useTitle } from '../../../hooks/title';
import { getUser, User } from '../../../services/system/user.service';
import { Container } from './styles';

export const Users: React.FC = () => {
  const { setTitle } = useTitle();
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => setTitle('Usuários'), [setTitle]);

  useEffect(() => {
    getUser().then(result => setUsers(result.data));
  }, []);

  return (
    <Container>
      <div>
        <h2>Filtros</h2>
      </div>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Company</th>
          </tr>
        </thead>
        {users && (
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </Container>
  );
};
