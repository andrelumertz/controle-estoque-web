// src/pages/ProductForm/index.jsx
// src/pages/ProductForm/index.jsx

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../services/api';

export const ProductForm = () => {
  // Estados para cada campo do formulário
  const [nomeProduto, setNomeProduto] = useState('');
  const [quantidadeProduto, setQuantidadeProduto] = useState('');
  const [precoUnitario, setPrecoUnitario] = useState('');
  const [tipoProduto, setTipoProduto] = useState('');
  const [descricaoProduto, setDescricaoProduto] = useState('');

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/products/${id}`).then(response => {
        const productData = response.data;
        // Populando os campos do formulário com os dados da API
        setNomeProduto(productData["Nome Produto"]);
        setQuantidadeProduto(productData["Quantidade Produto"]);
        setPrecoUnitario(productData["Preco Unitario"]);
        setTipoProduto(productData["Tipo Produto"]);
        setDescricaoProduto(productData["Descrição Produto"]);
      });
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Montando o objeto de dados com as chaves exatas que o backend espera
    const data = {
      "Nome Produto": nomeProduto,
      "Quantidade Produto": Number(quantidadeProduto),
      "Preco Unitario": Number(precoUnitario),
      "Tipo Produto": tipoProduto,
      "Descrição Produto": descricaoProduto
    };

    try {
      if (id) {
        // Se tem ID, atualiza (PUT)
        await api.put(`/products/${id}`, data);
        alert('Produto atualizado com sucesso!');
      } else {
        // Se não tem ID, cria (POST)
        await api.post('/products', data);
        alert('Produto criado com sucesso!');
      }
      history.push('/products'); // Redireciona para a lista
    } catch (error) {
      console.error("Erro ao salvar o produto!", error);
      alert("Erro ao salvar o produto.");
    }
  };

  return (
    <div>
      <h1>{id ? 'Editar Produto' : 'Adicionar Produto'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Produto:</label>
          <input type="text" value={nomeProduto} onChange={e => setNomeProduto(e.target.value)} required />
        </div>
        <div>
          <label>Quantidade:</label>
          <input type="number" value={quantidadeProduto} onChange={e => setQuantidadeProduto(e.target.value)} required />
        </div>
        <div>
          <label>Preço Unitário:</label>
          <input type="number" step="0.01" value={precoUnitario} onChange={e => setPrecoUnitario(e.target.value)} required />
        </div>
        <div>
          <label>Tipo do Produto:</label>
          <input type="text" value={tipoProduto} onChange={e => setTipoProduto(e.target.value)} required />
        </div>
        <div>
          <label>Descrição do Produto:</label>
          <textarea value={descricaoProduto} onChange={e => setDescricaoProduto(e.target.value)} required />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};