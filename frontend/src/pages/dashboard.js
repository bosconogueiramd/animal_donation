import React from 'react';
import NavbarDash from '../components/navbardash';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <NavbarDash />
            <h1>Dashboard</h1>
            <p>Bem-vindo ao painel de controle! Use a barra de navegação acima para acessar as seções de gerenciamento:</p>
            <ul>
                <li><Link to="/animal-management">Gerenciamento de Animais</Link></li>
                <li><Link to="/category-management">Gerenciamento de Categorias</Link></li>
                <li><Link to="/user-management">Gerenciamento de Usuários</Link></li>
                <li><Link to="/volunteer-management">Gerenciamento de Voluntários</Link></li>
                <li><Link to="/pedido-management">Gerenciamento de Pedidos</Link></li>
            </ul>
        </div>
    );
};

export default Dashboard;
