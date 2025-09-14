import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { GeneroDto } from '../models/Genero';
import { generoService } from '../services/generosService';

// Define o tipo de estado
interface GenerosState {
  items: GeneroDto[];
  loading: boolean;
  error: string | null;
}

// Thunk para buscar todos os gêneros
export const fetchGenres = createAsyncThunk<GeneroDto[], void>(
  'generos/fetchAll',
  async () => {
    const response = await generoService.getAll();
    return response;
  }
);

// Slice
const generosSlice = createSlice({
  name: 'generos',
  initialState: {
    items: [],
    loading: false,
    error: null,
  } as GenerosState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao carregar gêneros';
      });
  },
});

export default generosSlice.reducer;