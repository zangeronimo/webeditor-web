import React, { SelectHTMLAttributes, useState, useCallback } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  width?: string;
  error?: string;
  containerStyle?: Record<string, unknown>;
  register: UseFormRegister<FieldValues>;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  width = 'col-12',
  containerStyle = {},
  register,
  error = '',
  children,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleSelectBlur = useCallback(() => {
    setIsFocused(false);
    const element = document.getElementById(name) as HTMLSelectElement;
    setIsFilled(!!element?.value);
  }, [name]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
      data-testid="select-container"
      className={width}
    >
      <div className="select">
        <label htmlFor={name}>{label}</label>
        <select
          onFocus={handleSelectFocus}
          autoComplete="false"
          id={name}
          {...register(name)}
          onBlur={handleSelectBlur}
          {...rest}
        >
          {children}
        </select>
      </div>

      {error && (
        <Error title={error}>
          <FiAlertCircle size={20} color="#c53030" />
        </Error>
      )}
    </Container>
  );
};

export default Select;
