import React, { useState, useCallback, TextareaHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  error?: string;
  width?: string;
  containerStyle?: Record<string, unknown>;
  register: UseFormRegister<FieldValues>;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  width = 'col-12',
  containerStyle = {},
  register,
  error = '',
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleTextareaFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleTextareaBlur = useCallback(() => {
    setIsFocused(false);
    const element = document.getElementById(name) as HTMLTextAreaElement;
    setIsFilled(!!element?.value);
  }, [name]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
      data-testid="textarea-container"
      className={width}
    >
      <div className="textarea">
        <label htmlFor={name}>{label}</label>
        <textarea
          onFocus={handleTextareaFocus}
          autoComplete="false"
          id={name}
          {...register(name)}
          onBlur={handleTextareaBlur}
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

export default Textarea;
