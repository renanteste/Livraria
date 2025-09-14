// src/pages/GenerosPage.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchGenres } from '../store/generosSlice';
import CreateGeneroForm from '../components/CreateGeneroForm';
import EditGeneroForm from '../components/EditGeneroForm';
import { generoService } from '../services/generosService';

export default function GenerosPage() {
  const dispatch = useAppDispatch();
  const { items: genres, loading, error } = useAppSelector((state) => state.generos);

  const [isEditing, setIsEditing] = useState(false);
  const [editingGenero, setEditingGenero] = useState<{ id: string; nome: string } | null>(null);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  if (loading) return <div className="text-center py-8">Carregando gêneros...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Erro: {error}</div>;

  const handleEdit = (genero: { id: string; nome: string }) => {
    setEditingGenero(genero);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este gênero?')) {
      try {
        await generoService.remove(id);
        alert('Gênero excluído com sucesso!');
        dispatch(fetchGenres()); // Recarrega a lista após exclusão
      } catch (err) {
        alert('Erro ao excluir gênero.');
      }
    }
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setEditingGenero(null);
  };

  const handleUpdate = () => {
    dispatch(fetchGenres()); // Recarrega a lista após edição
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Gêneros</h2>

      {/* Botão para adicionar novo gênero */}
      <CreateGeneroForm />

      {/* Tabela de gêneros */}
      <table className="w-full border-collapse border border-gray-200 mt-6">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-200 p-2 text-left">Nome</th>
            <th className="border border-gray-200 p-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((g) => (
            <tr key={g.id} className="hover:bg-gray-50">
              <td className="border border-gray-200 p-2">{g.nome}</td>
              <td className="border border-gray-200 p-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(g)}
                  className="text-yellow-600 hover:text-yellow-800"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(g.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Edição */}
      {isEditing && editingGenero && (
        <EditGeneroForm
          genero={editingGenero}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}