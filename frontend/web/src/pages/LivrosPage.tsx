import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBooks } from '../store/livrosSlice';

export default function LivrosPage() {
  const dispatch = useAppDispatch();
  const { items: books, loading, error } = useAppSelector((state) => state.livros);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) return <div className="text-center py-8">Carregando livros...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Erro: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Livros</h2>

      {/* Botão para adicionar novo livro */}
      <button className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
        + Novo Livro
      </button>

      {/* Tabela de livros */}
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-200 p-2 text-left">Título</th>
            <th className="border border-gray-200 p-2 text-left">Autor</th>
            <th className="border border-gray-200 p-2 text-left">Gênero</th>
            <th className="border border-gray-200 p-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {books.map((l) => (
            <tr key={l.id} className="hover:bg-gray-50">
              <td className="border border-gray-200 p-2">{l.titulo}</td>
              <td className="border border-gray-200 p-2">{l.autorNome}</td>
              <td className="border border-gray-200 p-2">{l.generoNome}</td>
              <td className="border border-gray-200 p-2 flex space-x-2">
                <button className="text-yellow-600 hover:text-yellow-800">✏️</button>
                <button className="text-red-600 hover:text-red-800">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}