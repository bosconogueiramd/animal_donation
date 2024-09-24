import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
    const [editUser, setEditUser] = useState(null);

    // Read - Fetch all users
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:3000/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar usuários:', error);
            });
    };

    // Create - Add a new user
    const addUser = () => {
        axios.post('http://localhost:3000/users', newUser)
            .then(() => {
                fetchUsers(); // Refresh list
                setNewUser({ name: '', email: '', password: '' });
            })
            .catch(error => {
                console.error('Erro ao adicionar usuário:', error);
            });
    };

    // Update - Edit an existing user
    const updateUser = () => {
        axios.put(`http://localhost:3000/users/${editUser.id}`, editUser)
            .then(() => {
                fetchUsers(); // Refresh list
                setEditUser(null);
            })
            .catch(error => {
                console.error('Erro ao atualizar usuário:', error);
            });
    };

    // Delete - Remove a user
    const deleteUser = (id) => {
        axios.delete(`http://localhost:3000/users/${id}`)
            .then(() => {
                fetchUsers(); // Refresh list
            })
            .catch(error => {
                console.error('Erro ao deletar usuário:', error);
            });
    };

    return (
        <div>
            <h1>Gerenciamento de Usuários</h1>

            {/* Form to add a new user */}
            <div>
                <h2>Adicionar Novo Usuário</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
                <button onClick={addUser}>Adicionar</button>
            </div>

            {/* List of users */}
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {editUser && editUser.id === user.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editUser.name}
                                    onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                />
                                <input
                                    type="email"
                                    value={editUser.email}
                                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                />
                                <input
                                    type="password"
                                    value={editUser.password}
                                    onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
                                />
                                <button onClick={updateUser}>Salvar</button>
                                <button onClick={() => setEditUser(null)}>Cancelar</button>
                            </div>
                        ) : (
                            <div>
                                {user.name} - {user.email}
                                <button onClick={() => setEditUser(user)}>Editar</button>
                                <button onClick={() => deleteUser(user.id)}>Excluir</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
