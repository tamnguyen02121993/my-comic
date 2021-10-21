import { Container, Box, LinearProgress, Button, Pagination, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toast } from 'react-toastify';
import {
  fetchCategories,
  categoriesSelector,
  isLoadingSelector,
  paginationSelector,
  filterSelector,
  setFilter,
} from '../categorySlice';
import { CategoryTable } from '../components';
import { useHistory } from 'react-router-dom';
import { deleteCategoryAPI } from '../categoryAPI';
import { unwrapResult } from '@reduxjs/toolkit';
export function ListCategoryPage() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(categoriesSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const pagination = useAppSelector(paginationSelector);
  const filter = useAppSelector(filterSelector);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchCategories(filter))
      .then(unwrapResult)
      .catch((result) => {
        toast.error(result);
      });
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

  const handleAddCategoryClick = () => {
    history.push('/category/add');
  };

  const handleEditButtonClick = (id: string) => {
    history.push(`/category/edit/${id}`);
  };

  const handleDeleteButtonClick = async (id: string) => {
    try {
      const isDeleted = await deleteCategoryAPI(id);
      if (isDeleted) {
        toast.success('Delete category successfully!');
        dispatch(setFilter({ ...filter }));
      } else {
        toast.error('Delete category failed!');
      }
    } catch (error) {
      toast.error('Delete category failed!');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ position: 'relative' }}>
      <Typography variant="h6" mt={2}>
        Categories
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
          onClick={handleAddCategoryClick}
        >
          Add Category
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
        <CategoryTable
          categories={categories}
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
