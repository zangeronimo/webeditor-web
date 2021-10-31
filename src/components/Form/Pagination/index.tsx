import { PaginationItem } from './PaginationItem';

import { Container } from './styles';

type PaginationProps = {
  total: number;
  perPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

const siblingsCount = 1;

const generatePagesArray = (from: number, to: number) =>
  [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter(page => page > 0);

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage = 20,
  currentPage = 1,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / perPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : [];

  const from = perPage * (currentPage - 1);
  const to = perPage * currentPage;

  return (
    <Container>
      <div>
        <strong>{from}</strong> - <strong>{to < total ? to : total}</strong> de{' '}
        <strong>{total}</strong>
      </div>
      <div>
        {currentPage > 1 + siblingsCount && (
          <PaginationItem onPageChange={onPageChange} number={1} />
        )}

        {previousPages.length > 0 &&
          previousPages.map(page => (
            <>
              <PaginationItem
                onPageChange={onPageChange}
                key={page}
                number={page}
              />
              {currentPage > 2 + siblingsCount && <span>...</span>}
            </>
          ))}

        <PaginationItem
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />

        {nextPages.length > 0 &&
          nextPages.map(page => (
            <PaginationItem
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && <span>...</span>}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </div>
    </Container>
  );
};
