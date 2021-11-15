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
import {
  Category,
  getCategory,
} from '../../../../services/recipe/category.service';
import {
  addRecipe,
  getRecipeById,
  RecipeData,
  updateRecipe,
} from '../../../../services/recipe/recipe.service';
import { Editor } from '../../../../components/Form/Editor';

const HISTORY_BACK = '/culinaria/receitas';

export const Form: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState('');
  const [preparation, setPreparation] = useState('');

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
    getCategory({ params: { perPage: 9999 } }).then(result =>
      setCategories(result.data.data),
    );
  }, []);

  const handleGetRecipe = useCallback(
    (recipeId: string) => {
      if (recipeId) {
        getRecipeById(recipeId).then(result => {
          const { data } = result;
          setValue('slug', data.slug);
          setValue('name', data.name);
          setIngredients(data.ingredients);
          setPreparation(data.preparation);
          setValue('categoryId', data.category.id);
          setValue('active', data.active);
        });
      }
    },
    [setValue],
  );

  useEffect(() => handleGetRecipe(id), [handleGetRecipe, id]);

  useEffect(() => setTitle('Receitas / Formulário'), [setTitle]);

  const onSubmit = useCallback(
    async (values: {
      slug: string;
      name: string;
      categoryId: string;
      active: 0 | 1;
    }) => {
      if (id) {
        const data: RecipeData = {
          id,
          slug: values.slug,
          name: values.name,
          ingredients,
          preparation,
          categoryId: values.categoryId,
          active: values.active,
        };

        updateRecipe(id, data)
          .then(result => {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Receita ${result.data.name} atualizada.`,
            });
            history.push(HISTORY_BACK);
          })
          .catch(() => {
            addToast({
              title: 'Falha',
              type: 'error',
              description: `Falha ao tentar atualizar a receita.`,
            });
          });
      } else {
        const data: RecipeData = {
          slug: values.slug,
          name: values.name,
          ingredients,
          preparation,
          categoryId: values.categoryId,
        };

        addRecipe(data)
          .then(result => {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Receita ${result.data.name} adicionada.`,
            });
            history.push(HISTORY_BACK);
          })
          .catch(() => {
            addToast({
              title: 'Falha',
              type: 'error',
              description: `Falha ao tentar adicionar a receita.`,
            });
          });
      }
    },
    [addToast, history, id, ingredients, preparation],
  );

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Input
            width="col-12 col-md-5"
            label="Slug"
            name="slug"
            error={errors.slug?.message}
            register={register}
          />
          <Input
            width="col-12 col-md-5"
            label="Nome"
            name="name"
            error={errors.name?.message}
            register={register}
          />
          <Select
            width="col-12 col-md-5 col-lg-3"
            label="Categoria"
            name="categoryId"
            error={errors.categoryId?.message}
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
            width="col-12 col-md-2"
            label="Ativo"
            name="active"
            error={errors.active?.message}
            register={register}
          >
            <option value={1}>Sim</option>
            <option value={0}>Não</option>
          </Select>
        </FormGroup>

        <span>Ingredients</span>
        <Editor data={ingredients} setContent={setIngredients} />

        <span>Modo de preparo</span>
        <Editor data={preparation} setContent={setPreparation} />

        <ButtonGroup between>
          <Button tipo="back" onClick={() => history.push(HISTORY_BACK)} />
          <div className="right">
            <Button tipo="cancel" onClick={() => handleGetRecipe(id)} />
            <Button tipo="save" />
          </div>
        </ButtonGroup>
      </form>
    </Container>
  );
};
