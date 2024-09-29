// frontend/src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import AnimalManagement from './components/animalmanagement';
import PedidoManagement from './components/pedidomanagement';
import UserManagement from './components/usermanagement';
import VoluntarioManagement from './components/voluntariomanagement';
import CategoriaManagement from './components/categoriamanagement';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/animal-management" element={<AnimalManagement />} />
        <Route path="/pedido-management" element={<PedidoManagement />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/volunteer-management" element={<VoluntarioManagement />} />
        <Route path="/category-management" element={<CategoriaManagement />} />
      </Routes>
    </div>
  );
}

export default App;
