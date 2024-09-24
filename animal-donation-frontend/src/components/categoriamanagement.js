import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoriaManagement = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [editCategory, setEditCategory] = useState(null);

    // Read - Fetch all categories
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get('http://localhost:3000/categorias')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar categorias:', error);
            });
    };

    // Create - Add a new category
    const addCategory = () => {
        axios.post('http://localhost:3000/categorias', newCategory)
            .then(() => {
                fetchCategories(); // Refresh list
                setNewCategory({ name: '', description: '' });
            })
            .catch(error => {
                console.error('Erro ao adicionar categoria:', error);
            });
    };

    // Update - Edit an existing category
    const updateCategory = () => {
        axios.put(`http://localhost:3000/categorias/${editCategory.id}`, editCategory)
            .then(() => {
                fetchCategories(); // Refresh list
                setEditCategory(null);
            })
            .catch(error => {
                console.error('Erro ao atualizar categoria:', error);
            });
    };

    // Delete - Remove a category
    const deleteCategory = (id) => {
        axios.delete(`http://localhost:3000/categorias/${id}`)
            .then(() => {
                fetchCategories(); // Refresh list
            })
            .catch(error => {
                console.error('Erro ao deletar categoria:', error);
            });
    };

    return (
        <div>
            <h1>Gerenciamento de Categorias</h1>

            {/* Form to add a new category */}
            <div>
                <h2>Adicionar Nova Categoria</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
                <button onClick={addCategory}>Adicionar</button>
            </div>

            {/* List of categories */}
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        {editCategory && editCategory.id === category.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editCategory.name}
                                    onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editCategory.description}
                                    onChange={(e) => setEditCategory({ ...editCategory, description: e.target.value })}
                                />
                                <button onClick={updateCategory}>Salvar</button>
                                <button onClick={() => setEditCategory(null)}>Cancelar</button>
                            </div>
                        ) : (
                            <div>
                                {category.name} - {category.description}
                                <button onClick={() => setEditCategory(category)}>Editar</button>
                                <button onClick={() => deleteCategory(category.id)}>Excluir</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriaManagement;
