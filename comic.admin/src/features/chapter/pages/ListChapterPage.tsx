import { Container, Box, LinearProgress, Button, Pagination, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toast } from 'react-toastify';
import {
  fetchChapters,
  chaptersSelector,
  isLoadingSelector,
  paginationSelector,
  filterSelector,
  setFilter,
} from '../chapterSlice';
import { Comic } from '../../../models';
import { ChapterTable } from '../components';
import { useHistory } from 'react-router-dom';
import { deleteChapterAPI } from '../chapterAPI';
import { fetchComicsAPI } from '../../comic/comicAPI';
import { unwrapResult } from '@reduxjs/toolkit';

export function ListChapterPage() {
  const dispatch = useAppDispatch();
  const chapters = useAppSelector(chaptersSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const pagination = useAppSelector(paginationSelector);
  const filter = useAppSelector(filterSelector);
  const history = useHistory();
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
    dispatch(fetchChapters(filter))
      .then(unwrapResult)
      .catch((result) => toast.error(result));
  }, [dispatch, filter]);

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    dispatch(
      setFilter({
        ...filter,
        page: value,
      })
    );
  };

  const handleTextChange = debounce((e: any) => {
    dispatch(
      setFilter({
        ...filter,
        page: 1,
        search: e.target.value,
      })
    );
  }, 500);

  const handleAddChapterClick = () => {
    history.push('/chapter/add');
  };

  const handleEditButtonClick = (id: string) => {
    history.push(`/chapter/edit/${id}`);
  };

  const handleDeleteButtonClick = async (id: string) => {
    try {
      const isDeleted = await deleteChapterAPI(id);
      if (isDeleted) {
        toast.success('Delte chapter successfully!');
        dispatch(setFilter({ ...filter }));
      } else {
        toast.error('Delte chapter failed!');
      }
    } catch (error) {
      toast.error('Delte chapter failed!');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ position: 'relative' }}>
      <Typography variant="h6" mt={2}>
        Chapters
      </Typography>
      <Box
        mt={2}
        sx={{
          display: 'flex',
        }}
      >
        <TextField label="Search" variant="outlined" size="small" onChange={handleTextChange} />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: 'auto' }}
          size="small"
          onClick={handleAddChapterClick}
        >
          Add Chapter
        </Button>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '-8px',
          left: '0',
          right: '0',
        }}
        px={3}
      >
        {isLoading && <LinearProgress />}
      </Box>
      <Box>
        <ChapterTable
          chapters={chapters}
          handleEditButtonClick={handleEditButtonClick}
          handleDeleteButtonClick={handleDeleteButtonClick}
          comics={comics}
        />
        <Box my={2} sx={{ display: 'flex' }}>
          <Pagination
            count={Math.ceil(pagination.totalCount / pagination.pageCount)}
            color="primary"
            sx={{ marginLeft: 'auto' }}
            onChange={handlePageChange}
            page={pagination.page}
          />
        </Box>
      </Box>
    </Container>
  );
}
