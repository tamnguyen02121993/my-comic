import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { Category } from '../../../models';
import { InputField } from '../../../components/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().max(500).required(),
});

export interface CategoryFormProps {
  onSubmit: Function;
  initialValues: Category;
}

export function CategoryForm({ initialValues, onSubmit }: CategoryFormProps) {
  const { control, handleSubmit } = useForm<Category>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (formValue: Category) => {
    if (onSubmit) {
      onSubmit(formValue);
    }
  };

  return (
    <Box maxWidth={600}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField control={control} name="name" label="Name" componentSize="small" />
        <InputField control={control} name="description" label="Description" componentSize="small" multiline rows={8} />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
