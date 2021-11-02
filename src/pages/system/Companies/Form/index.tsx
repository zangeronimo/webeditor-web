import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../../../../components/Form/Button';
import { ButtonGroup } from '../../../../components/Form/ButtonGroup';
import Checkbox from '../../../../components/Form/Checkbox';
import { FormGroup } from '../../../../components/Form/FormGroup';
import Input from '../../../../components/Form/Input';
import { useTitle } from '../../../../hooks/title';
import { useToast } from '../../../../hooks/toast';
import {
  addCompany,
  Company,
  CompanyData,
  getCompanyById,
  updateCompany,
} from '../../../../services/system/company.service';
import { getModules, Module } from '../../../../services/system/module.service';

import { Container, Modules } from './styles';

const HISTORY_BACK = '/webeditor/empresas';

export const Form: React.FC = () => {
  const [company, setCompany] = useState({} as Company);
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

  const handleGetCompany = useCallback(
    (companyId: string) => {
      if (companyId) {
        getCompanyById(companyId).then(result => {
          const { data } = result;
          setValue('name', data.name);
          setCompany(result.data);
        });
      }
    },
    [setValue],
  );

  useEffect(() => handleGetCompany(id), [handleGetCompany, id]);

  useEffect(() => setTitle('Empresas / Formulário'), [setTitle]);

  useEffect(() => {
    getModules().then(result => {
      const companyModules = company.modules?.map(module => module.id);
      setValue('modules', companyModules);
      setModules(result.data);
    });
  }, [company.modules, setValue]);

  const onSubmit = useCallback(
    (values: { name: string; modules: string[] }) => {
      if (id) {
        const data: CompanyData = {
          id,
          name: values.name,
          modules: values.modules?.map(module => ({ id: module })),
        };

        updateCompany(id, data)
          .then(result => {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Empresa ${result.data.name} atualizada.`,
            });
            history.push(HISTORY_BACK);
          })
          .catch(() => {
            addToast({
              title: 'Falha',
              type: 'error',
              description: `Falha ao tentar atualizar a empresa.`,
            });
          });
      } else {
        const data: CompanyData = {
          name: values.name,
          modules: values.modules?.map(module => ({ id: module })),
        };

        addCompany(data)
          .then(result => {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Empresa ${result.data.name} adicionada.`,
            });
            history.push(HISTORY_BACK);
          })
          .catch(() => {
            addToast({
              title: 'Falha',
              type: 'error',
              description: `Falha ao tentar adicionar a empresa.`,
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
        <FormGroup>
          <Modules>
            {modules &&
              modules.map(module => (
                <div key={module.id}>
                  <Checkbox
                    label={module.name}
                    id={module.name}
                    name="modules[]"
                    value={module.id}
                    register={register}
                  />
                </div>
              ))}
          </Modules>
        </FormGroup>

        <ButtonGroup between>
          <Button tipo="back" onClick={() => history.push(HISTORY_BACK)} />
          <div className="right">
            <Button tipo="cancel" onClick={() => handleGetCompany(id)} />
            <Button tipo="save" />
          </div>
        </ButtonGroup>
      </form>
    </Container>
  );
};
