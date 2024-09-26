const mysql = require('mysql2');

// Configura a conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'animaldonation.cl8qqac08u13.us-east-1.rds.amazonaws.com',      // Endereço do host
    port: 3306,             // Porta do MySQL
    user: 'bosconogueira',  // Nome de usuário do banco de dados
    password: 'bosconogueira*1', // Senha do banco de dados
    database: 'animaldonation'    // Nome do banco de dados (schema)
});

// Conecta ao banco de dados
connection.connect(error => {
    if (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
});

// Exporta a conexão para ser utilizada em outros arquivos
module.exports = connection;
