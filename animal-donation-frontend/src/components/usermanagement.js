import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [newUsuario, setNewUsuario] = useState({ nome: '', email: '', senha: '', data_criacao: '' });
    const [editUsuario, setEditUsuario] = useState(null);

    // Read - Fetch all usuarios
    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = () => {
        axios.get('http://localhost:3000/usuarios')
            .then(response => {
                setUsuarios(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar usuários:', error);
            });
    };

    // Create - Add a new usuario
    const addUsuario = () => {
        axios.post('http://localhost:3000/usuarios', newUsuario)
            .then(() => {
                fetchUsuarios(); // Refresh list
                setNewUsuario({ nome: '', email: '', senha: '', data_criacao: '' });
            })
            .catch(error => {
                console.error('Erro ao adicionar usuário:', error);
            });
    };

    // Update - Edit an existing usuario
    const updateUsuario = () => {
        axios.put(`http://localhost:3000/usuarios/${editUsuario.id}`, editUsuario)
            .then(() => {
                fetchUsuarios(); // Refresh list
                setEditUsuario(null);
            })
            .catch(error => {
                console.error('Erro ao atualizar usuário:', error);
            });
    };

    // Delete - Remove a usuario
    const deleteUsuario = (id) => {
        axios.delete(`http://localhost:3000/usuarios/${id}`)
            .then(() => {
                fetchUsuarios(); // Refresh list
            })
            .catch(error => {
                console.error('Erro ao deletar usuário:', error);
            });
    };

    return (
        <div>
            <h1>Gerenciamento de Usuários</h1>

            {/* Form to add a new usuario */}
            <div>
                <h2>Adicionar Novo Usuário</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    value={newUsuario.nome}
                    onChange={(e) => setNewUsuario({ ...newUsuario, nome: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUsuario.email}
                    onChange={(e) => setNewUsuario({ ...newUsuario, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={newUsuario.senha}
                    onChange={(e) => setNewUsuario({ ...newUsuario, senha: e.target.value })}
                />
                <input
                    type="datetime-local"
                    placeholder="Data de Criação"
                    value={newUsuario.data_criacao}
                    onChange={(e) => setNewUsuario({ ...newUsuario, data_criacao: e.target.value })}
                />
                <button onClick={addUsuario}>Adicionar</button>
            </div>

            {/* List of usuarios */}
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.id}>
                        {editUsuario && editUsuario.id === usuario.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editUsuario.nome}
                                    onChange={(e) => setEditUsuario({ ...editUsuario, nome: e.target.value })}
                                />
                                <input
                                    type="email"
                                    value={editUsuario.email}
                                    onChange={(e) => setEditUsuario({ ...editUsuario, email: e.target.value })}
                                />
                                <input
                                    type="password"
                                    value={editUsuario.senha}
                                    onChange={(e) => setEditUsuario({ ...editUsuario, senha: e.target.value })}
                                />
                                <input
                                    type="datetime-local"
                                    value={editUsuario.data_criacao}
                                    onChange={(e) => setEditUsuario({ ...editUsuario, data_criacao: e.target.value })}
                                />
                                <button onClick={updateUsuario}>Salvar</button>
                                <button onClick={() => setEditUsuario(null)}>Cancelar</button>
                            </div>
                        ) : (
                            <div>
                                {usuario.nome} - {usuario.email} - {usuario.data_criacao}
                                <button onClick={() => setEditUsuario(usuario)}>Editar</button>
                                <button onClick={() => deleteUsuario(usuario.id)}>Excluir</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
