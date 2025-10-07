// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333', // Sua URL base
});

// Isso é um Interceptor: uma função que "intercepta" toda requisição
// antes de ela ser enviada para a API.
api.interceptors.request.use(async config => {
  // 1. Pega o token que salvamos no localStorage
  const token = localStorage.getItem('app-token');

  // 2. Se o token existir, nós o adicionamos ao cabeçalho (header) de autorização
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // 3. Retorna a configuração da requisição com o cabeçalho adicionado
  return config;
});

export default api;