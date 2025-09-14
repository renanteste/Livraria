import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { LivroDto } from '../models/Livro';
import { livroService } from '../services/livrosService';

interface LivrosState {
  items: LivroDto[];
  loading: boolean;
  error: string | null;
}

export const fetchBooks = createAsyncThunk<LivroDto[], void>(
  'livros/fetchAll',
  async () => {
    const response = await livroService.getAll();
    return response;
  }
);

const livrosSlice = createSlice({
  name: 'livros',
  initialState: {
    items: [],
    loading: false,
    error: null,
  } as LivrosState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao carregar livros';
      });
  },
});

export default livrosSlice.reducer;