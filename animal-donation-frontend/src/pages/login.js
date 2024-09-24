import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/login', { email, password })
            .then(response => {
                alert('Login realizado com sucesso!');
                // Aqui você pode redirecionar o usuário para outra página
            })
            .catch(error => {
                setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
            });
    };

    return (
        <div>
            <Navbar />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ padding: '10px', margin: '10px 0', width: '300px' }}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ padding: '10px', margin: '10px 0', width: '300px' }}
                        />
                    </div>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>Entrar</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
