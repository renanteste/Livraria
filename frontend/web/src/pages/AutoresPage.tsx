import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAuthors } from '../store/autoresSlice';

export default function AutoresPage() {
  const dispatch = useAppDispatch();
  const { items: authors, loading, error } = useAppSelector((state) => state.autores);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  if (loading) return <div className="text-center py-8">Carregando autores...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Erro: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Autores</h2>

      {/* Botão para adicionar novo autor */}
      <button className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
        + Novo Autor
      </button>

      {/* Lista de autores */}
      <ul className="space-y-3">
        {authors.map((a) => (
          <li key={a.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-md">
            <span className="text-gray-900">{a.nome}</span>
            <div className="flex space-x-2">
              <button className="text-yellow-600 hover:text-yellow-800">✏️</button>
              <button className="text-red-600 hover:text-red-800">🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}