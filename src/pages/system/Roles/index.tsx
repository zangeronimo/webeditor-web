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
  FilterRole,
  getRoles,
  Role,
} from '../../../services/system/role.service';
import { Container } from './styles';

export const Roles: React.FC = () => {
  const { setTitle } = useTitle();
  const [roles, setRoles] = useState<Role[]>([]);
  const [filter, setFilter] = useState({ params: {} } as FilterRole);

  const { register, handleSubmit, reset } = useForm();

  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => setTitle('Regras'), [setTitle]);

  useEffect(() => {
    getRoles(filter)
      .then(result => setRoles(result.data))
      .catch(() => {
        addToast({
          title: 'Algo deu errado',
          description: 'Não foi possível completar sua requisição.',
          type: 'error',
        });
      });
  }, [addToast, filter]);

  const onFilter = useCallback(data => {
    const newFilter = { params: {} } as FilterRole;
    if (data.name) newFilter.params.name = data.name;
    if (data.label) newFilter.params.label = data.label;

    setFilter(newFilter);
  }, []);

  const clearFilter = useCallback(() => {
    reset();
    setFilter({ params: {} } as FilterRole);
  }, [reset]);

  return (
    <Container>
      <Filter clearFilters={clearFilter} onSubmit={handleSubmit(onFilter)}>
        <Input label="Nome" name="name" register={register} />
        <Input label="Legenda" name="label" register={register} />
      </Filter>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-borderless align-middle">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Legenda</th>
              <th scope="col">Módulo</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          {roles && (
            <tbody>
              {roles.map(role => (
                <tr key={role.id}>
                  <td>{role.name}</td>
                  <td>{role.label}</td>
                  <td>{role.module.name}</td>
                  <td>
                    <Button
                      className="btn btn-outline-primary"
                      onClick={() =>
                        history.push(`/webeditor/regras/form/${role.id}`)
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
