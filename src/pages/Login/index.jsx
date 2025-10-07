// src/pages/Login/index.jsx

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api'; // Usaremos o mesmo 'api'

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // 1. Envia as credenciais para um endpoint de login na sua API
      const response = await api.post('/login', { // O endpoint pode ser /auth, /sessions, etc.
        username, // ou email, dependendo do que a API espera
        password,
      });

      // 2. A API deve retornar um token e dados do usuário
      const { token, user } = response.data;

      // 3. Salva o token no localStorage do navegador para uso futuro
      localStorage.setItem('app-token', token);
      // Opcional: salvar dados do usuário também
      localStorage.setItem('app-user', JSON.stringify(user));

      // 4. Redireciona o usuário para a página principal
      history.push('/home');

    } catch (error) {
      console.error("Falha na autenticação", error);
      alert("Usuário ou senha inválidos.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário:</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};