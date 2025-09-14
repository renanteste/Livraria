// src/components/CreateLivroForm.tsx
import React, { useEffect, useState } from 'react';
import { autorService } from '../services/autoresService';
import { generoService } from '../services/generosService';
import { livroService } from '../services/livrosService';

interface Autor {
  id: string;
  nome: string;
}

interface Genero {
  id: string;
  nome: string;
}

export default function CreateLivroForm() {
  const [titulo, setTitulo] = useState('');
  const [autorId, setAutorId] = useState('');
  const [generoId, setGeneroId] = useState('');
  const [autores, setAutores] = useState<Autor[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [error, setError] = useState('');

  // Carregar autores e gêneros
  useEffect(() => {
    const fetchAutoresAndGeneros = async () => {
      try {
        const autoresData = await autorService.getAll();
        const generosData = await generoService.getAll();
        setAutores(autoresData);
        setGeneros(generosData);
      } catch (err) {
        setError('Erro ao carregar autores ou gêneros.');
      }
    };

    fetchAutoresAndGeneros();
  }, []);

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
    <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Novo Livro</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título do livro"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="autorId" className="block text-sm font-medium text-gray-700">Autor</label>
          <select
            id="autorId"
            value={autorId}
            onChange={(e) => setAutorId(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Selecione um autor</option>
            {autores.map((autor) => (
              <option key={autor.id} value={autor.id}>
                {autor.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="generoId" className="block text-sm font-medium text-gray-700">Gênero</label>
          <select
            id="generoId"
            value={generoId}
            onChange={(e) => setGeneroId(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Selecione um gênero</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.nome}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Criar
        </button>
      </form>
    </div>
  );
}