import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPencilAlt, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '../../../components/Form/Button';
import { ButtonGroup } from '../../../components/Form/ButtonGroup';
import { Filter } from '../../../components/Form/Filter';
import Input from '../../../components/Form/Input';
import { Table } from '../../../components/Table';
import { Th } from '../../../components/Table/Th';
import { Tr } from '../../../components/Table/Tr';
import { Td } from '../../../components/Table/Td';
import { THead } from '../../../components/Table/THead';
import { TBody } from '../../../components/Table/TBody';
import { useTitle } from '../../../hooks/title';
import { useToast } from '../../../hooks/toast';
import { Container } from './styles';
import { Pagination } from '../../../components/Form/Pagination';
import { useAuth } from '../../../hooks/auth';
import { Modal } from '../../../components/Modal';
import {
  Company,
  delCompany,
  FilterCompany,
  getCompanies,
} from '../../../services/system/company.service';

export const Companies: React.FC = () => {
  const { setTitle } = useTitle();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState({
    params: {},
  } as FilterCompany);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const order = query.get('order');
  const by = query.get('by');

  const { register, handleSubmit, reset } = useForm();
  const { hasRole } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => setTitle('Empresas'), [setTitle]);

  const handleGetCompanies = useCallback(() => {
    if (order && by) {
      filter.params.order = { field: order, order: by };
    }
    filter.params.page = page;

    getCompanies(filter)
      .then(result => {
        setCompanies(result.data.data);
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
  useEffect(() => handleGetCompanies(), [handleGetCompanies]);

  const onFilter = useCallback(data => {
    const newFilter = { params: {} } as FilterCompany;
    if (data.name) newFilter.params.name = data.name;

    setFilter(newFilter);
  }, []);

  const clearFilter = useCallback(() => {
    reset();
    setFilter({ params: {} } as FilterCompany);
  }, [reset]);

  const noAlter = useMemo(() => !hasRole('ADMINCOMPANY_ALTER'), [hasRole]);

  const handleDelete = useCallback(
    (id: string) => {
      delCompany(id).then(() => {
        addToast({
          title: 'Registro excluído',
          description: 'Registro excluído com sucesso.',
          type: 'success',
        });
        if (page > 1) setPage(1);
        else handleGetCompanies();
      });
    },
    [addToast, page, handleGetCompanies],
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
      </Filter>
      <ButtonGroup>
        <Button
          className="btn btn-outline-primary"
          title="Adicionar Registro"
          onClick={() => history.push('/webeditor/empresas/form')}
          disabled={noAlter}
        >
          <FaPlus /> Nova Registro
        </Button>
      </ButtonGroup>
      <hr />
      <div className="table-responsive">
        <Table>
          <THead>
            <Th orderBy="name">Nome</Th>
            <Th align="flex-end">Ações</Th>
          </THead>
          {companies && (
            <TBody>
              {companies.map(company => (
                <Tr key={company.id}>
                  <Td>{company.name}</Td>
                  <Td>
                    <ButtonGroup>
                      <Button
                        className="btn btn-outline-primary"
                        disabled={noAlter}
                        title="Editar Regitro"
                        onClick={() =>
                          history.push(`/webeditor/empresas/form/${company.id}`)
                        }
                      >
                        <FaPencilAlt />
                      </Button>
                      <Modal
                        disabled={!hasRole('ADMINCOMPANY_DELETE')}
                        title="Atenção!"
                        button={
                          <Button
                            className="btn btn-outline-danger"
                            disabled={!hasRole('ADMINCOMPANY_DELETE')}
                            title="Excluir Registro"
                          >
                            <FaTrashAlt />
                          </Button>
                        }
                        confirm={() => handleDelete(company.id)}
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
