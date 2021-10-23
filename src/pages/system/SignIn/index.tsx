import { useCallback } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { FiLock, FiMail } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '../../../components/Form/Button';
import { ButtonGroup } from '../../../components/Form/ButtonGroup';
import { FormGroup } from '../../../components/Form/FormGroup';
import Input from '../../../components/Form/Input';
import { Logo } from './Logo';
import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';

import { Container, LoginBox, Content } from './styles';

type SignInData = {
  email: string;
  password: string;
};

const schema = Yup.object()
  .shape({
    email: Yup.string()
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido'),
    password: Yup.string().required('Senha obrigatória'),
  })
  .required();

export const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const history = useHistory();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async (data: SignInData) => {
      try {
        await signIn({ email: data.email, password: data.password });

        history.push('/dashboard');
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [addToast, history, signIn],
  );

  return (
    <Container>
      <LoginBox>
        <Content>
          <Logo />
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Input
                icon={FiMail}
                label="E-mail"
                name="email"
                error={errors.email?.message}
                register={register}
              />
              <Input
                icon={FiLock}
                type="password"
                name="password"
                label="Senha"
                error={errors.password?.message}
                register={register}
              />
            </FormGroup>
            <ButtonGroup>
              <Button type="submit" className="btn btn-primary">
                <FaSignInAlt />
                Entrar
              </Button>
            </ButtonGroup>
          </form>
        </Content>
      </LoginBox>
    </Container>
  );
};
