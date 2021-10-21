import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { Comic, Category, SelectModel } from '../../../models';
import { InputField, InputImageField, SelectField } from '../../../components/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().max(500).required(),
  thumbnailUrl: yup.string().required(),
  categoryId: yup.string().required(),
});

export interface ComicFormProps {
  onSubmit: Function;
  initialValues: Comic;
  categories: Category[];
}

export function ComicForm({ initialValues, onSubmit, categories }: ComicFormProps) {
  const { control, handleSubmit } = useForm<Comic>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (formValue: Comic) => {
    if (onSubmit) {
      onSubmit(formValue);
    }
  };

  return (
    <Box maxWidth={600}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField control={control} name="name" label="Name" componentSize="small" />
        <InputField control={control} name="description" label="Description" componentSize="small" multiline rows={8} />
        <InputImageField
          control={control}
          name="thumbnailUrl"
          label="Thumbnail Url"
          componentSize="small"
          width={140}
          height={200}
        />

        <SelectField
          control={control}
          name="categoryId"
          label="Category"
          componentSize="small"
          items={categories.map(
            (x) =>
              ({
                key: x.id,
                value: x.name,
              } as SelectModel<string, string>)
          )}
        />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
