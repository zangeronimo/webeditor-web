import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPencilAlt, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '../../../components/Form/Button';
import { ButtonGroup } from '../../../components/Form/ButtonGroup';
import { Filter } from '../../../components/Form/Filter';
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
  delRate,
  FilterRate,
  getRate,
  Rate,
} from '../../../services/recipe/rate.service';
import { getRecipe, Recipe } from '../../../services/recipe/recipe.service';
import { Container } from './styles';

export const Ratings: React.FC = () => {
  const { setTitle } = useTitle();
  const [ratings, setRatings] = useState<Rate[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState({ params: {} } as FilterRate);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const order = query.get('order');
  const by = query.get('by');

  const { register, handleSubmit, reset } = useForm();
  const { hasRole } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => setTitle('Avaliações'), [setTitle]);

  useEffect(() => {
    getRecipe({ params: { perPage: 9999 } }).then(result =>
      setRecipes(result.data.data),
    );
  }, []);

  const handleGetRatings = useCallback(() => {
    if (order && by) {
      filter.params.order = { field: order, order: by };
    }
    filter.params.page = page;

    getRate(filter)
      .then(result => {
        setRatings(result.data.data);
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
  useEffect(() => handleGetRatings(), [handleGetRatings]);

  const onFilter = useCallback(data => {
    const newFilter = { params: {} } as FilterRate;
    if (data.rate) newFilter.params.rate = data.rate;
    if (data.recipeId) newFilter.params.recipeId = data.recipeId;
    if (data.active) newFilter.params.active = data.active;

    setFilter(newFilter);
  }, []);

  const clearFilter = useCallback(() => {
    reset();
    setFilter({ params: {} } as FilterRate);
  }, [reset]);

  const noAlter = useMemo(() => !hasRole('RECIPERATINGS_ALTER'), [hasRole]);

  const handleDelete = useCallback(
    (id: string) => {
      delRate(id).then(() => {
        addToast({
          title: 'Registro excluído',
          description: 'Registro excluído com sucesso.',
          type: 'success',
        });
        if (page > 1) setPage(1);
        else handleGetRatings();
      });
    },
    [addToast, page, handleGetRatings],
  );

  return (
    <Container>
      <Filter clearFilters={clearFilter} onSubmit={handleSubmit(onFilter)}>
        <Select
          width="col-12 col-sm-5 col-md-2"
          label="Nota"
          name="rate"
          register={register}
        >
          <option value="">Todas</option>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="6">6</option>
          <option value="8">8</option>
          <option value="10">10</option>
        </Select>
        <Select
          width="col-12 col-md-5 col-lg-3"
          label="Nível"
          name="levelId"
          register={register}
        >
          <option value="">Selecione</option>
          {recipes &&
            recipes.map(recipe => (
              <option key={recipe.id} value={recipe.id}>
                {recipe.name}
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
          <option value="2">Pendente</option>
        </Select>
      </Filter>
      <ButtonGroup>
        <Button
          className="btn btn-outline-primary"
          title="Adicionar Registro"
          onClick={() => history.push('/culinaria/avaliacoes/form')}
          disabled={noAlter}
        >
          <FaPlus /> Novo Registro
        </Button>
      </ButtonGroup>
      <hr />
      <div className="table-responsive">
        <Table>
          <THead>
            <Th orderBy="name">name</Th>
            <Th orderBy="rate">Nota</Th>
            <Th>Receita</Th>
            <Th>Empresa</Th>
            <Th orderBy="active">Ativo</Th>
            <Th align="flex-end">Ações</Th>
          </THead>
          {ratings && (
            <TBody>
              {ratings.map(data => (
                <Tr key={data.id}>
                  <Td>{data.name}</Td>
                  <Td>{data.rate}</Td>
                  <Td>{data.recipe?.name}</Td>
                  <Td>{data.company?.name}</Td>
                  <Td>{data.active}</Td>
                  <Td>
                    <ButtonGroup>
                      <Button
                        className="btn btn-outline-primary"
                        disabled={noAlter}
                        title="Editar Regitro"
                        onClick={() =>
                          history.push(`/culinaria/avaliacoes/form/${data.id}`)
                        }
                      >
                        <FaPencilAlt />
                      </Button>
                      <Modal
                        disabled={!hasRole('RECIPERATINGS_DELETE')}
                        title="Atenção!"
                        button={
                          <Button
                            className="btn btn-outline-danger"
                            disabled={!hasRole('RECIPERATINGS_DELETE')}
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
