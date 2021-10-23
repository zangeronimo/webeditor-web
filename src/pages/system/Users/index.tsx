import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPencilAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../components/Form/Button';
import { Filter } from '../../../components/Form/Filter';
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
  const [filter, setFilter] = useState({ params: {} } as FilterUser);

  const { register, handleSubmit, reset } = useForm();

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

  const onFilter = useCallback(data => {
    const newFilter = { params: {} } as FilterUser;
    if (data.name) newFilter.params.name = data.name;
    if (data.email) newFilter.params.email = data.email;

    setFilter(newFilter);
  }, []);

  const clearFilter = useCallback(() => {
    reset();
    setFilter({ params: {} } as FilterUser);
  }, [reset]);

  return (
    <Container>
      <Filter clearFilters={clearFilter} onSubmit={handleSubmit(onFilter)}>
        <Input label="Nome" name="name" register={register} />
        <Input label="E-mail" name="email" register={register} />
      </Filter>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-borderless align-middle">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          {users && (
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
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
