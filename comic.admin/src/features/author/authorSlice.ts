import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Author, PaginationData, ResponseData, FilterCriteria } from '../../models/index';
import { fetchAuthorsAPI } from './authorAPI';

export interface AuthorState {
  isLoading: boolean;
  authors: Author[];
  pagination: PaginationData;
  filter: FilterCriteria;
}

export const fetchAuthors = createAsyncThunk(
  'author/fetchAuthors',
  async (filter: FilterCriteria, { rejectWithValue }) => {
    try {
      const data = await fetchAuthorsAPI(filter);
      return data;
    } catch (error) {
      return rejectWithValue('Fetch authors failed!');
    }
  }
);

const initialState: AuthorState = {
  isLoading: false,
  authors: [],
  pagination: {
    page: 1,
    pageCount: 5,
    totalCount: 1,
  },
  filter: {
    page: 1,
    search: '',
    pageCount: 5,
  },
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<FilterCriteria>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthors.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAuthors.fulfilled, (state, action) => {
      const { data, pagination } = action.payload as ResponseData<Author>;
      state.authors = data;
      state.pagination = pagination;
      state.isLoading = false;
    });
    builder.addCase(fetchAuthors.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const authorsSelector = (state: RootState) => state.author.authors;
export const isLoadingSelector = (state: RootState) => state.author.isLoading;
export const paginationSelector = (state: RootState) => state.author.pagination;
export const filterSelector = (state: RootState) => state.author.filter;

export const { setFilter } = authorSlice.actions;

const authorReducer = authorSlice.reducer;
export default authorReducer;
