import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { Chapter, Comic, SelectModel } from '../../../models';
import { InputField, SelectField } from '../../../components/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().max(500).required(),
  comicId: yup.string().required(),
});

export interface ChapterFormProps {
  onSubmit: Function;
  initialValues: Chapter;
  comics: Comic[];
}

export function ChapterForm({ initialValues, onSubmit, comics }: ChapterFormProps) {
  const { control, handleSubmit } = useForm<any>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (formValue: Chapter) => {
    if (onSubmit) {
      onSubmit(formValue);
    }
  };

  return (
    <Box maxWidth={600}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField control={control} name="name" label="Name" componentSize="small" />
        <InputField control={control} name="description" label="Description" componentSize="small" multiline rows={8} />
        <SelectField
          control={control}
          name="comicId"
          label="Comic"
          componentSize="small"
          items={comics.map(
            (x) =>
              ({
                key: x.id,
                value: x.name,
              } as SelectModel<string, string>)
          )}
        />
        {/* <Box>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <InputField control={control} name="pattern" label="Pattern" componentSize="small" />
            </Grid>
            <Grid item xs={3}>
              <InputField control={control} name="quantity" label="Quantity" componentSize="small" type="number" />
            </Grid>
            <Grid item xs={9}>
              <InputField
                control={control}
                name="generatedLinks"
                label="Generated Links"
                componentSize="small"
                multiline
                rows={8}
              />
            </Grid>
            <Grid item xs={3}>
              <Button type="button" variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleGenerateLinks}>
                Generate
              </Button>
            </Grid>
          </Grid>
        </Box> */}

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
