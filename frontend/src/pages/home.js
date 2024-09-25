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
                    src="https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Imagem de adoção de animais" 
                    style={{ marginTop: '20px', borderRadius: '8px', maxWidth: '50%', height: 'auto' }}
                />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
