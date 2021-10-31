import { Container } from './styles';

type PaginationItemProps = {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
};

export const PaginationItem: React.FC<PaginationItemProps> = ({
  number,
  isCurrent = false,
  onPageChange,
}) => {
  return (
    <Container
      type="button"
      disabled={isCurrent}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Container>
  );
};
