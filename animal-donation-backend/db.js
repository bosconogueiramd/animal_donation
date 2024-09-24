const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'YOUR_DB_HOST',  // Exemplo: 'localhost' ou o endereço do servidor Back4App
    user: 'YOUR_DB_USER',  // Seu usuário do MySQL
    password: 'YOUR_DB_PASSWORD',  // Sua senha do MySQL
    database: 'YOUR_DB_NAME'  // O nome do banco de dados que você criou
});

connection.connect(error => {
    if (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
});

module.exports = connection;
