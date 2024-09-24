import React from 'react';
import NavbarDash from '../components/navbardash';

const Dashboard = () => {
    return (
        <div>
            <NavbarDash />
            <h1>Dashboard</h1>
            <p>Bem-vindo ao painel de controle! Use a barra de navegação acima para acessar as seções de gerenciamento:</p>
            <ul>
                <li>Gerenciamento de Animais</li>
                <li>Gerenciamento de Categorias</li>
                <li>Gerenciamento de Usuários</li>
                <li>Gerenciamento de Voluntários</li>
                <li>Gerenciamento de Pedidos</li>
            </ul>
        </div>
    );
};

export default Dashboard;
