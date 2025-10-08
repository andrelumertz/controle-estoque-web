// src/components/Header/index.jsx

import React from 'react';
import './Header.css';
import { FiUser } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">
        <h1>Dashboard de Estoque</h1>
        <p>Bem-vindo ao seu painel de controle!</p>
      </div>
      <div className="user-info">
        <div className="user-details">
          <span>Admin</span>
          <small>Gerente</small>
        </div>
        <div className="user-avatar">
          <FiUser />
        </div>
      </div>
    </header>
  );
};

export default Header;