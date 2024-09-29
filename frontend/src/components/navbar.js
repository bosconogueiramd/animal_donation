import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ backgroundColor: '#4CAF50', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '20px' }}>Projeto Patas do Amanhã</Link>
            </div>
            <div>
                <Link to="/home" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Home</Link>
                <Link to="/dashboard" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Dashboard</Link>
            </div>
        </nav>
    );
};

export default Navbar;
