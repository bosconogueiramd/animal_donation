import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnimalManagement = () => {
    const [animals, setAnimals] = useState([]);
    const [newAnimal, setNewAnimal] = useState({ name: '', age: '', breed: '', description: '' });
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
                setNewAnimal({ name: '', age: '', breed: '', description: '' });
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
                    value={newAnimal.name}
                    onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Idade"
                    value={newAnimal.age}
                    onChange={(e) => setNewAnimal({ ...newAnimal, age: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Raça"
                    value={newAnimal.breed}
                    onChange={(e) => setNewAnimal({ ...newAnimal, breed: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={newAnimal.description}
                    onChange={(e) => setNewAnimal({ ...newAnimal, description: e.target.value })}
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
                                    value={editAnimal.name}
                                    onChange={(e) => setEditAnimal({ ...editAnimal, name: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={editAnimal.age}
                                    onChange={(e) => setEditAnimal({ ...editAnimal, age: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editAnimal.breed}
                                    onChange={(e) => setEditAnimal({ ...editAnimal, breed: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editAnimal.description}
                                    onChange={(e) => setEditAnimal({ ...editAnimal, description: e.target.value })}
                                />
                                <button onClick={updateAnimal}>Salvar</button>
                                <button onClick={() => setEditAnimal(null)}>Cancelar</button>
                            </div>
                        ) : (
                            <div>
                                {animal.name} - {animal.age} anos - {animal.breed} - {animal.description}
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

