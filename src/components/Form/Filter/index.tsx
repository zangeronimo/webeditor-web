import { FaSearch } from 'react-icons/fa';
import { Button } from '../Button';
import { Container } from './styles';

type FilterProps = {
  clearFilters: () => void;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export const Filter: React.FC<FilterProps> = ({
  clearFilters,
  onSubmit,
  children,
}) => {
  return (
    <Container>
      <h2>Filtros</h2>
      <form onSubmit={onSubmit}>
        {children}

        <Button type="submit">
          <FaSearch />
        </Button>
      </form>
      <button type="button" onClick={clearFilters}>
        Limpar filtros
      </button>
      <hr />
    </Container>
  );
};
