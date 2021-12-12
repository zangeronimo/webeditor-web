import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPencilAlt, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '../../../components/Form/Button';
import { ButtonGroup } from '../../../components/Form/ButtonGroup';
import { Filter } from '../../../components/Form/Filter';
import Input from '../../../components/Form/Input';
import { Pagination } from '../../../components/Form/Pagination';
import Select from '../../../components/Form/Select';
import { Modal } from '../../../components/Modal';
import { Table } from '../../../components/Table';
import { TBody } from '../../../components/Table/TBody';
import { Td } from '../../../components/Table/Td';
import { Th } from '../../../components/Table/Th';
import { THead } from '../../../components/Table/THead';
import { Tr } from '../../../components/Table/Tr';
import { useAuth } from '../../../hooks/auth';
import { useTitle } from '../../../hooks/title';
import { useToast } from '../../../hooks/toast';
import {
  Category,
  delCategory,
  FilterCategory,
  getCategory,
} from '../../../services/marketing/category.service';
import { Container } from './styles';

export const Categories: React.FC = () => {
  const { setTitle } = useTitle();
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState({ params: {} } as FilterCategory);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const order = query.get('order');
  const by = query.get('by');

  const { register, handleSubmit, reset } = useForm();
  const { hasRole } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => setTitle('Categorias'), [setTitle]);

  const handleGetCategories = useCallback(() => {
    if (order && by) {
      filter.params.order = { field: order, order: by };
    }
    filter.params.page = page;

    getCategory(filter)
      .then(result => {
        setCategories(result.data.data);
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
  useEffect(() => handleGetCategories(), [handleGetCategories]);

  const onFilter = useCallback(data => {
    const newFilter = { params: {} } as FilterCategory;
    if (data.name) newFilter.params.name = data.name;
    if (data.active) newFilter.params.active = data.active;

    setFilter(newFilter);
  }, []);

  const clearFilter = useCallback(() => {
    reset();
    setFilter({ params: {} } as FilterCategory);
  }, [reset]);

  const noAlter = useMemo(() => !hasRole('MKTCATEGORIES_ALTER'), [hasRole]);

  const handleDelete = useCallback(
    (id: string) => {
      delCategory(id).then(() => {
        addToast({
          title: 'Registro excluído',
          description: 'Registro excluído com sucesso.',
          type: 'success',
        });
        if (page > 1) setPage(1);
        else handleGetCategories();
      });
    },
    [addToast, page, handleGetCategories],
  );

  return (
    <Container>
      <Filter clearFilters={clearFilter} onSubmit={handleSubmit(onFilter)}>
        <Input
          width="col-12 col-sm-5 col-md-3"
          label="Nome"
          name="name"
          register={register}
        />
        <Select
          width="col-12 col-sm-5 col-md-2"
          label="Ativo"
          name="active"
          register={register}
        >
          <option value="">Todos</option>
          <option value="1">Sim</option>
          <option value="0">Não</option>
        </Select>
      </Filter>
      <ButtonGroup>
        <Button
          className="btn btn-outline-primary"
          title="Adicionar Registro"
          onClick={() => history.push('/marketing/categorias/form')}
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
            <Th>Empresa</Th>
            <Th orderBy="active">Ativo</Th>
            <Th align="flex-end">Ações</Th>
          </THead>
          {categories && (
            <TBody>
              {categories.map(data => (
                <Tr key={data.id}>
                  <Td>{data.name}</Td>
                  <Td>{data.company?.name}</Td>
                  <Td>{data.active}</Td>
                  <Td>
                    <ButtonGroup>
                      <Button
                        className="btn btn-outline-primary"
                        disabled={noAlter}
                        title="Editar Regitro"
                        onClick={() =>
                          history.push(`/marketing/categorias/form/${data.id}`)
                        }
                      >
                        <FaPencilAlt />
                      </Button>
                      <Modal
                        disabled={!hasRole('MKTCATEGORIES_DELETE')}
                        title="Atenção!"
                        button={
                          <Button
                            className="btn btn-outline-danger"
                            disabled={!hasRole('MKTCATEGORIES_DELETE')}
                            title="Excluir Registro"
                          >
                            <FaTrashAlt />
                          </Button>
                        }
                        confirm={() => handleDelete(data.id)}
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
