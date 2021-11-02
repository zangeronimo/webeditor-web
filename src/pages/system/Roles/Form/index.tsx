import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../../../../components/Form/Button';
import { ButtonGroup } from '../../../../components/Form/ButtonGroup';
import { FormGroup } from '../../../../components/Form/FormGroup';
import Input from '../../../../components/Form/Input';
import Select from '../../../../components/Form/Select';
import { useTitle } from '../../../../hooks/title';
import { useToast } from '../../../../hooks/toast';
import { getModules, Module } from '../../../../services/system/module.service';
import {
  addRole,
  getRoleById,
  RoleData,
  updateRole,
} from '../../../../services/system/role.service';
import { debounce } from '../../../../utils/debounce';

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

  useEffect(() => {
    getModules().then(result => {
      setModules(result.data);
    });
  }, []);

  const handleGetRole = useCallback(
    (roleId: string) => {
      if (roleId) {
        getRoleById(roleId).then(result => {
          const { data } = result;
          debounce(() => {
            setValue('name', data.name);
            setValue('label', data.label);
            setValue('module', data.module.id);
          }, 1);
        });
      }
    },
    [setValue],
  );

  useEffect(() => handleGetRole(id), [handleGetRole, id]);

  useEffect(() => setTitle('Regras / Formulário'), [setTitle]);

  const onSubmit = useCallback(
    (values: { name: string; label: string; module: string }) => {
      if (id) {
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
      } else {
        const data: RoleData = {
          name: values.name,
          label: values.label,
          module: { id: values.module },
        };

        addRole(data)
          .then(result => {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Regra ${result.data.label} adicionada.`,
            });
            history.push(HISTORY_BACK);
          })
          .catch(() => {
            addToast({
              title: 'Falha',
              type: 'error',
              description: `Falha ao tentar adicionar a regra.`,
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
          <Input
            width="col-12 col-sm-5 col-md-3"
            label="Legenda"
            name="label"
            error={errors.label?.message}
            register={register}
          />
          <Select
            width="col-12 col-sm-5 col-md-3"
            label="Módulo"
            name="module"
            register={register}
          >
            <option value="">Selecione</option>
            {modules &&
              modules.map(module => (
                <option key={module.id} value={module.id}>
                  {module.name}
                </option>
              ))}
          </Select>
        </FormGroup>

        <ButtonGroup between>
          <Button tipo="back" onClick={() => history.push(HISTORY_BACK)} />
          <div className="right">
            <Button tipo="cancel" onClick={() => handleGetRole(id)} />
            <Button tipo="save" />
          </div>
        </ButtonGroup>
      </form>
    </Container>
  );
};
