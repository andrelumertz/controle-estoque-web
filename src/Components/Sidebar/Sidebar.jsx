// Substitua o conteúdo do seu arquivo Sidebar.jsx por este:

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { FiGrid, FiPlusCircle, FiMinusCircle, FiBarChart2, FiLogOut } from 'react-icons/fi';

// 1. A Sidebar agora recebe a função 'onCadastrarProdutoClick' como prop
const Sidebar = ({ onCadastrarProdutoClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" end>
              <FiGrid /> <span>Início</span>
            </NavLink>
          </li>

          {/* 2. ESTA É A MUDANÇA PRINCIPAL */}
          {/* Deixou de ser um NavLink e agora é um <li> que chama a função ao ser clicado */}
          <li onClick={onCadastrarProdutoClick} className="sidebar-button">
              <FiPlusCircle /> <span>Cadastrar Produto</span>
          </li>
          
          <li>
            <NavLink to="/dashboard/retirada">
              <FiMinusCircle /> <span>Retirada de Produto</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/products"> 
              <FiBarChart2 /> <span>Produtos</span> 
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar-logout">
        <button onClick={handleLogout}>
          <FiLogOut /> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;