import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoriaManagement = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ nome: '' });
    const [editCategory, setEditCategory] = useState(null);

    // Read - Fetch all categories
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get('http://localhost:3000/categoriaanimais')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar categorias:', error);
            });
    };

    // Create - Add a new category
    const addCategory = () => {
        axios.post('http://localhost:3000/categoriaanimais', newCategory)
            .then(() => {
                fetchCategories(); // Refresh list
                setNewCategory({ nome: '' });
            })
            .catch(error => {
                console.error('Erro ao adicionar categoria:', error);
            });
    };

    // Update - Edit an existing category
    const updateCategory = () => {
        axios.put(`http://localhost:3000/categoriaanimais/${editCategory.id}`, editCategory)
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
        axios.delete(`http://localhost:3000/categoriaanimais/${id}`)
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
                    placeholder="Nome da Categoria"
                    value={newCategory.nome}
                    onChange={(e) => setNewCategory({ ...newCategory, nome: e.target.value })}
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
                                    value={editCategory.nome}
                                    onChange={(e) => setEditCategory({ ...editCategory, nome: e.target.value })}
                                />
                                <button onClick={updateCategory}>Salvar</button>
                                <button onClick={() => setEditCategory(null)}>Cancelar</button>
                            </div>
                        ) : (
                            <div>
                                {category.nome}
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
