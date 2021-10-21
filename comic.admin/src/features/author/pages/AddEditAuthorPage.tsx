import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { ChevronLeft } from '@mui/icons-material';
import { Author } from '../../../models';
import { AuthorForm } from '../components/';
import { fetchAuthorAPI, postAuthorAPI, putAuthorAPI } from '../authorAPI';

export function AddEditAuthorPage() {
  const params = useParams() as any;
  const history = useHistory();
  const isEdit = Boolean(params.id);
  const [author, setAuthor] = useState<Author | undefined>(undefined);

  useEffect(() => {
    (async function () {
      if (Boolean(params.id)) {
        try {
          const data = await fetchAuthorAPI(params.id);
          setAuthor(data);
        } catch (error) {
          toast.error('Fetch author failed!');
        }
      }
    })();
  }, [params.id]);

  const onSubmit = async (formValue: Author) => {
    try {
      if (isEdit) {
        await putAuthorAPI(formValue);
      } else {
        await postAuthorAPI(formValue);
      }
      history.push('/author');
    } catch {
      toast.error('Save data failed!');
    }
  };

  const initialValues: Author = {
    id: '',
    name: '',
    summary: '',
    avatarUrl: '',
    birthday: '',
    ...author,
  };

  return (
    <Container maxWidth="lg" sx={{ position: 'relative' }}>
      <Typography variant="h6" mt={2}>
        {isEdit ? 'Edit' : 'Add'} Author
      </Typography>
      <Button variant="text" color="info" onClick={() => history.goBack()}>
        <ChevronLeft />
        Back
      </Button>
      {(!isEdit || author) && (
        <Box>
          <AuthorForm onSubmit={onSubmit} initialValues={initialValues} />
        </Box>
      )}
    </Container>
  );
}
