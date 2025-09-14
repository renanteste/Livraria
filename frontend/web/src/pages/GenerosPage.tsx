import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchGenres } from '../store/generosSlice';

export default function GenerosPage() {
  const dispatch = useAppDispatch();
  const { items: genres, loading, error } = useAppSelector(state => state.generos);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  if (loading) return <div>Carregando gêneros...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h1>Gêneros</h1>
      <ul>
        {genres.map(g => (
          <li key={g.id}>{g.nome}</li>
        ))}
      </ul>
    </div>
  );
}