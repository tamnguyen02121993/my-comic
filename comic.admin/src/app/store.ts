import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import categoryReducer from '../features/category/categorySlice';
import authorReducer from '../features/author/authorSlice';
import comicReducer from '../features/comic/comicSlice';
import chapterReducer from '../features/chapter/chapterSlice';
import comicImageReducer from '../features/comicImage/comicImageSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    category: categoryReducer,
    author: authorReducer,
    comic: comicReducer,
    chapter: chapterReducer,
    comicImage: comicImageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
