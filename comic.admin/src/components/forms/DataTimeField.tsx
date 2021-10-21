import React from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import { Control, useController } from 'react-hook-form';

export interface DateTimeFieldProps {
  label: string;
  control: Control<any>;
  name: string;
  componentSize: 'small' | 'medium';
}

export function DateTimeField({ label, control, name, componentSize }: DateTimeFieldProps) {
  const {
    field: { value, onChange, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DateTimePicker
        renderInput={(props) => (
          <TextField
            {...props}
            fullWidth
            margin="normal"
            variant="outlined"
            size={componentSize}
            error={invalid}
            helperText={error?.message}
          />
        )}
        label={label}
        value={value}
        onChange={onChange}
        inputRef={ref}
        clearable
      />
    </LocalizationProvider>
  );
}
