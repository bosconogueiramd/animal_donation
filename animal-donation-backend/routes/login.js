// routes/login.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    const { email, senha } = req.body;

    try {
        console.log('Tentando fazer login com:', email, senha); // Log para verificar os dados recebidos

        // Verificar a conexão com o banco de dados
        if (!db) {
            console.error('A conexão com o banco de dados não foi estabelecida.');
            return res.status(500).json({ error: 'Erro ao conectar ao banco de dados.' });
        }

        // Verificar se o usuário existe no banco de dados
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        console.log('Resultado da consulta ao banco de dados:', rows); // Log para verificar o resultado da consulta

        if (!rows || rows.length === 0) {
            console.error('Usuário não encontrado.');
            return res.status(401).json({ error: 'Usuário não encontrado.' });
        }

        const user = rows[0];
        console.log('Usuário encontrado:', user); // Log para verificar o usuário encontrado

        // Verificar se a senha do banco de dados está hashada corretamente
        if (!user.senha || user.senha.length < 10) {
            console.error('A senha do usuário no banco de dados parece estar incorreta ou não está hashada.');
            return res.status(500).json({ error: 'Senha armazenada no banco de dados não é válida.' });
        }

        // Comparar a senha fornecida com a armazenada no banco de dados
        const senhaCorreta = await bcrypt.compare(senha, user.senha);
        console.log('Resultado da comparação de senha:', senhaCorreta); // Log para verificar o resultado da comparação

        if (!senhaCorreta) {
            console.error('Senha incorreta.');
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        // Remover a senha do objeto do usuário antes de retornar
        delete user.senha;

        // Retornar uma resposta bem-sucedida se o login for válido
        console.log('Login bem-sucedido para o usuário:', user.email);
        res.status(200).json({ message: 'Login bem-sucedido', user });
    } catch (error) {
        console.error('Erro ao fazer login:', error); // Log para mostrar o erro
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
});

module.exports = router;
