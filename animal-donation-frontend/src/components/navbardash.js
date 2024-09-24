import React from 'react';
import { Link } from 'react-router-dom';

const NavbarDash = () => {
    return (
        <nav style={{ backgroundColor: '#333', padding: '10px', display: 'flex', justifyContent: 'space-between', color: 'white' }}>
            <div>
                <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '20px' }}>Dashboard</Link>
            </div>
            <div>
                <Link to="/animal-management" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Animais</Link>
                <Link to="/category-management" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Categorias</Link>
                <Link to="/user-management" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Usuários</Link>
                <Link to="/volunteer-management" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Voluntários</Link>
                <Link to="/logout" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Sair</Link>
            </div>
        </nav>
    );
};

export default NavbarDash;
