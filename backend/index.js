const express = require('express');
const cors = require('cors'); // Importe o CORS

const app = express();

// Middleware CORS
app.use(cors()); // Permite requisições de qualquer origem

// Importar as rotas
const animaisRoutes = require('./routes/animais');
const categoriaAnimaisRoutes = require('./routes/categoriaanimais');
const pedidoRoutes = require('./routes/pedidoroutes');
const userRoutes = require('./routes/users');
const voluntariosRoutes = require('./routes/voluntarios');


// Middleware para processar JSON
app.use(express.json());

// Definir rotas
app.use('/animais', animaisRoutes);
app.use('/categoriaanimais', categoriaAnimaisRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/users', userRoutes);
app.use('/voluntarios', voluntariosRoutes);
 

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
