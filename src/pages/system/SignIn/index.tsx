import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useCallback, useRef } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { FiLock, FiMail } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { Button } from '../../../components/Form/Button';
import { ButtonGroup } from '../../../components/Form/ButtonGroup';
import { FormGroup } from '../../../components/Form/FormGroup';
import Input from '../../../components/Form/Input';
import { Logo } from './Logo';
import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';

import { Container, LoginBox, Content } from './styles';

type SignInData = {
  email: string;
  password: string;
};

export const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({ email: data.email, password: data.password });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

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
          <Form ref={formRef} onSubmit={handleSubmit}>
            <FormGroup>
              <Input name="email" icon={FiMail} label="E-mail" />
              <Input
                name="password"
                icon={FiLock}
                type="password"
                label="Senha"
              />
            </FormGroup>
            <ButtonGroup>
              <Button className="btn btn-primary">
                <FaSignInAlt />
                Entrar
              </Button>
            </ButtonGroup>
          </Form>
        </Content>
      </LoginBox>
    </Container>
  );
};
