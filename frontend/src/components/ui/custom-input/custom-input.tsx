import {ChangeEvent} from 'react';

type CustomInputProps = {
  type: string;
  label: string;
  error: string;
  onChangeInput: (evt: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  required?: boolean;
}

export const CustomInput = ({
  type,
  label,
  error,
  onChangeInput,
  autoComplete = 'off',
  required = true
}: CustomInputProps) => (
  <div className="input-login">
    <label htmlFor={type}>{label}</label>
    <input
      type={type}
      id={type}
      name={type}
      autoComplete={autoComplete}
      onChange={onChangeInput}
      required={required}
    />
    <p className="input-login__error">{error}</p>
  </div>
);
