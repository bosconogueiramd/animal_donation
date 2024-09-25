import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoriaManagement = () => {
    const [categorias, setCategorias] = useState([]);
    const [newCategoria, setNewCategoria] = useState({ nome: '', descricao: '' });
    const [editCategoria, setEditCategoria] = useState(null);

    // Fetch all categories
    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = () => {
        axios.get('http://localhost:3000/categoriaanimais')
            .then(response => {
                setCategorias(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar categorias:', error);
            });
    };

    // Create a new category
    const addCategoria = () => {
        axios.post('http://localhost:3000/categoriaanimais', newCategoria)
            .then(() => {
                fetchCategorias(); // Refresh list
                setNewCategoria({ nome: '', descricao: '' });
            })
            .catch(error => {
                console.error('Erro ao adicionar categoria:', error);
            });
    };

    // Update an existing category
    const updateCategoria = () => {
        axios.put(`http://localhost:3000/categoriaanimais/${editCategoria.id}`, editCategoria)
            .then(() => {
                fetchCategorias(); // Refresh list
                setEditCategoria(null);
            })
            .catch(error => {
                console.error('Erro ao atualizar categoria:', error);
            });
    };

    // Delete a category
    const deleteCategoria = (id) => {
        axios.delete(`http://localhost:3000/categoriaanimais/${id}`)
            .then(() => {
                fetchCategorias(); // Refresh list
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
                    value={newCategoria.nome}
                    onChange={(e) => setNewCategoria({ ...newCategoria, nome: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={newCategoria.descricao}
                    onChange={(e) => setNewCategoria({ ...newCategoria, descricao: e.target.value })}
                />
                <button onClick={addCategoria}>Adicionar</button>
            </div>

            {/* List of categories */}
            <ul>
                {categorias.map(categoria => (
                    <li key={categoria.id}>
                        {editCategoria && editCategoria.id === categoria.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editCategoria.nome}
                                    onChange={(e) => setEditCategoria({ ...editCategoria, nome: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editCategoria.descricao}
                                    onChange={(e) => setEditCategoria({ ...editCategoria, descricao: e.target.value })}
                                />
                                <button onClick={updateCategoria}>Salvar</button>
                                <button onClick={() => setEditCategoria(null)}>Cancelar</button>
                            </div>
                        ) : (
                            <div>
                                {categoria.nome} - {categoria.descricao}
                                <button onClick={() => setEditCategoria(categoria)}>Editar</button>
                                <button onClick={() => deleteCategoria(categoria.id)}>Excluir</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriaManagement;
