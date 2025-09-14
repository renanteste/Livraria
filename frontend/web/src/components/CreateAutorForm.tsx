// src/components/CreateAutorForm.tsx
import React, { useState } from 'react';
import { autorService } from '../services/autoresService';

export default function CreateAutorForm() {
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await autorService.create({ nome });
      alert('Autor criado com sucesso!');
      setNome('');
    } catch (err) {
      setError('Erro ao criar autor.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Novo Autor</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do autor"
          required
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Criar
        </button>
      </div>
    </form>
  );
}