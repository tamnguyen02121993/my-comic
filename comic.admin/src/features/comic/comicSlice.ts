import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Comic, PaginationData, ResponseData, FilterCriteria } from '../../models/index';
import { fetchComicsAPI } from './comicAPI';

export interface ComicState {
  isLoading: boolean;
  comics: Comic[];
  pagination: PaginationData;
  filter: FilterCriteria;
}

export const fetchComics = createAsyncThunk(
  'comic/fetchComics',
  async (filter: FilterCriteria, { rejectWithValue }) => {
    try {
      const data = await fetchComicsAPI(filter);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: ComicState = {
  isLoading: false,
  comics: [],
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

const comicSlice = createSlice({
  name: 'comic',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<FilterCriteria>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComics.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchComics.fulfilled, (state, action) => {
      const { data, pagination } = action.payload as ResponseData<Comic>;
      state.comics = data;
      state.pagination = pagination;
      state.isLoading = false;
    });
    builder.addCase(fetchComics.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const comicsSelector = (state: RootState) => state.comic.comics;
export const isLoadingSelector = (state: RootState) => state.comic.isLoading;
export const paginationSelector = (state: RootState) => state.comic.pagination;
export const filterSelector = (state: RootState) => state.comic.filter;

export const { setFilter } = comicSlice.actions;

const comicReducer = comicSlice.reducer;
export default comicReducer;
