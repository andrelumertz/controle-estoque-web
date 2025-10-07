// src/pages/Products/index.jsx
// src/pages/Products/index.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Houve um erro ao buscar os produtos!", error);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        // Usando o ID correto para a requisição DELETE
        await api.delete(`/products/${id}`);
        // Atualiza a lista removendo o produto pelo "ID Produto"
        setProducts(products.filter(product => product["ID Produto"] !== id));
      } catch (error) {
        console.error("Erro ao deletar o produto!", error);
        alert("Não foi possível deletar o produto.");
      }
    }
  };

  return (
    <div>
      <h1>Lista de Produtos</h1>

      <Link to="/products/new">
        <button>Adicionar Novo Produto</button>
      </Link>

      <table border="1" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            // A "key" e o ID para as ações agora usam product["ID Produto"]
            <tr key={product["ID Produto"]}>
              <td>{product["ID Produto"]}</td>
              <td>{product["Nome Produto"]}</td>

              <td>{product["Quantidade Produto"]}</td>
              <td>R$ {product["Preco Unitario"]}</td>
              <td>{product["Tipo Produto"]}</td>
              <td>
                <Link to={`/products/edit/${product["ID Produto"]}`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => handleDelete(product["ID Produto"])}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};