// Substitua o conteúdo do seu arquivo Dashboard.jsx por este:

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import ProductFormModal from "../ProductFormModal/ProductFormModal";
import './Dashboard.css';

const Dashboard = () => {
  // 1. O estado que controla o modal de PRODUTO agora vive aqui
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // (Opcional, para edição futura)
  const [editingProductId, setEditingProductId] = useState(null);

  // Funções para controlar o modal de PRODUTO
  const handleOpenCreateProductModal = () => {
    setEditingProductId(null);
    setIsProductModalOpen(true);
  };
  
  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      
      {/* 2. Passamos a função de abrir o modal como uma "prop" para a Sidebar */}
      <Sidebar onCadastrarProdutoClick={handleOpenCreateProductModal} />

      <div className="main-panel">
        <Header />
        <main className="content">
          <Outlet /> 
        </main>
      </div>

      {/* 3. O Modal é renderizado aqui, controlado pelo estado deste componente */}
      <ProductFormModal 
        isOpen={isProductModalOpen}
        onRequestClose={handleCloseProductModal}
        productId={editingProductId}
      />
    </div>
  );
};

export default Dashboard;