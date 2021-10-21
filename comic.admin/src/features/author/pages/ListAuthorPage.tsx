import { Container, Box, LinearProgress, Button, Pagination, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toast } from 'react-toastify';
import {
  fetchAuthors,
  authorsSelector,
  isLoadingSelector,
  paginationSelector,
  filterSelector,
  setFilter,
} from '../authorSlice';
import { AuthorTable } from '../components';
import { useHistory } from 'react-router-dom';
import { deleteAuthorAPI } from '../authorAPI';
import { unwrapResult } from '@reduxjs/toolkit';
export function ListAuthorPage() {
  const dispatch = useAppDispatch();
  const authors = useAppSelector(authorsSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const pagination = useAppSelector(paginationSelector);
  const filter = useAppSelector(filterSelector);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchAuthors(filter))
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

  const handleAddAuthorClick = () => {
    history.push('/author/add');
  };

  const handleEditButtonClick = (id: string) => {
    history.push(`/author/edit/${id}`);
  };

  const handleDeleteButtonClick = async (id: string) => {
    try {
      const isDeleted = await deleteAuthorAPI(id);
      if (isDeleted) {
        toast.success('Delete author successfully!');
        dispatch(setFilter({ ...filter }));
      } else {
        toast.error('Delete author failed!');
      }
    } catch (error) {
      toast.error('Delete author failed!');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ position: 'relative' }}>
      <Typography variant="h6" mt={2}>
        Authors
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
          onClick={handleAddAuthorClick}
        >
          Add Author
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
        <AuthorTable
          authors={authors}
          handleEditButtonClick={handleEditButtonClick}
          handleDeleteButtonClick={handleDeleteButtonClick}
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
