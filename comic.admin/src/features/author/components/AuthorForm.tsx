import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { Author } from '../../../models';
import { DateTimeField, InputField, InputImageField } from '../../../components/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  summary: yup.string().max(500).required(),
  avatarUrl: yup.string(),
  birthday: yup.lazy((val) => (typeof val === 'string' ? yup.string() : yup.date())),
});

export interface AuthorFormProps {
  onSubmit: Function;
  initialValues: Author;
}

export function AuthorForm({ initialValues, onSubmit }: AuthorFormProps) {
  const { control, handleSubmit } = useForm<Author>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (formValue: Author) => {
    if (onSubmit) {
      onSubmit(formValue);
    }
  };

  return (
    <Box maxWidth={600}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField control={control} name="name" label="Name" componentSize="small" />
        <InputField control={control} name="summary" label="Summary" componentSize="small" multiline rows={8} />
        <InputImageField
          control={control}
          name="avatarUrl"
          label="Avatar Url"
          componentSize="small"
          width={50}
          height={50}
        />
        <DateTimeField control={control} name="birthday" label="Birthday" componentSize="small" />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
