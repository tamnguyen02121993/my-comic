import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { Comic, Category } from '../../../models';
import { ComicForm } from '../components';
import { fetchComicAPI, postComicAPI, putComicAPI } from '../comicAPI';
import { fetchCategoriesAPI } from '../../category/categoryAPI';

export function AddEditComicPage() {
  const params = useParams() as any;
  const history = useHistory();
  const isEdit = Boolean(params.id);
  const [comic, setComic] = useState<Comic | undefined>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const data = await fetchCategoriesAPI({
          search: '',
          page: 0,
          pageCount: 0,
        });
        setCategories(data.data);
      } catch (error) {
        toast.error('Fetch related data failed!');
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (Boolean(params.id)) {
        try {
          const data = await fetchComicAPI(params.id);
          setComic(data);
        } catch (error) {
          toast.error('Fetch comic failed!');
        }
      }
    })();
  }, [params.id]);

  const onSubmit = async (formValue: Comic) => {
    try {
      if (isEdit) {
        await putComicAPI(formValue);
      } else {
        await postComicAPI(formValue);
      }
      history.push('/comic');
    } catch (error) {
      toast.error('Save data failed!');
    }
  };

  const initialValues: Comic = {
    id: '',
    name: '',
    description: '',
    thumbnailUrl: '',
    categoryId: '',
    ...comic,
  };

  return (
    <Container maxWidth="lg" sx={{ position: 'relative' }}>
      <Typography variant="h6" mt={2}>
        {isEdit ? 'Edit' : 'Add'} Comic
      </Typography>
      <Button variant="text" color="info" onClick={() => history.goBack()}>
        <ChevronLeft />
        Back
      </Button>
      {(!isEdit || comic) && (
        <Box>
          <ComicForm onSubmit={onSubmit} initialValues={initialValues} categories={categories} />
        </Box>
      )}
    </Container>
  );
}
