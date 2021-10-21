import React, { InputHTMLAttributes } from 'react';
import { TextField } from '@mui/material';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  label: string;
  componentSize: 'small' | 'medium';
  name: string;
  multiline?: boolean;
  rows?: number;
}

export function InputField({ name, control, label, componentSize, multiline, rows, ...inputProps }: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      label={label}
      variant="outlined"
      size={componentSize}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
      multiline={multiline}
      rows={rows}
    />
  );
}
