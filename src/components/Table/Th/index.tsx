import { TableHTMLAttributes, useCallback, useState } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import { Container } from './styles';

type ThProps = TableHTMLAttributes<HTMLTableCellElement> & {
  orderBy?: string;
  align?: 'flex-start' | 'center' | 'flex-end';
};

export const Th: React.FC<ThProps> = ({
  orderBy = '',
  align = 'flex-start',
  children,
}) => {
  const history = useHistory();
  const [order, setOrder] = useState('ASC');

  const handleOrder = useCallback(() => {
    setOrder(order === 'ASC' ? 'DESC' : 'ASC');
    history.push(`?order=${orderBy}&by=${order}`);
  }, [history, order, orderBy]);

  return (
    <Container scope="col" justify={align}>
      <div>
        {children}
        {orderBy && (
          <button type="button" onClick={handleOrder}>
            <FaAngleUp size={10} />
            <FaAngleDown size={10} />
          </button>
        )}
      </div>
    </Container>
  );
};
