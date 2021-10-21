import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Category, PaginationData, ResponseData, FilterCriteria } from '../../models/index';
import { fetchCategoriesAPI } from './categoryAPI';

export interface CategoryState {
  isLoading: boolean;
  categories: Category[];
  pagination: PaginationData;
  filter: FilterCriteria;
}

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (filter: FilterCriteria, { rejectWithValue }) => {
    try {
      const data = await fetchCategoriesAPI(filter);
      return data;
    } catch (err: any) {
      return rejectWithValue('Fetch categories failed!');
    }
  }
);

const initialState: CategoryState = {
  isLoading: false,
  categories: [],
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

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<FilterCriteria>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      const { data, pagination } = action.payload as ResponseData<Category>;
      state.categories = data;
      state.pagination = pagination;
      state.isLoading = false;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const categoriesSelector = (state: RootState) => state.category.categories;
export const isLoadingSelector = (state: RootState) => state.category.isLoading;
export const paginationSelector = (state: RootState) => state.category.pagination;
export const filterSelector = (state: RootState) => state.category.filter;

export const { setFilter } = categorySlice.actions;

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
