import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../../../../components/Form/Button';
import { ButtonGroup } from '../../../../components/Form/ButtonGroup';
import Input from '../../../../components/Form/Input';
import { useTitle } from '../../../../hooks/title';
import { useToast } from '../../../../hooks/toast';
import {
  addPage,
  getPageById,
  PageData,
  updatePage,
} from '../../../../services/institutional/page.service';

import { Container } from './styles';

const HISTORY_BACK = '/institucional/paginas';

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

  const handleGetPage = useCallback(
    (pageId: string) => {
      getPageById(pageId).then(result => {
        const { data } = result;
        setValue('title', data.title);
        setValue('active', data.active);
      });
    },
    [setValue],
  );

  useEffect(() => handleGetPage(id), [handleGetPage, id]);

  useEffect(() => setTitle('Páginas / Formulário'), [setTitle]);

  const onSubmit = useCallback(
    (values: { title: string; active: number }) => {
      if (id) {
        const data: PageData = {
          id,
          title: values.title,
          content: '<h1>oi</h1>',
          active: values.active,
        };

        updatePage(id, data)
          .then(result => {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Página ${result.data.title} atualizada.`,
            });
            history.push(HISTORY_BACK);
          })
          .catch(() => {
            addToast({
              title: 'Falha',
              type: 'error',
              description: `Falha ao tentar atualizar a página.`,
            });
          });
      } else {
        const data: PageData = {
          title: values.title,
          content: '<h1>oi</h1>',
        };

        addPage(data)
          .then(result => {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Página ${result.data.title} adicionada.`,
            });
            history.push(HISTORY_BACK);
          })
          .catch(() => {
            addToast({
              title: 'Falha',
              type: 'error',
              description: `Falha ao tentar adicionar a página.`,
            });
          });
      }
    },
    [addToast, history, id],
  );

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Title"
          name="title"
          error={errors.title?.message}
          register={register}
        />
        <Input
          type="number"
          label="Active"
          name="active"
          error={errors.active?.message}
          register={register}
        />
        <ButtonGroup between>
          <Button tipo="back" onClick={() => history.push(HISTORY_BACK)} />
          <div className="right">
            <Button tipo="cancel" onClick={() => handleGetPage(id)} />
            <Button tipo="save" />
          </div>
        </ButtonGroup>
      </form>
    </Container>
  );
};
