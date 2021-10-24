import React, { InputHTMLAttributes, useState, useCallback } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  id: string;
  label: string;
  error?: string;
  register: UseFormRegister<FieldValues>;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  id,
  label,
  register,
  error = '',
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    const element = document.getElementById(id) as HTMLInputElement;
    setIsFilled(!!element?.value);
  }, [id]);

  return (
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      <div className="input">
        <input
          type="checkbox"
          onFocus={handleInputFocus}
          id={id}
          {...register(name)}
          onBlur={handleInputBlur}
          {...rest}
        />
        <label htmlFor={id}>{label}</label>
      </div>

      {error && (
        <Error title={error}>
          <FiAlertCircle size={20} color="#c53030" />
        </Error>
      )}
    </Container>
  );
};

export default Checkbox;
