import { ButtonHTMLAttributes } from 'react';
import { FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tipo?: 'cancel' | 'back' | 'save';
};

const BasicButton: React.FC = ({ children, ...rest }) => {
  return (
    <Container className="btn btn-primary" {...rest}>
      {children}
    </Container>
  );
};

const SaveButton: React.FC = ({ ...rest }) => {
  return (
    <Container type="submit" className="btn btn-primary" {...rest}>
      <FaCheck /> Salvar
    </Container>
  );
};

const CancelButton: React.FC = ({ ...rest }) => {
  return (
    <Container type="button" className="btn btn-secondary" {...rest}>
      <FaTimes /> Cancelar
    </Container>
  );
};

const BackButton: React.FC = ({ ...rest }) => {
  return (
    <Container type="button" className="btn btn-outline-secondary" {...rest}>
      <FaArrowLeft /> Voltar
    </Container>
  );
};

export const Button: React.FC<ButtonProps> = ({ tipo, children, ...rest }) => {
  switch (tipo) {
    case 'save':
      return <SaveButton {...rest} />;
      break;
    case 'back':
      return <BackButton {...rest} />;
      break;
    case 'cancel':
      return <CancelButton {...rest} />;
      break;
    default:
      return <BasicButton {...rest}>{children}</BasicButton>;
  }
};
