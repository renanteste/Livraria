// src/App.tsx
import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import GenerosPage from './pages/GenerosPage';
import AutoresPage from './pages/AutoresPage';
import LivrosPage from './pages/LivrosPage';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Livraria</h1>
            </div>
            <div className="flex items-center space-x-4">
              <NavLink
                to="/generos"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-800 font-semibold'
                    : 'text-blue-600 hover:text-blue-800 transition'
                }
              >
                Gêneros
              </NavLink>
              <NavLink
                to="/autores"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-800 font-semibold'
                    : 'text-blue-600 hover:text-blue-800 transition'
                }
              >
                Autores
              </NavLink>
              <NavLink
                to="/livros"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-800 font-semibold'
                    : 'text-blue-600 hover:text-blue-800 transition'
                }
              >
                Livros
              </NavLink>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/generos" element={<GenerosPage />} />
          <Route path="/autores" element={<AutoresPage />} />
          <Route path="/livros" element={<LivrosPage />} />
          <Route path="/" element={<LivrosPage />} />
        </Routes>
      </main>
    </div>
  );
}