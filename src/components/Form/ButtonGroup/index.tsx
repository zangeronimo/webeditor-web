import { Container } from './styles';

type ButtonGroupProps = {
  between?: boolean;
};

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  between = false,
  children,
}) => {
  return <Container between={between}>{children}</Container>;
};
