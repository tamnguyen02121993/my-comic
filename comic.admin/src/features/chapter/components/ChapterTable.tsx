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
import { Chapter, Comic } from '../../../models';

export interface ChapterTableProps {
  chapters: Chapter[];
  handleEditButtonClick: Function;
  handleDeleteButtonClick: Function;
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

export function ChapterTable({ chapters, handleDeleteButtonClick, handleEditButtonClick, comics }: ChapterTableProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteChapter, setDeleteChapter] = useState<Chapter | undefined>(undefined);
  const mapComics = comics.reduce((x, y) => {
    x[y.id] = y.name;
    return x;
  }, {} as any);

  const handleEditClick = (id: string) => {
    if (handleEditButtonClick) {
      handleEditButtonClick(id);
    }
  };

  const handleConfirmDelete = (chapter: Chapter) => {
    setDeleteChapter(chapter);
    setIsOpen(true);
  };

  const handleDeleteClick = (chapter: Chapter) => {
    if (handleDeleteButtonClick) {
      handleDeleteButtonClick(chapter.id);
      setIsOpen(false);
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 2, overflow: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="Chapter table">
          <StyledTableHead>
            <TableRow>
              <StyledTableCell component="th">Name</StyledTableCell>
              <StyledTableCell component="th">Description</StyledTableCell>
              <StyledTableCell component="th">Comic</StyledTableCell>
              <StyledTableCell component="th">Actions</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {chapters.map((row) => (
              <TableRow key={row.id}>
                <StyledTableCell scope="row">{row.name}</StyledTableCell>
                <StyledTableCell>
                  <StyledBox component="div">{row.description}</StyledBox>
                </StyledTableCell>
                <StyledTableCell>
                  <Box component="div">{mapComics[row.comicId]}</Box>
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
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete the chapter: &quot;{deleteChapter?.name}&quot; ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={() => handleDeleteClick(deleteChapter as Chapter)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
