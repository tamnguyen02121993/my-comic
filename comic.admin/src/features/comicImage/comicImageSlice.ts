import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ComicImage, PaginationData, ResponseData, FilterCriteria } from '../../models/index';
import { fetchComicImagesAPI } from './comicImageAPI';

export interface ComicImageState {
  isLoading: boolean;
  comicImages: ComicImage[];
  pagination: PaginationData;
  filter: FilterCriteria;
}

export const fetchComicImages = createAsyncThunk(
  'comicImage/fetchComicImages',
  async (filter: FilterCriteria, { rejectWithValue }) => {
    try {
      const data = await fetchComicImagesAPI(filter);
      return data;
    } catch (error) {
      return rejectWithValue('Fetch images failed!');
    }
  }
);

const initialState: ComicImageState = {
  isLoading: false,
  comicImages: [],
  pagination: {
    page: 1,
    pageCount: 5,
    totalCount: 1,
  },
  filter: {
    page: 1,
    search: '',
    pageCount: 15,
  },
};

const comicImageSlice = createSlice({
  name: 'comicImage',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<FilterCriteria>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComicImages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchComicImages.fulfilled, (state, action) => {
      const { data, pagination } = action.payload as ResponseData<ComicImage>;
      state.comicImages = data;
      state.pagination = pagination;
      state.isLoading = false;
    });
    builder.addCase(fetchComicImages.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const comicImagesSelector = (state: RootState) => state.comicImage.comicImages;
export const isLoadingSelector = (state: RootState) => state.comicImage.isLoading;
export const paginationSelector = (state: RootState) => state.comicImage.pagination;
export const filterSelector = (state: RootState) => state.comicImage.filter;

export const { setFilter } = comicImageSlice.actions;

const comicImageReducer = comicImageSlice.reducer;
export default comicImageReducer;
