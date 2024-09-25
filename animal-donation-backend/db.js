const mysql = require('mysql2');

<<<<<<< HEAD
const connection = mysql.createConnection({
    host: 'YOUR_DB_HOST',  // Exemplo: 'localhost' ou o endereço do servidor Back4App
    user: 'YOUR_DB_USER',  // Seu usuário do MySQL
    password: 'YOUR_DB_PASSWORD',  // Sua senha do MySQL
    database: 'YOUR_DB_NAME'  // O nome do banco de dados que você criou
});

=======
// Configura a conexão com o banco de dados
const connection = mysql.createConnection({
    host: '127.0.0.1',      // Endereço do host
    port: 3306,             // Porta do MySQL
    user: 'bosconogueira',  // Nome de usuário do banco de dados
    password: 'bosconogueira*1', // Senha do banco de dados
    database: 'animaldonation'    // Nome do banco de dados (schema)
});

// Conecta ao banco de dados
>>>>>>> 73e24ac (Adicionando o projeto de doação de animais)
connection.connect(error => {
    if (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
});

<<<<<<< HEAD
=======
// Exporta a conexão para ser utilizada em outros arquivos
>>>>>>> 73e24ac (Adicionando o projeto de doação de animais)
module.exports = connection;
