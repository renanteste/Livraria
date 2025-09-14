// src/pages/AutoresPage.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAuthors } from '../store/autoresSlice';
import CreateAutorForm from '../components/CreateAutorForm';
import EditAutorForm from '../components/EditAutorForm';
import { autorService } from '../services/autoresService';

export default function AutoresPage() {
  const dispatch = useAppDispatch();
  const { items: authors, loading, error } = useAppSelector((state) => state.autores);

  const [isEditing, setIsEditing] = useState(false);
  const [editingAutor, setEditingAutor] = useState<{ id: string; nome: string } | null>(null);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  if (loading) return <div className="text-center py-8">Carregando autores...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Erro: {error}</div>;

  const handleEdit = (autor: { id: string; nome: string }) => {
    setEditingAutor(autor);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este autor?')) {
      try {
        await autorService.remove(id);
        alert('Autor excluído com sucesso!');
        dispatch(fetchAuthors()); // Recarrega a lista após exclusão
      } catch (err) {
        alert('Erro ao excluir autor.');
      }
    }
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setEditingAutor(null);
  };

  const handleUpdate = () => {
    dispatch(fetchAuthors()); // Recarrega a lista após edição
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Autores</h2>

      {/* Botão para adicionar novo autor */}
      <CreateAutorForm />

      {/* Tabela de autores */}
      <table className="w-full border-collapse border border-gray-200 mt-6">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-200 p-2 text-left">Nome</th>
            <th className="border border-gray-200 p-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((a) => (
            <tr key={a.id} className="hover:bg-gray-50">
              <td className="border border-gray-200 p-2">{a.nome}</td>
              <td className="border border-gray-200 p-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(a)}
                  className="text-yellow-600 hover:text-yellow-800"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
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
      {isEditing && editingAutor && (
        <EditAutorForm
          autor={editingAutor}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}