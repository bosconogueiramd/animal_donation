import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnimalManagement = () => {
    const [animals, setAnimals] = useState([]);
    const [newAnimal, setNewAnimal] = useState({ nome: '', idade: '', raca: '', descricao: '' });
    const [editAnimal, setEditAnimal] = useState(null);

    // Read - Fetch all animals
    useEffect(() => {
        fetchAnimals();
    }, []);

    const fetchAnimals = () => {
        axios.get('http://localhost:3000/animais')
            .then(response => {
                setAnimals(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar animais:', error);
            });
    };

    // Create - Add a new animal
    const addAnimal = () => {
        axios.post('http://localhost:3000/animais', newAnimal)
            .then(() => {
                fetchAnimals(); // Refresh list
                setNewAnimal({ nome: '', idade: '', raca: '', descricao: '' });
            })
            .catch(error => {
                console.error('Erro ao adicionar animal:', error);
            });
    };

    // Update - Edit an existing animal
    const updateAnimal = () => {
        axios.put(`http://localhost:3000/animais/${editAnimal.id}`, editAnimal)
            .then(() => {
                fetchAnimals(); // Refresh list
                setEditAnimal(null);
            })
            .catch(error => {
                console.error('Erro ao atualizar animal:', error);
            });
    };

    // Delete - Remove an animal
    const deleteAnimal = (id) => {
        axios.delete(`http://localhost:3000/animais/${id}`)
            .then(() => {
                fetchAnimals(); // Refresh list
            })
            .catch(error => {
                console.error('Erro ao deletar animal:', error);
            });
    };

    return (
        <div>
            <h1>Gerenciamento de Animais</h1>

            {/* Form to add a new animal */}
            <div>
                <h2>Adicionar Novo Animal</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    value={newAnimal.nome}
                    onChange={(e) => setNewAnimal({ ...newAnimal, nome: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Idade"
                    value={newAnimal.idade}
                    onChange={(e) => setNewAnimal({ ...newAnimal, idade: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Raça"
                    value={newAnimal.raca}
                    onChange={(e) => setNewAnimal({ ...newAnimal, raca: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={newAnimal.descricao}
                    onChange={(e) => setNewAnimal({ ...newAnimal, descricao: e.target.value })}
                />
                <button onClick={addAnimal}>Adicionar</button>
            </div>

            {/* List of animals */}
            <ul>
                {animals.map(animal => (
                    <li key={animal.id}>
                        {editAnimal && editAnimal.id === animal.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editAnimal.nome}
                                    onChange={(e) => setEditAnimal({ ...editAnimal, nome: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={editAnimal.idade}
                                    onChange={(e) => setEditAnimal({ ...editAnimal, idade: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editAnimal.raca}
                                    onChange={(e) => setEditAnimal({ ...editAnimal, raca: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editAnimal.descricao}
                                    onChange={(e) => setEditAnimal({ ...editAnimal, descricao: e.target.value })}
                                />
                                <button onClick={updateAnimal}>Salvar</button>
                                <button onClick={() => setEditAnimal(null)}>Cancelar</button>
                            </div>
                        ) : (
                            <div>
                                {animal.nome} - {animal.idade} anos - {animal.raca} - {animal.descricao}
                                <button onClick={() => setEditAnimal(animal)}>Editar</button>
                                <button onClick={() => deleteAnimal(animal.id)}>Excluir</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnimalManagement;
