// src/components/CreateLivroForm.tsx
import React, { useState } from 'react';
import { livroService } from '../services/livrosService';

export default function CreateLivroForm() {
  const [titulo, setTitulo] = useState('');
  const [autorId, setAutorId] = useState('');
  const [generoId, setGeneroId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await livroService.create({ titulo, autorId, generoId });
      alert('Livro criado com sucesso!');
      setTitulo('');
      setAutorId('');
      setGeneroId('');
    } catch (err) {
      setError('Erro ao criar livro.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Novo Livro</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="space-y-4">
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título do livro"
          required
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-blue-500"
        />
        <input
          type="text"
          value={autorId}
          onChange={(e) => setAutorId(e.target.value)}
          placeholder="ID do autor"
          required
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-blue-500"
        />
        <input
          type="text"
          value={generoId}
          onChange={(e) => setGeneroId(e.target.value)}
          placeholder="ID do gênero"
          required
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-blue-500"
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