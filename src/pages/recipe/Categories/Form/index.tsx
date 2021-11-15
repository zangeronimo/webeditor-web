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
  addCategory,
  CategoryData,
  getCategoryById,
  updateCategory,
} from '../../../../services/recipe/category.service';
import { getLevel, Level } from '../../../../services/recipe/level.service';

const HISTORY_BACK = '/culinaria/categorias';

export const Form: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);

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
    getLevel({ params: { perPage: 9999 } }).then(result =>
      setLevels(result.data.data),
    );
  }, []);

  const handleGetCategory = useCallback(
    (categoryId: string) => {
      if (categoryId) {
        getCategoryById(categoryId).then(result => {
          const { data } = result;
          setValue('name', data.name);
          setValue('levelId', data.level.id);
          setValue('active', data.active);
        });
      }
    },
    [setValue],
  );

  useEffect(() => handleGetCategory(id), [handleGetCategory, id]);

  useEffect(() => setTitle('Categorias / Formulário'), [setTitle]);

  const onSubmit = useCallback(
    async (values: { name: string; levelId: string; active: 0 | 1 }) => {
      if (id) {
        const data: CategoryData = {
          id,
          name: values.name,
          levelId: values.levelId,
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
          levelId: values.levelId,
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
            width="col-12 col-md-5 col-lg-3"
            label="Nível"
            name="levelId"
            error={errors.levelId?.message}
            register={register}
          >
            <option value="">Selecione</option>
            {levels &&
              levels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.name}
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
