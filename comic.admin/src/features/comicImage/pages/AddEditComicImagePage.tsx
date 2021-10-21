import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { ComicImage, Comic } from '../../../models';
import { ComicImageForm } from '../components';
import { fetchComicImageAPI, postComicImageAPI, putComicImageAPI } from '../comicImageAPI';
import { fetchComicsAPI } from '../../comic/comicAPI';

export function AddEditComicImagePage() {
  const params = useParams() as any;
  const history = useHistory();
  const isEdit = Boolean(params.id);
  const [comicImage, setComicImage] = useState<ComicImage | undefined>(undefined);
  const [comics, setComics] = useState<Comic[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const data = await fetchComicsAPI({
          search: '',
          page: 0,
          pageCount: 0,
        });
        setComics(data.data);
      } catch (error) {
        toast.error('Fetch related data failed!');
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (Boolean(params.id)) {
        try {
          const data = await fetchComicImageAPI(params.id);
          setComicImage(data);
        } catch (error) {
          toast.error('Fetch image failed!');
        }
      }
    })();
  }, [params.id]);

  const onSubmit = async (formValue: ComicImage) => {
    try {
      if (isEdit) {
        await putComicImageAPI(formValue);
      } else {
        await postComicImageAPI(formValue);
      }
      history.push('/comicImage');
    } catch {
      toast.error('Save data failed!');
    }
  };

  const initialValues: ComicImage = {
    id: '',
    url: '',
    chapterId: '',
    ...comicImage,
  };

  return (
    <Container maxWidth="lg" sx={{ position: 'relative' }}>
      <Typography variant="h6" mt={2}>
        {isEdit ? 'Edit' : 'Add'} ComicImage
      </Typography>
      <Button variant="text" color="info" onClick={() => history.goBack()}>
        <ChevronLeft />
        Back
      </Button>
      {(!isEdit || comicImage) && (
        <Box>
          <ComicImageForm onSubmit={onSubmit} initialValues={initialValues} comics={comics} isEdit={isEdit} />
        </Box>
      )}
    </Container>
  );
}
