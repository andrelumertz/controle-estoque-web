// src/routes/index.jsx

import { Switch } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';

// 1. Importando as novas páginas que criamos
import { Products } from '../pages/Products';
import { ProductForm } from '../pages/ProductForm';

import { Route } from './Route';

export const Routes = () => {
    return (
        <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/home" component={Home} isPrivate />

            {/* 2. Adicionando as rotas para o CRUD de Produtos */}
            <Route path="/products" component={Products} exact isPrivate />
            <Route path="/products/new" component={ProductForm} isPrivate />
            <Route path="/products/edit/:id" component={ProductForm} isPrivate />
        </Switch>
    );
}