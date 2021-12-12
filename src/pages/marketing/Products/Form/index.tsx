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
import {
  Category,
  getCategory,
} from '../../../../services/marketing/category.service';
import { Editor } from '../../../../components/Form/Editor';
import { debounce } from '../../../../utils/debounce';
import { file2Base64 } from '../../../../utils/file2Base64';

import { Container, Image, Images } from './styles';
import {
  addProduct,
  getProductById,
  ProductData,
  updateProduct,
} from '../../../../services/marketing/product.service';

const HISTORY_BACK = '/marketing/produtos';

export const Form: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [banner, setBanner] = useState('');
  const [content, setContent] = useState('');

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
    getCategory({
      params: { perPage: 9999, order: { field: 'name', order: 'ASC' } },
    }).then(result => setCategories(result.data.data));
  }, []);

  const handleGetProduct = useCallback(
    (productId: string) => {
      if (productId) {
        getProductById(productId).then(result => {
          const { data } = result;

          debounce(() => {
            setValue('slug', data.slug);
            setValue('title', data.title);
            setBanner(data.banner);
            setContent(data.content);
            setValue('categoryId', data.category.id);
            setValue('active', data.active);
          }, 1);
        });
      }
    },
    [setValue],
  );

  useEffect(() => handleGetProduct(id), [handleGetProduct, id]);

  useEffect(() => setTitle('Produtos / Formulário'), [setTitle]);

  const onSubmit = useCallback(
    async (values: {
      img: string;
      title: string;
      categoryId: string;
      active: 0 | 1;
    }) => {
      if (id) {
        const data: ProductData = {
          id,
          title: values.title,
          content,
          categoryId: values.categoryId,
          active: values.active,
        };

        if (values.img.length) {
          data.file = await file2Base64(values.img[0]);
        }

        updateProduct(id, data)
          .then(result => {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Produto ${result.data.title} atualizado.`,
            });
            history.push(HISTORY_BACK);
          })
          .catch(() => {
            addToast({
              title: 'Falha',
              type: 'error',
              description: `Falha ao tentar atualizar o produto.`,
            });
          });
      } else {
        const data: ProductData = {
          title: values.title,
          content,
          categoryId: values.categoryId,
          active: values.active,
        };

        if (values.img.length) {
          data.file = await file2Base64(values.img[0]);
        }

        addProduct(data)
          .then(result => {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Produto ${result.data.title} adicionado.`,
            });
            history.push(HISTORY_BACK);
          })
          .catch(err => {
            const { response } = err.request;
            const responseBody = JSON.parse(response ?? '{}');

            addToast({
              title: 'Falha',
              type: 'error',
              description:
                responseBody.message ?? 'Falha ao tentar adicionar o produto.',
            });
          });
      }
    },
    [addToast, history, id, content],
  );

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Input
            width="col-12 col-md-5"
            label="Título"
            name="title"
            error={errors.title?.message}
            register={register}
          />
          <Select
            width="col-12 col-md-5 col-lg-3"
            label="Categoria"
            name="categoryId"
            error={errors.categoryId?.message}
            register={register}
          >
            <option value="">Selecione</option>
            {categories &&
              categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
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

        <span>Conteúdo</span>
        <Editor data={content} setContent={setContent} />

        <Input
          type="file"
          width="col-12 col-md-9"
          label="Imagem"
          name="img"
          error={errors.img?.message}
          register={register}
        />

        <Images>
          <Image>
            <img src={`${process.env.REACT_APP_APIURL}${banner}`} alt="" />
          </Image>
        </Images>

        <ButtonGroup between>
          <Button tipo="back" onClick={() => history.push(HISTORY_BACK)} />
          <div className="right">
            <Button tipo="cancel" onClick={() => handleGetProduct(id)} />
            <Button tipo="save" />
          </div>
        </ButtonGroup>
      </form>
    </Container>
  );
};
