const mysql = require('mysql2');

// Configura a conexão com o banco de dados usando variáveis de ambiente
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'animaldonation.cl8qqac08u13.us-east-1.rds.amazonaws.com',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'bosconogueira',
    password: process.env.DB_PASSWORD || 'bosconogueira*1',
    database: process.env.DB_NAME || 'animaldonation'
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
