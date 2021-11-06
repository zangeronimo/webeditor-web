import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPencilAlt, FaPlus, FaTrashAlt } from 'react-icons/fa';
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
  delRole,
  FilterRole,
  getRoles,
  Role,
  updateOrder,
} from '../../../services/system/role.service';
import { debounce } from '../../../utils/debounce';
import { Container } from './styles';
import { Pagination } from '../../../components/Form/Pagination';
import { useAuth } from '../../../hooks/auth';
import { Modal } from '../../../components/Modal';

export const Roles: React.FC = () => {
  const { setTitle } = useTitle();
  const [roles, setRoles] = useState<Role[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState({
    params: {},
  } as FilterRole);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const order = query.get('order');
  const by = query.get('by');

  const { register, handleSubmit, reset } = useForm();
  const { hasRole } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => setTitle('Regras'), [setTitle]);

  useEffect(() => {
    getModules().then(result => setModules(result.data.data));
  }, []);

  const handleGetRoles = useCallback(() => {
    if (order && by) {
      filter.params.order = { field: order, order: by };
    }
    filter.params.page = page;

    getRoles(filter)
      .then(result => {
        setRoles(result.data.data);
        setTotal(result.data.total);
      })
      .catch(() => {
        addToast({
          title: 'Algo deu errado',
          description: 'Não foi possível completar sua requisição.',
          type: 'error',
        });
      });
  }, [addToast, by, filter, order, page]);
  useEffect(() => handleGetRoles(), [handleGetRoles]);

  const onFilter = useCallback(data => {
    const newFilter = { params: {} } as FilterRole;
    if (data.search) newFilter.params.search = data.search;
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

  const noAlter = useMemo(() => !hasRole('ADMINROLE_ALTER'), [hasRole]);

  const handleDelete = useCallback(
    (id: string) => {
      delRole(id).then(() => {
        addToast({
          title: 'Registro excluído',
          description: 'Registro excluído com sucesso.',
          type: 'success',
        });
        if (page > 1) setPage(1);
        else handleGetRoles();
      });
    },
    [addToast, page, handleGetRoles],
  );

  return (
    <Container>
      <Filter clearFilters={clearFilter} onSubmit={handleSubmit(onFilter)}>
        <Input
          width="col-12 col-sm-5 col-md-3"
          label="Palavra chave"
          name="search"
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
          title="Adicionar Registro"
          onClick={() => history.push('/webeditor/regras/form')}
          disabled={noAlter}
        >
          <FaPlus /> Novo Registro
        </Button>
      </ButtonGroup>
      <hr />
      <div className="table-responsive">
        <Table>
          <THead>
            <Th orderBy="name">Nome</Th>
            <Th orderBy="label">Legenda</Th>
            <Th orderBy="module.name">Módulo</Th>
            <Th orderBy="order">Ordem</Th>
            <Th align="flex-end">Ações</Th>
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
                      disabled={noAlter}
                      defaultValue={role.order}
                      onChange={e =>
                        handleOrder(role.id, +e.currentTarget.value)
                      }
                    />
                  </Td>
                  <Td>
                    <ButtonGroup>
                      <Button
                        className="btn btn-outline-primary"
                        disabled={noAlter}
                        title="Editar Regitro"
                        onClick={() =>
                          history.push(`/webeditor/regras/form/${role.id}`)
                        }
                      >
                        <FaPencilAlt />
                      </Button>
                      <Modal
                        disabled={!hasRole('ADMINROLE_DELETE')}
                        title="Atenção!"
                        button={
                          <Button
                            className="btn btn-outline-danger"
                            disabled={!hasRole('ADMINROLE_DELETE')}
                            title="Excluir Registro"
                          >
                            <FaTrashAlt />
                          </Button>
                        }
                        confirm={() => handleDelete(role.id)}
                      >
                        Deseja realmente excluir o registro?
                      </Modal>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            </TBody>
          )}
        </Table>
        <Pagination total={total} currentPage={page} onPageChange={setPage} />
      </div>
    </Container>
  );
};
