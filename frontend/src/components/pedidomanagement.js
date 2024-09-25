import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PedidoManagement = () => {
    const [pedidos, setPedidos] = useState([]);
    const [newPedido, setNewPedido] = useState({ usuario_id: '', animal_id: '', status: '', data_pedido: '' });
    const [editPedido, setEditPedido] = useState(null);

    // Read - Fetch all pedidos
    useEffect(() => {
        fetchPedidos();
    }, []);

    const fetchPedidos = () => {
        axios.get('http://localhost:3000/pedidos')
            .then(response => {
                setPedidos(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar pedidos:', error);
            });
    };

    // Create - Add a new pedido
    const addPedido = () => {
        axios.post('http://localhost:3000/pedidos', newPedido)
            .then(() => {
                fetchPedidos(); // Refresh list
                setNewPedido({ usuario_id: '', animal_id: '', status: '', data_pedido: '' });
            })
            .catch(error => {
                console.error('Erro ao adicionar pedido:', error);
            });
    };

    // Update - Edit an existing pedido
    const updatePedido = () => {
        axios.put(`http://localhost:3000/pedidos/${editPedido.id}`, editPedido)
            .then(() => {
                fetchPedidos(); // Refresh list
                setEditPedido(null);
            })
            .catch(error => {
                console.error('Erro ao atualizar pedido:', error);
            });
    };

    // Delete - Remove a pedido
    const deletePedido = (id) => {
        axios.delete(`http://localhost:3000/pedidos/${id}`)
            .then(() => {
                fetchPedidos(); // Refresh list
            })
            .catch(error => {
                console.error('Erro ao deletar pedido:', error);
            });
    };

    return (
        <div>
            <h1>Gerenciamento de Pedidos</h1>

            {/* Form to add a new pedido */}
            <div>
                <h2>Adicionar Novo Pedido</h2>
                <input
                    type="text"
                    placeholder="ID do Usuário"
                    value={newPedido.usuario_id}
                    onChange={(e) => setNewPedido({ ...newPedido, usuario_id: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="ID do Animal"
                    value={newPedido.animal_id}
                    onChange={(e) => setNewPedido({ ...newPedido, animal_id: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={newPedido.status}
                    onChange={(e) => setNewPedido({ ...newPedido, status: e.target.value })}
                />
                <input
                    type="datetime-local"
                    placeholder="Data do Pedido"
                    value={newPedido.data_pedido}
                    onChange={(e) => setNewPedido({ ...newPedido, data_pedido: e.target.value })}
                />
                <button onClick={addPedido}>Adicionar</button>
            </div>

            {/* List of pedidos */}
            <ul>
                {pedidos.map(pedido => (
                    <li key={pedido.id}>
                        {editPedido && editPedido.id === pedido.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editPedido.usuario_id}
                                    onChange={(e) => setEditPedido({ ...editPedido, usuario_id: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editPedido.animal_id}
                                    onChange={(e) => setEditPedido({ ...editPedido, animal_id: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editPedido.status}
                                    onChange={(e) => setEditPedido({ ...editPedido, status: e.target.value })}
                                />
                                <input
                                    type="datetime-local"
                                    value={editPedido.data_pedido}
                                    onChange={(e) => setEditPedido({ ...editPedido, data_pedido: e.target.value })}
                                />
                                <button onClick={updatePedido}>Salvar</button>
                                <button onClick={() => setEditPedido(null)}>Cancelar</button>
                            </div>
                        ) : (
                            <div>
                                Usuário: {pedido.usuario_id} - Animal: {pedido.animal_id} - Status: {pedido.status} - Data: {pedido.data_pedido}
                                <button onClick={() => setEditPedido(pedido)}>Editar</button>
                                <button onClick={() => deletePedido(pedido.id)}>Excluir</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PedidoManagement;
