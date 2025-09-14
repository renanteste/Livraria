import { configureStore } from '@reduxjs/toolkit';
import autoresReducer from './autoresSlice';
import generosReducer from './generosSlice';
import livrosReducer from './livrosSlice';

export const store = configureStore({
  reducer: {
    autores: autoresReducer,
    generos: generosReducer,
    livros: livrosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;