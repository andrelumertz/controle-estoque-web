// src/App.jsx (VERSÃO CORRIGIDA)

import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// MANTENDO OS SEUS CAMINHOS DE IMPORTAÇÃO
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import Products from './pages/Products'; // ADICIONE O IMPORT DA PÁGINA DE PRODUTOS

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial: se não for especificado, vai para o login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* --- ESTA É A PARTE CORRIGIDA --- */}
        {/* Agora, a rota do Dashboard tem rotas "filhas" dentro dela */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Rota ÍNDICE: O que mostrar em /dashboard */}
          {/* 'index' significa que este é o componente padrão */}
          <Route index element={<Products />} /> 
          
          {/* Rota FILHA: O que mostrar em /dashboard/products */}
          <Route path="products" element={<Products />} />

          {/* Adicione outras páginas do dashboard aqui no futuro */}
          {/* <Route path="retirada" element={<SuaPaginaDeRetirada />} /> */}
        </Route>
        
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;