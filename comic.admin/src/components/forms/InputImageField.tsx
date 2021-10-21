import React, { InputHTMLAttributes } from 'react';
import { TextField, Box } from '@mui/material';
import { Control, useController } from 'react-hook-form';

export interface InputImageFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  label: string;
  componentSize: 'small' | 'medium';
  name: string;
  multiline?: boolean;
  rows?: number;
  width?: number;
  height?: number;
}

export function InputImageField({
  name,
  control,
  label,
  componentSize,
  multiline,
  rows,
  width,
  height,
  ...inputProps
}: InputImageFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <Box position="relative">
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
      <Box display="flex" position="absolute" right={width ? -1 * width - 20 : 0} top={0}>
        <img src={value} alt={value} width={width} height={height} />
      </Box>
    </Box>
  );
}
