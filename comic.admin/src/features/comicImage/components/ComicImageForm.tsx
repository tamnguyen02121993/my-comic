import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, Typography } from '@mui/material';
import { ComicImage, SelectModel, Comic } from '../../../models';
import { InputField, SelectField } from '../../../components/forms';
import { fetchChaptersByComicIdAPI } from '../../chapter/chapterAPI';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  url: yup.string().required(),
  chapterId: yup.string().required(),
});

export interface ComicImageFormProps {
  onSubmit: Function;
  initialValues: ComicImage;
  comics: Comic[];
  isEdit: boolean;
}

export function ComicImageForm({ initialValues, onSubmit, comics, isEdit }: ComicImageFormProps) {
  const { control, handleSubmit, getValues, setValue } = useForm<any>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const [chapters, setChapters] = useState<SelectModel<string, string>[]>([]);
  const handleFormSubmit = (formValue: ComicImage) => {
    if (onSubmit) {
      onSubmit(formValue);
    }
  };

  const handleSelectChangeCallback = async (e: any) => {
    try {
      const data = await fetchChaptersByComicIdAPI(e.target.value);
      const map = data.map(
        (x) =>
          ({
            key: x.id,
            value: x.name,
          } as SelectModel<string, string>)
      );
      setChapters(map);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerateLinks = () => {
    const values = getValues(['pattern', 'quantity']);
    const links = [];
    for (let i = 1; i <= values[1]; i++) {
      let zeroString = `000`.slice(i.toString().length);
      links.push(values[0].replace('{#1}', `${zeroString}${i}`));
    }
    setValue('url', links.join('\n'));
  };

  return (
    <Box maxWidth={600}>
      {!isEdit && <Typography variant="caption">{`{#1} will be replace`}</Typography>}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {isEdit ? (
          <InputField control={control} name="url" label="Links" componentSize="small" />
        ) : (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <InputField control={control} name="pattern" label="Pattern" componentSize="small" />
              </Grid>
              <Grid item xs={3}>
                <InputField
                  control={control}
                  name="quantity"
                  label="Quantity"
                  componentSize="small"
                  type="number"
                  max={100}
                  min={0}
                />
              </Grid>
              <Grid item xs={9}>
                <InputField control={control} name="url" label="Links" componentSize="small" multiline rows={8} />
              </Grid>
              <Grid item xs={3}>
                <Button type="button" variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleGenerateLinks}>
                  Generate
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

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
          handleSelectChangeCallback={handleSelectChangeCallback}
        />

        <SelectField control={control} name="chapterId" label="Chapter" componentSize="small" items={chapters} />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
