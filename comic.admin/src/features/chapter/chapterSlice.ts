import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Chapter, PaginationData, ResponseData, FilterCriteria } from '../../models/index';
import { fetchChaptersAPI } from './chapterAPI';

export interface ChapterState {
  isLoading: boolean;
  chapters: Chapter[];
  pagination: PaginationData;
  filter: FilterCriteria;
}

export const fetchChapters = createAsyncThunk(
  'chapter/fetchChapters',
  async (filter: FilterCriteria, { rejectWithValue }) => {
    try {
      const data = await fetchChaptersAPI(filter);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: ChapterState = {
  isLoading: false,
  chapters: [],
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

const chapterSlice = createSlice({
  name: 'chapter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<FilterCriteria>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChapters.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChapters.fulfilled, (state, action) => {
      const { data, pagination } = action.payload as ResponseData<Chapter>;
      state.chapters = data;
      state.pagination = pagination;
      state.isLoading = false;
    });
    builder.addCase(fetchChapters.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const chaptersSelector = (state: RootState) => state.chapter.chapters;
export const isLoadingSelector = (state: RootState) => state.chapter.isLoading;
export const paginationSelector = (state: RootState) => state.chapter.pagination;
export const filterSelector = (state: RootState) => state.chapter.filter;

export const { setFilter } = chapterSlice.actions;

const chapterReducer = chapterSlice.reducer;
export default chapterReducer;
