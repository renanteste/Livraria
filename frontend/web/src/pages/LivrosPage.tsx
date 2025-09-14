import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBooks } from '../store/LivrosSlice';

export default function LivrosPage() {
  const dispatch = useAppDispatch();
  const { items: books, loading, error } = useAppSelector(state => state.livros);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) return <div>Carregando livros...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h1>Livros</h1>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Gênero</th>
          </tr>
        </thead>
        <tbody>
          {books.map(l => (
            <tr key={l.id}>
              <td>{l.titulo}</td>
              <td>{l.autorNome}</td>
              <td>{l.generoNome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}