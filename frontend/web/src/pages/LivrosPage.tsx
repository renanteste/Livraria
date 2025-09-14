// src/pages/LivrosPage.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBooks } from '../store/livrosSlice';
import CreateLivroForm from '../components/CreateLivroForm';
import EditLivroForm from '../components/EditLivroForm';
import { livroService } from '../services/livrosService';

export default function LivrosPage() {
  const dispatch = useAppDispatch();
  const { items: books, loading, error } = useAppSelector((state) => state.livros);

  const [isEditing, setIsEditing] = useState(false);
  const [editingLivro, setEditingLivro] = useState<{ id: string; titulo: string; autorId: string; generoId: string; autorNome: string; generoNome: string } | null>(null);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) return <div className="text-center py-8">Carregando livros...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Erro: {error}</div>;

  const handleEdit = (livro: { id: string; titulo: string; autorId: string; generoId: string; autorNome: string; generoNome: string }) => {
    setEditingLivro(livro);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      try {
        await livroService.remove(id);
        alert('Livro excluído com sucesso!');
        dispatch(fetchBooks()); // Recarrega a lista após exclusão
      } catch (err) {
        alert('Erro ao excluir livro.');
      }
    }
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setEditingLivro(null);
  };

  const handleUpdate = () => {
    dispatch(fetchBooks()); // Recarrega a lista após edição
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Livros</h2>

      {/* Botão para adicionar novo livro */}
      <CreateLivroForm />

      {/* Tabela de livros */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-900">Título</th>
              <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-900">Autor</th>
              <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-900">Gênero</th>
              <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-900">Ações</th>
            </tr>
          </thead>
          <tbody>
            {books.map((l) => (
              <tr key={l.id} className="hover:bg-gray-50 border-t border-gray-200">
                <td className="border border-gray-200 p-3 text-sm">{l.titulo}</td>
                <td className="border border-gray-200 p-3 text-sm">{l.autorNome}</td>
                <td className="border border-gray-200 p-3 text-sm">{l.generoNome}</td>
                <td className="border border-gray-200 p-3 text-sm flex space-x-2">
                  <button
                    onClick={() => handleEdit({
                      ...l,
                      autorNome: l.autorNome ?? '',
                      generoNome: l.generoNome ?? ''
                    })}
                    className="text-yellow-600 hover:text-yellow-800 transition"
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(l.id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Excluir"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Edição */}
      {isEditing && editingLivro && (
        <EditLivroForm
          livro={editingLivro}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}