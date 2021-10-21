import { Container, Box, LinearProgress, Button, Pagination, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toast } from 'react-toastify';
import {
  fetchComicImages,
  comicImagesSelector,
  isLoadingSelector,
  paginationSelector,
  filterSelector,
  setFilter,
} from '../comicImageSlice';
import { Chapter, Comic } from '../../../models';
import { ComicImageTable } from '../components';
import { useHistory } from 'react-router-dom';
import { deleteComicImageAPI } from '../comicImageAPI';
import { fetchChaptersAPI } from '../../chapter/chapterAPI';
import { fetchComicsAPI } from '../../comic/comicAPI';
import { unwrapResult } from '@reduxjs/toolkit';

export function ListComicImagePage() {
  const dispatch = useAppDispatch();
  const comicImages = useAppSelector(comicImagesSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const pagination = useAppSelector(paginationSelector);
  const filter = useAppSelector(filterSelector);
  const history = useHistory();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [comics, setComics] = useState<Comic[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const chaptersData = await fetchChaptersAPI({
          search: '',
          page: 0,
          pageCount: 0,
        });
        setChapters(chaptersData.data);

        const comicsData = await fetchComicsAPI({
          search: '',
          page: 0,
          pageCount: 0,
        });
        setComics(comicsData.data);
      } catch (error) {
        toast.error('Fetch related data failed!');
      }
    })();
  }, []);

  useEffect(() => {
    dispatch(fetchComicImages(filter))
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

  const handleAddComicImageClick = () => {
    history.push('/comicImage/add');
  };

  const handleEditButtonClick = (id: string) => {
    history.push(`/comicImage/edit/${id}`);
  };

  const handleDeleteButtonClick = async (id: string) => {
    try {
      const isDeleted = await deleteComicImageAPI(id);
      if (isDeleted) {
        toast.success('Delete image successfully!');
        dispatch(setFilter({ ...filter }));
      } else {
        toast.error('Delete image failed!');
      }
    } catch (error) {
      toast.error('Delete image failed!');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ position: 'relative' }}>
      <Typography variant="h6" mt={2}>
        ComicImages
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
          onClick={handleAddComicImageClick}
        >
          Add Image
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
        <ComicImageTable
          comicImages={comicImages}
          handleEditButtonClick={handleEditButtonClick}
          handleDeleteButtonClick={handleDeleteButtonClick}
          chapters={chapters}
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
