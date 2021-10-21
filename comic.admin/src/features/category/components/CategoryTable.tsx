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
import moment from 'moment';
import { styled } from '@mui/material/styles';
import { Category } from '../../../models';

export interface CategoryTableProps {
  categories: Category[];
  handleEditButtonClick: Function;
  handleDeleteButtonClick: Function;
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

export function CategoryTable({ categories, handleDeleteButtonClick, handleEditButtonClick }: CategoryTableProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteCategory, setDeleteCategory] = useState<Category | undefined>(undefined);

  const handleEditClick = (id: string) => {
    if (handleEditButtonClick) {
      handleEditButtonClick(id);
    }
  };

  const handleConfirmDelete = (category: Category) => {
    setDeleteCategory(category);
    setIsOpen(true);
  };

  const handleDeleteClick = (category: Category) => {
    if (handleDeleteButtonClick) {
      handleDeleteButtonClick(category.id);
      setIsOpen(false);
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 2, overflow: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="Category table">
          <StyledTableHead>
            <TableRow>
              <StyledTableCell component="th">Name</StyledTableCell>
              <StyledTableCell component="th">Description</StyledTableCell>
              <StyledTableCell component="th">Created Date</StyledTableCell>
              <StyledTableCell component="th">Created By</StyledTableCell>
              <StyledTableCell component="th">Updated Date</StyledTableCell>
              <StyledTableCell component="th">Updated By</StyledTableCell>
              <StyledTableCell component="th">Actions</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {categories.map((row) => (
              <TableRow key={row.id}>
                <StyledTableCell scope="row">{row.name}</StyledTableCell>
                <StyledTableCell>
                  <StyledBox component="div">{row.description}</StyledBox>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Box width={90}>{row.createdDate ? moment(row.createdDate).format('MM-DD-YYYY') : ''}</Box>
                </StyledTableCell>
                <StyledTableCell align="right">{''}</StyledTableCell>
                <StyledTableCell align="right">
                  <Box width={100}>{row.createdDate ? moment(row.createdDate).format('MM-DD-YYYY') : ''}</Box>
                </StyledTableCell>
                <StyledTableCell align="right">{''}</StyledTableCell>
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
            Are you sure to delete the category: &quot;{deleteCategory?.name}&quot; ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={() => handleDeleteClick(deleteCategory as Category)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
