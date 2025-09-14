// src/components/EditLivroForm.tsx
import React, { useState, useEffect } from 'react';
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

interface EditLivroFormProps {
  livro: { id: string; titulo: string; autorId: string; generoId: string };
  onClose: () => void;
  onUpdate: () => void;
}

export default function EditLivroForm({ livro, onClose, onUpdate }: EditLivroFormProps) {
  const [titulo, setTitulo] = useState(livro.titulo);
  const [autorId, setAutorId] = useState(livro.autorId);
  const [generoId, setGeneroId] = useState(livro.generoId);
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
      await livroService.update(livro.id, { titulo, autorId, generoId });
      alert('Livro atualizado com sucesso!');
      onUpdate();
      onClose();
    } catch (err) {
      setError('Erro ao atualizar livro.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Editar Livro</h3>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="autorId" className="block text-sm font-medium text-gray-700">Autor</label>
            <select
              id="autorId"
              value={autorId}
              onChange={(e) => setAutorId(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-blue-500"
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
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-blue-500"
            >
              <option value="">Selecione um gênero</option>
              {generos.map((genero) => (
                <option key={genero.id} value={genero.id}>
                  {genero.nome}
                </option>
              ))}
            </select>
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