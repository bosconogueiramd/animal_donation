import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Home = () => {
    return (
        <div>
            <Navbar />
            <main style={{ padding: '20px', textAlign: 'center' }}>
                <h1>Bem-vindo ao Sistema de Adoção de Animais</h1>
                <p>Encontre seu novo melhor amigo ou contribua para a causa como voluntário!</p>
                <img 
                    src="https://via.placeholder.com/600x300" 
                    alt="Imagem de adoção de animais" 
                    style={{ marginTop: '20px', borderRadius: '8px' }}
                />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
