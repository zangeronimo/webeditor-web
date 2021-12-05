import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';

import { Button } from '../../../../components/Form/Button';
import { ButtonGroup } from '../../../../components/Form/ButtonGroup';
import Input from '../../../../components/Form/Input';
import { useTitle } from '../../../../hooks/title';
import { useToast } from '../../../../hooks/toast';

import Select from '../../../../components/Form/Select';
import { FormGroup } from '../../../../components/Form/FormGroup';

import { Container } from './styles';
import { getRecipe, Recipe } from '../../../../services/recipe/recipe.service';
import {
  addRate,
  getRateById,
  RateData,
  updateRate,
} from '../../../../services/recipe/rate.service';
import { debounce } from '../../../../utils/debounce';
import Textarea from '../../../../components/Form/Textarea';

const HISTORY_BACK = '/culinaria/avaliacoes';

export const Form: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const { addToast } = useToast();
  const history = useHistory();

  const { setTitle } = useTitle();
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getRecipe({ params: { perPage: 9999 } }).then(result =>
      setRecipes(result.data.data),
    );
  }, []);

  const handleGetRate = useCallback(
    (rateId: string) => {
      if (rateId) {
        getRateById(rateId).then(result => {
          const { data } = result;

          debounce(() => {
            setValue('name', data.name);
            setValue('rate', data.rate);
            setValue('comment', data.comment);
            setValue('recipeId', data.recipe.id);
            setValue('active', data.active);
          }, 1);
        });
      }
    },
    [setValue],
  );

  useEffect(() => handleGetRate(id), [handleGetRate, id]);

  useEffect(() => setTitle('Avaliações / Formulário'), [setTitle]);

  const onSubmit = useCallback(
    async (values: {
      name: string;
      rate: number;
      comment: string;
      recipeId: string;
      active: 0 | 1;
    }) => {
      if (id) {
        const data: RateData = {
          id,
          name: values.name,
          rate: values.rate,
          comment: values.comment,
          recipeId: values.recipeId,
          active: values.active,
        };

        updateRate(id, data)
          .then(result => {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Avaliação ${result.data.id} atualizada.`,
            });
            history.push(HISTORY_BACK);
          })
          .catch(() => {
            addToast({
              title: 'Falha',
              type: 'error',
              description: `Falha ao tentar atualizar a avaliação.`,
            });
          });
      } else {
        const data: RateData = {
          name: values.name,
          rate: values.rate,
          comment: values.comment,
          recipeId: values.recipeId,
        };

        addRate(data)
          .then(result => {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Avaliação ${result.data.id} adicionada.`,
            });
            history.push(HISTORY_BACK);
          })
          .catch(() => {
            addToast({
              title: 'Falha',
              type: 'error',
              description: `Falha ao tentar adicionar a avaliação.`,
            });
          });
      }
    },
    [addToast, history, id],
  );

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Input
            width="col-12 col-md-4"
            label="Nome"
            maxLength={150}
            name="name"
            error={errors.name?.message}
            register={register}
          />
          <Select
            width="col-12 col-md-1"
            label="Nota"
            name="rate"
            error={errors.rate?.message}
            register={register}
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={6}>6</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
          </Select>
          <Select
            width="col-12 col-md-5 col-lg-3"
            label="Receita"
            name="recipeId"
            error={errors.recipeId?.message}
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
            width="col-12 col-md-2"
            label="Ativo"
            name="active"
            error={errors.active?.message}
            register={register}
          >
            <option value={1}>Sim</option>
            <option value={0}>Não</option>
            <option value={2}>Pendente</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Textarea
            width="col-12 col-md-8"
            label="Comentário"
            name="comment"
            error={errors.comment?.message}
            register={register}
          />
        </FormGroup>

        <ButtonGroup between>
          <Button tipo="back" onClick={() => history.push(HISTORY_BACK)} />
          <div className="right">
            <Button tipo="cancel" onClick={() => handleGetRate(id)} />
            <Button tipo="save" />
          </div>
        </ButtonGroup>
      </form>
    </Container>
  );
};
