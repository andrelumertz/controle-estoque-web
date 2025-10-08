import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import './ProductFormModal.css';

const mockProducts = [
  { id: 1, "Nome Produto": "Sacola Plástica Grande", "Quantidade Produto": 150, "Preco Unitario": 5.50, "Tipo Produto": "Embalagem", "Descrição Produto": "Sacola reforçada de 50L." },
  { id: 2, "Nome Produto": "Caixa de Papelão Média", "Quantidade Produto": 75, "Preco Unitario": 12.00, "Tipo Produto": "Caixa", "Descrição Produto": "Caixa de papelão para envios." },
  { id: 3, "Nome Produto": "Fita Adesiva Transparente", "Quantidade Produto": 200, "Preco Unitario": 8.75, "Tipo Produto": "Material", "Descrição Produto": "Rolo de fita adesiva de 50m." },
];

const ProductFormModal = ({ isOpen, onRequestClose, productId, onSave }) => {
  const [nomeProduto, setNomeProduto] = useState('');
  const [quantidadeProduto, setQuantidadeProduto] = useState('');
  const [precoUnitario, setPrecoUnitario] = useState('');
  const [tipoProduto, setTipoProduto] = useState('');
  const [descricaoProduto, setDescricaoProduto] = useState('');

  useEffect(() => {
    if (isOpen && productId) {
      const productToEdit = mockProducts.find(p => p.id === productId);
      if (productToEdit) {
        setNomeProduto(productToEdit["Nome Produto"]);
        setQuantidadeProduto(productToEdit["Quantidade Produto"]);
        setPrecoUnitario(productToEdit["Preco Unitario"]);
        setTipoProduto(productToEdit["Tipo Produto"]);
        setDescricaoProduto(productToEdit["Descrição Produto"]);
      }
    } else {
      setNomeProduto('');
      setQuantidadeProduto('');
      setPrecoUnitario('');
      setTipoProduto('');
      setDescricaoProduto('');
    }
  }, [productId, isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const productData = {
      "Nome Produto": nomeProduto,
      "Quantidade Produto": Number(quantidadeProduto),
      "Preco Unitario": Number(precoUnitario),
      "Tipo Produto": tipoProduto,
      "Descrição Produto": descricaoProduto
    };

    setTimeout(() => {
      let savedData;
      if (productId) {
        savedData = { ...productData, id: productId };
      } else {
        savedData = productData;
      }
      onSave(savedData);
      onRequestClose();
    }, 500);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="overlay">
      <div className="modal-content-wrapper">
        <button className="close-modal-btn" onClick={onRequestClose}>
          <FiX size={24} />
        </button>

        <h2>{productId ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Produto</label>
            <input type="text" value={nomeProduto} onChange={e => setNomeProduto(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Quantidade</label>
            <input type="number" value={quantidadeProduto} onChange={e => setQuantidadeProduto(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Preço Unitário</label>
            <input type="number" step="0.01" value={precoUnitario} onChange={e => setPrecoUnitario(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Tipo do Produto</label>
            <input type="text" value={tipoProduto} onChange={e => setTipoProduto(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Descrição do Produto</label>
            <textarea value={descricaoProduto} onChange={e => setDescricaoProduto(e.target.value)} required />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onRequestClose}>Cancelar</button>
            <button type="submit" className="btn-submit">Salvar</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProductFormModal;