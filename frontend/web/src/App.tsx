import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import GenerosPage from './pages/GenerosPage';
import AutoresPage from './pages/AutoresPage';
import LivrosPage from './pages/LivrosPage';


export default function App() {
return (
<div className="p-6">
<nav className="mb-4">
<NavLink to="/generos">Gêneros</NavLink> |{' '}
<NavLink to="/autores">Autores</NavLink> |{' '}
<NavLink to="/livros">Livros</NavLink>
</nav>


<Routes>
<Route path="/generos" element={<GenerosPage />} />
<Route path="/autores" element={<AutoresPage />} />
<Route path="/livros" element={<LivrosPage />} />
<Route path="/" element={<LivrosPage />} />
</Routes>
</div>
);
}