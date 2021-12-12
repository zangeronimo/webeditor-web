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
  getCategory,
} from '../../../services/marketing/category.service';
import {
  delProduct,
  FilterProduct,
  getProduct,
  Product,
} from '../../../services/marketing/product.service';
import { Container } from './styles';

export const Products: React.FC = () => {
  const { setTitle } = useTitle();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState({ params: {} } as FilterProduct);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const order = query.get('order');
  const by = query.get('by');

  const { register, handleSubmit, reset } = useForm();
  const { hasRole } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => setTitle('Produtos'), [setTitle]);

  useEffect(() => {
    getCategory({
      params: { perPage: 9999, order: { field: 'name', order: 'ASC' } },
    }).then(result => setCategories(result.data.data));
  }, []);

  const handleGetProducts = useCallback(() => {
    if (order && by) {
      filter.params.order = { field: order, order: by };
    }
    filter.params.page = page;

    getProduct(filter)
      .then(result => {
        setProducts(result.data.data);
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
  useEffect(() => handleGetProducts(), [handleGetProducts]);

  const onFilter = useCallback(data => {
    const newFilter = { params: {} } as FilterProduct;
    if (data.slug) newFilter.params.slug = data.slug;
    if (data.title) newFilter.params.title = data.title;
    if (data.categoryId) newFilter.params.categoryId = data.categoryId;
    if (data.active) newFilter.params.active = data.active;

    setFilter(newFilter);
  }, []);

  const clearFilter = useCallback(() => {
    reset();
    setFilter({ params: {} } as FilterProduct);
  }, [reset]);

  const noAlter = useMemo(() => !hasRole('MKTPRODUCTS_ALTER'), [hasRole]);

  const handleDelete = useCallback(
    (id: string) => {
      delProduct(id).then(() => {
        addToast({
          title: 'Registro excluído',
          description: 'Registro excluído com sucesso.',
          type: 'success',
        });
        if (page > 1) setPage(1);
        else handleGetProducts();
      });
    },
    [addToast, page, handleGetProducts],
  );

  return (
    <Container>
      <Filter clearFilters={clearFilter} onSubmit={handleSubmit(onFilter)}>
        <Input
          width="col-12 col-sm-5 col-md-3"
          label="Slug"
          name="slug"
          register={register}
        />
        <Input
          width="col-12 col-sm-5 col-md-3"
          label="Título"
          name="title"
          register={register}
        />
        <Select
          width="col-12 col-md-5 col-lg-3"
          label="Categoria"
          name="categoryId"
          register={register}
        >
          <option value="">Selecione</option>
          {categories &&
            categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </Select>
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
          onClick={() => history.push('/marketing/produtos/form')}
          disabled={noAlter}
        >
          <FaPlus /> Novo Registro
        </Button>
      </ButtonGroup>
      <hr />
      <div className="table-responsive">
        <Table>
          <THead>
            <Th orderBy="slug">Slug</Th>
            <Th orderBy="title">Título</Th>
            <Th>Categoria</Th>
            <Th>Empresa</Th>
            <Th orderBy="active">Ativo</Th>
            <Th align="flex-end">Ações</Th>
          </THead>
          {products && (
            <TBody>
              {products.map(data => (
                <Tr key={data.id}>
                  <Td>{data.slug}</Td>
                  <Td>{data.title}</Td>
                  <Td>{data.category?.name}</Td>
                  <Td>{data.company?.name}</Td>
                  <Td>{data.active}</Td>
                  <Td>
                    <ButtonGroup>
                      <Button
                        className="btn btn-outline-primary"
                        disabled={noAlter}
                        title="Editar Regitro"
                        onClick={() =>
                          history.push(`/marketing/produtos/form/${data.id}`)
                        }
                      >
                        <FaPencilAlt />
                      </Button>
                      <Modal
                        disabled={!hasRole('MKTPRODUCTS_DELETE')}
                        title="Atenção!"
                        button={
                          <Button
                            className="btn btn-outline-danger"
                            disabled={!hasRole('MKTPRODUCTS_DELETE')}
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
