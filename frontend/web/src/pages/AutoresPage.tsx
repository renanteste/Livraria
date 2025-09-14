import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAuthors } from '../store/autoresSlice';

export default function AutoresPage() {
  const dispatch = useAppDispatch();
  const { items: authors, loading, error } = useAppSelector(state => state.autores);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  if (loading) return <div>Carregando autores...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h1>Autores</h1>
      <ul>
        {authors.map(a => (
          <li key={a.id}>{a.nome}</li>
        ))}
      </ul>
    </div>
  );
}