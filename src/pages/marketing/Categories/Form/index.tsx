import { useCallback, useEffect } from 'react';
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
  addCategory,
  CategoryData,
  getCategoryById,
  updateCategory,
} from '../../../../services/marketing/category.service';
import { debounce } from '../../../../utils/debounce';

const HISTORY_BACK = '/marketing/categorias';

export const Form: React.FC = () => {
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

  const handleGetCategory = useCallback(
    (categoryId: string) => {
      if (categoryId) {
        getCategoryById(categoryId).then(result => {
          const { data } = result;

          debounce(() => {
            setValue('name', data.name);
            setValue('active', data.active);
          }, 1);
        });
      }
    },
    [setValue],
  );

  useEffect(() => handleGetCategory(id), [handleGetCategory, id]);

  useEffect(() => setTitle('Categorias / Formulário'), [setTitle]);

  const onSubmit = useCallback(
    async (values: { name: string; active: 0 | 1 }) => {
      if (id) {
        const data: CategoryData = {
          id,
          name: values.name,
          active: values.active,
        };

        updateCategory(id, data)
          .then(result => {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Categoria ${result.data.name} atualizada.`,
            });
            history.push(HISTORY_BACK);
          })
          .catch(() => {
            addToast({
              title: 'Falha',
              type: 'error',
              description: `Falha ao tentar atualizar a categoria.`,
            });
          });
      } else {
        const data: CategoryData = {
          name: values.name,
        };

        addCategory(data)
          .then(result => {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Categoria ${result.data.name} adicionada.`,
            });
            history.push(HISTORY_BACK);
          })
          .catch(() => {
            addToast({
              title: 'Falha',
              type: 'error',
              description: `Falha ao tentar adicionar a categoria.`,
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
            width="col-12 col-md-5"
            label="Nome"
            name="name"
            error={errors.name?.message}
            register={register}
          />
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

        <ButtonGroup between>
          <Button tipo="back" onClick={() => history.push(HISTORY_BACK)} />
          <div className="right">
            <Button tipo="cancel" onClick={() => handleGetCategory(id)} />
            <Button tipo="save" />
          </div>
        </ButtonGroup>
      </form>
    </Container>
  );
};
