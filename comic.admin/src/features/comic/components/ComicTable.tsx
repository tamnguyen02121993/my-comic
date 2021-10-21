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
import { Comic, Category } from '../../../models';

export interface ComicTableProps {
  comics: Comic[];
  handleEditButtonClick: Function;
  handleDeleteButtonClick: Function;
  categories: Category[];
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

export function ComicTable({ comics, handleDeleteButtonClick, handleEditButtonClick, categories }: ComicTableProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteComic, setDeleteComic] = useState<Comic | undefined>(undefined);
  const mapCategories = categories.reduce((x, y) => {
    x[y.id] = y.name;
    return x;
  }, {} as any);

  const handleEditClick = (id: string) => {
    if (handleEditButtonClick) {
      handleEditButtonClick(id);
    }
  };

  const handleConfirmDelete = (comic: Comic) => {
    setDeleteComic(comic);
    setIsOpen(true);
  };

  const handleDeleteClick = (comic: Comic) => {
    if (handleDeleteButtonClick) {
      handleDeleteButtonClick(comic.id);
      setIsOpen(false);
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 2, overflow: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="Comic table">
          <StyledTableHead>
            <TableRow>
              <StyledTableCell component="th">Name</StyledTableCell>
              <StyledTableCell component="th">Description</StyledTableCell>
              <StyledTableCell component="th">Thumbnail</StyledTableCell>
              <StyledTableCell component="th">Category</StyledTableCell>
              <StyledTableCell component="th">Actions</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {comics.map((row) => (
              <TableRow key={row.id}>
                <StyledTableCell scope="row">{row.name}</StyledTableCell>
                <StyledTableCell>
                  <StyledBox component="div">{row.description}</StyledBox>
                </StyledTableCell>
                <StyledTableCell sx={{ width: '120px' }}>
                  <Box component="div" width={120}>
                    <img alt={row.name} src={row.thumbnailUrl} style={{ width: '100%', height: 'auto' }} />
                  </Box>
                </StyledTableCell>
                <StyledTableCell>
                  <Box component="div">{mapCategories[row.categoryId]}</Box>
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
            Are you sure to delete the comic: &quot;{deleteComic?.name}&quot; ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={() => handleDeleteClick(deleteComic as Comic)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
