import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../../../../components/Form/Button';
import { ButtonGroup } from '../../../../components/Form/ButtonGroup';
import Input from '../../../../components/Form/Input';
import { useTitle } from '../../../../hooks/title';
import { useToast } from '../../../../hooks/toast';
import { getModules, Module } from '../../../../services/system/module.service';
import {
  getRoleById,
  RoleData,
  updateRole,
} from '../../../../services/system/role.service';

import { Container } from './styles';

const HISTORY_BACK = '/webeditor/regras';

export const Form: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);

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

  const handleGetRole = useCallback(
    (roleId: string) => {
      getRoleById(roleId).then(result => {
        const { data } = result;
        setValue('name', data.name);
        setValue('label', data.label);
        setValue('module', data.module.id);
      });
    },
    [setValue],
  );

  useEffect(() => handleGetRole(id), [handleGetRole, id]);

  useEffect(() => {
    getModules().then(result => {
      setModules(result.data);
    });
  }, []);

  useEffect(() => setTitle('Regras / Formulário'), [setTitle]);

  const onSubmit = useCallback(
    (values: { name: string; label: string; module: string }) => {
      const data: RoleData = {
        id,
        name: values.name,
        label: values.label,
        module: { id: values.module },
      };

      updateRole(id, data)
        .then(result => {
          addToast({
            title: 'Sucesso',
            type: 'success',
            description: `Regra ${result.data.label} atualizada.`,
          });
          history.push(HISTORY_BACK);
        })
        .catch(() => {
          addToast({
            title: 'Falha',
            type: 'error',
            description: `Falha ao tentar atualizar a regra.`,
          });
        });
    },
    [addToast, history, id],
  );

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nome"
          name="name"
          error={errors.name?.message}
          register={register}
        />
        <Input
          label="Legenda"
          name="label"
          error={errors.label?.message}
          register={register}
        />
        <Input label="Módulo" name="module" register={register} />

        <ButtonGroup between>
          <Button tipo="back" onClick={() => history.push(HISTORY_BACK)} />
          <div>
            <Button tipo="cancel" onClick={() => handleGetRole(id)} />
            <Button tipo="save" />
          </div>
        </ButtonGroup>
      </form>
    </Container>
  );
};
