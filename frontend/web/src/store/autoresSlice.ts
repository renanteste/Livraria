import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AutorDto } from '../models/Autor';
import { autorService } from '../services/autoresService';

interface AutoresState {
  items: AutorDto[];
  loading: boolean;
  error: string | null;
}

export const fetchAuthors = createAsyncThunk<AutorDto[], void>(
  'autores/fetchAll',
  async () => {
    const response = await autorService.getAll();
    return response;
  }
);

const autoresSlice = createSlice({
  name: 'autores',
  initialState: {
    items: [],
    loading: false,
    error: null,
  } as AutoresState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao carregar autores';
      });
  },
});

export default autoresSlice.reducer;