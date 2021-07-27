import { useField } from "@unform/core";
import { InputHTMLAttributes, useRef, useEffect } from "react";
import { Container } from "./styles";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

export const Input: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container className="col-12">
      <input
        className="form-control"
        id={name}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && <p>{error}</p>}
    </Container>
  );
};
