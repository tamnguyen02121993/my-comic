import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { Chapter, Comic } from '../../../models';
import { ChapterForm } from '../components';
import { fetchChapterAPI, postChapterAPI, putChapterAPI } from '../chapterAPI';
import { fetchComicsAPI } from '../../comic/comicAPI';

export function AddEditChapterPage() {
  const params = useParams() as any;
  const history = useHistory();
  const isEdit = Boolean(params.id);
  const [chapter, setChapter] = useState<Chapter | undefined>(undefined);
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
          const data = await fetchChapterAPI(params.id);
          setChapter(data);
        } catch (error) {
          toast.error('Fetch chapter failed!');
        }
      }
    })();
  }, [params.id]);

  const onSubmit = async (formValue: Chapter) => {
    try {
      if (isEdit) {
        await putChapterAPI(formValue);
      } else {
        await postChapterAPI(formValue);
      }
      history.push('/chapter');
    } catch (error) {
      toast.error('Save data failed!');
    }
  };

  const initialValues: Chapter = {
    id: '',
    name: '',
    description: '',
    comicId: '',
    ...chapter,
  };

  return (
    <Container maxWidth="lg" sx={{ position: 'relative' }}>
      <Typography variant="h6" mt={2}>
        {isEdit ? 'Edit' : 'Add'} Chapter
      </Typography>
      <Button variant="text" color="info" onClick={() => history.goBack()}>
        <ChevronLeft />
        Back
      </Button>
      {(!isEdit || chapter) && (
        <Box>
          <ChapterForm onSubmit={onSubmit} initialValues={initialValues} comics={comics} />
        </Box>
      )}
    </Container>
  );
}
