import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../../../../components/Form/Button';
import { ButtonGroup } from '../../../../components/Form/ButtonGroup';
import { FormGroup } from '../../../../components/Form/FormGroup';
import Input from '../../../../components/Form/Input';
import { useTitle } from '../../../../hooks/title';
import { useToast } from '../../../../hooks/toast';
import {
  addModule,
  getModuleById,
  ModuleData,
  updateModule,
} from '../../../../services/system/module.service';

import { Container } from './styles';

const HISTORY_BACK = '/webeditor/modulos';

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

  const handleGetModule = useCallback(
    (moduleId: string) => {
      if (moduleId) {
        getModuleById(moduleId).then(result => {
          const { data } = result;
          setValue('name', data.name);
        });
      }
    },
    [setValue],
  );

  useEffect(() => handleGetModule(id), [handleGetModule, id]);

  useEffect(() => setTitle('Módulos / Formulário'), [setTitle]);

  const onSubmit = useCallback(
    (values: { name: string; modules: string[] }) => {
      if (id) {
        const data: ModuleData = {
          id,
          name: values.name,
        };

        updateModule(id, data)
          .then(result => {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Módulo ${result.data.name} atualizado.`,
            });
            history.push(HISTORY_BACK);
          })
          .catch(() => {
            addToast({
              title: 'Falha',
              type: 'error',
              description: `Falha ao tentar atualizar o módulo.`,
            });
          });
      } else {
        const data: ModuleData = {
          name: values.name,
        };

        addModule(data)
          .then(result => {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Módulo ${result.data.name} adicionado.`,
            });
            history.push(HISTORY_BACK);
          })
          .catch(() => {
            addToast({
              title: 'Falha',
              type: 'error',
              description: `Falha ao tentar adicionar o módulo.`,
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
            width="col-12 col-sm-5 col-md-3"
            label="Nome"
            name="name"
            error={errors.name?.message}
            register={register}
          />
        </FormGroup>

        <ButtonGroup between>
          <Button tipo="back" onClick={() => history.push(HISTORY_BACK)} />
          <div className="right">
            <Button tipo="cancel" onClick={() => handleGetModule(id)} />
            <Button tipo="save" />
          </div>
        </ButtonGroup>
      </form>
    </Container>
  );
};
