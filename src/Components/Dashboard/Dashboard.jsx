import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home'); // Estado para controlar a seção ativa

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Remove o estado de autenticação
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li
            className={activeSection === 'cadastrar' ? 'active' : ''}
            onClick={() => setActiveSection('cadastrar')}
          >
            Cadastrar Produto
          </li>
          <li
            className={activeSection === 'retirada' ? 'active' : ''}
            onClick={() => setActiveSection('retirada')}
          >
            Retirada de Produto
          </li>
          <li
            className={activeSection === 'relatorio' ? 'active' : ''}
            onClick={() => setActiveSection('relatorio')}
          >
            Relatório
          </li>
          <li className="logout" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
      <div className="main-content">
        <h1>Dashboard de Estoque</h1>
        {activeSection === 'home' && (
          <p>Bem-vindo ao sistema de gerenciamento de estoque!</p>
        )}
        {activeSection === 'cadastrar' && (
          <div>
            <h3>Cadastrar Produto</h3>
            <form>
              <input type="text" placeholder="Nome do Produto" />
              <input type="number" placeholder="Quantidade" />
              <input type="number" step="0.01" placeholder="Preço" />
              <button type="submit">Salvar</button>
            </form>
          </div>
        )}
        {activeSection === 'retirada' && (
          <div>
            <h3>Retirada de Produto</h3>
            <form>
              <input type="text" placeholder="Nome do Produto" />
              <input type="number" placeholder="Quantidade" />
              <button type="submit">Retirar</button>
            </form>
          </div>
        )}
        {activeSection === 'relatorio' && (
          <div>
            <h3>Relatório</h3>
            <p>Em construção: Exibir lista de produtos e estatísticas aqui.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;