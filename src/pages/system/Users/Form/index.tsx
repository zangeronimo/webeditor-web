import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../../../../components/Form/Button';
import { ButtonGroup } from '../../../../components/Form/ButtonGroup';
import Checkbox from '../../../../components/Form/Checkbox';
import Input from '../../../../components/Form/Input';
import { useTitle } from '../../../../hooks/title';
import { useToast } from '../../../../hooks/toast';
import {
  getModulesByUser,
  Module,
} from '../../../../services/system/module.service';
import {
  getUserById,
  updateUser,
  User,
  UserData,
} from '../../../../services/system/user.service';

import { Container, Roles } from './styles';

const HISTORY_BACK = '/webeditor/usuarios';

export const Form: React.FC = () => {
  const [user, setUser] = useState({} as User);
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

  const handleGetUser = useCallback(
    (userId: string) => {
      getUserById(userId).then(result => {
        const { data } = result;
        setValue('name', data.name);
        setValue('email', data.email);
        setUser(result.data);
      });
    },
    [setValue],
  );

  useEffect(() => handleGetUser(id), [handleGetUser, id]);

  useEffect(() => {
    getModulesByUser().then(result => {
      const roles = user.roles?.map(role => role.id);
      setValue('roles', roles);
      setModules(result.data);
    });
  }, [setValue, user]);

  useEffect(() => setTitle('Usuários / Formulário'), [setTitle]);

  const onSubmit = useCallback(
    (values: { name: string; email: string; roles: string[] }) => {
      const data: UserData = {
        id,
        name: values.name,
        email: values.email,
        roles: values.roles?.map(role => ({ id: role })),
      };

      updateUser(id, data)
        .then(result => {
          addToast({
            title: 'Sucesso',
            type: 'success',
            description: `Usuário ${result.data.name} atualizado.`,
          });
          history.push(HISTORY_BACK);
        })
        .catch(() => {
          addToast({
            title: 'Falha',
            type: 'error',
            description: `Falha ao tentar atualizar o usuário.`,
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
          label="E-mail"
          name="email"
          error={errors.email?.message}
          register={register}
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          register={register}
        />
        <div>
          {modules &&
            modules.map(module => (
              <div key={module.id}>
                <h2>{module.name}</h2>
                <Roles>
                  {module.roles &&
                    module.roles.map(role => (
                      <div className="col-4" key={role.id}>
                        <Checkbox
                          label={role.label}
                          id={role.name}
                          name="roles[]"
                          value={role.id}
                          register={register}
                        />
                      </div>
                    ))}
                </Roles>
              </div>
            ))}
        </div>
        <ButtonGroup between>
          <Button tipo="back" onClick={() => history.push(HISTORY_BACK)} />
          <div className="right">
            <Button tipo="cancel" onClick={() => handleGetUser(id)} />
            <Button tipo="save" />
          </div>
        </ButtonGroup>
      </form>
    </Container>
  );
};
