import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPencilAlt, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '../../../components/Form/Button';
import { ButtonGroup } from '../../../components/Form/ButtonGroup';
import { Filter } from '../../../components/Form/Filter';
import Input from '../../../components/Form/Input';
import { Pagination } from '../../../components/Form/Pagination';
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
  delPage,
  FilterPage,
  getPage,
  Page,
} from '../../../services/institutional/page.service';
import { Container } from './styles';

export const Pages: React.FC = () => {
  const { setTitle } = useTitle();
  const [pages, setPages] = useState<Page[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState({ params: {} } as FilterPage);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const order = query.get('order');
  const by = query.get('by');

  const { register, handleSubmit, reset } = useForm();
  const { hasRole } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => setTitle('Páginas'), [setTitle]);

  const handleGetPages = useCallback(() => {
    if (order && by) {
      filter.params.order = { field: order, order: by };
    }
    filter.params.page = page;

    getPage(filter)
      .then(result => {
        setPages(result.data.data);
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
  useEffect(() => handleGetPages(), [handleGetPages]);

  const onFilter = useCallback(data => {
    const newFilter = { params: {} } as FilterPage;
    if (data.title) newFilter.params.title = data.title;

    setFilter(newFilter);
  }, []);

  const clearFilter = useCallback(() => {
    reset();
    setFilter({ params: {} } as FilterPage);
  }, [reset]);

  const noAlter = useMemo(
    () => !hasRole('INSTITUTIONALPAGES_ALTER'),
    [hasRole],
  );

  const handleDelete = useCallback(
    (id: string) => {
      delPage(id).then(() => {
        addToast({
          title: 'Registro excluído',
          description: 'Registro excluído com sucesso.',
          type: 'success',
        });
        if (page > 1) setPage(1);
        else handleGetPages();
      });
    },
    [addToast, page, handleGetPages],
  );

  return (
    <Container>
      <Filter clearFilters={clearFilter} onSubmit={handleSubmit(onFilter)}>
        <Input
          width="col-12 col-sm-5 col-md-3"
          label="Title"
          name="title"
          register={register}
        />
      </Filter>
      <ButtonGroup>
        <Button
          className="btn btn-outline-primary"
          title="Adicionar Registro"
          onClick={() => history.push('/institucional/paginas/form')}
          disabled={noAlter}
        >
          <FaPlus /> Novo Registro
        </Button>
      </ButtonGroup>
      <hr />
      <div className="table-responsive">
        <Table>
          <THead>
            <Th orderBy="title">Título</Th>
            <Th>Empresa</Th>
            <Th align="flex-end">Ações</Th>
          </THead>
          {pages && (
            <TBody>
              {pages.map(data => (
                <Tr key={data.id}>
                  <Td>{data.title}</Td>
                  <Td>{data.company?.name}</Td>
                  <Td>
                    <ButtonGroup>
                      <Button
                        className="btn btn-outline-primary"
                        disabled={noAlter}
                        title="Editar Regitro"
                        onClick={() =>
                          history.push(`/institucional/paginas/form/${data.id}`)
                        }
                      >
                        <FaPencilAlt />
                      </Button>
                      <Modal
                        disabled={!hasRole('INSTITUTIONALPAGES_DELETE')}
                        title="Atenção!"
                        button={
                          <Button
                            className="btn btn-outline-danger"
                            disabled={!hasRole('INSTITUTIONALPAGES_DELETE')}
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
