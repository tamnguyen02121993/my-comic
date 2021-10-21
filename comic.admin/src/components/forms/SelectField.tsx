import React from 'react';
import { FormControl, InputLabel, Select, OutlinedInput, MenuItem, FormHelperText } from '@mui/material';
import { useController, Control } from 'react-hook-form';

export interface SelectFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  multiple?: boolean;
  items: any[];
  componentSize: 'small' | 'medium';
  handleSelectChangeCallback?: Function;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function SelectField({
  name,
  control,
  label,
  multiple,
  items,
  componentSize,
  handleSelectChangeCallback,
}: SelectFieldProps) {
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  const handleSelectChange = (e: any) => {
    onChange(e);
    if (handleSelectChangeCallback) {
      handleSelectChangeCallback(e);
    }
  };

  return (
    <FormControl fullWidth margin="normal" error={invalid}>
      <InputLabel id={`${label}-id`}>{label}</InputLabel>
      <Select
        labelId={`${label}-id`}
        id={name}
        multiple={multiple}
        value={value}
        onChange={handleSelectChange}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
        size={componentSize}
      >
        {items.map((item) => (
          <MenuItem key={item.key} value={item.key}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
      {invalid && <FormHelperText>{error?.message}</FormHelperText>}
    </FormControl>
  );
}
