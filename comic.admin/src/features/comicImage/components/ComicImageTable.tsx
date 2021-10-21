import React, { useState } from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ComicImage, Chapter, Comic } from '../../../models';

export interface ComicImageTableProps {
  comicImages: ComicImage[];
  handleEditButtonClick: Function;
  handleDeleteButtonClick: Function;
  chapters: Chapter[];
  comics: Comic[];
}

const StyledTableHead = styled(TableHead)(
  ({ theme }) => `
  border: 1px solid ${theme.palette.divider};
  & .MuiTableCell-root {
    font-weight: ${theme.typography.fontWeightBold};
  }
`
);

const StyledTableCell = styled(TableCell)(
  ({ theme }) => `
  border-left: 1px solid ${theme.palette.divider};
  border-right: 1px solid ${theme.palette.divider};
`
);

const StyledBox = styled(Box)(
  ({ theme }) => `
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
);

export function ComicImageTable({
  comicImages,
  handleDeleteButtonClick,
  handleEditButtonClick,
  chapters,
  comics,
}: ComicImageTableProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteComicImage, setDeleteComicImage] = useState<ComicImage | undefined>(undefined);
  const mapChapters = chapters.reduce((x, y) => {
    x[y.id] = {
      name: y.name,
      comicId: y.comicId,
    };
    return x;
  }, {} as any);

  const mapComics = comics.reduce((x, y) => {
    x[y.id] = y.name;
    return x;
  }, {} as any);

  const handleEditClick = (id: string) => {
    if (handleEditButtonClick) {
      handleEditButtonClick(id);
    }
  };

  const handleConfirmDelete = (comicImage: ComicImage) => {
    setDeleteComicImage(comicImage);
    setIsOpen(true);
  };

  const handleDeleteClick = (comicImage: ComicImage) => {
    if (handleDeleteButtonClick) {
      handleDeleteButtonClick(comicImage.id);
      setIsOpen(false);
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 2, overflow: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="ComicImage table">
          <StyledTableHead>
            <TableRow>
              <StyledTableCell component="th">Image</StyledTableCell>
              <StyledTableCell component="th">Chapter</StyledTableCell>
              <StyledTableCell component="th">Comic</StyledTableCell>
              <StyledTableCell component="th">Actions</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {comicImages.map((row) => (
              <TableRow key={row.id}>
                <StyledTableCell scope="row" sx={{ width: '120px' }}>
                  <Box width={120} height="auto">
                    <img src={row.url} alt={row.url} style={{ width: '100%', height: 'auto' }} />
                  </Box>
                </StyledTableCell>
                <StyledTableCell>
                  <Box component="div">{mapChapters[row.chapterId]?.name}</Box>
                </StyledTableCell>
                <StyledTableCell>
                  <StyledBox component="div">{mapComics[mapChapters[row.chapterId]?.comicId]}</StyledBox>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Box display="flex">
                    <Button variant="outlined" color="info" sx={{ mr: 1 }} onClick={() => handleEditClick(row.id)}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleConfirmDelete(row)}>
                      Delete
                    </Button>
                  </Box>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirm Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure to delete this image ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={() => handleDeleteClick(deleteComicImage as ComicImage)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
