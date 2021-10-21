import { Container, Box, LinearProgress, Button, Pagination, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toast } from 'react-toastify';
import {
  fetchComics,
  comicsSelector,
  isLoadingSelector,
  paginationSelector,
  filterSelector,
  setFilter,
} from '../comicSlice';
import { Category } from '../../../models/';
import { ComicTable } from '../components';
import { useHistory } from 'react-router-dom';
import { deleteComicAPI } from '../comicAPI';
import { fetchCategoriesAPI } from '../../category/categoryAPI';
import { unwrapResult } from '@reduxjs/toolkit';

export function ListComicPage() {
  const dispatch = useAppDispatch();
  const comics = useAppSelector(comicsSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const pagination = useAppSelector(paginationSelector);
  const filter = useAppSelector(filterSelector);
  const history = useHistory();
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
    dispatch(fetchComics(filter))
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

  const handleAddComicClick = () => {
    history.push('/comic/add');
  };

  const handleEditButtonClick = (id: string) => {
    history.push(`/comic/edit/${id}`);
  };

  const handleDeleteButtonClick = async (id: string) => {
    try {
      const isDeleted = await deleteComicAPI(id);
      if (isDeleted) {
        toast.success('Delete comic successfully!');
        dispatch(setFilter({ ...filter }));
      } else {
        toast.error('Delete comic failed!');
      }
    } catch (error) {
      toast.error('Delete comic failed!');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ position: 'relative' }}>
      <Typography variant="h6" mt={2}>
        Comics
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
          onClick={handleAddComicClick}
        >
          Add Comic
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
        <ComicTable
          comics={comics}
          handleEditButtonClick={handleEditButtonClick}
          handleDeleteButtonClick={handleDeleteButtonClick}
          categories={categories}
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
