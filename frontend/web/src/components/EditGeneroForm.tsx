// src/components/EditGeneroForm.tsx
import React, { useState } from 'react';
import { generoService } from '../services/generosService';

interface EditGeneroFormProps {
  genero: { id: string; nome: string };
  onClose: () => void;
  onUpdate: () => void;
}

export default function EditGeneroForm({ genero, onClose, onUpdate }: EditGeneroFormProps) {
  const [nome, setNome] = useState(genero.nome);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await generoService.update(genero.id, { nome });
      alert('Gênero atualizado com sucesso!');
      onUpdate();
      onClose();
    } catch (err) {
      setError('Erro ao atualizar gênero.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Editar Gênero</h3>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}