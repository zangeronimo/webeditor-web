import { useCallback, useEffect, useState } from 'react';
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
import Select from '../../../../components/Form/Select';
import { FormGroup } from '../../../../components/Form/FormGroup';
import { Editor } from '../../../../components/Form/Editor';
import { file2Base64 } from '../../../../utils/file2Base64';

const HISTORY_BACK = '/institucional/paginas';

export const Form: React.FC = () => {
  const [content, setContent] = useState('');
  const [banner, setBanner] = useState('');

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
        setContent(data.content);
        setBanner(data.banner);
      });
    },
    [setValue],
  );

  useEffect(() => handleGetPage(id), [handleGetPage, id]);

  useEffect(() => setTitle('Páginas / Formulário'), [setTitle]);

  const onSubmit = useCallback(
    async (values: { banner: string; title: string; active: number }) => {
      if (id) {
        const data: PageData = {
          id,
          title: values.title,
          content,
          active: values.active,
        };

        if (values.banner) {
          data.file = await file2Base64(values.banner[0]);
        }

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
          content,
        };

        if (values.banner) {
          data.file = await file2Base64(values.banner[0]);
        }

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
    [addToast, content, history, id],
  );

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Input
            width="col-12 col-md-9"
            label="Título"
            name="title"
            error={errors.title?.message}
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
          <Input
            type="file"
            width="col-12 col-md-9"
            label="Banner"
            name="banner"
            error={errors.banner?.message}
            register={register}
          />
          {banner && (
            <img
              src={`${process.env.REACT_APP_APIURL}${banner}`}
              alt="banner"
            />
          )}
        </FormGroup>

        <Editor data={content} setContent={setContent} />

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
