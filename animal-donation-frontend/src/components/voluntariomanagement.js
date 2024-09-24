import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VoluntarioManagement = () => {
    const [voluntarios, setVoluntarios] = useState([]);
    const [newVoluntario, setNewVoluntario] = useState({ name: '', email: '', phone: '', skills: '' });
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
                setNewVoluntario({ name: '', email: '', phone: '', skills: '' });
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
                    value={newVoluntario.name}
                    onChange={(e) => setNewVoluntario({ ...newVoluntario, name: e.target.value })}
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
                    value={newVoluntario.phone}
                    onChange={(e) => setNewVoluntario({ ...newVoluntario, phone: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Habilidades"
                    value={newVoluntario.skills}
                    onChange={(e) => setNewVoluntario({ ...newVoluntario, skills: e.target.value })}
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
                                    value={editVoluntario.name}
                                    onChange={(e) => setEditVoluntario({ ...editVoluntario, name: e.target.value })}
                                />
                                <input
                                    type="email"
                                    value={editVoluntario.email}
                                    onChange={(e) => setEditVoluntario({ ...editVoluntario, email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editVoluntario.phone}
                                    onChange={(e) => setEditVoluntario({ ...editVoluntario, phone: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editVoluntario.skills}
                                    onChange={(e) => setEditVoluntario({ ...editVoluntario, skills: e.target.value })}
                                />
                                <button onClick={updateVoluntario}>Salvar</button>
                                <button onClick={() => setEditVoluntario(null)}>Cancelar</button>
                            </div>
                        ) : (
                            <div>
                                {voluntario.name} - {voluntario.email} - {voluntario.phone} - {voluntario.skills}
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
