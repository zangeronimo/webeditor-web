import { Container } from "./styles";

export const Button: React.FC = ({ children }) => {
  return <Container className="btn btn-primary">{children}</Container>;
};
