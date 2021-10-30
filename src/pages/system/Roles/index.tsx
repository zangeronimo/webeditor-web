import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '../../../components/Form/Button';
import { ButtonGroup } from '../../../components/Form/ButtonGroup';
import { Filter } from '../../../components/Form/Filter';
import Input from '../../../components/Form/Input';
import Select from '../../../components/Form/Select';
import { Table } from '../../../components/Table';
import { Th } from '../../../components/Table/Th';
import { Tr } from '../../../components/Table/Tr';
import { Td } from '../../../components/Table/Td';
import { THead } from '../../../components/Table/THead';
import { TBody } from '../../../components/Table/TBody';
import { useTitle } from '../../../hooks/title';
import { useToast } from '../../../hooks/toast';
import { getModules, Module } from '../../../services/system/module.service';
import {
  FilterRole,
  getRoles,
  Role,
  updateOrder,
} from '../../../services/system/role.service';
import { debounce } from '../../../utils/debounce';
import { Container } from './styles';

export const Roles: React.FC = () => {
  const { setTitle } = useTitle();
  const [roles, setRoles] = useState<Role[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [filter, setFilter] = useState({
    params: {},
  } as FilterRole);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const order = query.get('order');
  const by = query.get('by');

  const { register, handleSubmit, reset } = useForm();

  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => setTitle('Regras'), [setTitle]);

  useEffect(() => {
    getModules().then(result => setModules(result.data));
  }, []);

  useEffect(() => {
    if (order && by) {
      filter.params.order = { field: order, order: by };
    }
    getRoles(filter)
      .then(result => setRoles(result.data))
      .catch(() => {
        addToast({
          title: 'Algo deu errado',
          description: 'Não foi possível completar sua requisição.',
          type: 'error',
        });
      });
  }, [addToast, by, filter, order]);

  const onFilter = useCallback(data => {
    const newFilter = { params: {} } as FilterRole;
    if (data.name) newFilter.params.name = data.name;
    if (data.label) newFilter.params.label = data.label;
    if (data.moduleId) newFilter.params.moduleId = data.moduleId;

    setFilter(newFilter);
  }, []);

  const clearFilter = useCallback(() => {
    reset();
    setFilter({ params: {} } as FilterRole);
  }, [reset]);

  const handleOrder = useCallback((id: string, orderNumber: number) => {
    debounce(() => updateOrder(id, orderNumber));
  }, []);

  return (
    <Container>
      <Filter clearFilters={clearFilter} onSubmit={handleSubmit(onFilter)}>
        <Input
          width="col-12 col-sm-5 col-md-3"
          label="Nome"
          name="name"
          register={register}
        />
        <Input
          width="col-12 col-sm-5 col-md-3"
          label="Legenda"
          name="label"
          register={register}
        />
        <Select
          width="col-12 col-sm-9 col-md-3"
          label="Módulo"
          name="moduleId"
          register={register}
        >
          <option value="">Todos</option>
          {modules &&
            modules.map(module => (
              <option key={module.id} value={module.id}>
                {module.name}
              </option>
            ))}
        </Select>
      </Filter>
      <ButtonGroup>
        <Button
          className="btn btn-outline-primary"
          onClick={() => history.push('/webeditor/regras/form')}
        >
          <FaPlus /> Nova Regra
        </Button>
      </ButtonGroup>
      <hr />
      <div className="table-responsive">
        <Table>
          <THead>
            <Th orderBy="name">Nome</Th>
            <Th orderBy="label">Legenda</Th>
            <Th>Módulo</Th>
            <Th orderBy="order">Ordem</Th>
            <Th>Ações</Th>
          </THead>
          {roles && (
            <TBody>
              {roles.map(role => (
                <Tr key={role.id}>
                  <Td>{role.name}</Td>
                  <Td>{role.label}</Td>
                  <Td>{role.module.name}</Td>
                  <Td>
                    <input
                      type="number"
                      name="ordem"
                      defaultValue={role.order}
                      onChange={e =>
                        handleOrder(role.id, +e.currentTarget.value)
                      }
                    />
                  </Td>
                  <Td>
                    <Button
                      className="btn btn-outline-primary"
                      onClick={() =>
                        history.push(`/webeditor/regras/form/${role.id}`)
                      }
                    >
                      <FaPencilAlt />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </TBody>
          )}
        </Table>
      </div>
    </Container>
  );
};
