import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { Category } from '../../../models';
import { CategoryForm } from '../components/';
import { fetchCategoryAPI, postCategoryAPI, putCategoryAPI } from '../categoryAPI';

export function AddEditCategoryPage() {
  const params = useParams() as any;
  const history = useHistory();
  const isEdit = Boolean(params.id);
  const [category, setCategory] = useState<Category | undefined>(undefined);

  useEffect(() => {
    (async function () {
      if (Boolean(params.id)) {
        try {
          const data = await fetchCategoryAPI(params.id);
          setCategory(data);
        } catch (error) {
          toast.error('Fetch category failed!');
        }
      }
    })();
  }, [params.id]);

  const onSubmit = async (formValue: Category) => {
    try {
      if (isEdit) {
        await putCategoryAPI(formValue);
      } else {
        await postCategoryAPI(formValue);
      }
      history.push('/category');
    } catch (error) {
      toast.error('Save data failed!');
    }
  };

  const initialValues: Category = {
    id: '',
    name: '',
    description: '',
    ...category,
  };

  return (
    <Container maxWidth="lg" sx={{ position: 'relative' }}>
      <Typography variant="h6" mt={2}>
        {isEdit ? 'Edit' : 'Add'} Category
      </Typography>
      <Button variant="text" color="info" onClick={() => history.goBack()}>
        <ChevronLeft />
        Back
      </Button>
      {(!isEdit || category) && (
        <Box>
          <CategoryForm onSubmit={onSubmit} initialValues={initialValues} />
        </Box>
      )}
    </Container>
  );
}
