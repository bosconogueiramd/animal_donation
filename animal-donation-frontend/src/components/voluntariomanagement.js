import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VoluntarioManagement = () => {
    const [voluntarios, setVoluntarios] = useState([]);
    const [newVoluntario, setNewVoluntario] = useState({ nome: '', email: '', telefone: '', data_registro: '' });
    const [editVoluntario, setEditVoluntario] = useState(null);

    // Read - Fetch all voluntarios
    useEffect(() => {
        fetchVoluntarios();
    }, []);

    const fetchVoluntarios = () => {
        axios.get('http://localhost:3000/voluntarios')
            .then(response => {
                setVoluntarios(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar voluntários:', error);
            });
    };

    // Create - Add a new voluntario
    const addVoluntario = () => {
        axios.post('http://localhost:3000/voluntarios', newVoluntario)
            .then(() => {
                fetchVoluntarios(); // Refresh list
                setNewVoluntario({ nome: '', email: '', telefone: '', data_registro: '' });
            })
            .catch(error => {
                console.error('Erro ao adicionar voluntário:', error);
            });
    };

    // Update - Edit an existing voluntario
    const updateVoluntario = () => {
        axios.put(`http://localhost:3000/voluntarios/${editVoluntario.id}`, editVoluntario)
            .then(() => {
                fetchVoluntarios(); // Refresh list
                setEditVoluntario(null);
            })
            .catch(error => {
                console.error('Erro ao atualizar voluntário:', error);
            });
    };

    // Delete - Remove a voluntario
    const deleteVoluntario = (id) => {
        axios.delete(`http://localhost:3000/voluntarios/${id}`)
            .then(() => {
                fetchVoluntarios(); // Refresh list
            })
            .catch(error => {
                console.error('Erro ao deletar voluntário:', error);
            });
    };

    return (
        <div>
            <h1>Gerenciamento de Voluntários</h1>

            {/* Form to add a new voluntario */}
            <div>
                <h2>Adicionar Novo Voluntário</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    value={newVoluntario.nome}
                    onChange={(e) => setNewVoluntario({ ...newVoluntario, nome: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newVoluntario.email}
                    onChange={(e) => setNewVoluntario({ ...newVoluntario, email: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Telefone"
                    value={newVoluntario.telefone}
                    onChange={(e) => setNewVoluntario({ ...newVoluntario, telefone: e.target.value })}
                />
                <input
                    type="datetime-local"
                    placeholder="Data de Registro"
                    value={newVoluntario.data_registro}
                    onChange={(e) => setNewVoluntario({ ...newVoluntario, data_registro: e.target.value })}
                />
                <button onClick={addVoluntario}>Adicionar</button>
            </div>

            {/* List of voluntarios */}
            <ul>
                {voluntarios.map(voluntario => (
                    <li key={voluntario.id}>
                        {editVoluntario && editVoluntario.id === voluntario.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editVoluntario.nome}
                                    onChange={(e) => setEditVoluntario({ ...editVoluntario, nome: e.target.value })}
                                />
                                <input
                                    type="email"
                                    value={editVoluntario.email}
                                    onChange={(e) => setEditVoluntario({ ...editVoluntario, email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editVoluntario.telefone}
                                    onChange={(e) => setEditVoluntario({ ...editVoluntario, telefone: e.target.value })}
                                />
                                <input
                                    type="datetime-local"
                                    value={editVoluntario.data_registro}
                                    onChange={(e) => setEditVoluntario({ ...editVoluntario, data_registro: e.target.value })}
                                />
                                <button onClick={updateVoluntario}>Salvar</button>
                                <button onClick={() => setEditVoluntario(null)}>Cancelar</button>
                            </div>
                        ) : (
                            <div>
                                {voluntario.nome} - {voluntario.email} - {voluntario.telefone} - {voluntario.data_registro}
                                <button onClick={() => setEditVoluntario(voluntario)}>Editar</button>
                                <button onClick={() => deleteVoluntario(voluntario.id)}>Excluir</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VoluntarioManagement;
