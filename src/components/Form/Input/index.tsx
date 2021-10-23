import React, { InputHTMLAttributes, useState, useCallback } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error?: string;
  containerStyle?: Record<string, unknown>;
  register: UseFormRegister<FieldValues>;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  containerStyle = {},
  icon: Icon,
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
    const element = document.getElementById(name) as HTMLInputElement;
    setIsFilled(!!element?.value);
  }, [name]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
      data-testid="input-container"
    >
      {Icon && <Icon size={20} />}
      <div className="input">
        <label htmlFor={name}>{label}</label>
        <input
          onFocus={handleInputFocus}
          autoComplete="false"
          id={name}
          {...register(name)}
          onBlur={handleInputBlur}
          {...rest}
        />
      </div>

      {error && (
        <Error title={error}>
          <FiAlertCircle size={20} color="#c53030" />
        </Error>
      )}
    </Container>
  );
};

export default Input;
