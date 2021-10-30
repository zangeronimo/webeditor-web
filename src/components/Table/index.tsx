import { TableHTMLAttributes } from 'react';

type TableProps = TableHTMLAttributes<HTMLTableElement>;

export const Table: React.FC<TableProps> = ({ children, ...rest }) => {
  return (
    <table
      className="table table-striped table-hover table-borderless align-middle"
      {...rest}
    >
      {children}
    </table>
  );
};
