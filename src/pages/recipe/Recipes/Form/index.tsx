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
import { debounce } from '../../../../utils/debounce';
import { file2Base64 } from '../../../../utils/file2Base64';

import { Container, Image, Images } from './styles';

const HISTORY_BACK = '/culinaria/receitas';

export const Form: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState('');
  const [preparation, setPreparation] = useState('');
  const [images, setImages] = useState<{ url: string }[]>([]);

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
    getCategory({
      params: { perPage: 9999, order: { field: 'level', order: 'ASC' } },
    }).then(result => setCategories(result.data.data));
  }, []);

  const handleGetRecipe = useCallback(
    (recipeId: string) => {
      if (recipeId) {
        getRecipeById(recipeId).then(result => {
          const { data } = result;

          setImages(data.images);

          debounce(() => {
            setValue('slug', data.slug);
            setValue('name', data.name);
            setIngredients(data.ingredients);
            setPreparation(data.preparation);
            setValue('categoryId', data.category.id);
            setValue('active', data.active);
          }, 1);
        });
      }
    },
    [setValue],
  );

  useEffect(() => handleGetRecipe(id), [handleGetRecipe, id]);

  useEffect(() => setTitle('Receitas / Formulário'), [setTitle]);

  const onSubmit = useCallback(
    async (values: {
      img: string;
      name: string;
      categoryId: string;
      active: 0 | 1;
    }) => {
      if (id) {
        const data: RecipeData = {
          id,
          name: values.name,
          ingredients,
          preparation,
          categoryId: values.categoryId,
          active: values.active,
        };

        if (values.img.length) {
          data.file = await file2Base64(values.img[0]);
        }

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
          name: values.name,
          ingredients,
          preparation,
          categoryId: values.categoryId,
          active: values.active,
        };

        if (values.img.length) {
          data.file = await file2Base64(values.img[0]);
        }

        addRecipe(data)
          .then(result => {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Receita ${result.data.name} adicionada.`,
            });
            history.push(HISTORY_BACK);
          })
          .catch(err => {
            const { response } = err.request;
            const responseBody = JSON.parse(response ?? '{}');

            addToast({
              title: 'Falha',
              type: 'error',
              description:
                responseBody.message ?? 'Falha ao tentar adicionar a receita.',
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
                  {category.level.name} - {category.name}
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

        <Input
          type="file"
          width="col-12 col-md-9"
          label="Imagem"
          name="img"
          error={errors.img?.message}
          register={register}
        />

        <Images>
          {images &&
            images.map(image => (
              <Image>
                <img
                  src={`${process.env.REACT_APP_APIURL}${image.url}`}
                  alt=""
                />
              </Image>
            ))}
        </Images>

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
