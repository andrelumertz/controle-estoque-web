// src/pages/Products/index.jsx

// 1. IMPORTS CORRETOS NO TOPO
import React, { useState, useEffect } from 'react';
import ProductFormModal from '../../Components/ProductFormModal/ProductFormModal';
import './Products.css';

// 2. DADOS FALSOS (MOCK)
const mockProducts = [
  { id: 1, "Nome Produto": "Sacola Plástica Grande", "Quantidade Produto": 150, "Preco Unitario": 5.50 },
  { id: 2, "Nome Produto": "Caixa de Papelão Média", "Quantidade Produto": 75, "Preco Unitario": 12.00 },
  { id: 3, "Nome Produto": "Fita Adesiva Transparente", "Quantidade Produto": 200, "Preco Unitario": 8.75 },
];

const Products = () => {
  // 3. DECLARAÇÃO DE TODOS OS ESTADOS (useState) NO TOPO DO COMPONENTE
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  // 4. DECLARAÇÃO DO useEffect
  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
    }, 1000);
  }, []);

  // 5. DECLARAÇÃO DAS FUNÇÕES (agora elas podem 'enxergar' os setters dos estados)
  const handleOpenCreateModal = () => {
    setEditingProductId(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (id) => {
    setEditingProductId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProduct = (savedProduct) => {
    if (savedProduct.id) {
      setProducts(products.map(p => p.id === savedProduct.id ? savedProduct : p));
    } else {
      setProducts([...products, { ...savedProduct, id: Date.now() }]);
    }
  };

  // 6. O RETURN COM O JSX
  return (
    <div>
      <div className="products-header">
  <h3 className="products-title">Lista de Produtos</h3>
  <button className="add-product-btn" onClick={handleOpenCreateModal}>
    + Adicionar Novo Produto
  </button>
</div>

      <ProductFormModal 
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        productId={editingProductId}
        onSave={handleSaveProduct} 
      />
      
      {products.length === 0 ? (
          <p style={{color: 'white', textAlign: 'center', marginTop: '20px'}}>Carregando produtos...</p>
      ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Nome do Produto</th>
                <th>Quantidade</th>
                <th>Preço Unitário</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product['Nome Produto']}</td>
                  <td>{product['Quantidade Produto']}</td>
                  <td>R$ {product['Preco Unitario'].toFixed(2)}</td>
                  <td className="actions-cell">
                    <button className="btn-edit" onClick={() => handleOpenEditModal(product.id)}>Editar</button>
                    <button className="btn-delete" onClick={() => alert(`Simulando exclusão do produto ID: ${product.id}`)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      )}
    </div>
  );
};

export default Products;