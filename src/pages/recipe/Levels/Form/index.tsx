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
  addLevel,
  getLevelById,
  LevelData,
  updateLevel,
} from '../../../../services/recipe/level.service';

const HISTORY_BACK = '/culinaria/niveis';

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

  const handleGetLevel = useCallback(
    (levelId: string) => {
      if (levelId) {
        getLevelById(levelId).then(result => {
          const { data } = result;
          setValue('name', data.name);
          setValue('active', data.active);
        });
      }
    },
    [setValue],
  );

  useEffect(() => handleGetLevel(id), [handleGetLevel, id]);

  useEffect(() => setTitle('Níveis / Formulário'), [setTitle]);

  const onSubmit = useCallback(
    async (values: { name: string; active: 0 | 1 }) => {
      if (id) {
        const data: LevelData = {
          id,
          name: values.name,
          active: values.active,
        };

        updateLevel(id, data)
          .then(result => {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Nível ${result.data.name} atualizado.`,
            });
            history.push(HISTORY_BACK);
          })
          .catch(() => {
            addToast({
              title: 'Falha',
              type: 'error',
              description: `Falha ao tentar atualizar o nível.`,
            });
          });
      } else {
        const data: LevelData = {
          name: values.name,
        };

        addLevel(data)
          .then(result => {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Nível ${result.data.name} adicionado.`,
            });
            history.push(HISTORY_BACK);
          })
          .catch(() => {
            addToast({
              title: 'Falha',
              type: 'error',
              description: `Falha ao tentar adicionar o nível.`,
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
            width="col-12 col-md-9"
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
            <Button tipo="cancel" onClick={() => handleGetLevel(id)} />
            <Button tipo="save" />
          </div>
        </ButtonGroup>
      </form>
    </Container>
  );
};
